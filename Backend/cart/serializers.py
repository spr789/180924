from rest_framework import serializers
from .models import cart as CartModel, cartItem
from products.models import Product
from accounts.models import Address
from orders.models import Order, OrderItem
from django.shortcuts import get_object_or_404

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.original_price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = cartItem
        fields = ['id', 'product_name', 'product_price', 'quantity', 'updated_at']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartModel
        fields = ['id', 'user', 'session_id', 'created_at', 'updated_at', 'items', 'total_price']

    def get_total_price(self, obj):
        return obj.get_total_price()

class CheckoutSerializer(serializers.Serializer):
    """
    Serializer for the checkout process.
    """
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(max_length=15)
    address1 = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=100)

    def save(self, **kwargs):
        user = self.context['request'].user if self.context['request'].user.is_authenticated else None

        if not user:
            email = self.validated_data.get('email')
            user, created = CustomUser.objects.get_or_create(email=email)

        shipping_address = Address.objects.create(
            user=user,
            address_line_1=self.validated_data['address1'],
            city=self.validated_data['city'],
            state=self.validated_data['state'],
            postal_code=self.validated_data['postal_code'],
            country=self.validated_data['country'],
            address_type='shipping',
            is_default=True
        )

        cart = CartModel.objects.get(user=user, is_active=True)

        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            total_amount=cart.get_total_price()
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.discounted_price or item.product.original_price,
                total_price=item.get_total_price()
            )

        cart.is_active = False
        cart.save()

        return order
