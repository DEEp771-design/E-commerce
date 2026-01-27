# 📦 ShopHub Pro - E-Commerce Admin Dashboard

A professional, full-stack e-commerce admin dashboard built with **React + Vite** and **FastAPI**.

## ✨ Features

- 🛍️ **Product Management** - Browse, search, and filter 300+ products
- 🛒 **Order Management** - Create and view orders with real-time updates
- 📊 **Stock Management** - Track inventory with detailed logs
- 🎯 **Dashboard** - Key metrics and statistics at a glance
- 🔐 **Authentication** - Secure login/register with JWT tokens
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly** - Works perfectly on all devices

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Database
- **JWT** - Authentication

## 📋 Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Git

### Backend Setup

```bash
cd deep/
python -m venv venv
venv\Scripts\activate  # On Windows

pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🔑 Demo Credentials

- **Username:** `test`
- **Password:** `test`

## 📊 Database

The application uses SQLite. On first run, it automatically:
- Creates database schema
- Seeds 300+ products across 4 categories (Laptops, Shoes, Phones, Clothes)
- Creates a test user

## 📁 Project Structure

```
deep/
├── app/
│   ├── main.py          # FastAPI app & endpoints
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # Database config
│   └── __init__.py
├── src/
│   ├── pages/
│   │   ├── Login.jsx    # Authentication page
│   │   ├── Dashboard.jsx # Main dashboard
│   │   ├── Products.jsx # Product listing
│   │   ├── Orders.jsx   # Order management
│   │   └── Stock.jsx    # Stock management
│   ├── App.jsx          # Main app component
│   ├── api.js           # Axios configuration
│   ├── style.css        # Global styles
│   └── main.jsx         # React entry point
├── package.json
├── vite.config.js
└── requirements.txt
```

## 🎯 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### Products
- `GET /products` - Get all products
- `POST /products` - Create product

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user's orders

### Stock
- `POST /stock` - Update stock
- `GET /stock/logs` - Get stock logs

### Dashboard
- `GET /dashboard/summary` - Get dashboard stats

## 🌐 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Backend (Railway)
1. Push to GitHub
2. Create Railway project
3. Connect GitHub repository
4. Deploy automatically

## 📝 Features Implemented

✅ User authentication with JWT
✅ Product CRUD operations
✅ Order management
✅ Stock tracking with logs
✅ Real-time dashboard stats
✅ Search and filter functionality
✅ Responsive design
✅ Error handling
✅ Loading states
✅ Professional UI with animations

## 🔒 Security

- Password stored (consider hashing in production)
- JWT token-based authentication
- CORS enabled for local development
- Input validation on all endpoints

## 🎨 UI/UX Highlights

- Modern gradient design
- Smooth animations and transitions
- Ripple effects on buttons
- Shine effect on cards
- Color-coded status badges
- Responsive grid layouts
- Dark/Light theme ready

## 📦 Dependencies

See `requirements.txt` and `package.json` for full list.

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License - feel free to use this project!

## 🙏 Acknowledgments

- Beautiful UI design inspired by modern admin dashboards
- Built for learning and demonstration purposes

---

**Made with ❤️ for e-commerce management**
