import pickle

with open("chat_log.pickle", "rb") as p:
	log = pickle.load(p)

print(log)
