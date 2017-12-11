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
	if(sectionName == 'geoLocation') {
		var geoLocation = document.getElementById('geoLocation');
		DisplaySectionTitle();
		document.getElementById('backButton').style.display = 'block';
	}
	if(sectionName == 'camera') {
		var cameraPic = document.getElementById('camera');
		DisplaySectionTitle();
		document.getElementById('backButton').style.display = 'block';
		}
	if(sectionName == 'contacts') {
		var contactList = document.getElementById('contacts');
		DisplaySectionTitle();
		document.getElementById('backButton').style.display = 'block';
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


function Location(){
	var geo=navigator.geolocation;
	if(geo){
		geo.getCurrentPosition(showPosition);
			}
			else{
				alert('Geolocation is not supported');
			}
		}

function showPosition(position){
	var latitude=position.coords.latitude;
	var longitude=position.coords.longitude;
	document.getElementById("latitude").innerHTML=latitude;
	document.getElementById("longitude").innerHTML=longitude;
	
}

var Latitude = undefined;
var Longitude = undefined;
 
// Get geo coordinates
 
function getMapLocation() {
 
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}
 
// Success callback for get geo coordinates
 
var onMapSuccess = function (position) {
 
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
 
    getMap(Latitude, Longitude);
 
}
 
// Get map by using coordinates
 
function getMap(latitude, longitude) {
 
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);
 
 
    var latLong = new google.maps.LatLng(latitude, longitude);
 
    var marker = new google.maps.Marker({
        position: latLong
    });
 
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}
 
// Success callback for watching your changing position
 
var onMapWatchSuccess = function (position) {
 
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
 
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
 
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
 
        getMap(updatedLatitude, updatedLongitude);
    }
}
 
// Error callback
 
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
 
// Watch your changing position
 
function watchMapPosition() {
 
    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}


function CapturePhoto(){
	navigator.camera.getPicture(onSuccess, onFail,
		{quality: 20,
		correctOrientation: true,
		targetWidth: 300,
		destinationtype: destinationtype.FILE_URI,
		saveToPhotoAlbum: true });
}

function onSuccess(imageURI){
	var pickdisplay = document.getElementById("snapshot");
	pickdisplay.style.display = 'block';	
	pickdisplay.src = imageURI;
}

function onFail(message){
	alert("Failed because: " + message);
	}
	
function PickContact(){
	navigator.contacts.pickContact(function(contact)
	{
		var contactinfo = "";
		contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
		var count = 0;
		if (contact.phoneNumbers !== null)
		{
			for (count=0; count < contact.phoneNumbers.length; count++)
			{
				contactinfo += contact.phoneNumbers[count].type + ": " + contact.phoneNumbers[count].value + "<br>";
			}
		}
		if (contact.emails !== null)
		{
			for(count=0; count < contact.emails.length; count++)
			{
				contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
			}
		}
		document.getElementById("contactname").innerHTML = contactinfo;
		},function(err)
		{
			alert("Error: " + err);
		}
		);
	}
	
function searchContact(){
   
    var lastname = document.getElementById("contactlast").value;
    var options      = new ContactFindOptions();
    options.filter   = lastname;
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];
    options.hasPhoneNumber = true;
    var fields = [navigator.contacts.fieldType.displayName];
    navigator.contacts.find(fields, onSuccessC, onErrorC, options);
}
function onSuccessC(contacts) {
    alert('Found ' + contacts.length + ' contacts.');
    var count="";
    var table = document.createElement ("table");
    table = "<table border = 1><tr><th>Contact Name</th><th>Phone Numbers</th/</tr>";
    for (var i = 0; i<contacts.length; i++){
        
        var phone = "";
        var name = contacts[i].name.formatted;
        if (contacts.phoneNumbers !== null) 
		{
		for (count=0; count < contacts[i].phoneNumbers.length; count++) 
		{
		phone += contacts[i].phoneNumbers[count].value + ", ";
		}
				}
		table += "<tr><td>" + (name) + "</td><td>" + (phone) + "</td></tr>";
		
		}
		document.getElementById("contactlastname").innerHTML = table;

}
function onErrorC(contactError) {
    alert('onError!');
}

