from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    brand = Column(String)
    price = Column(Integer)
    quantity = Column(Integer)
    status = Column(String, default="active")  # active / inactive / out_of_stock

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user = Column(String)
    total = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer)
    qty = Column(Integer)
    price = Column(Integer)

class StockLog(Base):
    __tablename__ = "stock_logs"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    change = Column(Integer)
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
