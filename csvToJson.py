# csvToJson.py
# Caroline Wu
# run this file to change a csv file into json format for firebase

import pandas as pd
import json

# import data from csv file
data = pd.read_csv('intentAll_1Aug2017.csv', nrows=2424)
results = {}
inner1 = {}
inner2 = {}

prevPhase = ""
prevTS = ""

for index, row in data.iterrows():
	# add inner2 data once task intention changes
	if(prevTS != row["Task_intention"]):
		if(inner2):
			inner1[prevTS] = inner2
		inner2 = {}
	# add inner1 data once phase changes
	if(prevPhase != row["Phase"]):
		if(inner1):
			results[prevPhase] = inner1
		inner1 = {}

	# create dictionary entry for each utterance
	obj = {"author" : "Unknown",
		   "date" : "12/6/17",
		   "SSML" : row["SSML"],
		   "text" : row["Sentence_text"]
		   }
	inner2[row["Social_strategy"]] = obj
	prevPhase = row["Phase"]
	prevTS = row["Task_intention"]

# add last inner2 data
if(inner2):
	inner1[prevTS] = inner2

# add last inner1 data
if(inner1):
	results[prevPhase] = inner1

# print out data in json format
print json.dumps(results, indent=4)