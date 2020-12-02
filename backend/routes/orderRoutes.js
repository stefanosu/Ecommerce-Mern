import express from 'express'
const router = express.Router() 
import { addOrderItems, getOrderById, updateOrderPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleWare.js'


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderPaid)

export default router 
