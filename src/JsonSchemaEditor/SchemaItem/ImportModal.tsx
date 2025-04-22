import { Grid, Message, Modal, Radio } from '@arco-design/web-react';
import MonacoEditor from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/MonacoEditor';
import {
  parseJsonStr,
  resolveJsonSchemaRef,
} from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/utils';
import Ajv from 'ajv';
import { Draft07 } from 'json-schema-library';
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

const Row = Grid.Row;

type ImportModalProps = {
  open: boolean;
  onOk?: (importValue: any) => void;
  onCancel?: () => void;
};

const ImportModal = (props: ImportModalProps) => {
  const { open, onOk, onCancel } = props;
  const { t } = useI18n();
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importType, setImportType] = useState<'json' | 'json-schema'>('json');
  const [importValue, setImportValue] = useState<string | undefined>();

  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  useEffect(() => {
    setImportModalVisible(open);
  }, [open]);

  function onClose() {
    setImportModalVisible(false);
    setImportValue(undefined);
    editorRef.current?.setValue('');
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <Modal
      title={t('Import')}
      style={{ width: 900 }}
      visible={importModalVisible}
      onOk={async () => {
        if (!importValue || importValue.length === 0) {
          Message.warning(t('ImportEmptyJsonWarnMsg'));
          return;
        }
        const importObject = parseJsonStr(importValue);
        if (!importObject) {
          Message.error(t('ImportNotJsonWarnMsg'));
          return;
        }
        let schema;
        switch (importType) {
          case 'json':
            schema = new Draft07().createSchemaOf(importObject);
            break;
          case 'json-schema':
            schema = await resolveJsonSchemaRef(importObject);
            break;
        }
        if (!schema) {
          Message.warning(t('ImportErrorContentWarnMsg'));
          return;
        } else {
          const ajv = new Ajv({ allErrors: true });
          const validateSchema = ajv.getSchema(
            'http://json-schema.org/draft-07/schema#',
          );
          if (validateSchema && !validateSchema(schema)) {
            const errorContent = validateSchema.errors?.map((error, index) => {
              const field = error.instancePath.split('/').pop() || 'root';
              const message = `${field} ${error.message}`;
              return (
                <div key={index}>{`Error in field "${field}": ${message}`}</div>
              );
            });
            if ((errorContent?.length || 0) > 0) {
              Message.error({
                content: <div>{errorContent}</div>,
              });
            }
            return;
          }
        }
        if (onOk) {
          onOk(schema);
        }
        onClose();
      }}
      onCancel={onClose}
    >
      <Row style={{ marginBottom: 16 }}>
        <Radio.Group
          value={importType}
          type="button"
          onChange={(type) => setImportType(type)}
          options={[
            { value: 'json', label: 'Json' },
            { value: 'json-schema', label: 'JsonSchema' },
          ]}
        />
      </Row>
      <Row>
        <MonacoEditor
          height={500}
          language="json"
          handleEditorDidMount={handleEditorDidMount}
          onChange={(value) => setImportValue(value)}
        />
      </Row>
    </Modal>
  );
};

export default ImportModal;
