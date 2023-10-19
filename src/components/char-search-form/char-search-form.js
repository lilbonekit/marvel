import './char-search-form.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/marvel-service'
import Spinner from '../spinner/Spinner'

const SearchCharForm = () => {

    const [result, setResult] = useState(null)

    const {loading, getFoundedCharacter} = useMarvelService();

    const [foundedMessage, setFoundedMessage] = useState(null)
    const [notFoundedMessage, setNotFoundedMessage] = useState(false)

    const onSubmit = async (values, { resetForm }) => {
        try {
          const result = await getFoundedCharacter(values.name);
          if (result) {
            setNotFoundedMessage(null)
            setFoundedMessage(`There is! Visit ${result.name} page?`);
            setResult(result);
          } else {
            setFoundedMessage(null);
            setNotFoundedMessage(true);
            setResult(null);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          resetForm();
        }
      };

    return(
        <div className="search">
            {loading ? 
                <Spinner /> : 
                <Formik
                    initialValues = {{
                        name: ''
                    }}
                    validationSchema = {
                    Yup.object({
                        name: Yup.string()
                                .required('This field is required'),
                    }) 
                    }
                    onSubmit={onSubmit}>

                    {
                        ({touched}) => (
                            <Form className="char-search-form">
                                <h3>Or find a character by name:</h3>
                                <div className="form-content">
                                        <div>
                                            <Field
                                                type="text" 
                                                placeholder="Enter name"
                                                name="name"/>
                                            {
                                                foundedMessage ?
                                                <label htmlFor="name" className="founded">{foundedMessage}</label> :
                                                null
                                            }
                                        </div>
                                        <div className="char__btns">
                                            <button type="submit" href="#" className="button button__main">
                                                <div className="inner">FIND</div>
                                            </button>
                                            {
                                                result ?
                                                <Link to={`/character/${result.id}`} className="button button__secondary">
                                                    <div className="inner">TO PAGE</div>
                                                </Link> :
                                                null
                                            }
                                        </div>
                                </div>
                                <ErrorMessage name="name" className="validation" component={"div"}/>
                                {
                                    (notFoundedMessage && !touched.name) ? 
                                    <div className="validation">The character was not found. Check the name and try again</div> :
                                    null
                                }
                            </Form>
                        )
                    }
                </Formik>
            }
        </div>
    )
}

export default SearchCharForm