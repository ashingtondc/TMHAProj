/**
 * 
 */
src='./tabletop.js'
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1U-j5z1X88miWur9b2I-RkD5W9zl1_7SVTND93ToX6Yo/edit?usp=sharing';
let region;
let city;
let care;

function process() 
{
	//window.location.href = './display.html';
	region = document.getElementById("region").value;
	city = document.getElementById("city").value;
	care = document.getElementById("care").value;
	console.log(region + " " + city + " " + care);
	
	Tabletop.init( { key: publicSpreadsheetUrl,
        callback: showInfo,
        wanted: [region]
	} )
}

function init() {
  
}

function showInfo(data, tabletop) {
  //alert('Successfully processed!')
  let sheet = tabletop.sheets(region);
  let stuff = sheet.all();
  let headers = Object.keys(sheet.prettyColumns);
  let table = document.createElement('table');
  let header = table.createTHead();
  let headerRow = header.insertRow(0);
  let i;
  for (i = 0; i < headers.length; i++)
  {
	  let cell = headerRow.insertCell(i);
	  cell.innerHTML = "<b>" + headers[i].toUpperCase() + "</b>";
  }
  stuff.forEach(function(house)
  {
	  if (house.Location.includes(city) && house.Type_of_Care.includes(care))
	  {
		  let values = Object.values(house);
		  let newRow = table.insertRow();
		  for (let val of values)
		  {
			  let newCell = newRow.insertCell();
			  newCell.innerHTML = val;
		  }
	  }
  })
  document.body.appendChild(table);
  //console.log(stuff[0].Location);
  //console.log(data);
}

window.addEventListener('DOMContentLoaded', init)