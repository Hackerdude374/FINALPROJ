from flask import Flask, request, url_for, redirect, render_template
import pandas as pd
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__) 
CORS(app) #backend to frontend connection

model = pickle.load(open("example_weights_rf_classifier.pkl", "rb")) #from RFmodel.py
# Column names as used during training
columns = [
    'baseline value', 'accelerations', 'fetal_movement', 'uterine_contractions',
    'light_decelerations', 'severe_decelerations', 'prolongued_decelerations',
    'abnormal_short_term_variability', 'mean_value_of_short_term_variability',
    'percentage_of_time_with_abnormal_long_term_variability',
    'mean_value_of_long_term_variability', 'histogram_width', 'histogram_min',
    'histogram_max', 'histogram_number_of_peaks', 'histogram_number_of_zeroes',
    'histogram_mode', 'histogram_mean', 'histogram_median', 'histogram_variance',
    'histogram_tendency'
]


@app.route('/')
def template_deploy():
    return render_template("index.html") #frontend calling

#input form

# Function to interpret the predictions
def interpret_fetal_health(prediction):
    if prediction == 1.0:
        return "Normal"
    elif prediction == 2.0:
        return "Suspicious - Needs more info"
    elif prediction == 3.0:
        return "Pathological"
    else:
        return "Invalid prediction"

@app.route('/predict', methods=['POST'])
def predict():
    # Get input values from the form
    input_values = [request.form[str(i)] for i in range(1, 22)]
    
    # Convert input values to float
    features = [float(value) for value in input_values]

    # Setup input data as a DataFrame
    input_data = pd.DataFrame([features], columns=columns)

    # Make prediction
    prediction = model.predict(input_data)[0]

    # Interpret prediction
    interpretation = interpret_fetal_health(prediction)

    # Return the result
    return render_template('result.html', pred=f'The predicted fetal health is: {prediction}. Interpretation: {interpretation}')
#-----------------------------------------------------






# Run the Flask app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)