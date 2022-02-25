
import {Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alerta from './Alerta';

const Formulario = () => {

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, 'El nombre es muy corto')
                .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email:  Yup.string().
            email('Por favor digita un email valido').
            required('El email es obligatorio'),
    telefono: Yup.number()
                .typeError('Número no valido')
                .positive('Número no valido')
                .integer('Número no valido')
                .required("Número de telefono es obligatorio"),
  })

  const handleSubmit = (valores) => {
    console.log(valores)
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Agregar cliente</h1>

        <Formik
            initialValues={{
                nombre: '',
                empresa: '',
                email: '',
                telefono: '',
                notas: ''
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validationSchema = {nuevoClienteSchema}
        >
            {({errors, touched}) => {
                return (
            <Form className='mt-10'>
                <div className='mb-4'>
                    <label 
                        className='text-gray-800'
                        htmlFor='nombre'
                    >Nombre:</label>
                    <Field 
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-200'
                        id='nombre'
                        placeholder='Nombre del cliente'
                        name='nombre'
                    />
                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ): null }
                </div>

                <div className='mb-4'>
                    <label 
                        className='text-gray-800'
                        htmlFor='empresa'
                    >Empresa:</label>
                    <Field 
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-200'
                        id='empresa'
                        placeholder='Empresa del cliente'
                        name='empresa'
                    />
                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ): null }
                </div>

                <div className='mb-4'>
                    <label 
                        className='text-gray-800'
                        htmlFor='email'
                    >Email:</label>
                    <Field 
                        type='email'
                        className='mt-2 block w-full p-3 bg-gray-200'
                        id='email'
                        placeholder='Email del cliente'
                        name='email'
                    />
                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ): null }
                </div>

                <div className='mb-4'>
                    <label 
                        className='text-gray-800'
                        htmlFor='telefono'
                    >Telefono:</label>
                    <Field 
                        type='tel'
                        className='mt-2 block w-full p-3 bg-gray-200'
                        id='telefono'
                        placeholder='Telefono del cliente'
                        name='telefono'
                    />
                    {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ): null }
                </div>

                <div className='mb-4'>
                    <label 
                        className='text-gray-800'
                        htmlFor='notas'
                    >Notas:</label>
                    <Field 
                        as='textarea'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-200 h-40'
                        id='notas'
                        placeholder='Notas del cliente'
                        name='notas'
                    />
                </div>

                <input 
                    type='submit'
                    value='Agregar cliente'
                    className='mt-5 w-full bg-gray-800 p-3 text-white uppercase font-bold text-center text-lg'
                />
            </Form>
            )}}
        </Formik>
    </div>
  )
}

export default Formulario