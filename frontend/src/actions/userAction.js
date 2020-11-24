import { 
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGOUT, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST 
} from '../constants/userConstants' 
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST 
    })
    const configObj = {
      headers: {
        'Content-Type': 'application/json', 
      }
    } 
    const { data } =  await axios.post(
      '/api/users/login',
      { email, password }, 
      configObj
      )
      dispatch({
        type: USER_LOGIN_REQUEST, 
        payload: data  
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.message 
      ? error.response.data.message 
      : error.message
    })
  }
}

export const logout = (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: USER_LOGOUT})
}



export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const configObj = {
      headers: {
        'Content-Type': 'application/json', 
      }
    } 
    const { data } =  await axios.post(
      '/api/users',
      { name, email, password }, 
      configObj
      )
      dispatch({
        type: USER_REGISTER_REQUEST, 
        payload: data  
      })

      dispatch({
        type: USER_LOGIN_REQUEST, 
        payload: data  
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.message 
      ? error.response.data.message 
      : error.message
    })
  }
}