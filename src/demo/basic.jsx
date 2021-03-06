/* eslint-disable @typescript-eslint/explicit-module-boundary-types,no-console */
// noinspection NpmUsedModulesInstalled

import React, { useState } from 'react';
import JsonSchemaEditor from '@quiet-front-end/json-schema-editor-arco';

export default () => {
  const [val, setVal] = useState();

  console.log(val, 'val');

  return (
    <div style={{ width: '90%' }}>
      <JsonSchemaEditor
        mock
        onChange={(value) => {
          setVal(value);
        }}
      />
    </div>
  );
};
