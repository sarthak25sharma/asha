from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import mailtrap as mt

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

@app.route('/send-help-email', methods=['POST'])
def send_help_email():
    try:
        data = request.get_json()
        message = data.get('message', 'Urgent help needed. Please help me!')
        
        mail = mt.Mail(
            sender=mt.Address(email="mailtrap@demomailtrap.com", name="Mailtrap Test"),
            to=[mt.Address(email="aayush22011@iiitd.ac.in")],
            subject="Urgent help needed",
            text=message,  
            category="Integration Test",
        )

        client = mt.MailtrapClient(token="4ad8d521f5a49ec2c79dd86c4b1d1453")
        response = client.send(mail)

        return jsonify({'success': True, 'response': response.status_code}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)

