import React, {useContext} from 'react';
import { Formik, Form, Field, FormikProps, FormikActions } from 'formik';
import {FormField, Button, Toast} from '../components';
import * as Yup from 'yup';
import axios from 'axios';
import {UserContext} from "../contexts/UserContext";
import {Redirect} from "react-router";

interface SignupInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const user = useContext(UserContext);

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
      await axios.post('http://localhost:4000/api/subscribe', {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password
        }
      });
      actions.resetForm();
      Toast.fire({
        title: 'Compte créé !',
        type: 'success'
      });
      if (user && user.signIn) {
        await user.signIn({ email: values.email, password: values.password });
      }
    } catch(err) {
      console.log(err);
      Toast.fire({
        title: err.toString(),
        type: 'error'
      });
    }

  }

  if (user && user.token) {
    return <Redirect to="/account" />
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
            <Field label="Mot de passe" placeholder="Mot de passe" type="password" name="password" component={FormField} />
            <br />
            <Field label="Confirmation du mot de passe" placeholder="Encore une fois" type="password" name="confirmPassword" component={FormField} />
            <br />
            <Button type="submit" disabled={!isValid}>CONFIRMER</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signup;