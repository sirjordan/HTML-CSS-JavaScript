// #Created by: Martin Marinov

// #GLOBAL Variables
var itemContent = new Array();

// #The Item Object
function Item (cpu, ram, price, picUrl, id){
    this.ram = ram;
    this.cpu = cpu;
    this.price = price;
    this.picUrl = picUrl;
    this.id = id;
    this.visible = true;
    
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
        ramCell.innerHTML = ram + " GB";
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

// Load some Items
function Items(){
    itemContent.push(new Item('Core i5', 4, 2000, 'laptop1.jpg', 'Lenovo LNV358'));
    itemContent.push(new Item('Core i7', 6, 2500, 'laptop1.jpg', 'HP ProBook'));
    itemContent.push(new Item('AMD DualCore', 2, 700, 'laptop1.jpg', 'ASUS X550'));
    itemContent.push(new Item('AMD Mobile', 1, 550, 'laptop1.jpg', 'HP 250'));
    itemContent.push(new Item('Intel DualCore', 2, 900, 'laptop1.jpg', 'ASUS X1-A'));
    itemContent.push(new Item('Celeron 1005M', 2, 620, 'laptop1.jpg', 'ACER'));
    
    // Initialize
    for (var i=0; i < itemContent.length; i++) {
      itemContent[i].Display('itemsContainer');
    };
}

// Change the values under the scrolls 
function DisplayScrollBar(scrollObject,locationId){
    document.getElementById(locationId).innerHTML = scrollObject.value;
}

// Filter the items thruth the scrollbars
function Filter(Object){
    var value = document.getElementById(Object).value;
    switch(Object){
        case 'minPriceScroll':{
            for (var i=0; i < itemContent.length; i++) {
              if (itemContent[i].price < value) {
              	itemContent[i].visible = false;
              	itemContent[i].Remove(itemContent[i].id);
              }
              else{
              	if (itemContent[i].visible == false) {
              		itemContent[i].visible = true;
              		itemContent[i].Display('itemsContainer');
              	};
              };
            };
            break;
        }
        case 'maxPriceScroll':{
        	for (var i=0; i < itemContent.length; i++) {
              if (itemContent[i].price > value) {
              	itemContent[i].visible = false;
              	itemContent[i].Remove(itemContent[i].id);
              }
              else{
              	if (itemContent[i].visible == false) {
              		itemContent[i].visible = true;
              		itemContent[i].Display('itemsContainer');
              	};
              };
            };
        	break;
        }
        case 'minRamScroll':{
        	for (var i=0; i < itemContent.length; i++) {
              if (itemContent[i].ram < value) {
              	itemContent[i].visible = false;
              	itemContent[i].Remove(itemContent[i].id);
              }
              else{
              	if (itemContent[i].visible == false) {
              		itemContent[i].visible = true;
              		itemContent[i].Display('itemsContainer');
              	};
              };
            };
        	break;
        }
        case 'maxRamScroll':{
        	for (var i=0; i < itemContent.length; i++) {
              if (itemContent[i].ram > value) {
              	itemContent[i].visible = false;
              	itemContent[i].Remove(itemContent[i].id);
              }
              else{
              	if (itemContent[i].visible == false) {
              		itemContent[i].visible = true;
              		itemContent[i].Display('itemsContainer');
              	};
              };
            };
        	break;
        }
    }
    
}










