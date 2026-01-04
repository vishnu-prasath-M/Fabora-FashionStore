# FABORA - Premium Fashion E-Commerce

A full-stack MERN e-commerce application for premium fashion products.

## 🚀 Features

- **User Authentication**: JWT-based authentication with access tokens
- **Product Management**: Browse, search, filter, and sort products
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Shipping address and payment method selection
- **Order Management**: View order history and details
- **Admin Dashboard**: Product, order, and user management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Animations**: Smooth GSAP animations

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- GSAP
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt
- Multer (file uploads)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install server dependencies**
```bash
cd server
npm install
```

4. **Install client dependencies**
```bash
cd ../client
npm install
```

5. **Configure environment variables**

Create a `.env` file in the `server` directory:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/fabora
JWT_SECRET=your_jwt_secret_here
```

6. **Seed the database** (optional)
```bash
npm run data:import
```

To destroy data:
```bash
npm run data:destroy
```

## 🏃 Running the Application

### Development Mode

From the root directory:
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) concurrently.

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 📁 Project Structure

```
ecommerce/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── data/             # Seed data
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   └── package.json
└── package.json          # Root package.json
```

## 🔑 Default Admin Credentials

After seeding the database:
- **Email**: admin@example.com
- **Password**: password123

## 🎨 Design

- **Primary Color**: #6C63FF (Purple)
- **Secondary Color**: #0F0F0F (Black)
- **Accent Color**: #F3F3F3 (Light Gray)
- **Fonts**: Poppins (headings), Inter (body)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders` - Get all orders (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
