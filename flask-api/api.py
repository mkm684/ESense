import flask
from flask import request, jsonify
import requests
import json
import serial
import threading
import re
class temp(threading.Thread):
	def __init__(self):
	    threading.Thread.__init__(self)
	    self.latest_temp = 11
	    try:
	    	self.ser = serial.Serial('/dev/ttyACM0',9600)
	    except  Exception as e:
	    	self.ser = serial.Serial('/dev/ttyACM1',9600)
	    finally:
	    	print("connection to Esense device failed")

	def run(self):
		while True:
			try:
				ser_out = self.ser.readline()
			except Exception as e:
				print("problem with reading the data")
			ser_out_char = re.findall(r'\d+', ser_out)
			ser_out_int = [int(s) for s in ser_out_char[0].split() if s.isdigit()]
			self.latest_temp = ser_out_int[0]


temp_obj = temp()
app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/result', methods = ['GET', 'POST'])
def result():
    if request.method == 'GET':
    	return jsonify(temp_obj.latest_temp)

temp_obj.start()
app.run()


