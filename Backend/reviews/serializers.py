from rest_framework import serializers
from .models import Review, ReviewComment, ReviewVote

class ReviewVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewVote
        fields = ['id', 'user', 'is_upvote', 'created_at']
        read_only_fields = ['user']

class ReviewCommentSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = ReviewComment
        fields = ['id', 'user', 'user_email', 'content', 'created_at', 'updated_at']
        read_only_fields = ['user']

class ReviewSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    comments = ReviewCommentSerializer(many=True, read_only=True)
    votes = ReviewVoteSerializer(many=True, read_only=True)
    upvotes_count = serializers.SerializerMethodField()
    downvotes_count = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_email', 'product', 'order',
            'rating', 'title', 'content', 'image',
            'created_at', 'updated_at', 'is_approved',
            'comments', 'votes', 'upvotes_count', 'downvotes_count'
        ]
        read_only_fields = ['user', 'is_approved']

    def get_upvotes_count(self, obj):
        return obj.votes.filter(is_upvote=True).count()

    def get_downvotes_count(self, obj):
        return obj.votes.filter(is_upvote=False).count()
