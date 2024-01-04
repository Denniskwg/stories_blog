#!/usr/bin/env python3
import nltk
#nltk.download('punkt')
#nltk.download("stopwords")
#nltk.download('averaged_perceptron_tagger')
#nltk.download("maxent_ne_chunker")
#nltk.download("words")
#nltk.download('all')
from nltk.corpus import stopwords
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize, word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import string
from string import digits
import numpy as np
import re



labeled_data = [
    ("Bye-bye useState & useEffect: Revolutionizing React Development!", "Software development"),
    ("The hottest SQL tools you have no use for: a response", "Software development"),
    ("How React's useRef hook saved my life", "Software development"),
    ("How to use spring framework to create a fully functional Rest api", "Software development"),
    ("How to use React-leaflet and geo-location api to create a web app that tracks user coordinates", "Software development"),
    ("Django Optimization Guide: Make Your App Run 10X Faster", "Software development"),
    ("Back-End & Web Development Trends For 2024", "Software development"),
    ("Navigating Git Branches Like a Pro: The Git Branch Command", "Software development"),
    ("OpenAI Is Slowly Killing Prompt Engineering With The Latest ChatGPT and DALL-E Updates", "Artificial intelligence"),
    ("How to use chatgpt for your work as a developer efficiently", "Artificial intelligence"),
    ("strides in Artificial Intelligence made in 2023", "Artificial intelligence"),
    ("Choose your words, and how you say them, carefully: AI is listening", "Artificial intelligence"),
    ("Are you sure you know what Artificial Intelligence (AI) is?", "Artificial intelligence"),
    ("Becoming Proficient in Document Extraction", "Artificial intelligence"),
    ("Cornell University Discovers a Huge Threat at the Core of ChatGPT", "Artificial intelligence"),
    ("Detecting Generative AI Content", "Artificial intelligence"),
    ("ChatGPT Just Silently Rolled Out A (No-Code) Feature That Will Wreck 10+ Startups", "Business"),
    ("I’m Nothing Special but I Make a 6 Figure Income Online — Here’s How", "Business"),
    ("This Store Makes $2,700,000/Month — How You Can Steal Their Business Formula In 3 Steps", "Business"),
    ("This is Why We Need to Invest in Psychedelics", "Business"),
    ("Investing in Apple stock for year 2023 might not be a bad idea", "Business"),
    ("99-Year-Old Billionaire’s Startling Stock Market Prediction for the Next Decade", "Business"),
    ("$48 million in 48 months: The Amazing Story of Hush Blankets", "Business"),
    ("I Launched My 3rd Digital Product on Gumroad — Here’s What I Learned", "Business"),
]

def process_text(text):
    remove_digits = str.maketrans('', '', digits)
    temp = text.translate(remove_digits)
    words = word_tokenize(temp)
    words = [word.lower() for word in words]
    stop_words = stopwords.words("english") + list(string.punctuation)
    stop_words += ['’', "'s", "/", "—", ","]
    filtered_list = [
        word for word in words if word not in stop_words
    ]
    lemmatizer = WordNetLemmatizer()
    words_lemmatized = [lemmatizer.lemmatize(word) for word in filtered_list]
    words = ' '.join(words_lemmatized)
    return words

def extract_topic(string=""):
    texts = [process_text(text) for text, _ in labeled_data]
    labels = [topic for _, topic in labeled_data]

    X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, random_state=42)

    vectorizer = TfidfVectorizer(stop_words='english')

    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    classifier = SVC(kernel='linear')
    classifier.fit(X_train_tfidf, y_train)

    y_pred = classifier.predict(X_test_tfidf)

    accuracy = accuracy_score(y_test, y_pred)
    #new_text = "How to use Github actions for CI/CD pipeline"
    preprocessed_text = process_text(string)
    features = vectorizer.transform([preprocessed_text])
    prediction = classifier.predict(features)
    return prediction
