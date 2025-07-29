const express = require('express');
const Order = require('../Schemas/OrderSchema.js');
const router = express.Router();

// POST /api/orders/add - Create a new order
router.post('/add', async (req, res) => {
    try {
        const { email, username, items } = req.body;
        if (!email || !username || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Missing email, username, or items' });
        }
        // Validate and sanitize items
        const sanitizedItems = items.map((item, idx) => {
            if (!item.productId || !item.color || !item.size) {
                console.warn('Order item missing required fields:', item);
                throw new Error(`Order item at index ${idx} missing required fields (productId, color, size)`);
            }
            let productId = item.productId;
            if (typeof productId !== 'string' || !productId) {
                throw new Error(`Order item at index ${idx} has invalid productId: ${productId}`);
            }
            return {
                ...item,
                productId,
                color: item.color,
                size: item.size,
                status: item.status || 'Pending',
            };
        });
        // Create a new order instance
        const newOrder = new Order({
            email,
            username,
            items: sanitizedItems,
            status: 'Pending'
        });
        // Save the order to the database
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: error.message || 'Failed to save order' });
    }
});

// GET /api/orders/:email - Get orders by email
// router.get('/:email', async (req, res) => {
//     try {
//         const orders = await Order.find({ email: req.params.email });
//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// });

router.get('/email', async (req, res) => {
    try {
        const email = req.query.email;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        
        const orders = await Order.find({ email: email });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// PUT /api/orders/:id/shipped - Update entire order status to Shipped
router.put('/:id/shipped', async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { 
                status: 'Shipped', 
                'items.$[].status': 'Shipped'  // Update all items' status
            }, 
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// PUT /api/orders/:id/delivered - Update entire order status to Delivered
router.put('/:id/delivered', async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { 
                status: 'Delivered', 
                'items.$[].status': 'Delivered'  // Update all items' status
            }, 
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// (Before May 20)
// // PUT /api/orders/:orderId/items/:productId/status - Update the status of an item in an order
// router.put('/:orderId/items/:productId/status', async (req, res) => {
//     const { orderId, productId } = req.params;
//     const { status } = req.body;  // Expects a status field in the request body

//     try {
//         const updatedOrder = await Order.findOneAndUpdate(
//             { _id: orderId, "items.productId": productId },  // Find order and specific item
//             { $set: { "items.$.status": status } },  // Update item status
//             { new: true }
//         );
        
//         if (!updatedOrder) {
//             return res.status(404).json({ error: 'Order or item not found' });
//         }

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         console.error('Error updating item status:', error);
//         res.status(500).json({ error: 'Failed to update item status' });
//     }
// });


// (May 20)
// PUT /api/orders/item/status?orderId=...&productId=...
router.put('/item/status', async (req, res) => {
    const { orderId, productId } = req.query;
    const { status } = req.body;

    if (!orderId || !productId || !status) {
        return res.status(400).json({ error: 'Missing orderId, productId, or status' });
    }

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "items.productId": productId },
            { $set: { "items.$.status": status } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order or item not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating item status:', error);
        res.status(500).json({ error: 'Failed to update item status' });
    }
});


// (Before May 20)
// router.post('/product/:productId',  async (req, res) => {
//     try {
//         const productId = req.params.productId  // Extract productId from request body
  
//       if (!productId) {
//         return res.status(400).json({ message: 'ProductId is required.' });
//       }
  
//       // Find all orders that contain the specified productId in their items array
//       const orders = await Order.find({
//         'items.productId': productId,
//       });
  
//       if (!orders || orders.length === 0) {
//         return res.status(404).json({ message: 'No orders found with the given productId.' });
//       }
  
//       // Return the found orders
//       return res.status(200).json(orders);
//     } catch (error) {
//       console.error('Error fetching orders by productId:', error);
//       res.status(500).json({ message: 'Failed to fetch orders.' });
//     }
//   });


// (May 20)
router.post('/product', async (req, res) => {
  try {
    const productId = req.query.productId;  // Extract from query

    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required.' });
    }

    // Find all orders that contain the specified productId in their items array
    const orders = await Order.find({
      'items.productId': productId,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found with the given productId.' });
    }

    // Return the found orders
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by productId:', error);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});


  


  
module.exports = router;
