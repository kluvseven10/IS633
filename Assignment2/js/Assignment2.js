// Simulate Web Service, getAllCustomers
function getAllCust()
{
	var storenames = document.getElementById("storenames");
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var data = JSON.parse(this.response);
			var placeholder = document.getElementById("listresults");
			console.log(data);
			for(var i = 0; i < data.GetAllCustomersResult.length; i++)
			{
				placeholder.innerHTML += 
					"<tr>" + 
						"<td> <a href='javascript:AutoSearch();getStoreSalesTotal(\""+ data.GetAllCustomersResult[i].CustomerID +"\");'>"
						+ data.GetAllCustomersResult[i].CustomerID + "</a></td>" + 
						"<td>" + data.GetAllCustomersResult[i].CompanyName + "</td>" +
						"<td>" + data.GetAllCustomersResult[i].City + "</td>" +
					"</tr>";
					/*var count=0;
					var custid = "";
					var compname = "";
					var city = "";
	{
						custid = result.GetAllCustomersResult[count].CustomerID;
						compname = '<a href="javascript:getStoreSalesTotal(' + "'" + custid + "');" + '">';
						compname += result.GetAllCustomersResult[count].CustomerID;
						compname += '</a>';
						city = result.GetAllCustomersResult[count].City;
						display +="<tr><td>" + custid + "</td><td>" + companyname + "</td><td>" + city + "</td><tr>";
							{
							display +="</table>";
							document.getElementById("listing").innerHTML=display;
							}
						}*/	
			}
		}
	};
	xhttp.open("GET", "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers", true);
	xhttp.send();
}
/*
//Anchor link: <a href="javascript:[enter function]("parameter');'>

<a href="javascript:getStoreSalesTotal(' + "'" + custid + "');" + '">';
custname += result.GetCustomerOrderHistoryResult[count].CustomerID;
*/

// Simulate Web Service, getCustomerOrderHistory
function getStoreSalesTotal(searchcriteria)
{
	var placeholder = document.getElementById("saleresults").innerHTML = '';
	if (searchcriteria==null)
	searchcriteria = document.getElementById("searchcriteria").value;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			console.log(this);
			var data = JSON.parse(this.response);
			var placeholder = document.getElementById("saleresults");
			for(var i = 0; i < data.length; i++)
			{
				placeholder.innerHTML += 
					"<tr>" + 
						"<td>" + data[i].ProductName + "</td>" +
						"<td>" + data[i].Total + "</td>" +
					"</tr>";
			}
		}
	};
	xhttp.open("GET", "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/" + searchcriteria, true);
	xhttp.send();
}
/*
function getAllCust2(){
	var storenames = document.getElementById("storenames");
	storenames.innerHTML = "<option value='default'>Select store...</option>";
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var placeholder = document.getElementById("listresults");
			for(var i = 0; i < data.GetAllCustomersResult.length; i++){
				storenames.innerHTML +=
							"<option value='" + data.GetAllCustomersResult[i].CompanyName + "'>"
							+ data.GetAllCustomersRestult[i].CompanyName + "</option>";
			}
		}
	};
	xhttp.open("GET", "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers", true);
	xhttp.send();
}

/*function getStoreSalesTotal2(storename){
	console.log(storename);
	var placeholder = document.getElementById("saleresults").innerHTML = '';
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this);
			var data = JSON.parse(this.response);
			var placeholder = document.getElementById("saleresults");
			for(var i = 0; i < data.length; i++){
				placeholder.innerHTML += 
					"<tr>" + 
						"<td>" + data[i].BookName + "</td>" +
						"<td>" + data[i].SaleNumber + "</td>" +
					"</tr>";
			}
		}
	};
	xhttp.open("GET", "https://student.business.uab.edu/webappservice/service1.svc/getStoreSalesTotal/" + storename, true);
	xhttp.send();
}
*/

function AutoSearch()
{
	var section = document.getElementById("dropdown");
	section.value = "sales";
	ShowSection("sales");
}

function back()
{
	var section = document.getElementById("dropdown");
	section.value = "listing";
	ShowSection("listing");
}

function ShowSection(sectionName){
	ResetSections();
	if(sectionName == 'default') return; // if no option is selected, then do nothing
	// show selected section based on select option
	var section = document.getElementById(sectionName);
	section.style.display='block';
	if(sectionName == 'listing') getAllCust();
	//if(sectionName == 'sales') getAllCust2();
}

function ResetSections(){
	// hide the listings section
	var listing = document.getElementById("listing");
	if(listing !== null){
		listing.style.display='none';
	}
	// hide the sales section
	var sales = document.getElementById("sales");
	if(sales !== null){
		sales.style.display='none';
	}
	// hide the about section
    var about = document.getElementById("about");
    if(about !== null){
        about.style.display='none';
    }
    
    
	var placeholder = document.getElementById("listresults").innerHTML = '';
	var placeholder = document.getElementById("saleresults").innerHTML = '';
	var placeholder = document.getElementById("searchcriteria").value = '';
}