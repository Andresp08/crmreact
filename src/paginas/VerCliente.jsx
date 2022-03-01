
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner';

const VerCliente = () => {

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
    
    /* Si el id a consultar no existe, arrojar msg*/
    cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> 
        :(
            <div>
                <>
                    <h1 className='font-bold text-4xl text-gray-700'>Ver Cliente: {cliente.nombre}</h1>
                    <p className="mt-3">Información del cliente</p>
        
                    <div className="bg-gray-50 rounded-xl shadow-lg px-3 py-1">
                        <p className="text-4xl text-gray-600 mt-10">
                        <span className="text-gray-800 uppercase font-bold">Cliente: </span> 
                        {cliente.nombre}
                        </p>
            
                        <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Email: </span> 
                        {cliente.email}
                        </p>
            
                        <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Telefono: </span> 
                        {cliente.telefono}
                        </p>
            
                        <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Empresa: </span> 
                        {cliente.empresa}
                        </p>
            
                        {cliente.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Notas: </span> 
                                {cliente.notas}
                            </p>
                        )}
                    </div>
                </>
                
            </div>
    )
  )
}

export default VerCliente;
