// import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import {auth} from '../firebase.config'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgerror, setMsgerror] = useState(null);

  const registrarUsuario = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then(r => {
      navigate('/inicio');
      setMsgerror(null)
    })
    .catch(e =>{
      console.log(e)
      if (e.code === 'auth/invalid-email') {
        setMsgerror('Email invalido');
      }
      if (e.code === 'auth/email-already-in-use') {
        setMsgerror('Email ya existe');
      }
      if (e.code === 'auth/weak-password') {
        setMsgerror('Password invalido');
      }
      if (!email.trim()){
        setMsgerror('El campo email esta vacio')
      }
      if (!password.trim()){
        setMsgerror('El campo password esta vacio')
      }
    })
  }

  const loginUsuario = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then((r) =>{
      navigate('/inicio');
      setMsgerror(null)
    })
    .catch(e =>{
      console.log(e)
      if (e.code === 'auth/wrong-password') {
        setMsgerror('Password no es correcto');
      }
      if (e.code === 'auth/user-not-found') {
        setMsgerror('Usuario no existe');
      }
      if (!email.trim()){
        setMsgerror('El campo email esta vacio')
      }
      if (!password.trim()){
        setMsgerror('El campo password esta vacio')
      }
    })
  }

  const AutoCompletar = () =>{
    setEmail('prueba@prueba.com')
    setPassword('123456')
    setMsgerror(null)
  }

  return (
    <div className='row mt-5'>
      <div className='col'></div>
      <div className='col'>
        <form className='form-group' onSubmit={registrarUsuario}>
          <input 
            className='form-control'
            type='email' 
            value={email}
            placeholder='Introduce el email'
            onChange={(e)=> setEmail(e.target.value)} />
          <input
            className='form-control mt-4'
            type='password'
            value={password}
            placeholder='Introduzca la contraseña'
            onChange={(e)=> setPassword(e.target.value)} />
          <input
            className='btn btn-dark form-control mt-4'
            value='Registrar usuario'
            type='submit' />
          <button
            className='btn btn-success form-control mt-2'
            onClick={loginUsuario}>
              Iniciar sesión</button>
        </form>
        {
          msgerror!==null? (
            <div className='alert alert-danger'>{msgerror}</div>
          ) : (
            <span></span>
          )
        }
        <p className='mt-5'>
          Correo de prueba ya creado anteriormente:
          <br/>
          Correo: prueba@prueba.com
          <br/>
          Contraseña: 123456 
          <br/>
          Pulse AUTOCOMPLETAR para rellenar los campos:
        </p>
        <button onClick={AutoCompletar} className='btn btn-info form-control'>AUTOCOMPLETAR</button>
      </div>
      <div className='col'></div>
    </div>
  )
}

export default Login