/**
 * 
 */
src='https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js'
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1U-j5z1X88miWur9b2I-RkD5W9zl1_7SVTND93ToX6Yo/edit?usp=sharing';
let region;
let city;
let care;

function process() 
{
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
  alert('Successfully processed!')
  let sheet = tabletop.sheets(region);
  let stuff = sheet.all();
  console.log(sheet.prettyColumns);
  stuff.forEach(function(house)
  {
	  if (house.Location.includes(city) && house.Type_of_Care.includes(care))
	  {
		  console.log(house);
		  let tr;
		  tr += ("<td>" + house.Location + "</td>");
	  }
  })
  //console.log(stuff[0].Location);
  //console.log(data);
}

window.addEventListener('DOMContentLoaded', init)