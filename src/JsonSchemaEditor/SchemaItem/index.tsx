import {
  Button,
  Checkbox,
  Dropdown,
  Grid,
  Input,
  Menu,
  Message,
  Select,
  Tooltip,
} from '@arco-design/web-react';
import {
  IconCaretDown,
  IconCaretRight,
  IconDelete,
  IconPlus,
  IconSettings,
  IconUpload,
} from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import ImportModal from '../SchemaItem/ImportModal';
import { JSONSchema7 } from '../types';
import {
  SchemaTypeOptions,
  getDefaultSchema,
  getPropertyIndex,
} from '../utils';
import AdvancedSettingModal from './AdvancedSettingModal';

const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;

type SchemaItemProps = {
  propertyName?: string;
  nodeDepth?: number;
  parentSchemaDepth?: number;
  namePath?: number[];
  isArrayItems?: boolean;
  isRequire?: boolean;
  schema: JSONSchema7;
  changeSchema?: (
    namePath: number[],
    value: any,
    propertyName?: string,
  ) => void;
  renameProperty?: (namePath: number[], name: string) => void;
  removeProperty?: (namePath: number[]) => void;
  addProperty?: (path: number[], isChild: boolean) => void;
  updateRequiredProperty?: (
    path: number[],
    requiredProperty: string,
    removed: boolean,
  ) => void;
  handleAdvancedSettingClick?: (
    namePath: number[],
    schema: JSONSchema7,
    propertyName?: string,
  ) => boolean;
};

function SchemaItem(props: SchemaItemProps) {
  const {
    changeSchema,
    renameProperty,
    isArrayItems,
    updateRequiredProperty,
    parentSchemaDepth = 0,
    removeProperty,
    addProperty,
    isRequire,
    handleAdvancedSettingClick,
  } = props;

  const { t } = useI18n();
  const [schema, setSchema] = useState(props.schema);
  const [propertyName, setPropertyName] = useState(props.propertyName);
  const [schemaTitle, setSchemaTitle] = useState(schema.title);
  const [schemaDescription, setSchemaDescription] = useState(
    schema.description,
  );
  const [nodeDepth, setNodeDepth] = useState(
    props.nodeDepth ? props.nodeDepth : 0,
  );
  const [namePath, setNamePath] = useState<number[]>(
    props.namePath ? props.namePath : [],
  );
  const [expand, setExpand] = useState(true);
  const [advancedModal, setAdvancedModal] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const isRoot = typeof propertyName === 'undefined';

  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  useEffect(() => {
    setNamePath(props.namePath ? props.namePath : []);
  }, [props.namePath]);

  useEffect(() => {
    setNodeDepth(props.nodeDepth ? props.nodeDepth : 0);
  }, [props.nodeDepth]);

  const schemaItems: any = schema.items;

  const addChildNode: boolean =
    !!(
      schema.type === 'object' ||
      (isArrayItems && schemaItems?.type === 'object')
    ) &&
    !isArrayItems &&
    !isRoot;

  if (!schema.type) {
    return <></>;
  }

  return (
    <>
      <Row align={'center'} style={{ paddingBottom: 10 }}>
        <Col
          flex={`${24 + nodeDepth * 15}px`}
          style={{ marginLeft: nodeDepth * 5 }}
        >
          <Row justify={'end'}>
            {schema.type === 'object' && (
              <Button
                type={'text'}
                size={'mini'}
                style={{ color: 'rgb(var(--color-text-2))' }}
                icon={expand ? <IconCaretDown /> : <IconCaretRight />}
                onClick={() => setExpand(!expand)}
              />
            )}
          </Row>
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            status={!isRoot && propertyName.length === 0 ? 'error' : undefined}
            disabled={isRoot || isArrayItems}
            value={isRoot ? 'root' : propertyName}
            placeholder={t('PropertyPlaceholder')}
            onBlur={() => {
              if (propertyName?.length === 0) {
                Message.error(t('PropertyNameEmptyWarnMsg'));
                return;
              }
              if (
                renameProperty &&
                propertyName &&
                propertyName?.length !== 0
              ) {
                renameProperty(namePath, propertyName);
              }
            }}
            onChange={(name) => setPropertyName(name)}
          />
        </Col>
        <Col flex={'16px'} style={{ marginLeft: 5 }}>
          <Tooltip content={t('IsRequired')}>
            <Checkbox
              disabled={isArrayItems || isRoot}
              checked={isRequire}
              style={{ padding: 0 }}
              onChange={(checked) => {
                if (updateRequiredProperty && propertyName) {
                  updateRequiredProperty(
                    namePath.slice(0, parentSchemaDepth),
                    propertyName,
                    !checked,
                  );
                }
              }}
            />
          </Tooltip>
        </Col>
        <Col flex={'98px'} style={{ marginLeft: 5 }}>
          <Select
            style={{ width: '98px' }}
            value={schema.type}
            onChange={(type) => {
              if (changeSchema) {
                changeSchema(namePath, getDefaultSchema(type), 'type');
              }
            }}
          >
            {SchemaTypeOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            placeholder={t('TitlePlaceholder')}
            value={schemaTitle}
            onBlur={() => {
              if (changeSchema) {
                changeSchema(
                  namePath.concat(getPropertyIndex(schema, 'title')),
                  schemaTitle,
                  'title',
                );
              }
            }}
            onChange={(title) => setSchemaTitle(title)}
          />
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            placeholder={t('DescriptionPlaceholder')}
            value={schemaDescription}
            onBlur={() => {
              if (changeSchema) {
                changeSchema(
                  namePath.concat(getPropertyIndex(schema, 'description')),
                  schemaDescription,
                  'description',
                );
              }
            }}
            onChange={(description) => setSchemaDescription(description)}
          />
        </Col>
        <Col flex={'72px'} style={{ marginLeft: 5 }}>
          <Row style={{ width: '72px' }}>
            <Tooltip content={t('AdvancedSettings')}>
              <Button
                type={'text'}
                size={'mini'}
                icon={<IconSettings />}
                style={{ color: 'rgb(var(--green-6))' }}
                onClick={() => {
                  if (
                    handleAdvancedSettingClick &&
                    !handleAdvancedSettingClick(
                      namePath,
                      schema,
                      isRoot || schema.type === 'object'
                        ? undefined
                        : propertyName,
                    )
                  ) {
                    return;
                  }
                  setAdvancedModal(true);
                }}
              />
            </Tooltip>
            {(!isRoot && !isArrayItems) || schema.type === 'object' ? (
              <Dropdown
                position="bottom"
                droplist={
                  addChildNode && (
                    <Menu>
                      <Menu.Item
                        key={'addNode'}
                        onClick={() => {
                          if (addProperty) {
                            addProperty(namePath, false);
                          }
                        }}
                      >
                        {t('SiblingNodes')}
                      </Menu.Item>
                      <Menu.Item
                        key={'addChildNode'}
                        onClick={() => {
                          if (addProperty) {
                            addProperty(namePath, true);
                          }
                        }}
                      >
                        {t('ChildNodes')}
                      </Menu.Item>
                    </Menu>
                  )
                }
              >
                <Tooltip content={addChildNode ? undefined : t('AddNode')}>
                  <Button
                    type={'text'}
                    size={'mini'}
                    icon={<IconPlus />}
                    style={{ color: 'rgb(var(--primary-6))' }}
                    onClick={() => {
                      if (addChildNode) {
                        return;
                      }
                      if (addProperty) {
                        addProperty(namePath, !(!isArrayItems && !isRoot));
                      }
                    }}
                  />
                </Tooltip>
              </Dropdown>
            ) : (
              <div />
            )}
            <Col flex={'24px'}>
              {isRoot ? (
                <Tooltip content={t('ImportJson')}>
                  <Button
                    type={'text'}
                    size={'mini'}
                    icon={<IconUpload />}
                    style={{ color: 'rgb(var(--purple-6))' }}
                    onClick={() => setImportModalVisible(true)}
                  />
                </Tooltip>
              ) : !isArrayItems ? (
                <Tooltip content={t('DeleteNode')}>
                  <Button
                    status={'danger'}
                    type={'text'}
                    size={'mini'}
                    icon={<IconDelete />}
                    onClick={() => {
                      if (removeProperty) {
                        removeProperty(namePath);
                      }
                    }}
                  />
                </Tooltip>
              ) : (
                <div />
              )}
            </Col>
            {isRoot && schema.type !== 'object' && (
              <Col flex={'24px'}>{!isArrayItems && <div />}</Col>
            )}
          </Row>
        </Col>
      </Row>
      {schema.type === 'object' &&
        expand &&
        schema.properties &&
        Object.keys(schema.properties).map((name) => {
          if (schema.properties) {
            return (
              <div key={String(name)}>
                <SchemaItem
                  {...props}
                  isRequire={schema.required?.includes(name)}
                  isArrayItems={false}
                  nodeDepth={nodeDepth + 1}
                  parentSchemaDepth={!isRoot ? parentSchemaDepth + 2 : 0}
                  namePath={namePath.concat(
                    getPropertyIndex(schema, 'properties'),
                    getPropertyIndex(schema.properties, name),
                  )}
                  propertyName={name}
                  schema={schema.properties[name] as JSONSchema7}
                  handleAdvancedSettingClick={handleAdvancedSettingClick}
                />
              </div>
            );
          }
          return <></>;
        })}
      {schema.type === 'array' && expand && (
        <SchemaItem
          {...props}
          isRequire={false}
          isArrayItems={true}
          nodeDepth={nodeDepth + 1}
          parentSchemaDepth={!isRoot ? parentSchemaDepth + 1 : 0}
          propertyName={'items'}
          namePath={namePath.concat(getPropertyIndex(schema, 'items'))}
          schema={schema.items as JSONSchema7}
          handleAdvancedSettingClick={handleAdvancedSettingClick}
        />
      )}
      <AdvancedSettingModal
        schema={schema}
        visible={advancedModal}
        onOk={async (newSchema) => {
          if (!changeSchema) {
            return;
          }
          if (isRoot || schema.type === 'object') {
            changeSchema(namePath, { ...newSchema });
            setAdvancedModal(false);
            return;
          }
          changeSchema(namePath, { ...newSchema }, propertyName);
          setAdvancedModal(false);
        }}
        onCancel={() => setAdvancedModal(false)}
      />

      <ImportModal
        open={importModalVisible}
        onOk={(newSchema) => {
          if (changeSchema) {
            changeSchema([], newSchema);
            setImportModalVisible(false);
          }
        }}
        onCancel={() => setImportModalVisible(false)}
      />
    </>
  );
}

export default SchemaItem;
