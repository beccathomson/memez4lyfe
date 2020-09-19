import pickle
from flask import Flask, request
import csv

app = Flask(__name__)


def get_meme_urls():
	with open('memes_reference_data.tsv', mode='r', ) as infile:
		reader = csv.reader(infile, delimiter="\t")
		return {rows[0]: rows[1] for rows in reader}


@app.route('/meme', methods=["GET"])
def get_meme_image_url():
	input_caption = [request.args.get('caption')]
	vectorizer = pickle.load(open("vectorizer.pickle", "rb"))
	loaded_model = pickle.load(open("classifier.pickle", "rb"))
	label_encoder = pickle.load(open('label_encoder.pickle', 'rb'))
	input_caption = vectorizer.transform(input_caption)
	meme_code = loaded_model.predict(input_caption)
	meme_name = label_encoder.inverse_transform([int(meme_code)])[0]
	meme_urls = get_meme_urls()
	return {'meme_url': meme_urls[meme_name]}
