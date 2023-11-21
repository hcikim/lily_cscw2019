from flask import Flask, request, jsonify

import pickle, random
from scipy import spatial
from multiprocessing import Pool
from bert_serving.client import BertClient
from functools import partial
from datetime import datetime


app = Flask(__name__, static_url_path='')
app._static_folder = "static"

@app.route('/', methods = ["GET"])
def index():

	tmp = request.url.split("?")[1]
	value = tmp.split("&")[0]
	types = tmp.split("&")[1]
	test = value + "here -----"

	now = datetime.now()
	timestamp = datetime.timestamp(now)
	dt_object = datetime.fromtimestamp(timestamp)
	temp  = initiate(value)
	js = jsonify(temp)

	try:
		with open("chat_log.pickle", "rb") as r:
			log = pickle.load(r)

		log["time"].append(dt_object)
		log["usr_input"].append(value)
		log["return"].append(js)

		with open("chat_log.pickle", "wb") as w2:
			pickle.dump(log, w2)

	except:
		log = {"time": [], "usr_input": [], "return": [], "result": []}
		log["time"].append(dt_object)
		log["usr_input"].append(value)
		log["return"].append(js)
		
		with open("chat_log.pickle", "wb") as w:
			pickle.dump(log, w)
		
	return js

def func1(given, vec):
    return 1 - spatial.distance.cosine(given, vec)

def initiate(line):
	with open('./features_last_rev.pickle', 'rb') as pkl:
	    features = pickle.load(pkl)
	with open('./lowercase_data_rev.pickle', 'rb') as f:
	    lyrics = pickle.load(f)
	print('H')
	bc1 = BertClient(ip='10.89.185.156')
	print('T')
	test_features = bc1.encode([line])
	
	pool = Pool(processes=16)
	func = partial(func1, test_features[0])
	sims = pool.map(func, features)
	pool.close()
	pool.join()

	result = sorted(zip(sims, lyrics), reverse=True)[:18]

	a = []
	for tup in result:
		if tup[0] != 1.0:
			a.append(tup[1])
	
	recommend = random.sample(a, 3)
	t = {}
	for i in range(len(recommend)):
		t[i] = a[i]

	return t


if __name__ == '__main__':
	app.run(debug=True)
	
	
