import React from 'react';
import { Formik, Form, Field, FormikProps, FormikActions } from 'formik';
import {FormField, Button, Toast} from '../components';
import * as Yup from 'yup';
import axios from 'axios';

interface SignupInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('Un prénom est requis.'),
    lastName: Yup.string()
        .required('Un nom de famille est requis.'),
    email: Yup.string()
      .email('L\'email est invalide.')
      .required('Une adresse email est requise.'),
    password: Yup.string()
      .min(8, 'Le mot de passe est trop court - 8 caractères minimum.')
      .required('Un mot de passe est requis.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Les mots de passes ne correspondent pas.')
  });

  async function handleSubmit(values: SignupInterface, actions: FormikActions<SignupInterface>) {
    actions.setSubmitting(false);
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error('Les mots de passes ne correspondent pas.');
      }
      const { data } = await axios.post('http://localhost:4000/users', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password
      });
      actions.resetForm();
      console.log(data);
      Toast.fire({
        title: 'Compte créé !',
        type: 'success'
      });
    } catch(err) {
      console.log(err);
      Toast.fire({
        title: err.toString(),
        type: 'error'
      });
    }

  }

  return (
    <div>
      <h1>Créez votre compte Party Manager !</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isValid }: FormikProps<SignupInterface>) => (
          <Form>
            <Field label="Prénom" placeholder="Prénom" type="text" name="firstName" component={FormField} />
            <br />
            <Field label="Nom de famille" placeholder="Nom de famille" type="text" name="lastName" component={FormField} />
            <br />
            <Field label="Email" placeholder="example@gmail.com" type="text" name="email" component={FormField} />
            <br />
            <Field label="Mot de passe" placeholder="Sup3r_MDP_5392!" type="password" name="password" component={FormField} />
            <br />
            <Field label="Confirmation du mot de passe" placeholder="Sup3r_MDP_5392!" type="password" name="confirmPassword" component={FormField} />
            <br />
            <Button type="submit" disabled={!isValid}>CONFIRMER</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signup;