from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from joblib import load
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = load('disease_prediction_model.joblib')

def preprocess_symptoms(symptoms):
    # Combine non-empty symptom columns into a single string
    return ', '.join(filter(None, map(str, symptoms)))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get symptoms from the request
        symptoms_input = request.json.get('symptoms')

        print("symptom_input",symptoms_input)

        # Preprocess symptoms
        preprocessed_symptoms = preprocess_symptoms(symptoms_input)

        print(preprocess_symptoms)

        # Make prediction
        predicted_disease = model.predict([preprocessed_symptoms])[0]

        return jsonify({'predicted_disease': predicted_disease})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    try:
        app.run(debug=True, use_reloader=True)
    except SystemExit as e:
        if e.code != 0:
            print(f"Error: {e}")