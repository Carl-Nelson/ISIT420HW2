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

});
