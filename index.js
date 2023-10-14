fetch('./lastReading.json')
	.then(reponse => reponse.json())
	.then(lastReading => loadReading(lastReading));

function loadReading(lastReading) {
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


	fetch('./data.json')
		.then(reponse => reponse.json())
		.then(myplants => plantData(myplants));

	function plantData(myPlants) {
		var imgPlant1 = document.getElementById("imgPlant1");
		var imgPlant2 = document.getElementById("imgPlant2");
		var imgPlant3 = document.getElementById("imgPlant3");
		var txtPlant1 = document.getElementById("txtPlant1");
		var txtPlant2 = document.getElementById("txtPlant2");
		var txtPlant3 = document.getElementById("txtPlant3");

		for (var i = 0; i < myPlants.plants.length; i++) {
			let name = myPlants.plants[i].name;
			let humRange = myPlants.plants[i].humRange;
			let tempRange = myPlants.plants[i].tempRange;
			let src = myPlants.plants[i].src;
			console.log(myPlants.plants[i]);
			let imgPlant = document.createElement("div");
			imgPlant.innerHTML = `<img src=${src} class="card-img-top" alt="..."></img>`;
			let txtPlant = document.createElement("p");
			txtPlant.innerHTML = `<p class="card-text"> <strong>${name}</strong> <br>
			Temperature Range: ${humRange}<br>
			Humidity Range: ${tempRange}
			</p>`;
		
			if (myPlants.plants[i].name === "Snake Plant") {
				imgPlant1.appendChild(imgPlant);
				txtPlant1.appendChild(txtPlant);
			} else if (myPlants.plants[i].name === "Widow's-thrill") {
				imgPlant2.appendChild(imgPlant);
				txtPlant2.appendChild(txtPlant);
			} else if (myPlants.plants[i].name === "Peace Lily") {
				imgPlant3.appendChild(imgPlant);
				txtPlant3.appendChild(txtPlant);
			}
		}
		// Toggle Avengers button :
		var toggleButton1 = document.getElementById("toggleCardButton1");
		var card1 = document.getElementById("card1");
		var collapsableCard1 = new bootstrap.Collapse(card1, { toggle: false });


		toggleButton1.addEventListener("click", function () {
			collapsableCard1.toggle();
		});


		var toggleButton2 = document.getElementById("toggleCardButton2");
		var card2 = document.getElementById("card2");
		var collapsableCard2 = new bootstrap.Collapse(card2, { toggle: false });


		toggleButton2.addEventListener("click", function () {
			collapsableCard2.toggle();
		});

		var toggleButton3 = document.getElementById("toggleCardButton3");
		var card3 = document.getElementById("card3");
		var collapsableCard3 = new bootstrap.Collapse(card3, { toggle: false });


		toggleButton3.addEventListener("click", function () {
			collapsableCard3.toggle();
		});


		var toggleButton4 = document.getElementById("toggleCardButton4");
		var card4 = document.getElementById("card4");
		var collapsableCard4 = new bootstrap.Collapse(card4, { toggle: false });


		toggleButton4.addEventListener("click", function () {
			collapsableCard4.toggle();
		});
	}
}



