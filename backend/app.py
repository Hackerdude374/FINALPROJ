from flask import Flask, request, url_for, redirect, render_template
import pandas as pd
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__) 
CORS(app) #backend to frontend connection

model = pickle.load(open("example_weights_rf_classifier.pkl", "rb")) #from RFmodel.py

#--------------------------------------------------------------------------

@app.route('/')
def template_deploy():
    return render_template("index.html") #frontend calling

#input form
def interpret_fetal_health(prediction):
    if prediction == 1.0:
        return "Normal"
    elif prediction == 2.0:
        return "Suspicious - Needs more info"
    elif prediction == 3.0:
        return "Pathological"
    else:
        return "Invalid prediction"
    
@app.route('/predict', methods=['POST', 'GET'])
# Function to interpret the predictions
def predict():
    input_1 = request.form['1']
    input_2 = request.form['2']
    input_3 = request.form['3']
    input_4 = request.form['4']
    input_5 = request.form['5']
    input_6 = request.form['6']
    input_7 = request.form['7']
    input_8 = request.form['8']
    input_9 = request.form['9']
    input_10 = request.form['10']
    input_11 = request.form['11']
    input_12 = request.form['12']
    input_13 = request.form['13']
    input_14 = request.form['14']
    input_15 = request.form['15']
    input_16 = request.form['16']
    input_17 = request.form['17']
    input_18 = request.form['18']
    input_19 = request.form['19']
    input_20 = request.form['20']
    input_21 = request.form['21']
    
    setup_df = pd.DataFrame([pd.Series([input_1, 
                                        input_2, 
                                        input_3, 
                                        input_4, 
                                        input_5, 
                                        input_6, input_7, 
                                        input_8, input_9, 
                                        input_10, input_11, input_12, input_13, 
                                        input_14, input_15, input_16, input_17, 
                                        input_18, input_19, input_20, input_21])])
    fetal_prediction=model.predict_proba(setup_df)
    prediction = model.predict(setup_df)[0]
    interpretation = interpret_fetal_health(prediction) #ashwin predcition
    output='{0:.{1}f}'.format(fetal_prediction[0][1], 2)
    output = str(float(output)*100)+'%'
    if output>str(0.5):
        return render_template('result.html',pred=f'You have the following chance of having fetal disease based on our RF model.\nProbability of having fetal disease is {output} Interpretation: {interpretation}')
    else:
        return render_template('result.html',pred=f'You have a low chance of fetal disease which is currently considered safe (this is only an example, please consult a certified doctor for any medical advice).\n Probability of having fetal disease is {output} Interpretation: {interpretation}')
    
    

#----------------------------------------------------------------------------------------------------------------------------------






# Run the Flask app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)