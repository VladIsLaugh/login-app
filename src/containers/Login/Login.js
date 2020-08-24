import React from "react";
import classes from "./Login.module.css";

import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import { connect } from "react-redux";
import auth, { loginFacebook } from '../../store/actions/auth'

// var firebaseConfig = {
//   apiKey: "AIzaSyCQ9w8mFW2cT0TujQfuKBnXkTKmPw4ZzOA",
//   authDomain: "login-25746.firebaseapp.com",
//   databaseURL: "https://login-25746.firebaseio.com",
//   projectId: "login-25746",
//   storageBucket: "login-25746.appspot.com",
//   messagingSenderId: "426151674537",
//   appId: "1:426151674537:web:801c6c8254e476b4d35fb8",
//   measurementId: "G-1QRB5F7MKL",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState(null);


  const loginHandler = () => {
    props.auth( email, password, true)
    console.log("dasads")
  };

  const registrHandler = () => {
    props.auth( email, password, false)
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
        <Button type="primary" onClick={props.facebookAuth}>
          facebok
        </Button>
      </form>
    </>
  );
};
function mapDispatchToProps(dispatch){
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    facebookAuth: () => dispatch(loginFacebook())
  }
}

export default connect(null, mapDispatchToProps)(Login);
