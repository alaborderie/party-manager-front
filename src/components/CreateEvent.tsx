import React, {useContext, useState} from 'react';
import {Formik, Form, FormikProps, Field, FormikActions} from "formik";
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import fr from 'date-fns/locale/fr';

import FormField from "./FormField";
import Button from "./Button";
import Spinner from "./Spinner";
import Toast from "./Toast";
import {UserContext} from "../contexts/UserContext";
import {api} from "../helpers/api";

export interface EventInterface {
  id?: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  place: string;
  background_img?: string;
}

function CreateEvent(props: any) {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const schema = Yup.object().shape({
    name: Yup.string().required('Veuillez spécifier un nom.'),
    description: Yup.string().required('Veuillez décrire le groupe.'),
    start_date: Yup.date()
      .min(new Date(), 'Vous ne pouvez pas créer un événement dans le passé ;)')
      .required('Veuillez spécifier une date de début.'),
    end_date: Yup.date().when('start_date', (st: any, schema: any) => {
      return schema.min(st, 'Un événement ne peux pas être fini avant d\'avoir commencé !');
    }),
    place: Yup.string(),
  });

  async function handleSubmit(values: EventInterface, actions: FormikActions<EventInterface>) {
    actions.setSubmitting(false);
    if (user && user.token) {
      setLoading(true);
      try {
        const {data} = await api(user.token).post('/events', {event: {...values}, tmdb: null});
        console.log(data);
        Toast.fire({
          title: 'Événement créé !',
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
        start_date: new Date(),
        end_date: new Date(),
        place: '',
        creator: user ? user.id : null,
        group: props.groupId
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({isValid, values, setFieldValue}: FormikProps<EventInterface>) => (
        <Form>
          <Field label="Nom" placeholder="Ciné" type="text" name="name" component={FormField} />
          <br />
          <Field label="Lieu" placeholder="Chez moi" type="text" name="place" component={FormField} />
          <br />
          <Field
            label="Description"
            placeholder="Décrivez l'événement..."
            type="text"
            name="description"
            component={FormField}
            as="textarea"
            resize="none"
          />
          <br />
          <Field
            label="Date de début"
            type="date"
            name="start_date"
            locale={fr}
            dateFormat="dd/MM/yyyy hh:mm"
            showTimeInput
            timeInputLabel="Heure : "
            todayButton="Maintenant"
            startDate={new Date()}
            onChange={(time: Date) => setFieldValue('start_date', time)}
            selected={values.start_date}
            component={FormField}
            as={DatePicker}
          />
          <br />
          <Field
            label="Date de fin"
            type="date"
            name="end_date"
            locale={fr}
            dateFormat="dd/MM/yyyy hh:mm"
            showTimeInput
            timeInputLabel="Heure : "
            todayButton="Maintenant"
            startDate={new Date()}
            onChange={(time: Date) => setFieldValue('end_date', time)}
            selected={values.end_date}
            component={FormField}
            as={DatePicker}
          />
          <br />
          <Button type="submit" disabled={!isValid}>CONFIRMER</Button>
          {loading && <Spinner />}
        </Form>
      )}
    </Formik>
  )
}

export default CreateEvent;
