from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(ContactUs)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Coupon)
