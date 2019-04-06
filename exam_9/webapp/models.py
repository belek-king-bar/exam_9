from django.db import models
from django.conf import settings
import uuid
from django.contrib.auth.models import User
from django.utils.timezone import now


# Create your models here.
class RegistrationToken(models.Model):
    token = models.UUIDField(default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # класс ошибки обознчающей, что срок действия токена истёк
    class Expired(Exception): pass

    # проверка, что токен истёк: находим разницу между двумя датами,
    # переводим её в часы и сравниваем с допустимым возрастом токена в часах,
    # указанным в настройках.
    def is_expired(self):
        delta = now() - self.created_at
        delta_hours = delta.total_seconds() / 3600
        return delta_hours > settings.TOKEN_EXPIRATION_HOURS

    def __str__(self):
        return "%s" % self.token


class SoftDeleteManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)



class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    arrival_date = models.DateTimeField()
    is_deleted = models.BooleanField(default=False)
    categories = models.ManyToManyField('Category', related_name="product", blank=True, verbose_name="Категория")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    objects = SoftDeleteManager()


    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Категория")
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name="Описание")

    def __str__(self):
        return self.name

class Product_photo(models.Model):
    product = models.ForeignKey(Product, related_name="images", verbose_name="Фото продукта", on_delete=models.PROTECT)
    images = models.ImageField(upload_to='images', null=True, blank=True)


class Order(models.Model):
    user = models.ForeignKey(User, related_name="order", verbose_name="Пользователь", on_delete=models.PROTECT)
    products = models.ManyToManyField('Product', related_name="order", verbose_name="Продукты")
    phone = models.CharField(max_length=255, verbose_name="Телефон")
    address = models.CharField(max_length=255, verbose_name="Адрес", null=True, blank=True)
    comment = models.TextField(max_length=2000, null=True, blank=True, verbose_name="Комментарий")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')

