import {
  Button,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Modal,
  Select,
  Switch,
} from '@arco-design/web-react';
import { IconDelete, IconPlus } from '@arco-design/web-react/icon';
import MonacoEditor from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/MonacoEditor';
import {
  SchemaTypes,
  StringFormat,
} from '@quiet-front-end/json-schema-editor-arco/JsonSchemaEditor/utils';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    setFormSchema(schema);
  }, [schema]);

  useEffect(() => {
    setAdvancedModal(visible);
  }, [visible]);

  const handleDebounce = useCallback(
    _.debounce(
      (callback) => {
        if (typeof callback === 'function') {
          callback();
        } else {
          console.log('Provided argument is not a function');
        }
      },
      300,
      { maxWait: 1000 },
    ),
    [],
  );

  useEffect(() => {
    return () => {
      handleDebounce.cancel();
    };
  }, [handleDebounce]);

  useEffect(() => {
    if (!formSchema) {
      return;
    }
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
    if (onCancel) {
      onCancel();
    }
    setAdvancedModal(false);
  }

  return (
    <Modal
      title="高级设置"
      style={{ width: 900 }}
      visible={advancedModal}
      okText={'保存'}
      cancelText={'取消'}
      onOk={async () => {
        try {
          await advancedForm.validate();
          if (onOk) {
            onOk({ ...formSchema, ...advancedForm.getFieldsValue() });
          }
        } catch (e) {
          console.log(advancedForm.getFieldsError());
          Message.error('字段校验失败，请检查字段！');
        }
      }}
      onCancel={onClose}
    >
      <Form
        form={advancedForm}
        onValuesChange={(_, allValues) => {
          if (editorRef.current) {
            editorRef.current.setValue(
              JSON.stringify({ ...formSchema, ...allValues }, null, 2),
            );
          }
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
            基本设置
          </div>
        )}
        {(isString || isNumber || isInteger || isBoolean) && (
          <Row justify={'start'} align={'center'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              默认值：
            </Col>
            <Col span={8}>
              {isString && (
                <Form.Item noStyle field={'default'}>
                  <Input
                    style={{ width: '100%' }}
                    placeholder={'请输入默认值'}
                  />
                </Form.Item>
              )}
              {(isNumber || isInteger) && (
                <Form.Item noStyle field={'default'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={'请输入默认值'}
                  />
                </Form.Item>
              )}
              {isBoolean && (
                <Form.Item noStyle field={'default'}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder={'请选择默认值'}
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
              最小长度：
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
                  placeholder={'请输入最小长度'}
                />
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              最大长度：
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
                  placeholder={'请输入最大长度'}
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
                最小值：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'minimum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={'请输入最小值'}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                最大值：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'maximum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={'请输入最大值'}
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
                排他最小值：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'exclusiveMinimum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={'请输入排他最小值'}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                排他最大值：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'exclusiveMaximum'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder={'请输入排他最大值'}
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
                正则匹配：
              </Col>
              <Col span={20}>
                <Form.Item noStyle field={'pattern'}>
                  <Input placeholder={'请输入正则匹配公式'} />
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify={'start'}
              align={'center'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                格式：
              </Col>
              <Col span={8}>
                <Form.Item noStyle field={'format'}>
                  <Select
                    allowClear
                    options={StringFormat.map((sf) => sf.value)}
                    placeholder={'请选择字符串格式'}
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
                元素唯一：
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
                最少元素个数：
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
                    placeholder={'请输入最少元素个数'}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                最多元素个数：
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
                    placeholder={'请输入最多元素个数'}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {(isString || isNumber || isInteger) && (
          <Row justify={'start'} align={'center'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              枚举：
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
                                    <Input placeholder="请输入枚举值" />
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
                                      placeholder="请输入枚举值"
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
                            添加枚举值
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
            handleDebounce(() => {
              if (value) {
                try {
                  const editorSchema = JSON.parse(value);
                  setFormSchema(editorSchema);
                } catch (e) {}
              }
            });
          }}
        />
      </Form>
    </Modal>
  );
};
