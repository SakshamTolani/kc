from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('addCoupon/', views.createCoupon, name='Create-Coupon'),
    path('coupons/', views.getCoupons, name='All-Coupons'),
    path('<str:pk>/<str:prc>/coupon/', views.getCoupon, name='Coupons'),


    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/resetPayment/', views.updateOrderToUnpaid, name='reset-pay'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/cancel/', views.updateOrderToCancelled, name='cancel-order'),
    path('<str:pk>/razorpay/', views.razorpayOrder, name='razorpay'),
    path('<str:pk>/verify/', views.verifyPayment, name='razorpay-verify'),


]
