from pathlib import Path
import joblib
import os
from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Task
from django.contrib.auth.models import User
from base.serializers import TaskSerializer



# ----------------------------------- LOAD MODEL --------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------- 


# Navigate up to the BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent.parent

model_path = os.path.join(BASE_DIR, 'static/svm_model.pkl')

# Load the SVM model
svm_model = joblib.load(model_path)



# ----------------------------------- ML Model uses category feature with certain assigned values & remaining_days -----------------
# ----------------------------------------------------------------------------------------------------------------- 

def get_category_value(value):
    if value == 'Health': return 10.0   
    elif value == 'Family': return 9.0
    elif value == 'Work': return 8.0
    elif value == 'Finance': return 8.0
    elif value == 'Education': return 7.0
    elif value == 'Career': return 6.0
    elif value == 'Personal': return 5.0
    elif value == 'Social': return 4.0
    elif value == 'Entertainment': return 4.0
    elif value == 'HouseholdErrands' or value == 'Household Errands': return 4.0
    else: return 2.0 # For category = others



def days_remaining(due_date):
        today = timezone.now().date()
        remaining_days = (due_date - today).days
        return max(remaining_days, -1)


# ----------------------------------- GET ALL TASKS FOR THAT USER -------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------
@api_view(["GET"])
def get_tasks(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('-priority')
    tasks = tasks.sort
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



# data['Target'] = (
#     0.35 * data['Importance'] +
#     0.1 * data['Days_Remaining'] +
#     0.2 * data['Complexity'] +
#     0.05 * data['Estimated_Days'] +
#     0.3 * data['Category']

# ----------------------------------- Create Tasks ----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------

@api_view(["POST"])
def create_task(request):
    user = request.user
    data = request.data

    remaining_days = days_remaining(data['due_date'])
    cat_value = get_category_value(data["category"])


    
    task = Task.objects.create(
        user=user,
        title=data['title'],
        description = data['description'],

        due_date = data['due_date'],
        due_time = data['due_time'],
        est_completion = data['completion_days'],

        importance = data['importance'],
        complexity = data['complexity'],
        category = data['category'],
        priority = svm_model()
    )
