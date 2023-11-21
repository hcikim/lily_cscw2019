#!/usr/bin/env python
# coding: utf-8

import pickle, time
from scipy import spatial
from multiprocessing import Pool
from bert_serving.client import BertClient
from functools import partial

def func1(given, vec):
    return 1 - spatial.distance.cosine(given, vec)

if __name__ == '__main__':


	with open('./data/s2v_features.pickle', 'rb') as pkl:
	    features = pickle.load(pkl)
	with open('./data/setted_lyrics.pickle', 'rb') as f:
	    lyrics = pickle.load(f)
	print('head')
	bc = BertClient()
	print('T')
	
	test_features = bc.encode(["I feel good"])	
	ts = time.time()
	pool = Pool(processes=16)
	func = partial(func1, test_features[0])
	sims = pool.map(func, features)
	pool.close()
	pool.join()
	time4cal = time.time() - ts
	print(time4cal)
	result = sorted(zip(sims, lyrics), reverse=True)[:5]

	a = []
	for tup in result:
		if tup[0] != 1.0:
			a.append(tup[1])
	print(a)

