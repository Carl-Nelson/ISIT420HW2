var hour = 0;
var day = 1;
var storeIDs = [98053, 98007, 98077, 98055, 98011, 98046];
var cdIDs = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];

function Order(pStoreID = null, pSalesPersonID = null, pCdID = null, pPricePaid = null) {
    let store = Math.floor(Math.random() * 5);
    this.storeID = (pStoreID != null && pStoreID != '') ? pStoreID : storeIDs[store];
    this.salesPersonID = (pSalesPersonID != null && pSalesPersonID != '') ? pSalesPersonID : Math.floor(Math.random() * 3 + (store*4)+1);
    this.cdID = (pCdID != null && pCdID != '') ? pCdID : cdIDs[Math.floor(Math.random() * 9)];
    this.pricePaid = (pPricePaid != null) ? pPricePaid : Math.floor(Math.random() * 10 + 5);

    this.hourPurch = hour;
    this.dayPurch = day;
    hour += Math.floor(Math.random() * 4 + 1); //increment hour by a random amount between 1 and 5
    day += Math.floor(Math.random() * 6 + 1); // increment day by a random amount between 1 and 7
    if (hour > 23) {
    hour = 0;
    day++;
    }
    if (day > 365) {
    day = 1;
    }
}
var ClientNotes = [];  // our local copy of the cloud data

// EVERYTHING BELOW THIS POINT IS TOUCHED


document.addEventListener("DOMContentLoaded", function (event) {
    // The create button works just fine.
    document.getElementById("create").addEventListener("click", function () {
        var oneOrder = new Order();
        console.log(oneOrder);
        
        document.getElementById("storeID").value = oneOrder.storeID;
        document.getElementById("salesPersonID").value = oneOrder.salesPersonID;
        document.getElementById("cdID").value = oneOrder.cdID;
        document.getElementById("pricePaid").value = oneOrder.pricePaid;
    })
    // The submitone button works. but it re randomizes the the values that are prepopulated. Need a fix.
    document.getElementById("submitOne").addEventListener("click", function () {
        var tStoreID = document.getElementById("storeID").value;
        var tSalesPersonID = document.getElementById("salesPersonID").value;
        var tCdID = document.getElementById("cdID").value;
        var tPricePaid = document.getElementById("pricePaid").value;
        var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        $.ajax({
            url: '/Orders',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                console.log("added new order");
                console.log(oneOrder);
            },  
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
              }

        });
    });

    document.getElementById("submit500").addEventListener("click", function () {

        // var tStoreID = document.getElementById("storeID").value;
        // var tSalesPersonID = document.getElementById("salesPersonID").value;
        // var tCdID = document.getElementById("cdID").value;
        // var tPricePaid = document.getElementById("pricePaid").value;
        // var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        for (let i = 0; i < 500; i++) {
            var oneOrder = new Order();

            $.ajax({
                url: '/NewOrder',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(oneOrder),
                success: function (result) {
                    console.log("added new order");
                },  
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                  }
    
            });
        }


    });

// Everything below this is maybe not needed but keeping for possible future use.
    // document.getElementById("get").addEventListener("click", function () {
    //     updateList()
    // });
  
    // document.getElementById("delete").addEventListener("click", function () {
        
    //     var whichOrder = document.getElementById('deleteName').value;
    //     var idToDelete = "";
    //     for(i=0; i< ClientNotes.length; i++){
    //         if(ClientNotes[i].name === whichOrder) {
    //             idToDelete = ClientNotes[i]._id;
    //        }
    //     }
        
    //     if(idToDelete != "")
    //     {
    //                  $.ajax({  
    //                 url: 'DeleteOrder/'+ idToDelete,
    //                 type: 'DELETE',  
    //                 contentType: 'application/json',  
    //                 success: function (response) {  
    //                     console.log(response);  
    //                 },  
    //                 error: function () {  
    //                     console.log('Error in Operation');  
    //                 }  
    //             });  
    //     }
    //     else {
    //         console.log("no matching Subject");
    //     } 
    // });



    // document.getElementById("msubmit").addEventListener("click", function () {
    //     var tStoreID = document.getElementById("mstoreid").value;
    //     var tSalesPersonID = document.getElementById("msalespersonid").value;
    //     var tCdID = document.getElementById("mcdid").value;
    //     var tPricePaid = document.getElementById("mpricepaid").value;
    //     var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);
        
    //         $.ajax({
    //             url: 'UpdateOrder/'+idToFind,
    //             type: 'PUT',
    //             contentType: 'application/json',
    //             data: JSON.stringify(oneOrder),
    //                 success: function (response) {  
    //                     console.log(response);  
    //                 },  
    //                 error: function () {  
    //                     console.log('Error in Operation');  
    //                 }  
    //             });  
            
       
    // });


    
    // var idToFind = ""; // using the same value from the find operation for the modify
    // // find one to modify
    // document.getElementById("find").addEventListener("click", function () {
    //     var tName = document.getElementById("modName").value;
    //      idToFind = "";
    //     for(i=0; i< ClientNotes.length; i++){
    //         if(ClientNotes[i].name === tName) {
    //             idToFind = ClientNotes[i]._id;
    //        }
    //     }
    //     console.log(idToFind);
 
    //     $.get("/FindOrder/"+ idToFind, function(data, status){ 
    //         console.log(data[0].name);
    //         document.getElementById("mstoreid").value = data[0].name;
    //         document.getElementById("msalespersonid").value= data[0].location;
    //         document.getElementById("mcdid").value = data[0].length;
    //         document.getElementById("mpricepaid").value = data[0].completed;
    //     });
    // });

    // get the server data into the local array
    //updateList();

});


// function updateList() {
// var ul = document.getElementById('listUl');
// ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

// //var ul = document.createElement('ul')

// $.get("/Orders", function(data, status){  // AJAX get
//     ClientNotes = data;  // put the returned server json data into our local array

//     // sort array by one property
//     ClientNotes.sort(compare);  // see compare method below
//     console.log(data);
//     //listDiv.appendChild(ul);
//     ClientNotes.forEach(ProcessOneOrder); // build one li for each item in array
//     function ProcessOneOrder(item, index) {
//         var li = document.createElement('li');
//         ul.appendChild(li);

//         li.innerHTML=li.innerHTML + index + ": " + " Store ID: " + item.storeID + ", Sales Person ID: " + item.salesPersonID + ", CD ID: " + item.cdID + ", Price Paid: "+ item.pricePaid + ", Hour of Purchase: " + item.hourPurch + ", Day of Purchase: " + item.dayPurch;
//     }
// });
// }

// function compare(a,b) {
//     if (a.completed == false && b.completed== true) {
//         return -1;
//     }
//     if (a.completed == false && b.completed== true) {
//         return 1;
//     }
//     return 0;
// }
