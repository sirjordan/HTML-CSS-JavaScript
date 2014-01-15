// Created by: Martin Marinov

// The Item Object
function Item (cpu, ram, price, picUrl, id){
    this.ram = ram;
    this.cpu = cpu;
    this.price = price;
    this.picUrl = picUrl;
    this.id = id;
    
    this.Display = function (locationId){
        // The ID is the item displayName, and tableId at the same time
        var itemTable=document.createElement('table');
        itemTable.id = id;
        
        var row = itemTable.insertRow(0);    // Top Row
        var row2 = itemTable.insertRow(1);   // Next Row
        var row3 = itemTable.insertRow(2);  
         // Next Row
        var cpuCell = row.insertCell(0);
        var ramCell = row.insertCell(1);
        var priceCell = row3.insertCell(0);
        var nameCell = row3.insertCell(1);
        
        var picCell = row2.insertCell(0);
        picCell.setAttribute("colspan",2);
        
        cpuCell.innerHTML = cpu;
        ramCell.innerHTML = ram;
        priceCell.innerHTML = price + ' $';
        nameCell.innerHTML = id;
        
        picCell.innerHTML = "<img src='" + picUrl + "' />";
        
        document.getElementById(locationId).appendChild(itemTable);
    };
    
    this.Remove = function (itemID){
       var item =  document.getElementById(itemID);
       item.parentNode.removeChild(item);
       return false;
    };
}



function Items(){
    var itemContent = new Array();
    
    itemContent.push(new Item('Core i5', '4 GB', 2000, 'laptop1.jpg', 'Lenovo LNV358'));
    itemContent.push(new Item('Core i7', '6 GB', 2500, 'laptop1.jpg', 'HP ProBook'));
    itemContent.push(new Item('AMD DualCore', '2 GB', 700, 'laptop1.jpg', 'ASUS X550'));
    
    for (var i=0; i < itemContent.length; i++) {
      itemContent[i].Display('itemsContainer');
    };
}




















