import React, {useState, useEffect} from 'react'
// import FormTarea from './FormTarea'
// import Tarea from './Tarea'
import {db} from '../firebase.config'

const Inicio = () => {
  const [tareanueva,setTareanueva] = useState('')
  const [idTarea, setIdTarea] = useState('')
  const [error, setError] = useState(null)
  const [tareas, setTareas] = useState([])
  const [modoedicion, setModoedicion] = useState(false)
  
  useEffect(()=>{
    const getTareas = async()=>{
        const {docs} = await db.collection('lista-tareas').get()
        const nuevoArray = docs.map(item=>({id:item.id,...item.data()}))
        setTareas(nuevoArray);
      }
    getTareas();
  },[])
  
  const registrarTarea =async(e)=>{
    e.preventDefault();
    if(!tareanueva.trim()){
      setError('La tarea esta vacia')
    }
      
      const listadetareas = {
        tarea: tareanueva,
        completada: false
      }
      
      try{
        await db.collection('lista-tareas').add(listadetareas)
        const {docs} = await db.collection('lista-tareas').get()
        const nuevoArray = docs.map(item=>({id:item.id,...item.data()}))
        alert('tarea-añadida')
        setTareas(nuevoArray);
        setTareanueva('');
        setError(null)
      }catch(e){
        console.log(e)
      }
  }

  const borrarTarea = async(id) => {
    try{
      db.collection('lista-tareas').doc(id).delete();
      const {docs} = await db.collection('lista-tareas').get()
      const nuevoArray = docs.map(item=>({id:item.id,...item.data()}))
      setTareas(nuevoArray);
    }catch(e){
      console.log(e)
    }
  }

  const pulsareditar = async(id) =>{
    try{
      const data = await db.collection('lista-tareas').doc(id).get()
      const {tarea} = data.data()
      setTareanueva(tarea)
      setIdTarea(id)
      setModoedicion(true)
    }catch (e){
      console.log(e)
    }
  }

  const editarTarea = async(e) =>{
    e.preventDefault()
    if(!tareanueva.trim()){
      setError('La tarea esta vacia')
    }
      const listadetareasedit = {
        tarea: tareanueva,
        completada: false
      }
      try{
        await db.collection('lista-tareas').doc(idTarea).set(listadetareasedit)
        const {docs} = await db.collection('lista-tareas').get()
        const nuevoArray = docs.map(item=>({id:item.id,...item.data()}))
        setTareas(nuevoArray)
        setError(null)
      }catch(e){
        console.log(e)
      }
      setIdTarea('')
      setTareanueva('')
      setModoedicion(false)
    }

  return (
    <div>
      <h1 className='d-flex justify-content-center mt-5 mb-5'>BIENVENIDO</h1>
      <div className="row">
        <div className="col">
          <h5 className='d-flex justify-content-center mt-2 mb-5'>Vea su lista de tareas</h5>
          <ul className='list-group'>
            {
              tareas.length!==0?(
                tareas.map((tarea)=>
                  <li className='list-group-item' key={tarea.id}>
                    {tarea.tarea}
                    <button onClick={(id)=>borrarTarea(tarea.id)}  className='btn btn-danger float-end'>
                      BORRAR
                    </button>
                    <button onClick={(id)=>pulsareditar(tarea.id)}  className='btn btn-info float-end'>
                      EDITAR
                    </button>
                  </li>
                )
                ):(
                  <span className='d-flex justify-content-center text-danger'>
                    <strong>
                      AUN NO HAS REGISTRADO TAREAS
                    </strong>
                  </span>
                  )
                }  
          </ul>
        </div>
        <div className="col">
          <h5 className='d-flex justify-content-center mt-2 mb-5'>Agrega nuevas tareas</h5>
          <form onSubmit={modoedicion ? editarTarea : registrarTarea}>
        <input 
          className='form-control mt-5'
          value={tareanueva}
          type='text'
          placeholder='Ingresar tarea nueva'
          onChange={((e)=>setTareanueva(e.target.value))} />
        <input
          className='btn btn-dark form-control mt-3'
          type='submit'
          value={modoedicion?'Editar tarea':'Registrar tarea'} />
      </form>
      {
        error!==null?(
          <div className='alert alert-danger'>{error}</div>
        ):(
          <span></span>
        )
      }
        </div>
      </div>

    </div>
  )
}

export default Inicio