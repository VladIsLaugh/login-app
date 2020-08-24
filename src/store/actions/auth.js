import {token} from '../../token'
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

export default function auth(email, password, isLogin){
    return async dispatch =>{
        const authData = {
            email,
            password,
            returnSecureToken: true,
          };
          let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}` 
          if (isLogin){
              url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`
          }
          const res = await axios.post(url, authData);
          const data = res.data

          const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(authLogout(data.expiresIn))
    }
         
}

export function logout(){
        localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return{
        type: 'AUTH_LOGOUT',

    }
}

export function authLogout(time){
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        }, time*1000)
    }
}

export function autoLogin(){
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSuccess(token))
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime())/1000)) 
            }
        }

    }
}

export function authSuccess(token){
    console.log(localStorage.getItem('expirationDate'))
    return{
        type: 'AUTH_SUCCESS',
        token
    }
}

export function loginFacebook(){
    return dispatch=>{
        const provider = new firebase.auth.FacebookAuthProvider();
    
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            localStorage.setItem("isLogged", true);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            console.log(token);
            dispatch(authSuccess(token))
            //dispatch(authLogout(data.expiresIn))
            // The signed-in user info.
            var user = result.user;
            let expirationDate = new Date(new Date().getTime()+3600000)
            console.log(localStorage.getItem('expirationDate'),expirationDate )
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            return dispatch => {
                dispatch(authLogout(expirationDate))
                dispatch(authSuccess(token))
            }  
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
          })
    }
        
}