import pickle
from flask import Flask, request
import csv

app = Flask(__name__)


def get_meme_urls():
	with open('memes_reference_data.tsv', mode='r', ) as infile:
		reader = csv.reader(infile, delimiter="\t")
		return {rows[0]: rows[1] for rows in reader}


def get_classifier(num):
	return {
		2: 'classifier2.pickle',
		3: 'classifier3.pickle',
		4: 'classifier4.pickle',
		5: 'classifier5.pickle'
	}.get(num, 'classifier.pickle')  # default if x not found


def get_vectorizer(num):
	return {
		2: 'vectorizer2.pickle',
		3: 'vectorizer3.pickle',
		4: 'vectorizer4.pickle',
		5: 'vectorizer5.pickle'
	}.get(num, 'vectorizer.pickle')  # default if x not found


@app.route('/meme', methods=["GET"])
def get_meme_image_url():
	# parameters: caption string, num_captions int
	# returns: meme_url string
	input_caption = [request.args.get('caption')]
	num_captions = request.args.get('num_captions')
	classifier = get_classifier(int(num_captions))
	vectorizer_name = get_vectorizer(int(num_captions))
	vectorizer = pickle.load(open(vectorizer_name, "rb"))
	loaded_model = pickle.load(open(classifier, "rb"))
	label_encoder = pickle.load(open('label_encoder.pickle', 'rb'))
	input_caption = vectorizer.transform(input_caption)
	meme_code = loaded_model.predict(input_caption)
	meme_name = label_encoder.inverse_transform([int(meme_code)])[0]
	meme_urls = get_meme_urls()
	return {'meme_url': meme_urls[meme_name], 'num_captions': num_captions, 'filtered_classifier': classifier}
