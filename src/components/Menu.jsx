import React, { useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../firebase.config'

const Menu = () => {

  const navigate = useNavigate();
  const[usuario, setUsuario] = useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUsuario(user.email);
        // console.log(user.email);
      }
    })
  },[])

  const cerrarSesion = () =>{
    auth.signOut();
    setUsuario(null);
    navigate('/');
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            {
              usuario!==null?(
                <Link className='nav-link' to='/inicio'>Inicio</Link>
            ):(
                <span></span>
              )
            }
          </li>
          <li className='nav-item'>
            {
              usuario==null?(
                <Link className='nav-link' to='/'>Login</Link>
              ):(
                <span></span>
              )
            }
          </li>
          </ul>
        {
          usuario!==null?(
            <button
            className='btn btn-danger float-end'
            onClick={cerrarSesion}>
                Cerrar Sesion
            </button>
          ):(
            <span></span>
            )
          }
      </nav>  
    </div>
  )
}

export default Menu