//Set Local Storage
chrome.storage.local.get(['tickValue','updateCode','emertick','emerlink'], function (items) {
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
    chrome.storage.local.set({
        updateCode: updateCode,
        tickValue: tickValue,
        emertick: emertick,
        emerlink: emerlink
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