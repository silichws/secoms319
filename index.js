fetch('./lastReading.json')
.then(reponse=>reponse.json())
.then(lastReading => loadReading(lastReading));

function loadReading(lastReading)
{
	let tempReading = document.getElementById("tempReading");
	let humReading = document.getElementById("humidityReading");
	let lastReadElement = document.getElementById("lastRead");
	


	let currentTemp = lastReading.temp;
	let lastTime = lastReading.time;
	let humidity = lastReading.humidity;

	lastReadElement.textContent = `Last recorded temperature taken at:  ${lastTime} cst`;
	tempReading.textContent = `${currentTemp}\xB0F`;
	humReading.textContent = `${humidity}%`;
	// console.log(currentTemp);
}



