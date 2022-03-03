
import { useState, useEffect } from "react"
import Cliente from "../components/Cliente";

const Inicio = () => {

  const [ clientes, setClientes ] = useState([]);

  //llamar api
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes';

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log('error')
      }
    }

    obtenerClientesAPI();
  },[])

  //eliminar cliente
  const handleEliminar = async id => {
    const confirmar = confirm('deseas eliminar este cliente? ');

    if(confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE',
        })
        await respuesta.json()

        //eliminarlo del dom
        const arrayClientes = clientes.filter( cliente => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        
      }
    }
  }

  return (
    <div>
      <h1 className='font-black text-4xl text-gray-700'>Listado Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 tablet-auto shadow bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {clientes.map( cliente => (
              <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inicio
