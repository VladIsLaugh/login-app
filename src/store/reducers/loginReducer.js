const LOGIN = 'LOGIN'
import {token} from '../../token'
const initialState ={
    isLogged: false,
    alertType: null,

};

const login = () =>{

    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`, {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true,
    }).then(()=>{
        console.log(res.data);

        localStorage.setItem("isLogged", true);
    })

    
}

export function loginReducer (state = initialState, action){
    switch(action.type){
        case LOGIN:
            
            return{
                ...state,
                 loading=true
            }
        case FINISH_LOADING:
            return{
                ...state,
                 loading=false,
                 
            }
        case FAILED_LOADIND:
            return{
                ...state,
                 loading=false,

            }
        default:
            return state


    }
}