from django.forms import ModelForm
from base.models import Task

class TaskForm(ModelForm):
    class Meta:
        model = Task
        exclude = ['created_on', 'updated_at', 'priority']
