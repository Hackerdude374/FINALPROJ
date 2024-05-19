import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

df = pd.read_csv("fetal_health.csv")

X = df.drop('fetal_health', axis=1)
y = df['fetal_health']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 42)

rf_classifier = RandomForestClassifier() 

rf_classifier.fit(X_train, y_train)

y_train_pred = rf_classifier.predict(X_train)

y_test_pred = rf_classifier.predict(X_test)

#deserialize data
pickle.dump(rf_classifier, open('example_weights_rf_classifier.pkl', "wb"))

# def interpret_fetal_health(prediction):
#     if prediction == 1.0:
#         return "Normal"
#     elif prediction == 2.0:
#         return "Suspicious - Needs more info"
#     elif prediction == 3.0:
#         return "Pathological"
#     else:
#         return "Invalid prediction"

# def predict_fetal_health():
#     print("Please enter the following feature values:")

#     features = []
#     for feature_name in X.columns:
#         value = input(f"{feature_name}: ")
#         features.append(float(value))

#     input_data = np.array(features).reshape(1, -1)

#     # Make prediction
#     prediction = rf_classifier.predict(input_data)[0]

#     # Interpret prediction
#     interpretation = interpret_fetal_health(prediction)

#     # Print prediction and interpretation
#     print(f"The predicted fetal health is: {prediction}")
#     print(f"Interpretation: {interpretation}")

# # Call the function to make predictions based on user input
# predict_fetal_health()