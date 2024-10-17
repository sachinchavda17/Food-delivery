# Food-delivery

# BiteHub24

An e-commerce platform built with **React**, **Express**, **MongoDB**, and **Stripe** for payment processing. This platform allows users to browse products, add items to their cart, and place orders using various payment methods including **Card** and **Cash on Delivery (COD)**.

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **Product Management**: Add, edit, and delete products.
- **Cart Management**: Add items to cart, adjust quantities, and remove items.
- **Order Management**: Place orders with the option to pay by card (via Stripe) or COD.
- **Discounts**: Apply percentage-based discounts to orders.
- **Stripe Integration**: Secure payment gateway for card transactions.
- **Admin Panel**: Manage products, users, and orders.
- **Responsive Design**: Fully responsive UI for both desktop and mobile devices.

## Technologies Used

- **Frontend**:

  - React
  - Tailwind CSS
  - Context API (for state management)
  - Axios (for image upload)
  - Restful fetch API (for other API requests)
  - React Hook Form (for form handling)
  - React Hot Toast (for notifications)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose ORM)
  - JWT (for user authentication)
  - Stripe (for payment processing)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB database running locally or on a cloud service (e.g., MongoDB Atlas)
- A Stripe account for payment processing
- Cloudinary account for image handling (optional, if using Cloudinary for file uploads)

### Steps to Run the Project Locally

1. **Clone the Repository**:

   ```bash
   git clone [Food Delivery](https://github.com/sachinchavda17/Food-delivery.git)
   cd Food-delivery

   ```

2. **Install node modules**:

   ```bash
   npm install
   ```

3. **Set Environment variables Backend**:

```bash
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MONGO_URL=your_mongo_url
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   FRONTEND_URL=http://localhost:3000
```

4. **Set Environment variables Frontend and Backend**:

   ```bash
   REACT_APP_BASE_URL=http://localhost:5000
   ```

5. **Run Project**:
   ```bash
   npm start
   ```

### Changes and Explanation:

1. **Install node modules**:

   - Changed to **Install Dependencies** to clarify that it installs both frontend and backend dependencies in one step.

2. **Set Environment Variables**:

   - Separated frontend and backend environment variables for clarity.
   - Added a note about creating `.env` files for the environment variables, as this is a common practice.

3. **Run Project**:
   - Split the running commands for backend and frontend. Developers need to run both separately.

This should work perfectly with your setup! Let me know if you have any other questions.
