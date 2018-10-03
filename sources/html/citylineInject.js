//Set Local Storage
chrome.storage.local.get(['tickValue','updateCode','emertick','emerlink','aegVal','aegTickVal'], function (items) {
    //Set Cityline Code
    if (items.updateCode == null){
        document.getElementById('cityline_code').value = 'Please input Cityline Code here.';
    }
    else{
        document.getElementById('cityline_code').value = items.updateCode;
    }
    //Set Emerglink
    if (items.emerlink == null){
        document.getElementById('emer_link').value = 'Please input Emergency Link Here.';
    } else{
        document.getElementById('emer_link').value = items.emerlink;
    }
    //Set Cityline Event Type
    if (items.tickValue == 'cityline_event'){
        document.getElementById('cityline_event').checked = true;
    } else if (items.tickValue == 'cityline_activity') {
        document.getElementById('cityline_activity').checked = true;
    } else {
        document.getElementById('cityline_home').checked = true;
    }
    document.getElementById('emer_tick').checked = items.emertick;
    //Set AEG Event Type
    if (items.aegTickVal=='aeg_event'){
        document.getElementById('aeg_event').checked = true;
    } else {
        document.getElementById('aeg_home').checked = true;
    }
    //Set AEG Code
    if (items.aegVal == null){
        document.getElementById('aeg_code').value = 'Please input AEG Code here.';
    }
    else{
        document.getElementById('aeg_code').value = items.aegVal;
    }
});

document.getElementById('submit_button').addEventListener("click", function(){
    saveCode();
    window.close();
});

function saveCode(){
    var emertick = document.getElementById('emer_tick').checked;
    var emerlink = document.getElementById('emer_link').value;
    var updateCode = document.getElementById('cityline_code').value;
    var tickValue = getEventValue();
    var aegVal = document.getElementById('aeg_code').value;
    var aegTickVal = getAEGEventValue();
    chrome.storage.local.set({
        updateCode: updateCode,
        tickValue: tickValue,
        emertick: emertick,
        emerlink: emerlink,
        aegVal: aegVal,
        aegTickVal: aegTickVal
    }, function () {
        chrome.tabs.executeScript({
            file: "script.js"
        });
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