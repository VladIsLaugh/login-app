import React from 'react';
// import Main from './components/Main/Main'
import Main from './containers/Main/Main'
import Login from './containers/Login/Login'
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";


function App(props) {
  const [authState, setAuthState] = React.useState(false)
  const authHendler = (auth) =>{
    setAuthState(auth)
    console.log(authState)
  }
  React.useEffect(() => {
    console.log("useEffect")
    setAuthState(!!localStorage.getItem('isLogged'))
  }, []);

  const logout = () =>{
    localStorage.setItem("isLogged", false);
    setAuthState(false)
  }
  return (
    <Router>
    <div className="App">
    <Button onClick={logout}>logout</Button>
      {/* <React.Suspense fallback={<div>loading... </div>}> */}
      {/* {authState&& <Route exact  path='/'component={Main}/>}
  {!authState&& <Route path='/login'render={()=> <Login authHendler={authHendler}/>}/> } */}
      {
        authState
        ? <Main />
        : <Login />
      }
    
      {/* </React.Suspense> */}
    </div>
    </Router>
  );
}

export default App;
