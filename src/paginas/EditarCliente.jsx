
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"
import Alerta from '../components/Alerta';

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //trae el id de forma dinamica por la ruta de app.jsx 
  const {id} = useParams();  

  useEffect(() => {
      
    const obtnerClienteAPI = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            setCliente(resultado);
        } catch (error) {
            console.log(error)
        }

        setCargando(!cargando);

    }

    obtnerClienteAPI();
  },[])  

  return (
    <>
      <h1 className='font-black text-4xl text-gray-700'>Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar datos de un cliente</p>

      {/*cliente existe o no*/}
      {cliente?.nombre ? (
        <Formulario 
          cliente = {cliente}
          cargando = {cargando}
        />
      ): <Alerta><p>Cliente id No existe</p></Alerta> }
      
    </>
  )
}

export default EditarCliente
