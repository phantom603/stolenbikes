import React from 'react';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Grid } from '@material-ui/core';

import classes from './PostNewTheft.module.scss';

import UploadZone from '../../components/UploadZone';
import FormikDateTimePicker from '../../components/FormikDateTimePicker';
import { postIncident } from '../../core/http/incident/incident.service';

import { NewIncidentType } from '../../core/interfaces/Incidents.type';

const errorMessage = {
  required: 'Field cannot be blank',
  stringTooLong: 'String is too long!',
  stringTooShort: 'String is too short!'
}

const PostNewTheft: React.FC = () => {
  const initialValues: NewIncidentType = {
    title: '',
    description: '',
    theftDate: null,
    reportedDate: null,
    location: '',
    files: []
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, errorMessage.stringTooShort)
      .max(100, errorMessage.stringTooLong)
      .required(errorMessage.required),
    description: Yup.string()
      .min(10, errorMessage.stringTooShort)
      .max(250, errorMessage.stringTooLong)
      .required(errorMessage.required),
    theftDate: Yup.date().nullable()
      .required(errorMessage.required),
    reportedDate: Yup.date().nullable()
      .required(errorMessage.required),
    location: Yup.string()
      .max(100, errorMessage.stringTooLong)
      .required(errorMessage.required),
    files: Yup.array()
  })

  return (
    <div>
      <h1>Post new theft</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(false);
          postIncident(values)
        }}
      >
        {({handleSubmit, setFieldValue, isSubmitting, values, errors, touched}) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="title"
                      label="Title"
                      maxLength="150"
                      variant="outlined"
                      className={classes.textField}
                      inputProps={{
                        maxLength: 100
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={5}
                      className={classes.textField}
                      inputProps={{
                        maxLength: 250
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikDateTimePicker}
                      name="theftDate"
                      label="Date of the theft"
                      variant="outlined"
                      className={classes.textField}
                      onChange={value => {
                        setFieldValue('theftDate', value)
                      }}
                      value={values.theftDate}
                      error={!!errors.theftDate && touched.theftDate}
                      helperText={touched.theftDate ? errors.theftDate : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikDateTimePicker}
                      name="reportedDate"
                      label="Reported date"
                      variant="outlined"
                      className={classes.textField}
                      onChange={value => {
                        setFieldValue('reportedDate', value)
                      }}
                      value={values.reportedDate}
                      error={!!errors.reportedDate && touched.reportedDate}
                      helperText={touched.reportedDate ? errors.reportedDate : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="location"
                      label="Location"
                      variant="outlined"
                      className={classes.textField}
                      inputProps={{
                        maxLength: 150
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UploadZone onUploadCb={data => {
                      setFieldValue('files', data.map((file: File) => ({
                        fileName: file.name,
                        type: file.type,
                        size: file.size
                      })))
                    }}/>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                      className={classes.btn}
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default PostNewTheft;