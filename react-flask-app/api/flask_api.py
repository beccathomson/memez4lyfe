import csv
import pickle
import time
from flask import Flask, request

app = Flask(__name__)


@app.route('/time')
def get_current_time():
	return {'time': time.time()}


@app.route('/meme', methods=["GET"])
def get_meme_image_url():
	return {'meme_url': 'url_from_backend'}
	input_caption = request.args.get('caption')
	vectorizer = pickle.load(open("vectorizer.pickle", "rb"))
	loaded_model = pickle.load(open("classifier.pickle", "rb"))
	label_encoder = pickle.load(open('label_encoder.pickle', 'rb'))
	input_caption = vectorizer.transform(input_caption)
	meme_code = loaded_model.predict(input_caption)
	meme_name = label_encoder.inverse_transform([int(meme_code)])
	return {'meme_url': 'url_from_backend'}

