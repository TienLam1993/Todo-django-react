from django.db import models

# Create your models here.


class Todo(models.Model):
    owner = models.ForeignKey(
        "auth.User", related_name="todos", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
