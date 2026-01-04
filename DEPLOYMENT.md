# Deployment Guide - FABORA E-Commerce

## 🚀 Deployment Instructions

### Backend Deployment (Render)

1. **Create a New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

3. **Set Environment Variables**
   Add these in Render's Environment section:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
   CLIENT_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.onrender.com`)

---

### Frontend Deployment (Vercel)

1. **Install Vercel CLI** (Optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Set Environment Variables**
   Add in Vercel's Environment Variables section:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update CORS on Backend
After deploying frontend, update the `CLIENT_URL` environment variable on Render with your actual Vercel URL.

### MongoDB Atlas Setup
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Add your IP to whitelist (or allow all: `0.0.0.0/0`)
3. Create a database user
4. Get connection string and add to Render environment variables

---

## 📝 Important Notes

- **Free Tier Limitations**: 
  - Render free tier spins down after 15 minutes of inactivity (first request may be slow)
  - Vercel has bandwidth and build time limits

- **Environment Variables**: Never commit `.env` files to GitHub

- **Database**: Use MongoDB Atlas for production database

- **File Uploads**: For production, use Cloudinary or AWS S3 instead of local storage

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in Render matches your Vercel URL exactly
- Check that `VITE_API_URL` in Vercel points to your Render backend

### Build Failures
- Check Node version compatibility
- Ensure all dependencies are in `package.json`
- Review build logs for specific errors

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:
- **Render**: Auto-deploys on push to `main` branch
- **Vercel**: Auto-deploys on push to `main` branch

Configure branch settings in respective dashboards if needed.
