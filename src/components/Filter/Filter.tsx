import React from 'react';
import { Button, Grid } from '@material-ui/core';
import classes from './Filter.module.scss';

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui';
import { FilterValuesType } from '../../core/interfaces/Filter.type';

type PropsType = {
  onSubmitCb: (params: FilterValuesType) => void;
};

const Filter: React.FC<PropsType> = (_props) => {
  const initialValues: FilterValuesType = {
    search: '',
    datetimeFrom: '',
    datetimeTo: ''
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(false);
          _props.onSubmitCb(values as FilterValuesType);
        }}
      >
        {({submitForm, isSubmitting}) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Field
                  component={TextField}
                  name="search"
                  label="Search stolen bike"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Field
                  component={TextField}
                  name="datetimeFrom"
                  label="From"
                  type="datetime-local"
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Field
                  component={TextField}
                  name="datetimeTo"
                  label="To"
                  type="datetime-local"
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className={classes.btn}
                >
                  Find cases
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Filter;