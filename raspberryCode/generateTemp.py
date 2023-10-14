#### 
# This is the code that is set as a Cron job to collect data periodically and write the json to a file.
#
# When running on raspberry pi, it will update the files that this reads from. Still needs help formatting...
#
####

import time
import board
import adafruit_dht
import subprocess
from datetime import datetime

#Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT22(board.D4)
while True: # Will go until it gets a valid reading to log
	try:
		# Print the values to the serial port
		temperature_c = dhtDevice.temperature
		temperature_f = round(temperature_c * (9 / 5) + 32, 1)
		humidity = dhtDevice.humidity
		
		# temp_data = "Temp: "+  str(temperature_f)+ " F | "+ str(humidity) + "%"

		# output to file
		with open("fileToWriteTo.json", "a") as file:
			timestamp = datetime.now().strftime("%Y-%b-%d-%H:%M:%S")
			file.write("{\"id\": \"" + timestamp + "\", \"temp\":\"" + str(temperature_f)+ " \",  \"humidity\": \""+ str(humidity) + "\"}," + "\n")
		break
	except RuntimeError as error:
		# Errors happen fairly often, DHT's are hard to read, just keep going
		# print("Error:", error.args[0], " Trying again")
		continue
print("done");
