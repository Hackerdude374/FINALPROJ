import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.pipeline import make_pipeline

# Load the dataset
data_path = '/path/to/your/fetal_health.csv'  # Modify this path to where you've stored the data
data = pd.read_csv(data_path)

# Split features and target
X = data.drop('fetal_health', axis=1)
y = data['fetal_health']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Function to train and evaluate a model
def train_evaluate_model(model, X_train, y_train, X_test, y_test):
    # Create a pipeline with scaling and the model
    pipeline = make_pipeline(StandardScaler(), model)
    
    # Train the model
    pipeline.fit(X_train, y_train)
    
    # Predict on the test set
    y_pred = pipeline.predict(X_test)
    
    # Evaluate the model
    accuracy = accuracy_score(y_test, y_pred)
    class_report = classification_report(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    
    print(f"Model: {model.__class__.__name__}")
    print("Accuracy:", accuracy)
    print("Classification Report:\n", class_report)
    print("Confusion Matrix:\n", conf_matrix)
    print("\n")

# Models to evaluate
models = [
    LogisticRegression(max_iter=1000, random_state=42),
    DecisionTreeClassifier(random_state=42),
    RandomForestClassifier(random_state=42),
    GradientBoostingClassifier(random_state=42)
]

# Evaluate each model
for model in models:
    train_evaluate_model(model, X_train, y_train, X_test, y_test)
