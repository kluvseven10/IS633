function CustomerSelection(ID){
	var sectionSelector = document.getElementById('sectionSelector');
	if(sectionSelector.value == 'default') return;
	
	if(sectionSelector.value == 'customerOrder') {
		getCustomerOrders(ID);
	}
	if(sectionSelector.value == 'orderHistory') {
		getCustomerOrderHistory(ID);
	}
	if(sectionSelector.value == 'orderEdit') {
		ResetOrderEditForm();
	}
	if(selectionSelector.value == 'addcust') {
		ResetCustomerAddForm();
	}
}

function DisplayCustomerSelector(){
	fillCustomerSelect();
	document.getElementById('customerSelection').style.display = 'block';
}

function DisplayCustomerSelector2(){
	fillCustomerSelectID();
	document.getElementById('customerSelection2').style.display = 'block';
}

function DisplaySectionTitle(){
	document.getElementById('sectionHeader').style.display = 'block';
	var sectionTitle = document.getElementById('sectionTitle');
	var sectionSelector = document.getElementById('sectionSelector');
	sectionTitle.innerHTML = sectionSelector.options[sectionSelector.selectedIndex].text;
}

function ResetCustomerAddForm(){
	var newID = document.getElementById('newID');
	newID.value = '';
	var newName = document.getElementById('newName');
	newName.value = '';
	var newCity = document.getElementById('newCity');
	newCity.value = '';
}

function ResetOrderEditForm(){
	var OrderID = document.getElementById('OrderID');
	OrderID.value = '';
	var ShipName = document.getElementById('ShipName');
	ShipName.value = '';
	var ShipAddress = document.getElementById('ShipAddress');
	ShipAddress.value = '';
	var ShipCity = document.getElementById('ShipCity');
	ShipCity.value = '';
	var ShipPostcode = document.getElementById('ShipPostcode');
	ShipPostcode.value = '';
}

function ResetSections(){
	// Hide ALL sections
	var sections = document.getElementsByTagName('section');
	for(var i = 0; i < sections.length; i++){
		sections[i].style.display = 'none';
	}
	document.getElementById('backButton').style.display = 'none';
	document.getElementById('filters').style.display = 'block';
}

function ShowSection(sectionName){
	document.getElementById('sectionSelector').value = sectionName;
	ResetSections();
	if(sectionName == 'default') return;
	
	// Display selected section
	document.getElementById(sectionName).style.display = 'block';
	if(sectionName == 'customerListing') {
		var customerRecord = document.getElementById('customerRecord');
		customerRecord.innerHTML = '';
		DisplaySectionTitle();
		getAllCustomers();
		}
	if(sectionName == 'customerOrder') {
		var customerOrders = document.getElementById('customerOrders');
		customerOrders.innerHTML = '';
		DisplaySectionTitle();
		document.getElementById('backButton').style.display = 'block';
		DisplayCustomerSelector();
		DisplayCustomerSelector2();
	}
	if(sectionName == 'orderHistory') {
		var customerOrderHistory = document.getElementById('customerOrderHistory');
		customerOrderHistory.innerHTML = '';
		DisplaySectionTitle();
		document.getElementById('backButton').style.display = 'block';
		DisplayCustomerSelector();
		DisplayCustomerSelector2();
	}
	if(sectionName == 'orderEdit') {
		var sectionTitle = document.getElementById('sectionTitle');
		document.getElementById('filters').style.display = 'none';
		document.getElementById('sectionHeader').style.display = 'block';
		sectionTitle.innerHTML = 'Edit Customer Order';
	}
	if(sectionName == 'addcust') {
		var sectionTitle = document.getElementById('sectionTitle');
		document.getElementById('filters').style.display = 'none';
		document.getElementById('sectionHeader').style.display = 'block';
		sectionTitle.innerHTML = 'Add New Customer';
	}
}

/* WEB SERVICES */
/*COMPANY NAME DROPDOWN*/
function fillCustomerSelect(){
	var customerNames = document.getElementById('customerNames');
	customerNames.innerHTML = '';
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			customerNames.innerHTML = '<option value="default">Select one...</option>';
			for(var i = 0; i < data.GetAllCustomersResult.length; i++){
				if(data.GetAllCustomersResult[i].CompanyName.length > 0){
					customerNames.innerHTML +=
							'<option value="' + data.GetAllCustomersResult[i].CustomerID + '">'
							+ data.GetAllCustomersResult[i].CompanyName + '</option>';
				}
			}
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers', true);
	xhttp.send();
}

/*CUSTOMER ID DROPDOWN*/
function fillCustomerSelectID(){
	var customerIDs = document.getElementById('customerIDs');
	customerIDs.innerHTML = '';
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			customerIDs.innerHTML = '<option value="default">Select one...</option>';
			for(var i = 0; i < data.GetAllCustomersResult.length; i++){
				if(data.GetAllCustomersResult[i].CustomerID.length > 0){
					customerIDs.innerHTML +=
							'<option value="' + data.GetAllCustomersResult[i].CustomerID + '">'
							+ data.GetAllCustomersResult[i].CustomerID + '</option>';
				}
			}
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers', true);
	xhttp.send();
}



function getAllCustomers(){
	var customerRecord = document.getElementById('customerRecord');
	customerRecord.innerHTML = '';
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			for(var i = 0; i < data.GetAllCustomersResult.length; i++){
				if(data.GetAllCustomersResult[i].CompanyName.length > 0){
					customerRecord.innerHTML += 
					'<tr>' + 
						'<td>' + data.GetAllCustomersResult[i].CustomerID + '</td>' +
						'<td>' + data.GetAllCustomersResult[i].CompanyName + '</td>' +
						'<td>' + data.GetAllCustomersResult[i].City + '</td>' +
						'<td style="text-align: center;">' +
							'<input class="tableButton" type="button" value="Current" onclick="ShowSection(\'customerOrder\');getCustomerOrders(\'' + data.GetAllCustomersResult[i].CustomerID + '\');" />' +
							'<input class="tableButton" type="button" value="History" onclick="ShowSection(\'orderHistory\');getCustomerOrderHistory(\'' + data.GetAllCustomersResult[i].CustomerID + '\');" />' +
						'</td>' +
						'<td style="text-align; center;">' +
							'<input class="tableButton" type="button" value="Delete" onclick="deleteCust(\'' + data.GetAllCustomersResult[i].CustomerID + '\');" />' +
						'</td>' +
					'</tr>';
				}
			}
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers', true);
	xhttp.send();
}


	

//DELETE CUSTOMER LINK/BUTTON ON CUSTOMER LISTING PAGE
function deleteCust(customerID){
	var custName = document.getElementById('deleteCust');
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			if(data.DeleteCustomerResult.WasSuccessful == "1"){
				alert("Confirm to delete customer");
				getAllCustomers();
			}
			else
			{
				alert("Customer was not deleted");
			}
			
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/' + customerID, true);
	xhttp.send();
}


//ADD A NEW CUSTOMER
function createCust(){
	var newID = document.getElementById('newID');
	var newName = document.getElementById('newName');
	var newCity = document.getElementById('newCity');
	var newRecord = {"CustomerID":newID.value, "CompanyName":newName.value, "City":newCity.value};
	console.log(newRecord);
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			if(data.WasSuccessful == "1"){
				alert("Customer was created");
				ShowSection('customerListing');
			}
			else
			{
				alert("Customer failed to be created");
				ShowSection('customerListing');
			}
		}
	};
	xhttp.open('POST', 'https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer', true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttp.send(JSON.stringify(newRecord));
}

//GETCUSTCURRENT ORDERS
function getCustomerOrders(customerID){
	var customerOrders = document.getElementById('customerOrders');
	customerOrders.innerHTML = '';
	if(customerID == 'default') return;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			for(var i = 0; i < data.GetOrdersForCustomerResult.length; i++){
				if(data.GetOrdersForCustomerResult[i].ShipAddress.length > 0){
					customerOrders.innerHTML += 
					'<tr>' + 
						'<td>' + data.GetOrdersForCustomerResult[i].OrderID + '</td>' +
						'<td>' + data.GetOrdersForCustomerResult[i].ShipName + '</td>' +
						'<td>' + data.GetOrdersForCustomerResult[i].ShipAddress + '</td>' +
						'<td>' + data.GetOrdersForCustomerResult[i].ShipCity + '</td>' +
						'<td>' + data.GetOrdersForCustomerResult[i].ShipPostcode + '</td>' +
						'<td style="text-align: center;">' +
							'<input class="tableButton" type="button" value="Edit" onclick="ShowSection(\'orderEdit\');getCustomerOrderInfo(\'' + data.GetOrdersForCustomerResult[i].OrderID + '\');" />' +
						'</td>' +
					'</tr>';
				}
			}
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/' + customerID, true);
	xhttp.send();
}

function getCustomerOrderHistory(customerID){
	var customerOrderHistory = document.getElementById('customerOrderHistory');
	customerOrderHistory.innerHTML = '';
	if(customerID == 'default') return;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			for(var i = 0; i < data.length; i++){
				customerOrderHistory.innerHTML += 
					'<tr>' + 
						'<td>' + data[i].ProductName + '</td>' +
						'<td>' + data[i].Total + '</td>' +
					'</tr>';
			}
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/' + customerID, true);
	xhttp.send();
}

function getCustomerOrderInfo(orderID){
	if(orderID == 'default') return;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			document.getElementById('OrderID').value = data[0].OrderID;
			document.getElementById('ShipName').value = data[0].ShipAddress;
			document.getElementById('ShipAddress').value = data[0].ShipCity;
			document.getElementById('ShipCity').value = data[0].ShipName;
			document.getElementById('ShipPostcode').value = data[0].ShipPostcode;
		}
	};
	xhttp.open('GET', 'https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/' + orderID, true);
	xhttp.send();
}



function updateOrderAddress(){
	var OrderID = document.getElementById('OrderID');
	var ShipAddress = document.getElementById('ShipAddress');
	var ShipCity = document.getElementById('ShipCity');
	var ShipName = document.getElementById('ShipName');
	var ShipPostcode = document.getElementById('ShipPostcode');
	var UpdateRecord = {"OrderID":OrderID.value, "ShipAddress":ShipAddress.value, "ShipCity":ShipCity.value, "ShipName":ShipName.value, "ShipPostCode":ShipPostcode.value};
	console.log(UpdateRecord);
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			console.log(data);
			switch(data)
			{
				case 1:
					alert("Order was updated");
					break;
				case 0:
					alert("Order failed to update");
					break;
				case -2:
					alert("Order failed to update - The data string supplied could not be deserialized into the service object");
					break;
				case -3:
					alert("Order failed to update - A record with the supplied identifier could not be found");
					break;
			}
			ShowSection('customerListing');
		}
	};
	xhttp.open('POST', 'https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress', true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttp.send(JSON.stringify(UpdateRecord));
}
