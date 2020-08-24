import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/auth'

const Logout = (props) =>{

return(
    <button onClick={()=> props.logout()}>
        logout
    </button>
)
}

function mapDispatchToProps(dispatch){
    return{
        logout: ()=> dispatch(logout())
    }
}

export default connect (null, mapDispatchToProps)(Logout)
