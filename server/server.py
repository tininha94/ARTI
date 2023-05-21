# -*- coding: utf-8 -*-
import os
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from flask_cors import CORS

import wfdb
import pandas as pd
import numpy as np
import json
from tensorflow.keras.models import load_model

UPLOAD_FOLDER = 'resources'
MODEL_PATH = UPLOAD_FOLDER + '/model/mymodel.h5'
FILE_PATH = UPLOAD_FOLDER + '/file'
ALLOWED_EXTENSIONS = set(['dat'])

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def isFileAllowed(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predictSignal():
    # Load the model 
    model = load_model(MODEL_PATH)

    signals = getSignals()

    predictionResult = model.predict(signals)
    predictionResult = np.argmax(predictionResult, axis=1)
    anotationsCount = np.array(np.unique(predictionResult, return_counts=True)).T

    return anotationsCount

def getSignals():
    total_sample = wfdb.rdsamp(FILE_PATH, channels=[0])
    samplesAmount = len(total_sample[0])//187
    relativeSampleStart = 0
    relativeSampleEnd = 187

    for i in range(samplesAmount):
        record = wfdb.rdsamp(FILE_PATH, sampfrom=relativeSampleStart, sampto=relativeSampleEnd, channels=[0])
        record = normalizeSignal(record)

        #storaging record data in dataframes 
        currentDataFrame = pd.DataFrame(record[0])
        currentDataFrame = currentDataFrame.T

        if(i == 0):
            totalDataFrame = currentDataFrame
        else:
            totalDataFrame = pd.concat([totalDataFrame, currentDataFrame])

        relativeSampleStart += 187
        relativeSampleEnd += 187

    signals = totalDataFrame.iloc[:,:187].values

    return signals
    
def normalizeSignal(record):
    # Normalizing the signal around 0
    maxSignalValue = record[0].max()
    minSignalValue = record[0].min()

    for i in range(len(record[0])):
        normalizedValue = (record[0][i] - minSignalValue) / (maxSignalValue - minSignalValue)
        record[0][i] = normalizedValue

    return record

class UploadFiles(Resource):
    def post(self):
        if 'file' not in request.files:
            return make_response(jsonify({"message":"Arquivo obrigatório!"}), 500) 
        file = request.files['file']
        if file and isFileAllowed(file.filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "file.dat"))
            return make_response(jsonify({"message":"Upload realizado com sucesso!"}), 200) 

class GetResult(Resource):
    def get(self):
        anotationsCount = predictSignal()
        anotationsCountList = anotationsCount.tolist()
        return make_response(jsonify({"message": json.dumps(anotationsCountList)}), 200) 

api.add_resource(UploadFiles, '/') 

api.add_resource(GetResult, '/result') 

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)