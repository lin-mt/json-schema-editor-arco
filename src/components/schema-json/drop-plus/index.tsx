import { Dropdown, Menu, Tooltip } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import React, { ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';
import { SchemaMobxContext } from '../../..';

interface DropPlusProp {
  prefix: string[];
  name: string;
}

const DropPlus = observer((props: DropPlusProp): ReactElement => {
  const { prefix, name } = props;

  const context = useContext(SchemaMobxContext);

  const menu = (
    <Menu>
      <Menu.Item key="sibling_node">
        <span onClick={() => context.addField({ keys: prefix, name })}>sibling_node</span>
      </Menu.Item>
      <Menu.Item key="child_node">
        <span
          onClick={() => {
            context.setOpenValue({
              key: prefix.concat(name, 'properties'),
              value: true,
            });
            context.addChildField({ keys: prefix.concat(name, 'properties') });
          }}
        >
          child_node
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Tooltip position="top" content="add_node">
      <Dropdown droplist={menu}>
        <IconPlus />
      </Dropdown>
    </Tooltip>
  );
});

export default DropPlus;
