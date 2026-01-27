# 🚀 Deployment Guide - ShopHub Pro

This guide will help you deploy both frontend and backend to production.

## **Phase 1: Prepare Local Environment**

### Step 1.1: Update API Configuration
Your API endpoint is already configured to accept environment variables. It will use:
- **Production:** `VITE_API_URL` from environment
- **Development:** `http://127.0.0.1:8000`

### Step 1.2: Verify Code is on GitHub
✅ Already done! Check: https://github.com/DEEp771-design/E-commerce

---

## **Phase 2: Deploy Backend to Railway** 🔧

### What is Railway?
Railway is a platform for deploying web apps with automatic GitHub integration.

### Steps:

1. **Go to Railway**
   - Visit: https://railway.app
   - Click "New Project"

2. **Connect GitHub**
   - Select "Deploy from GitHub"
   - Authorize Railway with your GitHub account
   - Select repository: `E-commerce`

3. **Configure Python**
   - Railway should auto-detect Python
   - If not, select "Python" as the template

4. **Set Start Command**
   - Add environment variable: `RAILWAY_PYTHON_VERSION=3.9`
   - Railway auto-detects `Procfile` (which we created)

5. **Add Environment Variables**
   - Click "Variables" tab
   - Add these variables:
     ```
     SECRET_KEY=your-super-secret-key-12345-change-this
     DATABASE_URL=sqlite:///./ecommerce.db
     DEBUG=False
     CORS_ORIGINS=*
     ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (3-5 minutes)
   - You'll get a URL like: `https://your-app-name.up.railway.app`

7. **Copy Your Backend URL**
   - Save this URL: `https://your-backend-url.up.railway.app`
   - Example: `https://ecommerce-prod-abc123.up.railway.app`

---

## **Phase 3: Deploy Frontend to Vercel** 🎨

### What is Vercel?
Vercel is optimized for React/Vite apps with automatic deployments from GitHub.

### Steps:

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Click "Import Git Repository"
   - Paste: `https://github.com/DEEp771-design/E-commerce`
   - Click "Continue"

3. **Configure Project**
   - **Project Name:** `shophub-pro` (or your choice)
   - **Framework Preset:** Select "Vite"
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `dist` (should auto-fill)

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add variable:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.up.railway.app
     ```
   - **Important:** Replace with your actual Railway backend URL from Phase 2!

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - You'll get a URL like: `https://shophub-pro.vercel.app`

6. **Your Frontend URL**
   - Save this: `https://your-frontend-url.vercel.app`
   - Example: `https://shophub-pro-abc123.vercel.app`

---

## **Phase 4: Verify Deployment**

### Test Frontend
1. Go to: `https://your-frontend-url.vercel.app`
2. Login with: `test` / `test`
3. Check if products, orders, stock pages work

### Test Backend
1. Go to: `https://your-backend-url.up.railway.app/docs`
2. You should see FastAPI Swagger documentation
3. Try the endpoints

### Common Issues & Fixes

**Issue: "Cannot connect to API"**
- ✓ Check `VITE_API_URL` environment variable in Vercel
- ✓ Ensure backend URL is correct
- ✓ Check backend is running on Railway

**Issue: "CORS error"**
- ✓ Backend has CORS enabled for all origins
- ✓ If still issues, check Railway backend logs

**Issue: "Database error"**
- ✓ Backend creates SQLite database automatically
- ✓ Check Railway logs for errors

---

## **Phase 5: Automatic Deployments (Optional)**

Both Vercel and Railway support automatic deployments:

1. **Every time you push to GitHub:**
   - Vercel automatically redeploys frontend
   - Railway automatically redeploys backend

2. **To redeploy manually:**
   - Push changes to GitHub
   - Both will auto-update (5-10 minutes)

---

## **🔐 Security Tips for Production**

1. **Change SECRET_KEY**
   - Update in Railway environment variables
   - Use a strong, random string

2. **Change Demo Password**
   - Update test user in `app/main.py`
   - Or remove test user creation

3. **Use HTTPS**
   - Both Vercel & Railway provide HTTPS
   - Always use HTTPS URLs in production

4. **Database**
   - SQLite is fine for small projects
   - Consider PostgreSQL for large projects

---

## **📊 Your Deployment Summary**

Once deployed, you'll have:

```
🌐 Frontend URL:  https://your-frontend-url.vercel.app
🔧 Backend API:   https://your-backend-url.up.railway.app
📚 API Docs:      https://your-backend-url.up.railway.app/docs
```

---

## **❓ Need Help?**

- **Vercel Issues:** https://vercel.com/docs
- **Railway Issues:** https://railway.app/docs
- **FastAPI Issues:** https://fastapi.tiangolo.com/

---

**Your app is now live! 🎉**

Share your deployment URLs with others to access your ShopHub Pro dashboard!
