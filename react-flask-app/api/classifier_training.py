import pickle
import sys
import pandas as pd
from sklearn import preprocessing
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC


def train_model(x, y):
    tfidf = TfidfVectorizer(max_df=0.8) # vectorizes and removes some stop words
    x = tfidf.fit_transform(x, y)
    # note: we need the vectorizer for future use
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.15, random_state=0)

    # tested linearSVC, random forest, SCDC, multinomial bayes, and decision tree
    # linearSVC was best with 42% accuracy
    linear_clf = LinearSVC(class_weight='balanced')
    meme_label_codes = list(set(y.astype(int)))
    # print(meme_label_codes)
    meme_label_dict = {meme_label_codes[i]: le.inverse_transform([meme_label_codes[i]]) for i in range(0, len(meme_label_codes))}

    print('Running LinearSVC Classifier')
    linear_clf.fit(x_train, y_train)
    y_pred = linear_clf.predict(x_test)
    predictions = [meme_label_dict[int(pred)] for pred in y_pred]
    test_vals = [meme_label_dict[int(true)] for true in y_test]
    print("Accuracy: " + str(round(accuracy_score(test_vals, predictions), 5)))
    return linear_clf, tfidf


def save_files(model, vectorizer):
    pickle.dump(model, open("classifier5.pickle", "wb"))
    pickle.dump(vectorizer, open("vectorizer5.pickle", "wb"))
    # pickle.dump(le, open('label_encoder.pickle', 'wb'))
    # see load_and_use_classifier.py for example usage


def main():
    global le
    # le = preprocessing.LabelEncoder()
    le = pickle.load(open('label_encoder.pickle', 'rb'))

    # get reference data
    ref_df = pd.read_csv('memes_reference_data.tsv', sep="\t", header=0)

    # use the samples to train the model
    sample_df = pd.read_csv('memes_data.tsv', sep="\t", header=0)
    sample_df['MemeLabel'] = le.transform(sample_df.MemeLabel.values)  # encode labels
    ref_df['MemeLabel'] = le.transform(ref_df.MemeLabel.values)  # encode ref labels
    ref_df_filtered = ref_df[ref_df.StandardTextBox == 5]['MemeLabel']
    sample_df = sample_df[sample_df.MemeLabel.isin(ref_df_filtered)]  # filter to num captions
    print(ref_df_filtered)
    print(len(sample_df.index), 'Samples')
    x = sample_df['CaptionText'].astype('U')
    y = sample_df['MemeLabel'].astype('U')
    model, vectorizer = train_model(x, y)
    save_files(model, vectorizer)


if __name__ == "__main__":
    main()
    sys.exit()
