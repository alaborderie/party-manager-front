import React from 'react';
import { Formik, Form, Field, FormikProps, FormikActions } from 'formik';
import {FormField, Button, Toast} from '../components';
import * as Yup from 'yup';
import axios from 'axios';

interface SigninInterface {
  email: string;
  password: string;
}

function Signin() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('L\'email est invalide.')
      .required('Une adresse email est requise.'),
    password: Yup.string()
      .min(8, 'Le mot de passe est trop court - 8 caractères minimum.')
      .required('Un mot de passe est requis.'),
  });

  async function handleSubmit(values: SigninInterface, actions: FormikActions<SigninInterface>) {
    actions.setSubmitting(false);
    try {
      const { data } = await axios.post('http://localhost:4000/users', {
        email: values.email,
        password: values.password
      });
      actions.resetForm();
      console.log(data);
      Toast.fire({
        title: 'Connecté avec succès !',
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
      <h1>Connexion</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isValid }: FormikProps<SigninInterface>) => (
          <Form>
            <Field label="Email" placeholder="example@gmail.com" type="text" name="email" component={FormField} />
            <br />
            <Field label="Mot de passe" placeholder="Mot de passe" type="password" name="password" component={FormField} />
            <br />
            <Button type="submit" disabled={!isValid}>CONFIRMER</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signin;