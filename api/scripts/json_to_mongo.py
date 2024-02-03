import sys
import os
current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)
from api.mongodb import mongo_client

import json
from dotenv import dotenv_values
from os import listdir

config = dotenv_values()

# Connect to MongoDB
client = mongo_client()
db = client[config["DB_NAME"]]
collection = db["lessons"]

# Get the list of JSON files in a directory
json_files_directory = f"{current}/json/"
json_files = [f for f in listdir(json_files_directory) if f.endswith(".json")]

# Iterate over each JSON file
for json_file in json_files:
    with open(json_files_directory + json_file, encoding="utf-8") as file:
        # Load the JSON data
        data = json.load(file)

        # Insert the data into the collection
        collection.insert_one(data)