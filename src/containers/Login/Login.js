import React from "react";
import classes from "./Login.module.css";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {token} from '../../token'
import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');

  

  const loginHandler = async () => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const res = await  axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`,
        authData
      )
       console.log(res.data)
       console.log("sdsdas")
    } catch (e) {
      console.log(e);
    }
  };


  const  registrHandler = async () => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const res = await  axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}`,
        authData
      )
       console.log(res.data)
      console.log(authData);
    } catch (e) {
      console.log(e);
    }
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}  className={classes.Login}>
      <TextField value={email} onChange={(e)=>setEmail(e.target.value)} id="standard-basic" label="email" />
      <br />
      <TextField  value={password} onChange={(e)=> setPassword(e.target.value)} id="standard-basic" type="password" label="password" />
      <br />
      <Button type="primary" onClick={loginHandler}>login</Button>
      <br />
      <Button type="primary" onClick={registrHandler}>
        registr
      </Button>
    </form>
  );
};

export default Login;
