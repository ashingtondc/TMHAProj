/**
 * 
 */
src='./tabletop.js'
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1E2as8VjUNbvP-h73a6Jd2m6P29dBo49WE8stIEoNA60/edit?usp=sharing';
let region;
let city;
let care;
let subtypes = [];

function process() 
{
	subtypes = [];
	//window.location.href = './display.html';
	region = document.getElementById("region").value;
	city = document.getElementById("city").value;
	care = document.getElementById("care").value;
	let sb1 = document.getElementById("subtypes1").children;
	let sb2 = document.getElementById("subtypes2").children;
	for (let sb of sb1)
	{
		if (sb.checked)
		{
			subtypes.push(sb.value);
		}
	}
	for (let sb of sb2)
	{
		if (sb.checked)
		{
			subtypes.push(sb.value);
		}
	}
	console.log(subtypes);
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
  let totalResults = 0;
  for (i = 0; i < headers.length; i++)
  {
	  let cell = document.createElement('th');
	  //let cell = headerRow.insertCell(i);
	  cell.innerHTML = "<b>" + headers[i].toUpperCase() + "</b>";
	  headerRow.appendChild(cell);
  }
  stuff.forEach(function(house)
  {
	  if (house.Location.toLowerCase().includes(city.toLowerCase()) && house.Type_of_Care.includes(care))
	  {
		  let hasSubtypes = true;
		  for (let type of subtypes)
		  {
			  console.log(type);
			  let other = type;
			  other = other.toLowerCase();
			  
			  if (!house.Sub_Types.toLowerCase().includes(type))
			  {
				  hasSubtypes = false;
			  }
		  }
		  if (hasSubtypes)
		  {
			  totalResults++;
			  let values = Object.values(house);
			  let newRow = table.insertRow();
			  for (let val of values)
			  {
				  let newCell = newRow.insertCell();
				  newCell.innerHTML = val;
			  }
		  }
	  }
  })
  
  
  
  let lastDiv = document.body.childNodes[document.body.childNodes.length - 2];
  let divStuff = lastDiv.childNodes[0];
  lastDiv.replaceChild(table, divStuff);
  let countElement = document.createElement('h5');
  countElement.innerHTML = "Results: " + totalResults;
  header.insertBefore(countElement, headerRow);

  var ExportButtons = document.getElementById('results');

  var instance = new TableExport(ExportButtons, {
      formats: ['csv'],
      exportButtons: false
  });

//                                          // "id" of selector    // format
  var exportData = instance.getExportData()['results']['csv'];

  var XLSbutton = document.getElementById('export');

  XLSbutton.disabled = false;
  XLSbutton.className ='button';
  $('#export').off('click');
  $('#export').on('click', function (e) {
      //                   // data          // mime              // name              // extension
      instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
  });
  /**
  XLSbutton.removeEventListener('click', function (e) {
      //                   // data          // mime              // name              // extension
      instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
  });
  XLSbutton.addEventListener('click', function (e) {
      //                   // data          // mime              // name              // extension
      instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
  });
  **/
  //XLSbutton.scrollIntoView();
  $('html, body').animate({
	     scrollTop: $('#scroll').offset().top
	}, 750);
  //console.log(stuff[0].Location);
  //console.log(data);
}
window.addEventListener('DOMContentLoaded', init)