from django.contrib import admin
from webapp.models import Product, Category, Product_photo, Order


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Product_photo)
admin.site.register(Order)