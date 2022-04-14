import React, { CSSProperties, ReactElement, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { Checkbox, Grid, Input, Select, Tooltip } from '@arco-design/web-react';
import {
  IconCaretDown,
  IconCaretRight,
  IconEdit,
  IconPlus,
  IconSettings,
} from '@arco-design/web-react/icon';
import { observer } from 'mobx-react';
import { SchemaMobxContext } from '../../..';
import { EditorContext } from '../../editor';
import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from '../../../constants';
import MockSelect from '../../mock-select';
import { mapping } from '../index';
import Schema from '../../../types/Schema';

const Row = Grid.Row;
const Col = Grid.Col;

interface SchemaArrayProp {
  data: Schema;
  prefix: string[];
  showEdit: (
    editorName: string[],
    prefix: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void;
  showAdv: (prefix: string[], property: Schema) => void;
}

const SchemaArray = observer((props: SchemaArrayProp): ReactElement => {
  const { data, prefix, showAdv, showEdit } = props;

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
    return [].concat(prefix, 'items');
  };

  // 修改数据类型
  const handleChangeType = (value: string) => {
    const keys = getPrefix().concat('type');
    mobxContext.changeType({ keys, value });
  };

  // 修改备注信息
  const handleChangeDesc = (value) => {
    const key = getPrefix().concat(`description`);
    mobxContext.changeValue({ keys: key, value });
  };

  // 修改mock信息
  const handleChangeMock = (e: string) => {
    const key = getPrefix().concat('mock');
    const value = e ? { mock: e } : '';
    mobxContext.changeValue({ keys: key, value });
  };

  const handleChangeTitle = (value) => {
    const key = getPrefix().concat('title');
    mobxContext.changeValue({ keys: key, value });
  };

  // 增加子节点
  const handleAddChildField = () => {
    const keyArr = getPrefix().concat('properties');
    mobxContext.addChildField({ keys: keyArr });
    mobxContext.setOpenValue({ key: keyArr, value: true });
  };

  const handleClickIcon = () => {
    // 数据存储在 properties.name.properties下
    const keyArr = getPrefix().concat('properties');
    mobxContext.setOpenValue({ key: keyArr });
  };

  const handleShowEdit = (name: string, type?: string) => {
    showEdit(getPrefix(), name, data.items[name], type);
  };

  const handleShowAdv = () => {
    showAdv(getPrefix(), data.items);
  };

  const items = data.items;
  const prefixArray = [].concat(prefix, 'items');

  const prefixArrayStr = [].concat(prefixArray, 'properties').join(JSONPATH_JOIN_CHAR);

  return data.items !== undefined ? (
    <div>
      <Row gutter={10} justify="space-around" align="center">
        <Col flex="auto">
          <Row gutter={10} justify="space-around" align="center">
            <Col flex={8}>
              <Row justify="space-around" align="center" style={tagPaddingLeftStyle}>
                <Col flex="20px">
                  {items.type === 'object' ? (
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
                  <Input
                    addAfter={<Checkbox style={{ paddingLeft: 0 }} disabled />}
                    disabled
                    value="Items"
                  />
                </Col>
              </Row>
            </Col>
            <Col flex={3}>
              <Select onChange={handleChangeType} value={items.type}>
                {SCHEMA_TYPE.map((item, index) => {
                  return (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            {context.mock && (
              <Col flex={3}>
                <MockSelect
                  schema={items}
                  showEdit={() => handleShowEdit('mock', items.type)}
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
                value={items.title}
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
                value={items.description}
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
              {items.type === 'object' ? (
                <span className="plus" onClick={handleAddChildField}>
                  <Tooltip position="top" content="add_child_node">
                    <IconPlus />
                  </Tooltip>
                </span>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ paddingTop: 8 }}>{mapping(prefixArray, items, showEdit, showAdv)}</div>
    </div>
  ) : (
    <></>
  );
});

export default SchemaArray;
