# FABORA - Quick Start Guide

## MongoDB Setup Required

MongoDB is not currently running on your system. You have two options:

### Option 1: Install MongoDB Locally (Recommended for Development)

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Install with default settings

2. **Start MongoDB**
   ```bash
   # MongoDB should start automatically as a service
   # Or manually start it:
   net start MongoDB
   ```

3. **Verify MongoDB is running**
   ```bash
   mongod --version
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Free Account**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster (M0 tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update `.env` file**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fabora?retryWrites=true&w=majority
   ```

## Running the Application

Once MongoDB is set up:

### 1. Seed the Database
```bash
cd server
node seeder.js
```

### 2. Start the Application
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

### 3. Login Credentials

**Admin Account:**
- Email: admin@example.com
- Password: password123

**Regular User:**
- Email: john@example.com
- Password: password123

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the MONGO_URI in server/.env
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change PORT in server/.env
- Update proxy in client/vite.config.js

### Module Not Found
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

## Next Steps After Setup

1. Browse products on the home page
2. Add items to cart
3. Register a new account or login
4. Complete checkout process
5. View orders in profile

---

**Need Help?** Check the main README.md for detailed documentation.
