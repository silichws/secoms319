fetch('./data.json')
.then(reponse=>reponse.json())
.then(data => loadData(data));



function loadData(data)
{
	let tempData = [];
	let humData = [];
	for (var i = data.entries.length - 1; i >= 0; i--) {
		tempData.push(data.entries[i].temp);
		humData.push(data.entries[i].humidity);
	}

	new Chart("myChart", {
		type: "line",
		data: {
		  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].reverse(),
		  datasets: [ { 
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
		  legend: {display: false}
		}
	  });
}