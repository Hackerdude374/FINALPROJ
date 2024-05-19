from flask import Flask, request, url_for, redirect, render_template
import pandas as pd
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__) 
CORS(app) #backend to frontend connection

model = pickle.load(open("example_weights_rf_classifier.pkl", "rb")) #from RFmodel.py