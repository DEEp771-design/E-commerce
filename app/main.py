from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, schemas
from .schemas import StockChange
from .models import StockLog
import random, datetime

SECRET_KEY = "SECRET123"
ALGO = "HS256"

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce PRO Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ShopHub Pro Backend is Running! ✅"}

oauth = OAuth2PasswordBearer(tokenUrl="login")

# ---------- DB ----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- JWT ----------

def create_token(user):
    return jwt.encode(
        {"sub": user, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=10)},
        SECRET_KEY,
        algorithm=ALGO,
    )

def get_user(token: str = Depends(oauth)):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGO])
        return data["sub"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------- Seed Products ----------

# Product seeding
with SessionLocal() as db:
    # Delete all existing products
    db.query(models.Product).delete()
    db.commit()
    
    # Product data by category
    laptops = [
        ("Dell XPS 13", "Dell", 85000),
        ("HP Pavilion 15", "HP", 55000),
        ("Lenovo ThinkPad E15", "Lenovo", 60000),
        ("ASUS VivoBook 15", "ASUS", 50000),
        ("Apple MacBook Air M1", "Apple", 120000),
        ("Dell Inspiron 15", "Dell", 45000),
        ("HP Envy 14", "HP", 70000),
        ("Lenovo IdeaPad 5", "Lenovo", 55000),
        ("ASUS ROG Gaming Laptop", "ASUS", 95000),
        ("Microsoft Surface Laptop 4", "Microsoft", 100000),
        ("Acer Aspire 5", "Acer", 48000),
        ("MSI GF63 Gaming Laptop", "MSI", 80000),
        ("Razer Blade 15", "Razer", 140000),
        ("Samsung Galaxy Book Pro", "Samsung", 85000),
        ("Huawei MateBook 14", "Huawei", 75000),
    ]
    
    shoes = [
        ("Nike Air Force 1", "Nike", 8000),
        ("Adidas Ultraboost", "Adidas", 12000),
        ("Puma RS-X", "Puma", 6500),
        ("Reebok Classic Leather", "Reebok", 5500),
        ("New Balance 574", "New Balance", 7500),
        ("Converse Chuck Taylor", "Converse", 4500),
        ("Vans Old Skool", "Vans", 5500),
        ("Skechers Comfort", "Skechers", 4800),
        ("Crocs Classic Clog", "Crocs", 3500),
        ("Bata Formal Shoes", "Bata", 3000),
        ("Nike Air Max 90", "Nike", 9500),
        ("Adidas Stan Smith", "Adidas", 7000),
        ("Puma Future Rider", "Puma", 5500),
        ("Saucony Jazz", "Saucony", 6500),
        ("Clarks Desert Boot", "Clarks", 8000),
    ]
    
    phones = [
        ("iPhone 13", "Apple", 75000),
        ("iPhone 13 Pro", "Apple", 95000),
        ("Samsung Galaxy S21", "Samsung", 60000),
        ("Samsung Galaxy S21 Ultra", "Samsung", 85000),
        ("Google Pixel 6", "Google", 60000),
        ("OnePlus 9", "OnePlus", 45000),
        ("Xiaomi 11T", "Xiaomi", 40000),
        ("Realme GT", "Realme", 35000),
        ("POCO X3 Pro", "POCO", 25000),
        ("Redmi Note 11", "Redmi", 20000),
        ("Motorola Edge 30", "Motorola", 30000),
        ("OPPO Reno 7", "OPPO", 38000),
        ("Vivo X70", "Vivo", 45000),
        ("Nothing Phone 1", "Nothing", 32000),
        ("Sony Xperia 5", "Sony", 70000),
    ]
    
    clothes = [
        ("Cotton T-Shirt", "Generic", 500),
        ("Denim Jeans", "Levis", 2500),
        ("Formal Shirt", "Arrow", 1500),
        ("Polo T-Shirt", "Ralph Lauren", 2500),
        ("Hoodie", "Generic", 1200),
        ("Sweater", "Generic", 2000),
        ("Cargo Pants", "Generic", 2000),
        ("Chino Pants", "Generic", 1800),
        ("Jacket", "Generic", 3500),
        ("Shorts", "Generic", 800),
        ("Tank Top", "Generic", 400),
        ("V-Neck T-Shirt", "Generic", 600),
        ("Striped Shirt", "Generic", 1200),
        ("Overcoat", "Generic", 5000),
        ("Waistcoat", "Generic", 2500),
    ]
    
    all_products = []
    product_id = 1
    
    # Add multiple variations of each product to reach 200+
    for _ in range(5):
        for name, brand, price in laptops:
            all_products.append({
                "name": f"{name} - Variant {_+1}",
                "category": "Laptop",
                "brand": brand,
                "price": price + (random.randint(-5000, 5000)),
                "quantity": random.randint(5, 100),
                "status": "active" if random.random() > 0.1 else "inactive"
            })
    
    for _ in range(5):
        for name, brand, price in shoes:
            all_products.append({
                "name": f"{name} - Size {37+(_ % 8)}",
                "category": "Shoes",
                "brand": brand,
                "price": price + (random.randint(-1000, 1000)),
                "quantity": random.randint(10, 100),
                "status": "active" if random.random() > 0.1 else "inactive"
            })
    
    for _ in range(5):
        for name, brand, price in phones:
            color = random.choice(["Black", "White", "Blue", "Red", "Gold"])
            all_products.append({
                "name": f"{name} - {color}",
                "category": "Phones",
                "brand": brand,
                "price": price + (random.randint(-3000, 3000)),
                "quantity": random.randint(5, 80),
                "status": "active" if random.random() > 0.1 else "inactive"
            })
    
    for _ in range(5):
        for name, brand, price in clothes:
            size = random.choice(["XS", "S", "M", "L", "XL", "XXL"])
            all_products.append({
                "name": f"{name} - {size}",
                "category": "Clothes",
                "brand": brand,
                "price": price + (random.randint(-100, 100)),
                "quantity": random.randint(20, 150),
                "status": "active" if random.random() > 0.1 else "inactive"
            })
    
    # Add all products to database
    for product in all_products:
        db.add(models.Product(**product))
    
    db.commit()
    print(f"✓ Database seeded with {len(all_products)} products")

# ---------- AUTH ----------

@app.post("/register", tags=["Auth"])
def register(u: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter_by(username=u.username).first():
        raise HTTPException(400, "User already exists")
    db.add(models.User(username=u.username, password=u.password))
    db.commit()
    return {"msg": "registered"}

@app.post("/login", tags=["Auth"])
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    u = db.query(models.User).filter_by(username=form.username).first()
    if not u or u.password != form.password:
        raise HTTPException(400, "Bad credentials")
    return {"access_token": create_token(u.username), "token_type": "bearer"}

# ---------- PRODUCTS ----------

@app.get("/products", tags=["Products"])
def products(db: Session = Depends(get_db), user=Depends(get_user)):
    return db.query(models.Product)\
        .filter(models.Product.status == "active")\
        .limit(50).all()

@app.post("/products", tags=["Products"])
def add_product(p: schemas.ProductCreate, db: Session = Depends(get_db), user=Depends(get_user)):
    prod = models.Product(**p.dict())

    if prod.quantity <= 0:
        prod.status = "out_of_stock"

    db.add(prod)
    db.commit()
    return {"message": "Product added successfully"}

# ---------- ORDERS ----------

@app.post("/orders", tags=["Orders"])
def create_order(o: schemas.OrderCreate, db: Session = Depends(get_db), user=Depends(get_user)):
    total = 0
    order = models.Order(user=user, total=0)
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in o.items:
        p = db.query(models.Product).get(item.product_id)

        if not p or p.status != "active" or p.quantity < item.qty:
            raise HTTPException(400, "Product not available")

        p.quantity -= item.qty
        if p.quantity == 0:
            p.status = "out_of_stock"

        total += p.price * item.qty

        db.add(models.OrderItem(
            order_id=order.id,
            product_id=p.id,
            qty=item.qty,
            price=p.price
        ))

    order.total = total
    db.commit()
    return {"order_id": order.id, "total": total}

@app.get("/orders", tags=["Orders"])
def list_orders(db: Session = Depends(get_db), user=Depends(get_user)):
    return db.query(models.Order).filter_by(user=user).all()

# ======================
# STOCK
# ======================
@app.post("/stock", tags=["Stock"])
def update_stock(data: StockChange, db: Session = Depends(get_db), user=Depends(get_user)):
    p = db.query(models.Product).get(data.product_id)
    if not p:
        raise HTTPException(404, "Product not found")

    p.quantity += data.amount

    if p.quantity <= 0:
        p.quantity = 0
        p.status = "out_of_stock"
    else:
        p.status = "active"

    db.add(StockLog(product_id=p.id, change=data.amount, reason=data.reason))
    db.commit()

    return {"message": "Stock updated", "new_quantity": p.quantity}

@app.get("/stock/logs", tags=["Stock"])
def stock_logs(db: Session = Depends(get_db), user=Depends(get_user)):
    return db.query(StockLog).order_by(StockLog.created_at.desc()).all()


# ---------- DASHBOARD ----------

@app.get("/dashboard/summary", tags=["Dashboard"])
def summary(db: Session = Depends(get_db), user=Depends(get_user)):
    user_orders = db.query(models.Order).filter_by(user=user).all()
    return {
        "total_products": db.query(models.Product).count(),
        "active_products": db.query(models.Product).filter(models.Product.status=="active").count(),
        "total_orders": len(user_orders),
        "total_sales": sum([o.total for o in user_orders])
    }


