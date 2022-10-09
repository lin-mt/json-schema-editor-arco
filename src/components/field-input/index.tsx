import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { Input, Message } from '@arco-design/web-react';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import _ from 'lodash';

interface FieldInputProp {
  value: string;
  addAfter?: ReactNode;
  onChange: (event: string) => boolean;
}

const FieldInput = (props: FieldInputProp): ReactElement => {
  const [fieldValue, setFieldValue] = useState<string>(props.value);
  const [error, setError] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>();
  const ref = useRef<RefInputType>(null);

  useEffect(() => {
    setFieldValue(props.value);
  }, [props.value]);

  const handleChange = (value) => {
    if (value.length === 0) {
      Message.warning('FieldName can not empty.');
      setError(true);
      setFieldValue((prevState) => {
        setPlaceholder(prevState);
        return value;
      });
      return;
    }
    if (placeholder === value) {
      setFieldValue(value);
      return;
    }
    setPlaceholder('');
    setError(false);
    if (props.onChange(value)) {
      setFieldValue(value);
    }
  };

  useEffect(() => {
    ref.current.dom.addEventListener(
      'blur',
      _.debounce(() => {
        if (ref.current.dom.value.length === 0) {
          Message.warning('FieldName can not empty.');
          ref.current.dom.focus();
        }
      }, 50)
    );
  }, []);

  return (
    <Input
      autoFocus
      ref={ref}
      error={error}
      addAfter={props.addAfter}
      placeholder={placeholder}
      value={fieldValue}
      onChange={handleChange}
    />
  );
};

export default FieldInput;
