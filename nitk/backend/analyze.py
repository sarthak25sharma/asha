from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Load a pre-trained BERT model for text classification (emotion detection)
model = pipeline('text-classification', model="bhadresh-savani/bert-base-uncased-emotion")


# Sentiment analysis

@app.route('/analyze', methods=['POST'])
def analyze_context():
    data = request.get_json()
    sentence = data['sentence']

    # Use the BERT model to analyze the sentence
    result = model(sentence)[0]
    label = result['label']

    # If the result label is one of these, mark the context as unsafe
    if label in ["fear", "anger", "abuse"]:
        return jsonify({'context': 'UNSAFE'})
    else:
        return jsonify({'context': 'SAFE'})
    
if __name__ == '__main__':
    app.run(port=5000)