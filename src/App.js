import React from 'react';
import Main from './containers/Main/Main'
import Login from './containers/Login/Login'

import {autoLogin} from './store/actions/auth';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from 'react-redux';


function App(props) {
  React.useEffect(() => {
    setTimeout(()=>{
      props.authLogin()
    },0)
  });

  let routes;
  if(props.isAutenticated){
    routes= (<> <Route exact  path='/'component={Main} /> <Redirect to="/"  /> </>)
  }else{
    routes = (<> <Route path='/login' component={Login} />  <Redirect to="/login"  /> </>)
  }

  return (
    <Router>
      {routes}
    <div className="App">
    </div>
    </Router>
  );
}

function mapStateToProps(state){
  return{
    isAutenticated: !!state.token
  }
}

function mapDispatchToProps(dispatch){
  return{
    authLogin: ()=> dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
