import React, {useContext} from 'react';
import { Formik, Form, Field, FormikProps, FormikActions } from 'formik';
import {FormField, Button, Toast, Container} from '../components';
import * as Yup from 'yup';
import {UserContext, IUserContext} from "../contexts/UserContext";
import {handleAuthError} from "../helpers/errorHandler";
import {Redirect} from "react-router";

interface SigninInterface {
  email: string;
  password: string;
}

function Signin() {
  const user = useContext<IUserContext | null>(UserContext);
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
      if (user && user.signIn) {
        await user.signIn(values);
        actions.resetForm();
        Toast.fire({
          title: 'Connecté avec succès !',
          type: 'success'
        });
      } else {
        Toast.fire({
          title: 'Erreur : UserContext est nul.',
          type: 'error'
        });
      }
    } catch(err) {
      const title = handleAuthError(err);
      Toast.fire({
        title,
        type: 'error'
      });
    }
  }

  if (user && user.token) {
    return <Redirect to="/account" />
  }
  return (
    <Container>
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
    </Container>
  )
}

export default Signin;
