import { Grid, Message, Modal, Radio } from '@arco-design/web-react';
import MonacoEditor from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/MonacoEditor';
import {
  parseJsonStr,
  resolveJsonSchemaRef,
} from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/utils';
import Ajv from 'ajv';
import { Draft07 } from 'json-schema-library';
import React, { useEffect, useRef, useState } from 'react';

const Row = Grid.Row;

type ImportModalProps = {
  open: boolean;
  onOk?: (importValue: any) => void;
  onCancel?: () => void;
};

const ImportModal = (props: ImportModalProps) => {
  const { open, onOk, onCancel } = props;

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
      title="导入"
      style={{ width: 900 }}
      okText={'导入'}
      cancelText={'取消'}
      visible={importModalVisible}
      onOk={async () => {
        if (!importValue || importValue.length === 0) {
          Message.warning('请输入导入的 Json 数据');
          return;
        }
        const importObject = parseJsonStr(importValue);
        if (!importObject) {
          Message.error('导入的内容不是 Json 格式的数据');
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
          Message.warning('导入的内容有误，请检查后重新导入');
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
