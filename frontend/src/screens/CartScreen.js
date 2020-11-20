import React, {useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'

const CartScreen = ({ match, location, history}) => {
  const productID = match.params.id 

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()  

  const cart = useSelector(state => state.cart) 
  const { cartItems } = cart 


  useEffect(() => {
    if(productID){
      dispatch(addToCart(productID, qty))
    }
    
  }, [dispatch, productID, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}> 
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? ( <Message>Your Cart Is Empty 
        <Link to='/'> Go Back</Link></Message>
        ) : (
        <ListGroup variant='flush'> 
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}> 
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded></Image>
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control 
                      as='select' 
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1 } value={x + 1}>
                            {x + 1}
                          </option> 
                        ))}
                  </Form.Control> 
                </Col>
                <Col md={2}> 
                  <Button type='button' variant='light' onClick={() => 
                    removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        )}
      </Col>
      <Col md={4}> 
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} 
              onClick={checkOutHandler}> Proceed to checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
