from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    username: str
    password: str

class ProductCreate(BaseModel):
    name: str
    category: str
    brand: str
    price: int
    quantity: int
    status: str = "active"

class OrderItemIn(BaseModel):
    product_id: int
    qty: int

class OrderCreate(BaseModel):
    items: List[OrderItemIn]

class StockChange(BaseModel):
    product_id: int
    amount: int
    reason: str
