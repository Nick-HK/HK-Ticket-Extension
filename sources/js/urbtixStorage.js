//Cityline Storage Script

//Set Local Storage
chrome.storage.local.get(['surname','firstname','phonenumber','email','cctype','ccnum','ccsecuritycode','ccmonth','ccyear','enableCC'], function (items) {
    //Surname
    if (items.enableCC == true){
        document.getElementById("enabled").checked = true;
    }
    if (items.surname == null || items.surname == ""){
        document.getElementById('surname').value = '';
    }
    else{
        document.getElementById('surname').value = items.surname;
    }
    //First Name
    if (items.firstname == null || items.firstname == ""){
        document.getElementById('first_name').value = '';
    }
    else{
        document.getElementById('first_name').value = items.firstname;
    }
    //Phone Number
    if (items.phonenumber == null || items.phonenumber == ""){
        document.getElementById('phone_number').value = '';
    }
    else{
        document.getElementById('phone_number').value = items.phonenumber;
    }
    //Email
    if (items.email == null || items.email == ""){
        document.getElementById('email').value = '';
    }
    else{
        document.getElementById('email').value = items.email;
    }
    //CC Type
    if (items.cctype=='220'){
        document.getElementById('cc_visa').checked = true;
    } else if (items.cctype=='221'){
        document.getElementById('cc_master').checked = true;
    } else if (items.cctype=='223'){
        document.getElementById('cc_ae').checked = true;
    }
    //CC Num
    if (items.ccnum == null || items.ccnum == ""){
        document.getElementById('cc_number').value = '';
    }
    else{
        document.getElementById('cc_number').value = items.ccnum;
    }
    //CC Security Code
    if (items.ccsecuritycode == null || items.ccsecuritycode == ""){
        document.getElementById('cc_security_code').value = '';
    }
    else{
        document.getElementById('cc_security_code').value = items.ccsecuritycode;
    }
    //CC Month
    if (items.ccmonth == null || items.ccmonth == ""){
        document.getElementById('cc_month').value = 'default';
    } else {
        document.getElementById('cc_month').value=items.ccmonth;
    }
    //CC Year
    if (items.ccyear == null || items.ccyear == ""){
        document.getElementById('cc_year').value = '';
    }
    else{
        document.getElementById('cc_year').value = items.ccyear;
    }
});

document.getElementById('submit_button').addEventListener("click", function(){
    saveCode();
});
document.getElementById('clear_button').addEventListener("click", function(){
    clearCCData();
});

function saveCode(){
    var enableCC = document.getElementById("enabled").checked;
    var surname = document.getElementById('surname').value;
    var firstname = document.getElementById('first_name').value;
    var phonenumber = document.getElementById('phone_number').value;
    var email = document.getElementById('email').value;
    var cctype = getCardType();
    var ccnum = document.getElementById('cc_number').value;
    var ccsecuritycode = document.getElementById('cc_security_code').value;
    var ccmonth = getCardMonth();
    var ccyear = document.getElementById('cc_year').value;
    chrome.storage.local.set({
        enableCC:enableCC,
        surname:surname,
        firstname:firstname,
        phonenumber:phonenumber,
        email:email,
        cctype:cctype,
        ccnum:ccnum,
        ccsecuritycode:ccsecuritycode,
        ccmonth:ccmonth,
        ccyear:ccyear
    }, function () {
        $('#msg_saved').fadeIn();
        //Details will be provided later
        });
}

function clearCCData(){
    var enableCC = '';
    var surname = '';
    var firstname = '';
    var phonenumber = '';
    var email = '';
    var cctype = '';
    var ccnum = '';
    var ccsecuritycode = '';
    var ccmonth = '';
    var ccyear = '';
    chrome.storage.local.set({
        enableCC:enableCC,
        surname:surname,
        firstname:firstname,
        phonenumber:phonenumber,
        email:email,
        cctype:cctype,
        ccnum:ccnum,
        ccsecuritycode:ccsecuritycode,
        ccmonth:ccmonth,
        ccyear:ccyear
    }, function () {
        $('#msg_saved').fadeIn();
        location.reload();
        });
}

function getCardType(){
    var radios = document.getElementsByName('cc_card_type');
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            return (radios[i].value);
            break;
        }
    }
    return null;
}

function getCardMonth(){
    var ccmonth = document.getElementById("cc_month");
    var value =  ccmonth.options[ccmonth.selectedIndex].text;
    return value;
}