
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {

    //hook from react-router-dom  
    const navigate = useNavigate();

    //nuevo schema
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string().
            email('Por favor digita un email valido').
            required('El email es obligatorio'),
        telefono: Yup.number()
            .typeError('Número no valido')
            .positive('Número no valido')
            .integer('Número no valido')
            .required("Número de telefono es obligatorio"),
    })

    //enviar data post
    const handleSubmit = async (valores) => {
        try {
            let respuesta;
            if (cliente.id) {
                //Editar cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //Nuevo registro
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json();
            navigate('/clientes')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (

            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm();
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
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
                                    ) : null}
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
                                    ) : null}
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
                                    ) : null}
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
                                    ) : null}
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
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-gray-800 p-3 text-white uppercase font-bold text-center text-lg cursor-pointer'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario