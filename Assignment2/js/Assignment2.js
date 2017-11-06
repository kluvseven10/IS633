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
			}
		}
	};
	xhttp.open("GET", "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers", true);
	xhttp.send();
}

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