from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Category, Collection
from .serializers import CategorySerializer, CollectionSerializer
from django.shortcuts import get_object_or_404

# API view to list and create categories
class CategoryListCreateAPIView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_active=True).order_by('sort_order', 'name')
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API view for category detail, update, and delete
class CategoryDetailAPIView(APIView):
    def get(self, request, slug):
        category = get_object_or_404(Category, slug=slug, is_active=True)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, slug):
        category = get_object_or_404(Category, slug=slug)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        category = get_object_or_404(Category, slug=slug)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# API view to list and create collections
class CollectionListCreateAPIView(APIView):
    def get(self, request):
        collections = Collection.objects.filter(is_active=True).order_by('sort_order', 'name')
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API view for collection detail, update, and delete
class CollectionDetailAPIView(APIView):
    def get(self, request, slug):
        collection = get_object_or_404(Collection, slug=slug, is_active=True)
        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    def put(self, request, slug):
        collection = get_object_or_404(Collection, slug=slug)
        serializer = CollectionSerializer(collection, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        collection = get_object_or_404(Collection, slug=slug)
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
