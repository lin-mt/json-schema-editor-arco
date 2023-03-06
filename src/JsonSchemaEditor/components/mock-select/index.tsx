import { AutoComplete, Input } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import React, { ReactElement } from 'react';
import { MOCK_SOURCE } from '../../constants';
import Schema from '../../types/Schema';

type MockSelectProp = {
  schema: Schema;
  showEdit: () => void;
  onChange: (value: string) => void;
};

const MockSelect = (props: MockSelectProp): ReactElement => {
  const { schema } = props;
  const children = MOCK_SOURCE.map((item) => ({
    name: item.name,
    value: item.mock,
  }));

  return (
    <div>
      <AutoComplete
        className="certain-category-search"
        placeholder="mock"
        data={children}
        value={
          schema.mock
            ? typeof schema.mock !== 'string'
              ? schema.mock?.mock
              : schema.mock
            : ''
        }
        onChange={props.onChange}
        disabled={schema.type === 'object' || schema.type === 'array'}
        triggerElement={
          <Input
            placeholder="mock"
            addAfter={
              <IconEdit
                className={
                  schema.type === 'object' || schema.type === 'array'
                    ? 'input-icon-editor-disabled'
                    : 'input-icon-editor'
                }
                onClick={(event) => {
                  event.stopPropagation();
                  props.showEdit();
                }}
              />
            }
          />
        }
      />
    </div>
  );
};

export default MockSelect;
