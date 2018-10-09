//Cityline Storage Script

//Set Local Storage
chrome.storage.local.get(['tickValue','updateCode','emertick','emerlink','aegVal','aegTickVal'], function (items) {
    //Set AEG Event
    if (items.aegTickVal=='aeg_event'){
        document.getElementById('aeg_event').checked = true;
    } else {
        document.getElementById('aeg_home').checked = true;
    }
    //Set AEG Code
    if (items.aegVal == null || items.aegVal == ""){
        document.getElementById('aeg_code').value = '';
    }
    else{
        document.getElementById('aeg_code').value = items.aegVal;
    }
});

document.getElementById('submit_button').addEventListener("click", function(){
    saveCode();
});

function saveCode(){
    var aegVal = document.getElementById('aeg_code').value;
    var aegTickVal = getAEGEventValue();
    chrome.storage.local.set({
        aegVal: aegVal,
        aegTickVal: aegTickVal
    }, function () {
        $('#msg_saved').fadeIn();
        //Details will be provided later
        });
}

function getAEGEventValue(){
    var radios = document.getElementsByName('aeg_event_type');
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