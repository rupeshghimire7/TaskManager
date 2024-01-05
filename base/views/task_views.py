from django.shortcuts import render, redirect
from base.models import Task
from pathlib import Path
import joblib
import os



# Navigate up to the BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent.parent

model_path = os.path.join(BASE_DIR, 'static/svm_model.pkl')

# Load the SVM model
svm_model = joblib.load(model_path)


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

    
        


