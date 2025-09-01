from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
import string
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
from flask_cors import CORS
import pickle

# Uncomment the lines below if running for the first time to download necessary NLTK data files
# nltk.download('stopwords')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('averaged_perceptron_tagger_eng')
# nltk.download('wordnet')
# nltk.download('punkt_tab')

app = Flask(__name__)

CORS(app,resources={r"/*":{"origins":"*"}})

model =  pickle.load(open('model.pkl', 'rb'))
lemmatizer = WordNetLemmatizer()
url_pattern = re.compile(r'https?://\S+')
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

def clean_text(text):
  # Lowercase
  text = text.lower()

  # Remove URLs
  text = url_pattern.sub('', text)

  # Remove non-words and non-white spaces
  text = re.sub(r'[^\w\s]', '', text)

  # Remove digits
  text = re.sub(r'\d', '', text)

  # Remove punctuations
  text = ''.join([char for char in text if char not in string.punctuation])

  # Stopwords removal
  text = ' '.join([word for word in text.split() if word not in nltk.corpus.stopwords.words('english')])

  return text

def lemmatize_tokens(tokens):
    # convert POS tag to WordNet format
    def get_wordnet_pos(word):
        tag = nltk.pos_tag([word])[0][1][0].upper()
        tag_dict = {"J": wordnet.ADJ,
                    "N": wordnet.NOUN,
                    "V": wordnet.VERB,
                    "R": wordnet.ADV}
        return tag_dict.get(tag, wordnet.NOUN)

    # lemmatize tokens
    lemmas = [lemmatizer.lemmatize(token, get_wordnet_pos(token)) for token in tokens]

    # return lemmatized tokens as a list
    return ' '.join(lemmas)

@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        data['title'] = clean_text(data['title'])
        data['title'] = word_tokenize(data['title'])
        data['title'] = ' '.join(data['title'])

        data['text'] = clean_text(data['text'])
        data['text'] = word_tokenize(data['text'])
        data['text'] = lemmatize_tokens(data['text'])

        full_text = data['title'] + " " + data['text']
        if full_text.strip() != "":
            print("Full text for prediction:", full_text)
        query_df = vectorizer.transform([full_text])

        nnz = query_df.getnnz()
        if nnz < 5:
            print("[WARN] Sangat sedikit fitur non-zero:", nnz)

        prediction = model.predict(query_df)
        
        return jsonify({'Prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)