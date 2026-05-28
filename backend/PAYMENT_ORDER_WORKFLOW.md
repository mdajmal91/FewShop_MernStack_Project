# Payment and Order Workflow Guide

## Complete Flow

### Step 1: Create Razorpay Payment Order
**Endpoint:** `POST /api/payments/order`
**Authentication:** Required (Bearer Token)

**Request:**
```json
{
  "amount": 100.50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment order created successfully",
  "orderId": "order_1234567890",
  "amount": 10050,
  "currency": "INR",
  "key_id": "rzp_live_XXXX"
}
```

---

### Step 2: Complete Payment on Frontend
Use the `orderId` and `key_id` to initialize Razorpay payment on frontend.

When payment is successful, you'll receive:
- `razorpay_order_id`
- `razorpay_payment_id`
- `razorpay_signature`

---

### Step 3: Verify Payment
**Endpoint:** `POST /api/payments/verify`
**Authentication:** Required (Bearer Token)

**Request:**
```json
{
  "razorpay_order_id": "order_1234567890",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_signature": "signature_hash"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentID": "pay_1234567890"
}
```

---

### Step 4: Create Order
**Endpoint:** `POST /api/orders`
**Authentication:** Required (Bearer Token)

**Request:**
```json
{
  "items": [
    {
      "productID": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 29.99
    },
    {
      "productID": "507f1f77bcf86cd799439012",
      "quantity": 1,
      "price": 49.99
    }
  ],
  "totalAmount": 109.97,
  "address": {
    "fullname": "John Doe",
    "street": "123 Main Street",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentID": "pay_1234567890"
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "order_507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439014",
    "items": [...],
    "totalAmount": 109.97,
    "address": {...},
    "paymentID": "pay_1234567890",
    "status": "pending",
    "createdAt": "2026-05-18T..."
  }
}
```

---

## Order Status Flow

Orders progress through these statuses:
1. **pending** - Payment verified, order placed
2. **shipped** - Order dispatched to customer
3. **delivered** - Order received by customer

Admin can update status via:
**Endpoint:** `PUT /api/orders/:id/status`
**Request:**
```json
{
  "status": "shipped"
}
```

---

## Other Order Endpoints

### Get All Orders (Admin)
`GET /api/orders` - Requires admin authentication

### Get User's Orders
`GET /api/orders/myorders` - Returns current user's orders

### Get Specific Order
`GET /api/orders/:id` - Get order by ID

---

## Analytics Endpoints (Admin Only)

- `GET /api/analytics/` - Overall dashboard stats
- `GET /api/analytics/orders` - Order analytics
- `GET /api/analytics/products` - Product analytics
- `GET /api/analytics/users` - User analytics
- `GET /api/analytics/revenue` - Revenue analytics

---

## Fixed Issues

✅ Order Model - Fixed `mongoose` typo
✅ Payment Routes - Fixed function name typo & added authentication
✅ Analytics Routes - Fixed HTTP method typo & route handlers
✅ Payment Controller - Improved response structure with order IDs
✅ All routes properly integrated into main app
