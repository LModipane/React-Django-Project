"""
tHIS FILE WILL CONTAIN THE MODELS FOR THE API / DATABASE    
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    # here are data fields for the note model
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.title
