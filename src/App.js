import React from 'react';
// import Main from './components/Main/Main'
import Main from './containers/Main/Main'
import Login from './containers/Login/Login'
import Button from "@material-ui/core/Button";
import Logout from "./components/Logout/Logout";
import {autoLogin} from './store/actions/auth'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory 
} from "react-router-dom";
import { connect } from 'react-redux';


function App(props) {
  let history = useHistory();
  React.useEffect(() => {
    console.log(props)
    props.authLogin()

  });

  let routes;
  if(props.isAutenticated){
    routes= (<> <Route exact  path='/'component={Main} /> <Redirect to="/"  /> </>)
  }else{
    routes = (<> <Route path='/login' component={Login} />  <Redirect to="/login"  /> </>)
  }
  return (
    <Router>
      <Logout />
      {routes}
    <div className="App">
    {/* <Button onClick={logout}>logout</Button> */}

    

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
