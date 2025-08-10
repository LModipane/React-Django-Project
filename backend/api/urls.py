from django.urls import path, include
from . import views

urlpatterns = [
    path("notes/", views.CreateNoteView.as_view(), name="create_note"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete_note"),
]