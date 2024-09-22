import express from 'express'
import authMidddleware from '../middleware/auth.js'
import { cod, listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/place',authMidddleware, placeOrder)
orderRouter.post('/cod',authMidddleware, cod)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorder', authMidddleware,userOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)


export default orderRouter