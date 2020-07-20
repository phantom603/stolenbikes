import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

type PropsType = {
  name: string;
  label: string;
  value: any;
  variant?: any;
  className?: string;
  onChange: (value: any) => void;
  errorText?: string;
};

const FormikDateTimePicker: React.FC<PropsType> = (_props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        {..._props}
        onChange={value => {
          _props.onChange(value);
        }}
        inputVariant={_props.variant}
      />
    </MuiPickersUtilsProvider>
  );
}

export default FormikDateTimePicker;