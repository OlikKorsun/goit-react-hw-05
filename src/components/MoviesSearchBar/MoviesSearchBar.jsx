import css from './MoviesSearchBar.module.css';
import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesSearchBar({ onSearch }) {
    const searchId = useId();
    const startValues = {
        search: '',
    }

    const handleSubmit= ((values, actions) => {
        if (values.search.trim() === '') {
            toast.error('Please enter something in search input');
            return;
          }
          onSearch(values.search.trim());
          actions.resetForm();
    })

    return (
    <div>
    <Formik initialValues={startValues} onSubmit={handleSubmit}>
    <Form className={css.form}>
        <label htmlFor={searchId} className={css.label}>
        <Field type='text' autoComplete="off" name='search' autoFocus
                placeholder="Please, search some movie."
                id={searchId} className={css.field}></Field>
        </label>
        <button type="submit" className={css.button}>Search</button>
        <Toaster position="top-center" reverseOrder={false}/>
    </Form>
    </Formik>
    </div>
)}