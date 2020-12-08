import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'  


// @desc Fetch All products 
// GET /api/products 
// @access Public 

const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({})

  res.json(products)
})


// @desc Fetch single product
// GET /api/product/:id 
// @access Public  

const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')  
    }
  })



// @desc Delete product
// DELETE /api/products/:id 
// @access Private/Admin  

const deleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) { 
    await product.remove() 
    res.status({ message: 'Product Removed'})
  } else {
    res.status(404)
    throw new Error('Product Not Found')  
    }
  })

  export {getProducts, getProductById, deleteProduct}