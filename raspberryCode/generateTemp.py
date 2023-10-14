#### 
# This is the code that is set as a Cron job to collect data periodically and write the json to a file.
#
# When running on raspberry pi, it will update the files that this reads from
# 
#The commented out lines are for things I was doing on my pi and I will probably remove before I turn in
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
		
		temp_data = "Temp: "+  str(temperature_f)+ " F | "+ str(humidity) + "%"
		# print(temp_data)

		# print(temp_celsius)
		# print(cpu_temp_f)
		# output to file
		timestamp = datetime.now().strftime("%Y-%b-%d-%H:%M:%S")
		entriesValue = "{\"id\": \"" + timestamp + "\", \"temp\":\"" + str(temperature_f)+ " \",  \"humidity\": \""+ str(humidity) + "\"}," + "\n"

		# with open("cron.txt", "a") as file:
		# 	file.write(entriesValue)
		
		#Write the latest value
		with open("latest.json", "w") as file:
			timestamp = datetime.now().strftime("%Y-%b-%d-%H:%M")
			file.write("{\n\t\"time\": \"" + timestamp + "\",\n\t\"temp\":\"" + str(temperature_f)+ " \",\n\t\"humidity\": \""+ str(humidity) + "\"\n}" + "\n")

		#append to the end of our file
		with open('entries.json', 'r') as file:
			lines = file.readlines()
		lines.insert(2, "\t\t" + entriesValue)

		with open('entries.json', 'w') as file:
			file.writelines(lines)
		
		# command = "vcgencmd measure_temp"
		# try:
		# 	temp_celsius = subprocess.check_output(command, shell=True, text=True)
		# 	temp_celsius = float(temp_celsius.strip().split("=")[1].split("'")[0])
		# 	cpu_temp_f = round((temp_celsius * 9/5) + 32, 1)
		# except subprocess.CalledProcessError as e:
		# 	# Handle any errors or exceptions here, if the command fails
		# 	# print("Command failed with error:", e)
		# 	temp_celsius = "error"
		# 	cpu_temp_f = "error"
		# with open("logs.txt", "a") as file:
		# 	timestamp = datetime.now().strftime("%Y-%b-%d %H:%M:%S")
		# 	file.write(timestamp + " Outside: " + str(temp_data) + " | Running at: " + str(cpu_temp_f) + " F / " + str(temp_celsius) + " C"+ "\n")

		break
	except RuntimeError as error:
		# Errors happen fairly often, DHT's are hard to read, just keep going
		# print("Error:", error.args[0], " Trying again")
		continue
print("done");

