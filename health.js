fetch('./entries.json')
	.then(reponse => reponse.json())
	.then(data => loadData(data));

function updateDisplayedImage(temperature, humidity) {
	console.log(temperature);
	console.log(humidity);
	fetch('./data.json')
		.then(reponse => reponse.json())
		.then(health => healthData(health));
	function healthData(health) {
		const infoDiv = document.getElementById("infoDiv");
		const humImage = document.getElementById("humImage");
		const humType = document.getElementById("humType");
		const humDes = document.getElementById("humDes");
		const humid = document.getElementById("humid");
		let showCom = true;
		if (humidity > 60) {
			humImage.src = health.wet.src;
			humType.textContent = health.wet.type;
			humDes.textContent = health.wet.description;
			humid.style.display = "block";
			showCom = false;
		} else if (humidity < 30) {
			humImage.src = health.dry.src;
			humType.textContent = health.dry.type;
			humDes.textContent = health.dry.description;
			humid.style.display = "block";
			showCom = false;
		}
		else {
			humid.style.display = "none";
		}

		const tempImage = document.getElementById("tempImage");
		const tempType = document.getElementById("tempType");
		const tempDes = document.getElementById("tempDes");
		const temp = document.getElementById("temp");
		if (temperature > 75) {
			tempImage.src = health.hot.src;
			tempType.textContent = health.hot.type;
			tempDes.textContent = health.hot.description;
			temp.style.display = "block";
			showCom = false;
		} else if (temperature < 65) {
			tempImage.src = health.cold.src;
			tempType.textContent = health.cold.type;
			tempDes.textContent = health.cold.description;
			temp.style.display = "block";
			showCom = false;
		}
		else {
			temp.style.display = "none";
		}

		const comfortImage = document.getElementById("comfortImage");
		const comfortType = document.getElementById("comfortType");
		const comfortDes = document.getElementById("comfortDes");
		const comfort = document.getElementById("comfort");
		if (showCom)
		{
			comfortImage.src = health.comfortable.src;
			comfortType.textContent = health.comfortable.type;
			comfortDes.textContent = health.comfortable.description;
			comfort.style.display = "block";
		}
		else
		{
			comfort.style.display = "none";
		}

		infoDiv.style.display = "block";
	}

}

function loadData(data) {
	let tempData = [];
	let humData = [];
	for (var i = data.entries.length - 1; i >= 0; i--) {
		tempData.push(data.entries[i].temp);
		humData.push(data.entries[i].humidity);
	}
	  
	let labelsArr = Array.from({ length: data.entries.length }, (_, index) => data.entries.length - index);

	new Chart("myChart", {
		type: "line",
		data: {
			labels: labelsArr,
			datasets: [{
				data: tempData,
				borderColor: "green",
				fill: false
			}, {
				data: humData,
				borderColor: "blue",
				fill: false
			}]
		},
		options: {
			legend: { display: false },
			onClick: function (event, elements) {
				if (elements.length > 0) {
					let firstElement = elements[0];
					let datasetIndex = firstElement._datasetIndex;
					let index = firstElement._index;
					let temperature = this.data.datasets[datasetIndex].data[index];
					let humidity = this.data.datasets[1 - datasetIndex].data[index];
					updateDisplayedImage(temperature, humidity);
				}
			}
		}
	});
}