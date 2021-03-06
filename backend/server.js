import express from 'express' 
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'


dotenv.config()

connectDB()

const app = express() 

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


app.get('/api/config/paypal',(req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// using path.resolve to mimic it because using es6 modules 
const __dirname = path.resolve()
// making upload folder static so it can be loaded in the browser 
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // <-- only available using commonJS require 


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}


//error handling 
app.use(notFound) 
app.use(errorHandler)

const PORT = process.env.PORT || 4000  


app.listen(
  PORT, 
  console.log(`Serving running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold)
)