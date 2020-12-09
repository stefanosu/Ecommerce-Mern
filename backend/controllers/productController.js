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




// @desc Create product
// POST /api/products
// @access Private/Admin  

const createProduct = asyncHandler(async(req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0, 
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0, 
    description: 'sample description' 
  })
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
  })


// @desc Update product
// PUT /api/products/:id
// @access Private/Admin  

const updateProduct = asyncHandler(async(req, res) => {
  const { name, price, category, brand, description, image, countInStock } = req.body

  const product = await Product.findById(req.params.id) 
  
  if(product) {
    product.name = name 
    product.price = price
    product.category = category
    product.description = description
    product.brand = brand
    product.image = image
    product.countInStock = countInStock 

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

  export {getProducts, getProductById, deleteProduct, updateProduct, createProduct}