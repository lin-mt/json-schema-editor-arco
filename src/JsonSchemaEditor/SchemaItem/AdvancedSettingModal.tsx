import {
  Button,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from '@arco-design/web-react';
import { IconDelete, IconPlus } from '@arco-design/web-react/icon';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import MonacoEditor from '../MonacoEditor';
import { SchemaTypes, StringFormat } from '../utils';

const Row = Grid.Row;
const Col = Grid.Col;

interface AdvancedSettingModalProps {
  schema: any;
  visible?: boolean;
  onOk?: (newSchema: any) => void;
  onCancel?: () => void;
}

export default (props: AdvancedSettingModalProps) => {
  const { schema, visible = false, onOk, onCancel } = props;

  const { t } = useI18n();
  const [advancedForm] = Form.useForm();
  const [formSchema, setFormSchema] = useState<any>();
  const [advancedModal, setAdvancedModal] = useState(false);
  const [isObject, setIsObject] = useState(false);
  const [isArray, setIsArray] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isInteger, setIsInteger] = useState(false);
  const [isString, setIsString] = useState(false);
  const editorRef = useRef<any>(null);
  const isFormUpdateRef = useRef(false);

  useEffect(() => {
    setFormSchema(schema);
  }, [schema]);

  useEffect(() => {
    setAdvancedModal(visible);
  }, [visible]);

  // 使用useRef稳定防抖函数
  const debounceFn = useRef(
    _.debounce((value: string) => {
      try {
        const editorSchema = JSON.parse(value);
        setFormSchema(editorSchema);
      } catch (e) {
        console.error('JSON解析失败', e);
      }
    }, 300),
  );

  // 组件卸载时取消防抖
  useEffect(() => {
    return () => {
      debounceFn.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (!formSchema) return;
    advancedForm.setFieldsValue(formSchema);
    setIsObject(formSchema.type === 'object');
    setIsArray(formSchema.type === 'array');
    setIsNumber(formSchema.type === 'number');
    setIsBoolean(formSchema.type === 'boolean');
    setIsInteger(formSchema.type === 'integer');
    setIsString(formSchema.type === 'string');
  }, [formSchema]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editorRef.current.setValue(JSON.stringify(schema, null, 2));
  }

  function onClose() {
    onCancel?.();
    setAdvancedModal(false);
  }

  return (
    <Modal
      title={t('AdvancedSettings')}
      style={{ width: 900 }}
      visible={advancedModal}
      onOk={async () => {
        try {
          await advancedForm.validate();
          onOk?.({ ...formSchema, ...advancedForm.getFieldsValue() });
        } catch (e) {
          console.error('字段校验失败，请检查字段！');
        }
      }}
      onCancel={onClose}
    >
      <Form
        form={advancedForm}
        onValuesChange={(_, allValues) => {
          if (!editorRef.current) return;
          isFormUpdateRef.current = true;
          const newSchema = { ...formSchema, ...allValues };
          const newValue = JSON.stringify(newSchema, null, 2);
          const currentValue = editorRef.current.getValue();
          if (currentValue !== newValue) {
            editorRef.current.setValue(newValue);
          }
          setTimeout(() => {
            isFormUpdateRef.current = false;
          }, 0);
        }}
      >
        {!isObject && SchemaTypes.indexOf(formSchema?.type) !== -1 && (
          <div
            style={{
              borderLeft: `3px solid rgb(var(--primary-6))`,
              fontSize: 16,
              fontWeight: 399,
              paddingLeft: 8,
              marginBottom: 13,
            }}
          >
            {t('BasicSettings')}
          </div>
        )}
        {(isString || isNumber || isInteger || isBoolean) && (
          <Row justify={'start'} align={'center'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              {t('DefaultValue')}：
            </Col>
            <Col span={8}>
              {isString && (
                <Form.Item noStyle field={'default'}>
                  <Input
                    style={{ width: '100%' }}
                    placeholder={t('DefaultValuePlaceholder')}
                  />
                </Form.Item>
              )}
              {(isNumber || isInteger) && (
                <Form.Item noStyle field={'default'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('DefaultValuePlaceholder')}
                  />
                </Form.Item>
              )}
              {isBoolean && (
                <Form.Item noStyle field={'default'}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder={t('SelectDefaultValuePlaceholder')}
                    options={[
                      { value: 'true', label: 'true' },
                      { value: 'false', label: 'false' },
                    ]}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        )}
        {isString && (
          <Row justify={'start'} align={'center'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              {t('MinimumLength')}：
            </Col>
            <Col span={8}>
              <Form.Item noStyle field={'minLength'}>
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  parser={(value) =>
                    value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                  }
                  formatter={(value) =>
                    value ? `${Math.floor(Math.max(Number(value), 0))}` : ''
                  }
                  placeholder={t('MinimumLengthPlaceholder')}
                />
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              {t('MaximumLength')}：
            </Col>
            <Col span={8}>
              <Form.Item noStyle field={'maxLength'}>
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  parser={(value) =>
                    value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                  }
                  formatter={(value) =>
                    value ? `${Math.floor(Math.max(Number(value), 0))}` : ''
                  }
                  placeholder={t('MaximumLengthPlaceholder')}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {(isNumber || isInteger) && (
          <>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('Minimum')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'minimum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('MinimumPlaceholder')}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('Maximum')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'maximum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('MaximumPlaceholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('ExclusiveMinimum')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'exclusiveMinimum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('ExclusiveMinimumPlaceholder')}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('ExclusiveMaximum')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'exclusiveMaximum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('ExclusiveMaximumPlaceholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {isString && (
          <>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('RegularMatch')}：
              </Col>
              <Col span={20}>
                <Form.Item noStyle field={'pattern'}>
                  <Input placeholder={t('RegularMatchPlaceholder')} />
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('Format')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'format'}>
                  <Select
                    allowClear
                    options={StringFormat.map((sf) => sf.value)}
                    placeholder={t('FormatPlaceholder')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {isArray && (
          <>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('UniqueItems')}：
              </Col>
              <Col span={20}>
                <Form.Item
                  noStyle
                  field={'uniqueItems'}
                  triggerPropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('MinItems')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'minItems'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    parser={(value) =>
                      value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                    }
                    formatter={(value) =>
                      value ? `${Math.floor(Math.max(Number(value), 0))}` : ''
                    }
                    placeholder={t('MinItemsPlaceholder')}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                {t('MaxItems')}：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'maxItems'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    parser={(value) =>
                      value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                    }
                    formatter={(value) =>
                      value ? `${Math.floor(Math.max(Number(value), 0))}` : ''
                    }
                    placeholder={t('MaxItemsPlaceholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {(isString || isNumber || isInteger) && (
          <Row justify={'start'} align={'center'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              {t('Enums')}：
            </Col>
            <Col span={20}>
              <Form.List field="enums">
                {(fields, { add, remove }) => (
                  <>
                    <Row gutter={10}>
                      {fields.map(({ key, field }, index) => {
                        return (
                          <Col span={12} key={key}>
                            <Row
                              justify={'start'}
                              align={'center'}
                              style={{ marginBottom: 6 }}
                            >
                              <Col flex={'auto'}>
                                {isString && (
                                  <Form.Item
                                    noStyle
                                    field={field}
                                    rules={[{ required: true }]}
                                  >
                                    <Input
                                      placeholder={t('EnumsPlaceholder')}
                                    />
                                  </Form.Item>
                                )}
                                {(isNumber || isInteger) && (
                                  <Form.Item
                                    noStyle
                                    field={field}
                                    rules={[{ required: true }]}
                                  >
                                    <InputNumber
                                      style={{ width: '100%' }}
                                      placeholder={t('EnumsPlaceholder')}
                                    />
                                  </Form.Item>
                                )}
                              </Col>
                              <Col flex={'36px'} style={{ paddingLeft: 7 }}>
                                <Button
                                  icon={<IconDelete />}
                                  shape="circle"
                                  status="danger"
                                  onClick={() => remove(index)}
                                />
                              </Col>
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item noStyle>
                          <Button onClick={() => add()} icon={<IconPlus />}>
                            {t('AddEnums')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        )}
        <div
          style={{
            borderLeft: `3px solid rgb(var(--primary-6))`,
            fontSize: 16,
            fontWeight: 399,
            paddingLeft: 8,
            marginBottom: 13,
          }}
        >
          Json Schema
        </div>
        <MonacoEditor
          height={300}
          language="json"
          value={JSON.stringify(formSchema, null, 2)}
          handleEditorDidMount={handleEditorDidMount}
          onChange={(value) => {
            if (isFormUpdateRef.current || !value) return;
            debounceFn.current(value);
          }}
        />
      </Form>
    </Modal>
  );
};
