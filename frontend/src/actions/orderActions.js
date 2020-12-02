import axios from 'axios'
import { 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_CREATE_FAIL, 
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL
} from '../constants/orderConstants'


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST, 
    })

    const { userLogin: { userInfo }, } = getState()

    const configObj = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, 
      },
    } 
    const { data } =  await axios.post(`/api/orders`, order, configObj)

    dispatch({
      type: ORDER_CREATE_SUCCESS, 
      payload: data  
    })

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.message 
      ? error.response.data.message 
      : error.message
    })
  }
}



export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST, 
    })

    const { userLogin: { userInfo }, } = getState()

    const configObj = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, 
      },
    } 
    const { data } =  await axios.get(`/api/orders/${id}`, configObj)

    dispatch({
      type: ORDER_DETAILS_SUCCESS, 
      payload: data  
    })

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.message 
      ? error.response.data.message 
      : error.message
    })
  }
}




export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST, 
    })

    const { userLogin: { userInfo }, } = getState()

    const configObj = {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${userInfo.token}`, 
      },
    } 
    const { data } =  await axios.put(`/api/orders/${orderId}/pay`, paymentResult, configObj)

    dispatch({
      type: ORDER_PAY_SUCCESS, 
      payload: data  
    })

  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.message 
      ? error.response.data.message 
      : error.message
    })
  }
}