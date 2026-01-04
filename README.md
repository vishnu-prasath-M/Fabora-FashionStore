# 🛍️ FABORA - Premium Fashion E-Commerce Platform

A modern, full-stack e-commerce application built with the MERN stack, featuring a premium UI/UX design with iOS-style components.

![FABORA](https://img.shields.io/badge/FABORA-Fashion%20Store-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎨 Premium UI/UX
- **iOS-Style Design**: Modern, gradient-based interface with smooth animations
- **Responsive Layout**: Fully responsive across all devices
- **Dark Mode Ready**: Premium color schemes and gradients
- **Framer Motion Animations**: Smooth page transitions and micro-interactions

### 🛒 E-Commerce Functionality
- **Product Catalog**: Browse products with advanced filtering and sorting
- **Shopping Cart**: Add, remove, and manage cart items
- **Wishlist**: Save favorite products for later
- **Order Management**: Track orders with item-level cancellation
- **User Authentication**: Secure JWT-based authentication
- **Admin Dashboard**: Manage products, orders, and users

### 🎯 Key Highlights
- **Item-Level Order Cancellation**: Cancel individual items within an order
- **Real-time Updates**: Instant UI updates with Redux Toolkit
- **Secure Payments**: Integration-ready for Stripe/PayPal
- **Image Upload**: Cloudinary integration for product images
- **Search & Filter**: Advanced product search and category filtering

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account
- Git

### Clone Repository
```bash
git clone https://github.com/vishnu-prasath-M/Fabora-FashionStore.git
cd Fabora-FashionStore
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Import sample data (optional)
npm run data:import

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- **Backend**: Render
- **Frontend**: Vercel
- **Database**: MongoDB Atlas

### Quick Deploy

#### Backend (Render)
1. Create Web Service on Render
2. Set root directory to `server`
3. Add environment variables
4. Deploy

#### Frontend (Vercel)
1. Import project to Vercel
2. Set root directory to `client`
3. Add `VITE_API_URL` environment variable
4. Deploy

## 📁 Project Structure

```
ecommerce/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── data/             # Seed data
│   └── server.js         # Entry point
│
└── DEPLOYMENT.md         # Deployment guide
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Features in Detail

### User Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Order history with item-level cancellation
- ✅ Wishlist management
- ✅ Shopping cart with real-time updates
- ✅ Product search and filtering
- ✅ Responsive design

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ User management
- ✅ Category management
- ✅ Image upload to Cloudinary

## 🛠️ Development Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run data:import  # Import seed data
npm run data:destroy # Delete all data
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vishnu Prasath M**
- GitHub: [@vishnu-prasath-M](https://github.com/vishnu-prasath-M)

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from Lucide React
- UI components styled with Tailwind CSS
- Animations powered by Framer Motion and GSAP

---

⭐ Star this repository if you find it helpful!
