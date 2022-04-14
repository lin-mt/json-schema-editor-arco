import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Input } from '@arco-design/web-react';

interface FieldInputProp {
  value: string;
  addAfter?: ReactNode;
  onChange: (event: string) => boolean;
}

const FieldInput = (props: FieldInputProp): ReactElement => {
  const [fieldValue, setFieldValue] = useState<string>(props.value);

  useEffect(() => {
    setFieldValue(props.value);
  }, [props.value]);

  const handleChange = (value) => {
    if (props.onChange(value)) {
      setFieldValue(value);
    }
  };

  return <Input addAfter={props.addAfter} value={fieldValue} onChange={handleChange} />;
};

export default FieldInput;
