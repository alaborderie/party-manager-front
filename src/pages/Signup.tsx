import React from 'react';
import { Formik, Form, Field, FormikProps, FormikActions } from 'formik';
import { FormField, IconButton } from '../components';
import * as Yup from 'yup';

interface SignupInterface {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const schema = Yup.object().shape({
    displayName: Yup.string()
      .required('A display name is required.'),
    email: Yup.string()
      .email('Email is not valid.')
      .required('An email adress is required'),
    password: Yup.string()
      .min(8, 'Password is too short - 8 characters minimum.')
      .required('A password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords don\'t match')
  });

  function handleSubmit(values: SignupInterface, actions: FormikActions<SignupInterface>) {
    console.log(values);
    actions.setSubmitting(false);
    actions.resetForm();
  }

  return (
    <div>
      <h1>Créez votre compte Party Manager !</h1>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, handleSubmit }: FormikProps<SignupInterface>) => (
          <Form>
            <Field label="Pseudo" placeholder="Prénom Nom" type="text" name="displayName" component={FormField} />
            <br />
            <Field label="Email" placeholder="example@gmail.com" type="text" name="email" component={FormField} />
            <br />
            <Field label="Mot de passe" placeholder="Sup3r_MDP_5392!" type="password" name="password" component={FormField} />
            <br />
            <Field label="Confirmation du mot de passe" placeholder="Sup3r_MDP_5392!" type="password" name="confirmPassword" component={FormField} />
            <br />
            <IconButton type="submit" disabled={!isValid}>CONFIRMER</IconButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signup;