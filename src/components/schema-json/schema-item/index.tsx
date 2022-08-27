import React, { CSSProperties, ReactElement, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { Checkbox, Grid, Input, Message, Select, Tooltip } from '@arco-design/web-react';
import {
  IconCaretDown,
  IconCaretRight,
  IconClose,
  IconEdit,
  IconPlus,
  IconSettings,
} from '@arco-design/web-react/icon';
import { observer } from 'mobx-react';
import { SchemaMobxContext } from '../../..';
import { EditorContext } from '../../editor';
import FieldInput from '../../field-input';
import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from '../../../constants';
import MockSelect from '../../mock-select';
import DropPlus from '../drop-plus';
import { mapping } from '../index';
import Schema from '../../../types/Schema';

const Row = Grid.Row;
const Col = Grid.Col;

const Option = Select.Option;

interface SchemaItemProp {
  data: Schema;
  name: string;
  prefix: string[];
  showEdit: (
    editorName: string[],
    prefix: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void;
  showAdv: (prefix: string[], property: Schema) => void;
}

const SchemaItem = observer((props: SchemaItemProp): ReactElement => {
  const { data, name, prefix, showAdv, showEdit } = props;

  // noinspection DuplicatedCode
  const [tagPaddingLeftStyle, setTagPaddingLeftStyle] = useState<CSSProperties>({});

  const context = useContext(EditorContext);
  const mobxContext = useContext(SchemaMobxContext);

  useEffect(() => {
    const length = props.prefix.filter((name) => name !== 'properties').length;
    setTagPaddingLeftStyle({
      paddingLeft: `${20 * (length + 1)}px`,
    });
  }, [props.prefix]);

  const getPrefix = () => {
    return [].concat(prefix, name);
  };

  // 修改节点字段名
  const handleChangeName = (value) => {
    if (data.properties[value] && typeof data.properties[value] === 'object') {
      Message.error(`The field "${value}" already exists.`);
      return false;
    }
    mobxContext.changeName({ keys: prefix, name, value });
    return true;
  };

  // 修改备注信息
  const handleChangeDesc = (value) => {
    const key = getPrefix().concat('description');
    mobxContext.changeValue({ keys: key, value });
  };

  // 修改mock 信息
  // noinspection DuplicatedCode
  const handleChangeMock = (mockValue: string) => {
    const key = getPrefix().concat('mock');
    const value = mockValue ? { mock: mockValue } : '';
    mobxContext.changeValue({ keys: key, value });
  };

  const handleChangeTitle = (value) => {
    const key = getPrefix().concat('title');
    mobxContext.changeValue({ keys: key, value });
  };

  // 修改数据类型
  const handleChangeType = (value) => {
    const keys = getPrefix().concat('type');
    mobxContext.changeType({ keys, value });
  };

  const handleDeleteItem = () => {
    mobxContext.deleteField({ keys: getPrefix() });
    mobxContext.enableRequire({ keys: prefix, name, required: false });
  };

  /*
  展示备注编辑弹窗
  editorName: 弹窗名称 ['description', 'mock']
  type: 如果当前字段是object || array showEdit 不可用
  */
  const handleShowEdit = (editorName: string, type?: string) => {
    showEdit(getPrefix(), editorName, data.properties[name][editorName], type);
  };

  const handleShowAdv = () => {
    showAdv(getPrefix(), data.properties[name]);
  };

  //  增加子节点
  const handleAddField = (type: string) => {
    if (type === 'object') {
      return;
    }
    mobxContext.addField({ keys: prefix, name });
  };

  // 控制三角形按钮
  const handleClickIcon = () => {
    // 数据存储在 properties.xxx.properties 下
    const keyArr = getPrefix().concat('properties');
    mobxContext.setOpenValue({ key: keyArr });
  };

  // 修改是否必须
  const handleEnableRequire = (checked) => {
    mobxContext.enableRequire({ keys: prefix, name, required: checked });
  };

  const value = data.properties[name];

  const prefixArray = [].concat(prefix, name);

  const prefixArrayStr = [].concat(prefixArray, 'properties').join(JSONPATH_JOIN_CHAR);

  return _.get(mobxContext.open, prefix.join(JSONPATH_JOIN_CHAR)) ? (
    <div>
      <Row justify="space-around" gutter={10} align="center">
        <Col flex="auto">
          <Row justify="space-around" gutter={10} align="center">
            <Col flex={8}>
              <Row justify="space-around" align="center" style={tagPaddingLeftStyle}>
                <Col flex="20px">
                  {value.type === 'object' ? (
                    <span className="show-hide-children" onClick={handleClickIcon}>
                      {_.get(mobxContext.open, [prefixArrayStr]) ? (
                        <IconCaretDown />
                      ) : (
                        <IconCaretRight />
                      )}
                    </span>
                  ) : null}
                </Col>
                <Col flex="auto">
                  <FieldInput
                    addAfter={
                      <Tooltip position="top" content="required">
                        <Checkbox
                          style={{ paddingLeft: 0 }}
                          onChange={handleEnableRequire}
                          checked={
                            data.required === undefined ? false : data.required.indexOf(name) !== -1
                          }
                        />
                      </Tooltip>
                    }
                    onChange={handleChangeName}
                    value={name}
                  />
                </Col>
              </Row>
            </Col>

            <Col flex={3}>
              <Select onChange={handleChangeType} value={value.type}>
                {SCHEMA_TYPE.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>

            {context.mock && (
              <Col flex={3}>
                <MockSelect
                  schema={value}
                  showEdit={() => handleShowEdit('mock', value.type)}
                  onChange={handleChangeMock}
                />
              </Col>
            )}

            <Col flex={context.mock ? 4 : 5}>
              <Input
                addAfter={
                  <IconEdit className="input_icon_editor" onClick={() => handleShowEdit('title')} />
                }
                placeholder="title"
                value={value.title}
                onChange={handleChangeTitle}
              />
            </Col>

            <Col flex={context.mock ? 4 : 5}>
              <Input
                addAfter={
                  <IconEdit
                    className="input_icon_editor"
                    onClick={() => handleShowEdit('description')}
                  />
                }
                placeholder="description"
                value={value.description}
                onChange={handleChangeDesc}
              />
            </Col>
          </Row>
        </Col>

        <Col flex="66px">
          <Row gutter={8}>
            <Col span={8}>
              <span className="adv-set" onClick={handleShowAdv}>
                <Tooltip position="top" content="adv_setting">
                  <IconSettings />
                </Tooltip>
              </span>
            </Col>
            <Col span={8}>
              <span className="close" onClick={handleDeleteItem}>
                <IconClose />
              </span>
            </Col>
            <Col span={8}>
              <span className="plus" onClick={() => handleAddField(value.type)}>
                {value.type === 'object' ? (
                  <DropPlus prefix={prefix} name={name} />
                ) : (
                  <Tooltip position="top" content="add_sibling_node">
                    <IconPlus />
                  </Tooltip>
                )}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ paddingTop: 8 }}>{mapping(prefixArray, value, showEdit, showAdv)}</div>
    </div>
  ) : null;
});

export default SchemaItem;
