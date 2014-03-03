// ### GLOBALS ###
var customers = new Array();
var positions = new Array();
var selectedFirm;
var selectedProfile;
var selectedGlass;

var Profiles = {};

var Glasess = {
    regular: { name: 'Бяло/Бяло', value: 1 },
    Ka: { name: 'Бяло/Ка', value: 2 },
    fourSeason: { name: 'Бяло/4 сезона', value: 3 }
};

var MechanismsEnum = {
    Siegenia: 'Siegenia',
    Endow: 'Endow',
    Winkhaus: 'Winkhaus'
};

// Design the configurations, for displaying
function createPosition(src, alt, id) {
    var img = document.createElement('img');
    img.src = src;
    img.id = id;

    img.setAttribute('width', '150');
    img.setAttribute('height', '80');

    if (alt != null) img.alt = alt;

    img.onclick = function () {
        onImageClick(this);
    };

    return img;
}

// Returns if some array contains some object
function contains(array, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function InitializePositions() {

    // Some positions
    positions.push(new createPosition('images/fix.jpg', 'fix', 'fix'));
    positions.push(new createPosition('images/fix_otv_fix.jpg', 'fix_otv_fix', 'fix_otv_fix'));
    positions.push(new createPosition('images/fix_otv_otv_fix.jpg', 'fix_otv_otv_fix', 'fix_otv_otv_fix'));

    positions.push(new createPosition('images/otv.jpg', 'otv', 'otv'));
    positions.push(new createPosition('images/otv_fix.jpg', 'otv_fix', 'otv_fix'));
    positions.push(new createPosition('images/otv_fix_otv.jpg', 'otv_fix_otv', 'otv_fix_otv'));

    positions.push(new createPosition('images/otv_fix_vrata.jpg', 'otv_fix_vrata', 'otv_fix_vrata'));
    positions.push(new createPosition('images/proz_fix_vrata.jpg', 'proz_fix_vrata', 'proz_fix_vrata'));
    positions.push(new createPosition('images/vrata.jpg', 'vrata', 'vrata'));

    // Displaying
    for (var i = 0; i < positions.length; i++) {
        var disp = document.getElementById('positionSelection');
        disp.appendChild(positions[i]);
    }

}

function onImageClick(image) {
    var imgToDisplay = createPosition(image.src, image.alt, image.id);

    var location = document.getElementById('picturePresent');
    location.innerHTML = '';
    location.appendChild(imgToDisplay);

    // Show or hide the door's fields
    if (imgToDisplay.id == 'otv_fix_vrata' || imgToDisplay.id == 'proz_fix_vrata') {
        showElement('doorWidth', true);
        showElement('doorHeight', true);
    }
    else {
        showElement('doorWidth', false);
        showElement('doorHeight', false);
    }

    // show/hide wingWidth field
    if (imgToDisplay.id == 'fix' || imgToDisplay.id == 'otv' || imgToDisplay.id == 'vrata' || imgToDisplay.id == 'proz_fix_vrata') {
        showElement('wingWidth', false);
    }
    else {
        showElement('wingWidth', true);
    }
}

function Profile(name, casePrice, wingPrice, delimeterPrice, delimeterPricePerCount, casePriceColor, wingPriceColor, delPriceColor, wingDoorPrice, wingDoorColorPrice) {
    this.name = name;
    this.workCost = 0;
    this.delimeterPricePerCount = delimeterPricePerCount;
    
    // White 
    this.casePrice = casePrice;
    this.wingPrice = wingPrice;
    this.delimeterPrice = delimeterPrice;
    this.wingDoorPrice = wingDoorPrice;
    
    // Color
    this.casePriceColor = casePriceColor;
    this.wingPriceColor = wingPriceColor;
    this.delPriceColor = delPriceColor;
    this.wingDoorColorPrice = wingDoorColorPrice;
    
}

function Glass(name, price, squareCoeficient) {
    this.name = name;
    this.pricePerSQRTMeter = price;

    // 1 usualy
    this.squareCoeficient = squareCoeficient;

    this.GetPrice = function (sqrtMeters) {

        var result = sqrtMeters;

        if (this.squareCoeficient != 1) {
            result *= squareCoeficient;
            result = sqrtMeters - result;
            return result * this.pricePerSQRTMeter;
        }
        else {
            return sqrtMeters * this.pricePerSQRTMeter;
        }
    }
}

function Window(w, h, profileType, delimeters, mechanismTipe) {

    // Properties
    var profile = new Profile(),
        wings = new Array(),
        width = w,
        height = h;

    profile = profileType;

    // Private functions
    function delimetersLen() {
        var result = 0;
        for (var i = 0; i < delimeters.length; i++) {
            result += delimeters[i];
        }
        return result;
    }

    function Wing(w, h, hasDouble) {
        var _width = w,
            _height = h,
            _hasDouble = hasDouble,
            len = function () { return _width * 2 + _height * 2; },
            _mechanism = new Mechanism();

        //_mechanism = mechanismTipe;
        getMechPrice = function () {
            var result = _mechanism.normalPrice;

            if (_width > _mechanism.upperL_Len) {
                result += _mechanism.upperL_Price;
                if (_hasDouble == true) {
                    result += _mechanism.double_UpperL_Price;
                }
            }

            if (_height > _mechanism.upperH_Len) {
                result += _mechanism.upperH_Price;
                if (_hasDouble == true) {
                    result += _mechanism.double_upperH_Price;
                }
            }

            // REMOVE ofter FIX
            if (isNaN(result)) {
                result = 0;
            }

            return result;
        };

        this.Price = function () {
            return len() * profile.wingPrice + getMechPrice();
        };
    }

    function Area() {
        return width * height;
    }

    // Public functions
    this.GetWindowArea = function () {
        return Area();
    }

    this.AddWing = function (w, h, hasDouble) {
        wings.push(new Wing(w, h, hasDouble));
        // TODO: Add mechanism
    }

    this.GetPrice = function () {
        var totalPrice = 0;
        totalPrice += (2 * width + 2 * height) * profile.casePrice; // Case price

        if (delimetersLen() > 0) {
            totalPrice += delimetersLen() * profile.delimeterPrice + delimeters.length * profile.delimeterPricePerCount;   // Delimeters price + 
        }

        totalPrice += Area() * profile.workCost;    // Work Cost price

        for (var i = 0; i < wings.length; i++) {
            totalPrice += wings[i].Price();   // Wings prises
        }

        return totalPrice;
    }

}

function Customer(name) {
    this.name = name;
    this.profilesSupport = new Array();
    this.glassesSupport = new Array();
    this.mechanismSupport = new Array();
}

function Mechanism(name, forProfileType, normalPrice, upperH_Len, upperH_Price, upperL_Len, upperL_Price, securityPrice, doubleNormalPrice, double_upperH_Price, double_UpperL_Price) {
    this.name = name;
    this.normalPrice = normalPrice;
    this.upperH_Price = upperH_Price;
    this.upperL_Price = upperL_Price;
    this.securityPrice = securityPrice;
    this.doubleNormalPrice = doubleNormalPrice;
    this.double_upperH_Price = double_upperH_Price;
    this.double_UpperL_Price = double_UpperL_Price;
    this.upperH_Len = upperH_Len;
    this.upperL_Len = upperL_Len;
    this.forProfileType = forProfileType;
}

function Manifacture() {

}

function ManageUserEntry() {
    // TODO: check boundaries ...
    var overallWidth = parseInt(document.getElementById('overallWidth').value) / 100;
    var overallHeight = parseInt(document.getElementById('overallHeight').value) / 100;

    var doorWidth = parseInt(document.getElementById('doorWidth').value) / 100;
    var doorHeight = parseInt(document.getElementById('doorHeight').value) / 100;

    var wingWidth = parseInt(document.getElementById('wingWidth').value) / 100;
    if (!isNaN(wingWidth)) {
        if (wingWidth == 0 || wingWidth > 100) {
            wingWidth = 0.75;
        }
    }
    else {
        wingWidth = 0.75;
    }

    var dblMechanism = document.getElementById("doubleMech").checked;
    
    (positionManager = function () {
        // Check selected pictire's ID
        // confugire and create a window for that picture
        // get the price

        var configuration = document.getElementById('picturePresent').firstChild;
        var posId = configuration.id;

        var del;
        var currentWindow;
        var currentFirm;
        var currentGlass;
        var currentFirmCurrentProfileIndex;
        var currentFirmCurrentGlassIndex;

        var resultToDisplay = 0;

        // getSelectet firm
        var temp = document.getElementById('firmList');
        selectedFirm = temp.options[temp.selectedIndex].text;   // change the global variable

        // getting gthe selected profile
        temp = document.getElementById('profilesList');
        selectedProfile = temp.options[temp.selectedIndex].text;   // change the global variable

        // getting the selected glass
        temp = document.getElementById('glassesList');
        selectedGlass = temp.options[temp.selectedIndex].text;   // change the global variable

        // find it profile the list
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].name == selectedFirm) {
                for (var j = 0; j < customers[i].profilesSupport.length; j++) {
                    // find the selcted profile in customer's list ot profiles
                    if (customers[i].profilesSupport[j].name == selectedProfile) {
                        currentFirm = customers[i];
                        currentFirmCurrentProfileIndex = j;
                        continue;
                    }
                }

                // find the current firms's supporetd glass in their list
                for (var k = 0; k < customers[i].glassesSupport.length; k++) {
                    if (customers[i].glassesSupport[k].name.name == selectedGlass) {
                        currentFirmCurrentGlassIndex = k;
                    }
                }
                continue;
            }
        }

        switch (posId) {
            case 'fix': {
                del = [0, 0] // no delimeters for the fix ;)
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                break;
            }
            case 'fix_otv_fix': {
                del = [overallHeight, overallHeight];   // two delimeters by window height
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(wingWidth, overallHeight);
                break;
            }
            case 'fix_otv_otv_fix': {
                del = [overallHeight, overallHeight, overallHeight];
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(wingWidth, overallHeight);
                currentWindow.AddWing(wingWidth, overallHeight);
                break;
            }
            case 'otv': {
                del = [0, 0]
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(overallWidth, overallHeight);
                break;
            }
            case 'otv_fix': {
                del = [overallHeight];
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(wingWidth, overallHeight);
                break;
            }
            case 'otv_fix_otv': {
                del = [overallHeight, overallHeight];   // two delimeters by window height
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(wingWidth, overallHeight);
                currentWindow.AddWing(wingWidth, overallHeight);
                break;
            }
            case 'otv_fix_vrata': {
                // the door part
                del = [doorWidth];
                currentWindow = new Window(doorWidth, doorHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(doorWidth, doorHeight);
                resultToDisplay += currentFirm.glassesSupport[currentFirmCurrentGlassIndex].GetPrice(currentWindow.GetWindowArea());
                resultToDisplay += currentWindow.GetPrice();

                // the window part
                del = [overallHeight];
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(wingWidth, overallHeight);

                break;
            }
            case 'proz_fix_vrata': {
                // the door part
                del = [doorWidth];
                currentWindow = new Window(doorWidth, doorHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(doorWidth, doorHeight);
                resultToDisplay += currentFirm.glassesSupport[currentFirmCurrentGlassIndex].GetPrice(currentWindow.GetWindowArea());
                resultToDisplay += currentWindow.GetPrice();

                // the window part
                del = [0, 0];
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                break;
            }
            case 'vrata': {
                del = [overallWidth]
                currentWindow = new Window(overallWidth, overallHeight, currentFirm.profilesSupport[currentFirmCurrentProfileIndex], del);
                currentWindow.AddWing(overallWidth, overallHeight);
                break;
            }

            default: break;
        }

        // Procceed and Return the COST result
        resultToDisplay += currentFirm.glassesSupport[currentFirmCurrentGlassIndex].GetPrice(currentWindow.GetWindowArea());
        resultToDisplay += currentWindow.GetPrice();
        resultToDisplay = resultToDisplay.toFixed(2);

        alert(resultToDisplay);
    })();
}

function showElement(elementId, show) {
    var element = document.getElementById(elementId);

    if (show == false) {
        document.getElementById(elementId).style.visibility = 'hidden';
    }
    else {
        document.getElementById(elementId).style.visibility = 'visible';
    }
}

function LoadLists() {
    // First time initialazation and displayng of whole data
    // After select an option the other dropdowns has filtering

    // Every firm
    (loadFirms = function () {
        var selectLocation = document.getElementById('firmList');

        for (var i = 0; i < customers.length; i++) {
            selectLocation.options[selectLocation.options.length] = new Option(customers[i].name)
        }
    })();

    // Every Profile
    (loadProfiles = function () {
        var selectLocation = document.getElementById('profilesList');

        for (var i in Profiles) {
            selectLocation.options[selectLocation.options.length] = new Option(i);
        }
    })();

    // Every glass
    (loadGlasses = function () {
        var selectLocation = document.getElementById('glassesList');

        for (var i in Glasess) {
            var t = Glasess[i];
            selectLocation.options[selectLocation.options.length] = new Option(t.name);
        }
    })();

    (loadMechanisms = function () {
        // removes every option before insert all to avoid dublicate
        document.getElementById('mechanismList').options.length = 1;

        var selectLocation = document.getElementById('mechanismList');

        for (var i in MechanismsEnum) {
            selectLocation.options[selectLocation.options.length] = new Option(i);
        }
    })();

    // The profileColors is inline written
    // TODO: Check the option items Contains() an option, and if not to add it, if yes -> no
}

function Filter(filterBy) {
    // Remove Every option
    function removeAllOptions(id) {
        document.getElementById(id).options.length = 1;
    }

    // Reload everytink
    function Clear() {
        removeAllOptions('firmList');
        removeAllOptions('profilesList');
        removeAllOptions('glassesList');
        LoadLists();
    }

    switch (filterBy) {
        case 'profile': {
            if (document.getElementById("profilesList").selectedIndex > 0) {
            	
                // Removers every firm
                var _firmList = document.getElementById('firmList');
                var _selectedFirm = _firmList.options[_firmList.selectedIndex].text;
                removeAllOptions('firmList');

                // Set only firm's that have that profile
                var profilelist = document.getElementById('profilesList');
                var profileName = profilelist.options[profilelist.selectedIndex].text;

                for (var i = 0; i < customers.length; i++) {
                    for (var j = 0; j < customers[i].profilesSupport.length; j++) {
                        if (customers[i].profilesSupport[j].name == profileName) {
                            var selectLocation = document.getElementById('firmList');
                            selectLocation.options[selectLocation.options.length] = new Option(customers[i].name)
                        }
                    }
                }
                // restore the prevouse selected after refreshing
                _firmList.value = _selectedFirm;
                break;
            }
            else {
                Clear();
                break;
            }
        }

        case 'firm': {
            if (document.getElementById("firmList").selectedIndex > 0) {

                // Removers every profile and every glass, than set only relevant
                var _profileList = document.getElementById('profilesList');
                var _selectedProfile = _profileList.options[_profileList.selectedIndex].text;

                var _glassList = document.getElementById('glassesList');
                var _selectedGlass = _glassList.options[_glassList.selectedIndex].text;

                removeAllOptions('profilesList');
                removeAllOptions('glassesList');

                // Set only profiles that support that firm
                var firmList = document.getElementById('firmList');
                var firmName = firmList.options[firmList.selectedIndex].text;
                var firmSearchIndex = 0;
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i].name == firmName) {
                        firmSearchIndex = i;
                        continue;
                    }
                }
                // update the profile list
                debugger;
                for (var j = 0; j < customers[firmSearchIndex].profilesSupport.length; j++) {
                    var selectLocation = document.getElementById('profilesList');
                    selectLocation.options[selectLocation.options.length] = new Option(customers[firmSearchIndex].profilesSupport[j].name);
                }

                // update the glass list
                for (var k = 0; k < customers[firmSearchIndex].glassesSupport.length; k++) {
                    var selectLocation = document.getElementById('glassesList');
                    selectLocation.options[selectLocation.options.length] = new Option(customers[firmSearchIndex].glassesSupport[k].name.name);
                }

                // restore the prevouse selected after refreshing
                _profileList.value = _selectedProfile;
                break;
            }
            else {
                Clear();
                break;
            }
        }

        case 'glass': {
            // TODO:
            break;
        }

        case 'clear': {
            // Clear the whole form
            Clear();
            break;
        }

        case 'mech': {
            // Filter the firms that has current mech and profile that has supported

            if (document.getElementById("mechanismList").selectedIndex > 0) {
                // 1. Get all firms that support that mech
                // Removers every firm
                var _firmList = document.getElementById('firmList');
                var _selectedFirm = _firmList.options[_firmList.selectedIndex].text;
                var loadedFirms = new Array();
                removeAllOptions('firmList');

                // Set only firm's that have that mechanism
                var mechanismList = document.getElementById('mechanismList');
                var _mechanismName = mechanismList.options[mechanismList.selectedIndex].text;

                for (var i = 0; i < customers.length; i++) {
                    for (var j = 0; j < customers[i].mechanismSupport.length; j++) {
                        if (customers[i].mechanismSupport[j].name == _mechanismName) {
                            var selectLocation = document.getElementById('firmList');
                            // TODO: 
                            //if (contains(loadedFirms,customers[i]) == false) {
                                loadedFirms.push(customers[i]);
                                selectLocation.options[selectLocation.options.length] = new Option(customers[i].name)
                            //}
                        }
                    }
                }

                // 2. Get all the profiles of that firm that support that mech
                var _profileList = document.getElementById('profilesList');
                removeAllOptions('profilesList');
                debugger;   
                for (var i = 0; i < loadedFirms.length; i++) {
                    for (var j = 0; j < loadedFirms[i].profilesSupport.length; j++) {
                        for (var k = 0; k < loadedFirms[i].mechanismSupport.length; k++) {
                            if (loadedFirms[i].mechanismSupport[k].name == _mechanismName) {
                                var tmp = loadedFirms[i].mechanismSupport[k];
                                if (loadedFirms[i].profilesSupport[j].name == tmp.forProfileType) {
                                    // TODO:
                                    _profileList.options[_profileList.options.length] = new Option(loadedFirms[i].profilesSupport[j].name);
                                }
                            }
                        }
                    }
                }
            }
            else {
                // DO NOTHING
            }

            break;
        }

        default:
            break;
    }
}

// ### MAIN ###

// StartUp function
function Initialize() {
    // Load saved positions for windows, and they'r images
    InitializePositions();
    // First time initialazation and displayng of whole data
    LoadLists();
}

// Load firms and specifications
function loadFirmData(firmName) {
    // # Push Profile: 
    // # new Profile(name, casePrice, wingPrice, delimeterPrice, delimeterPricePerCount, workCost);
    // # Description:
    // name: ...
    // casePrice: ...
    // ...
    // Customer #1
    var inputFirm = new Customer(firmName);
    /*
    inputFirm.profilesSupport.push(new Profile(Profiles.KMG, 5.8, 5.8, 5.8, 5, 5));
    inputFirm.profilesSupport.push(new Profile(Profiles.VEKA, 5.8, 5.8, 5.8, 5, 5));
    inputFirm.profilesSupport.push(new Profile(Profiles.Salamander, 5.8, 5.8, 5.8, 5, 5));
    inputFirm.glassesSupport.push(new Glass(Glasess.regular, 24, 0.18));
    inputFirm.glassesSupport.push(new Glass(Glasess.Ka, 29, 0.18));
    inputFirm.mechanismSupport.push(new Mechanism(MechanismsEnum.Endow, Profiles.KMG));
    inputFirm.mechanismSupport.push(new Mechanism(MechanismsEnum.Siegenia, Profiles.KMG));
    inputFirm.mechanismSupport.push(new Mechanism(MechanismsEnum.Siegenia, Profiles.VEKA));
    */
    customers.push(inputFirm);

    // Customer #2
    /*
    var RollPlast = new Customer(firmName);
    RollPlast.profilesSupport.push(new Profile(Profiles.Trocal, 5.8, 5.8, 5.8));
    RollPlast.profilesSupport.push(new Profile(Profiles.VEKA, 5.8, 5.8, 5.8));
    RollPlast.glassesSupport.push(new Glass(Glasess.regular, 24, 1));
    RollPlast.mechanismSupport.push(new Mechanism(MechanismsEnum.Winkhaus, Profiles.Trocal));
    customers.push(RollPlast);
	*/
	
    // Customer #3
    //
    //
    //

}

function Wizard(step) {
    // Recursive 
    // 6-7 steps or more
    var stepMessages = new Array();
    // Push some messages
    // Massage 1 - step1
    // Massage 2 - step2
    //....

    var stepCounter = stepMessages.length;
}

function getCustomerIndexByName(customerName){
	for (var i=0; i < customers.length; i++) {
	  if (customers[i].name == customerName) {
	  	return i;
	  	continue;
	  };
	};
}











