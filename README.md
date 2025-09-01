# News Classification

## 📖 Project Description
<p align='justify'>
  This project is a news classification application that uses a machine learning model to predict whether a given news article is real or fake. It features a simple web   interface where users can input the title and content of a news article, and the application will return the predicted category.
</p>

<p align='justify'>
The project consists of a frontend built with Next.js and a backend powered by Flask. The backend serves a pre-trained machine-learning model that performs the classification.
</p>

## ✨ Key Features
* News Classification: Classifies news articles as "Real" or "Fake."
* Web Interface: A user-friendly interface to input news articles for classification.
* API-Based: The frontend communicates with a Python backend via a REST API to make predictions.
* Machine Learning Model: Utilizes a pickled scikit-learn model for predictions.

## 💻 Tech Stack Used
<ul>
  <li>Frontend</li>
  <ul>
    <li>Next.js</li>
    <li>React</li>
    <li>Tailwind CSS</li>
  </ul>
  <li>Backend</li>
  <ul>
    <li>Flask</li>
    <li>Scikit-learn</li>
    <li>Pandas</li>
    <li>NLTK</li>
  </ul>
</ul>

## 🚀 How to Install and Run
To get the project up and running locally, follow these steps:
<br><br>
<b>Prerequisites</b>
<br>
* Node.js and npm/yarn/pnpm/bun
* Python 3 and pip
### Backend Setup
1. Create Virtual Environment
   ```bash
   python -m venv .venv
   ```
2. Activate Virtual Environment
   ```bash
   source .venv/Scripts/activate
   or
   .venv/Scripts/activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -re requirements.txt
   ```
4. Navigate to the backend directory.
5. Download NLTK data (only for first time) by uncomment several line code in app.py
6. Start the Flask server
   ```bash
   python app.py
   ```
### Frontend Setup
1. Navigate to the news-classification directory.
2. Install the necessary npm packages
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```

## 📍How to Use the Project
1. Open your browser and go to http://localhost:3000.
2. Enter the title and content of the news article you want to classify in the respective input fields.
3. Click the "Predict Category" button.
4. The predicted category ("Real" or "Fake") will be displayed below the form.

## 📄Important Note
<p align='justify'>
  The deployed model appears to be overfitting, as it frequently predicts "Fake News" even when using content from reputable news websites. This is a known issue and may require further model training or fine-tuning for improved accuracy.
</p>

## 📊 Dataset
This project was trained on the "Fake and Real News Dataset" from Kaggle.
* Dataset: <a href="https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset">Fake and Real News Dataset</a>
* Credit: Clément Bisaillon
