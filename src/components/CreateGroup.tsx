import React, {useContext, useState} from 'react';
import {Formik, Form, FormikProps, Field, FormikActions} from "formik";
import * as Yup from 'yup';

import FormField from "./FormField";
import Button from "./Button";
import Spinner from "./Spinner";
import Toast from "./Toast";
import {UserContext} from "../contexts/UserContext";
import {api} from "../helpers/api";
import {EventInterface} from "./CreateEvent";

export interface GroupInterface {
  id?: number;
  name: string;
  description: string;
  background_img?: string;
  users?: any[];
  events?: EventInterface[];
}

function CreateGroup(props: any) {
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<String | ArrayBuffer | null>();
  const user = useContext(UserContext);
  const schema = Yup.object().shape({
    name: Yup.string().required('Veuillez spécifier un nom.'),
    description: Yup.string().required('Veuillez décrire le groupe.')
  });

  function handleUploadImage(e: any) {
    const reader = new FileReader();
    reader.onloadend = () => setUploadedFile(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  }

  async function handleSubmit(values: GroupInterface, actions: FormikActions<GroupInterface>) {
    actions.setSubmitting(false);
    if (user && user.token) {
      setLoading(true);
      try {
        const {data} = await api(user.token).post('/groups', {group: {
            ...values,
            background_img: uploadedFile,
        }});

        console.log(data);
        Toast.fire({
          title: 'Groupe créé !',
          type: 'success'
        });
        props.callback()
      } catch(err) {
        console.error(err);
        Toast.fire({
          title: err.toString(),
          type: 'error'
        });
      }
      setLoading(false);
    } else {
      Toast.fire({
        title: 'Vous devez être connecté pour effectuer cette action.',
        type: 'error'
      });
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({isValid, setFieldValue}: FormikProps<GroupInterface>) => (
        <Form>
          <Field label="Nom" placeholder="Super groupe" type="text" name="name" component={FormField} />
          <br />
          <Field
            label="Description"
            placeholder="Décrivez le groupe..."
            type="text"
            name="description"
            component={FormField}
            as="textarea"
            resize="none"
          />
          <br />
          <Field
            label="Image"
            type="file"
            name="background_img"
            component={FormField}
            onChange={handleUploadImage}
          />
          <br />
          <Button type="submit" disabled={!isValid}>CONFIRMER</Button>
          {loading && <Spinner />}
        </Form>
      )}
    </Formik>
  )
}

export default CreateGroup;
