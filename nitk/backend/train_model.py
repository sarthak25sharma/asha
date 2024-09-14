# train_model.py
import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

data = [
    {"text": "I need help immediately!", "label": "help"},
    {"text": "Stop touching me!", "label": "molestation"},
    {"text": "I am so angry right now!", "label": "anger"},
    {"text": "I am terrified and scared.", "label": "fear"}
  ]

# Convert JSON to DataFrame
df = pd.DataFrame(data)

# Prepare data
X = df['text']
y = df['label']

# Create a pipeline that combines a vectorizer with a classifier
model = Pipeline([
    ('vect', CountVectorizer()),  # Convert text to feature vectors
    ('clf', MultinomialNB())      # Classifier
])

# Train the model
model.fit(X, y)

# Save the model
joblib.dump(model, 'text_classifier_model.pkl')