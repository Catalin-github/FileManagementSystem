import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_ERROR,
  EDIT_PROFILE,
  REGISTER_SUCCESS,   
} from "./actionType";

const initialState = {
  user: [],
  loading: true,
  loaded: false,
  verify: false,
  error: null,
  isAuth: false,
  edit: false,
  rester:false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
       loaded:false,
       loading:true,
       isAuth:false,
       register:false    
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        loading: false,
        loaded:true  ,
        isAuth: true,
        user: action.payload,
      };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded:true  ,
          isAuth: false,
          register:true,
          user: action.payload,
        };
    case LOGIN_ERROR:
      return {                    // isAuth  false
        ...state,                 // loaded     true   || loaded       false
        loading: false,           //loading succes false || loaded succes true
        loaded: true,
        error: action.payload,
        isAuth: false,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        edit: !state.edit,
      };
    default:
      return state;
  }
};

export default userReducer;
