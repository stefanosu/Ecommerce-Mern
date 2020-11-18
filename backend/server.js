import express from 'express' 
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express() 

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('api is running.........')
})


const PORT = process.env.PORT || 4000  


app.listen(
  PORT, 
  console.log(`Serving running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold)
)