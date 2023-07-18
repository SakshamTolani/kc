from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User

from base.models import Coupon


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)


def updateCoupon(sender, instance, **kwargs):
    coupon = instance
    coupon.code = coupon.code.upper()


pre_save.connect(updateCoupon, sender=Coupon)
