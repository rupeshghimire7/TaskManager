from pathlib import Path
import joblib
import os
from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from base.models import Task
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from base.serializers import TaskSerializer


# ----------------------------------- LOAD MODEL --------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------

"""
data = pd.DataFrame({
    'Importance': importance,
    'Complexity': complexity,
    'Days_till_Deadline': days_till_deadline,
    'Estimated_Days': estimated_days,
    'Category': category_values,
    'Priority': priority
})
"""

# Navigate up to the BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent.parent

model_path = os.path.join(BASE_DIR, "static/svm_model.pkl")

# Load the SVM model
svm_model = joblib.load(model_path)


# ----------------------------------- ML Model uses category feature with certain assigned values & remaining_days -----------------
# -----------------------------------------------------------------------------------------------------------------


def get_category_value(value):
    if value == "Health":
        return 10.0
    elif value == "Family":
        return 9.0
    elif value == "Work":
        return 8.0
    elif value == "Finance":
        return 8.0
    elif value == "Education":
        return 7.0
    elif value == "Career":
        return 6.0
    elif value == "Personal":
        return 5.0
    elif value == "Social":
        return 4.0
    elif value == "Entertainment":
        return 4.0
    elif value == "HouseholdErrands" or value == "Household Errands":
        return 4.0
    else:
        return 2.0  # For category = others


def days_remaining(due_date):
    today = timezone.now().date()
    remaining_days = (due_date - today).days
    return max(remaining_days, -1)


# ----------------------------------- GET ALL TASKS FOR THAT USER -------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTasks(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by("-priority")
    tasks = sorted(tasks)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ----------------------------------- Create Tasks ----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTask(request):
    user = request.user
    data = request.data

    remaining_days = days_remaining(data["due_date"])
    cat_value = get_category_value(data["category"])

    task = Task.objects.create(
        user=user,
        title=data["title"],
        description=data["description"],
        due_date=data["due_date"],
        due_time=data["due_time"],
        est_completion=data["est_completion"],
        importance=data["importance"],
        complexity=data["complexity"],
        category=data["category"],
        priority=svm_model.predict(
            [
                [
                    data["importance"],
                    data["complexity"],
                    remaining_days,
                    data["est_completion"],
                    cat_value,
                ]
            ]
        )[0],
    )

    serializer = Task(task, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ----------------------------------- Get Single Task ----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTask(request, pk):
    task = get_object_or_404(Task, user=request.user, id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ----------------------------------- Update Task ----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------
@api_view(["PUT"])  # api call with http method - PUT
@permission_classes([IsAuthenticated])
def updateTask(request, pk):
    data = request.data
    # get product by user and id
    task = get_object_or_404(Task, user=request.user, id=pk)
    remaining_days = days_remaining(data["due_date"])
    cat_value = get_category_value(data["category"])

    # update the instance with data given by user
    task.title = data["title"]
    task.description = data["description"]
    task.due_date = data["due_date"]
    task.due_time = data["due_time"]
    task.est_completion = data["est_completion"]
    task.importance = data["importance"]
    task.complexity = data["complexity"]
    task.category = data["category"]
    task.is_completed = data["is_completed"]
    task.priority = svm_model.predict(
        [
            [
                data["importance"],
                data["complexity"],
                remaining_days,
                data["est_completion"],
                cat_value,
            ]
        ]
    )[0]
    task.save()

    serializer = Task(task, many=False)
    return Response(serializer.data)


# ----------------------------------- Delete Task ----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------


@api_view(["DELETE"])  # api call with http method - DELETE
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):
    task = get_object_or_404(Task, user=request.user, id=pk)
    task.delete()
    return Response("Task deleted")
