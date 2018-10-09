//Cityline Storage Script

//Set Local Storage
chrome.storage.local.get(['tickValue','updateCode','emertick','emerlink','aegVal','aegTickVal'], function (items) {
    //Set Cityline Code
    if (items.updateCode == null || items.updateCode == ""){
        document.getElementById('cityline_code').value = '';
    }
    else{
        document.getElementById('cityline_code').value = items.updateCode;
    }
    //Set Cityline Event Type
    if (items.tickValue == 'cityline_event'){
        document.getElementById('cityline_event').checked = true;
    } else if (items.tickValue == 'cityline_activity') {
        document.getElementById('cityline_activity').checked = true;
    } else {
        document.getElementById('cityline_home').checked = true;
    }
});

document.getElementById('submit_button').addEventListener("click", function(){
    saveCode();
});

function saveCode(){
    var updateCode = document.getElementById('cityline_code').value;
    var tickValue = getEventValue();
    chrome.storage.local.set({
        updateCode: updateCode,
        tickValue: tickValue
    }, function () {
        $('#msg_saved').fadeIn();
        //Details will be provided later
        });
}

function getEventValue(){
    var radios = document.getElementsByName('event_type');
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