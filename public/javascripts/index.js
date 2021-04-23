var hour = 0;
var day = 0;

function Order(pStoreID, pSalesPersonID, pCdID, pPricePaid) {
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = hour;
    this.dayPurch = day;
    hour++;
    if (hour > 23) {
        hour = 0;
        day++;
        if (day > 256) { //I don't know why day is supposed to be 0-256
            day = 0;
        }
    }
}
var ClientNotes = [];  // our local copy of the cloud data

// EVERYTHING BELOW THIS POINT IS UNTOUCHED


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tName = document.getElementById("name").value;
        var tLocation = document.getElementById("location").value;
        var tLength = document.getElementById("length").value;
        var oneTrail = new Trail(tName, tLocation, tLength);

        $.ajax({
            url: '/NewTrail',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneTrail),
            success: function (result) {
                console.log("added new trail")
            },  
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
              }

        });
    });

    document.getElementById("get").addEventListener("click", function () {
        updateList()
    });
  


    document.getElementById("delete").addEventListener("click", function () {
        
        var whichTrail = document.getElementById('deleteName').value;
        var idToDelete = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === whichTrail) {
                idToDelete = ClientNotes[i]._id;
           }
        }
        
        if(idToDelete != "")
        {
                     $.ajax({  
                    url: 'DeleteTrail/'+ idToDelete,
                    type: 'DELETE',  
                    contentType: 'application/json',  
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
        }
        else {
            console.log("no matching Subject");
        } 
    });



    document.getElementById("msubmit").addEventListener("click", function () {
        var tName = document.getElementById("mname").value;
        var tLocation = document.getElementById("mlocation").value;
        var tLength = document.getElementById("mlength").value;
        var oneTrail = new Trail(tName, tLocation, tLength);
        oneTrail.completed =  document.getElementById("mcompleted").value;
        oneTrail.dateCompleted =  document.getElementById("mdatecompleted").value;
        
            $.ajax({
                url: 'UpdateTrail/'+idToFind,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(oneTrail),
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
            
       
    });


    
    var idToFind = ""; // using the same value from the find operation for the modify
    // find one to modify
    document.getElementById("find").addEventListener("click", function () {
        var tName = document.getElementById("modName").value;
         idToFind = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === tName) {
                idToFind = ClientNotes[i]._id;
           }
        }
        console.log(idToFind);
 
        $.get("/FindTrail/"+ idToFind, function(data, status){ 
            console.log(data[0].name);
            document.getElementById("mname").value = data[0].name;
            document.getElementById("mlocation").value= data[0].location;
            document.getElementById("mlength").value = data[0].length;
            document.getElementById("mcompleted").value = data[0].completed;
            document.getElementById("mdatecompleted").value = data[0].dateCompleted;
           

        });
    });

    // get the server data into the local array
    updateList();

});


function updateList() {
var ul = document.getElementById('listUl');
ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

//var ul = document.createElement('ul')

$.get("/Trails", function(data, status){  // AJAX get
    ClientNotes = data;  // put the returned server json data into our local array

    // sort array by one property
    ClientNotes.sort(compare);  // see compare method below
    console.log(data);
    //listDiv.appendChild(ul);
    ClientNotes.forEach(ProcessOneTrail); // build one li for each item in array
    function ProcessOneTrail(item, index) {
        var li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML=li.innerHTML + index + ": " + " Name: " + item.name + "  " + item.location + ":  " + item.length + " Done? "+ item.completed + " Date Done: " + item.dateCompleted;
    }
});
}

function compare(a,b) {
    if (a.completed == false && b.completed== true) {
        return -1;
    }
    if (a.completed == false && b.completed== true) {
        return 1;
    }
    return 0;
}
