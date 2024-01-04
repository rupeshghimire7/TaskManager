from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

CATEGORY_CHOICES = [
        ('Health', 10),
        ('Family', 9),
        ('Work', 8),
        ('Finance', 8),
        ('Education', 7),
        ('Personal', 5),
        ('Career', 6),
        ('Social', 4),
        ('HouseholdErrands', 4),
        ('Entertainment', 4),
        ('Others', 2),
    ]

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(max_length=10000, null=True, blank=True)

    due_date = models.DateField()
    due_time = models.TimeField()
    est_completion = models.IntegerField(choices=[(i, str(i)) for i in range(1, 31)], default=1, help_text="Range: 1-30")

    importance = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)], default=1, help_text="Range: 1-10")
    complexity = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)], default=1, help_text="Range: 1-10")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    priority = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)], default=1)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def days_remaining(self):
        today = timezone.now().date()
        remaining_days = (self.due_date - today).days
        return max(remaining_days, -1)


    def __str__(self):
        return self.title[:50]