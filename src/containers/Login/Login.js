import React from "react";
import classes from "./Login.module.css";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { token } from "../../token";
import axios from "axios";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCQ9w8mFW2cT0TujQfuKBnXkTKmPw4ZzOA",
  authDomain: "login-25746.firebaseapp.com",
  databaseURL: "https://login-25746.firebaseio.com",
  projectId: "login-25746",
  storageBucket: "login-25746.appspot.com",
  messagingSenderId: "426151674537",
  appId: "1:426151674537:web:801c6c8254e476b4d35fb8",
  measurementId: "G-1QRB5F7MKL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [authState, setAuthState] = React.useState(false)
  const [alert, setAlert] = React.useState(null);

  const fetchHandler = async (url) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    try {
      const res = await axios.post(`${url}?key=${token}`, authData);
      console.log(res.data);
      const data = res.data;
      props.authHendler(true);
      setAlert("success");
      setTimeout(() => setAlert(null), 1000);

      // const expirationDate = new Date(
      //   new Date().getTime() + data.expiresIn * 1000
      // );
      //  localStorage.setItem('token', data.idToken)
      //  localStorage.setItem('userId', data.localId)
      //  localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem("isLogged", true);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
    fetchHandler(url);
  };

  const registrHandler = () => {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
    fetchHandler(url);
  };
  const logout = () => {
    props.authHendler(false);
    // localStorage.removeItem('token')
    // localStorage.removeItem('userId')
    // localStorage.removeItem('expirationDate')
    localStorage.setItem("logged", false);
  };
  const loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        localStorage.setItem("isLogged", true);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log(token);
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {alert ? (
        <Alert severity={alert}>This is a success alert — check it out!</Alert>
      ) : null}
      <form onSubmit={submitHandler} className={classes.Login}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="standard-basic"
          label="email"
        />
        <br />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="standard-basic"
          type="password"
          label="password"
        />
        <br />
        <Button type="primary" onClick={loginHandler}>
          login
        </Button>
        <br />
        <Button type="primary" onClick={registrHandler}>
          registr
        </Button>
        <Button type="primary" onClick={loginFacebook}>
          facebok
        </Button>
      </form>
    </>
  );
};

export default Login;
