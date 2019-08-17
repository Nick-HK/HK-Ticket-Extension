var url = window.location.href;
window.alert = function() {};
chrome.storage.local.get(['emertick','emerlink'], function (items) {
	if(items.emertick==true){
		window.location.assign(items.emerlink);
		return;
	}
});

if (url.includes("hkticketing")){
	if (url.includes("premier")) {
        if (document.body.innerText.indexOf("504")>0 || document.body.innerText.indexOf("502") >0)
		{
			window.location.href = "https://premier.hkticketing.com/shows/show.aspx?sh=BTSWO0319";
		}
    } else if (url.includes("busy")) {
        window.location.href = "https://premier.hkticketing.com/shows/show.aspx?sh=BTSWO0319";
    }
}


//AEG
if (url.includes("aegpromotion.com")){
	if(url.includes("TryAgain") || document.body.innerText.includes('try again later')){
		chrome.storage.local.get(['aegTickVal','aegVal'], function (items) {
			if (items.aegTickVal=='aeg_event'){
				window.location.href = "http://www.aegpromotion.com/" +  items.aegVal ; //Sample: http://www.aegpromotion.com/jacky2019/
			} else {
				window.location.href = "https://www.aegpromotion.com" ;
			}	
	});} else if (url.includes("index")){
		alertBox();
	}
}

//Cityline
if (url.includes("msg.cityline.com/busy.html")){
	chrome.storage.local.get(['tickValue','updateCode'], function (items) {
		if (items.tickValue=='cityline_activity'){
			window.location.href = "http://event.cityline.com/utsvInternet/enrollment/action/login.do?activityCode=" + items.updateCode + "&actionType=5&lang=en";
		} else if (items.tickValue=='cityline_event'){
			window.location.href = "http://event.cityline.com/utsvInternet/internet/action/event.do?actionFwd=eventDetail&event=" + items.updateCode + "&actionType=5&lang=TW";
		} else {
			window.location.href = "http://www.cityline.com/Events.do";
		}
	});
} 

//Urbtix
if (url.includes("ticket.urbtix.hk/internet/")){
	alertBox();
	creditCard();
}
if (url.includes("msg.urbtix.hk") || url.includes("busy.urbtix.hk")){
	window.location.href = "http://www.urbtix.hk";
};


function creditCard(){
    window.onload = function (){
		var url = window.location.href;
	if (url.includes("expressPurchase")){
        var script = document.createElement('script');
        script.textContent = "setTimeout(\"confirmReview();\", 2000);";
        (document.head||document.documentElement).prepend(script);
    }
    if (url.includes("shoppingCart")){
        $('#checkout-btn').click();
    }
    if (url.includes("mailingPayment")){
		chrome.storage.local.get(['surname','firstname','phonenumber','email','cctype','ccnum','ccsecuritycode','ccmonth','ccyear','enableCC'], function (items) {
				if (items.enableCC == true){
					$('#input-surname').val(items.surname);
			        $('#input-first-name').val(items.firstname);
			        $('#input-phone-no').val(items.phonenumber);
			        $('#input-email').val(items.email);
			        $('#delivery-method-select').val('TDM');
			        $('#delivery-method-select').attr('data-selected_id','106')
			        $('#delivery-method-select option:selected').val('TDM')
			        var script = document.createElement('script');
			        script.textContent = "setTimeout(\"deliverySelectionChange();changeAndDisplayPaymentMethod();$('#button-confirm').click();\", 2000);";
			        (document.head||document.documentElement).prepend(script);
			        $('#payment-type-select').val(items.cctype);
			        $('#payment-type-select option:selected').attr('data-payment_type_id',items.cctype);
			        $('#input-card-number').val(items.ccnum);
					$('#input-security-code').val(items.ccsecuritycode);
			        $('#payment-expiry-month-select').val(items.ccmonth);
			        $('#payment-expiry-year-select').val(items.ccyear);
				}
			});
	    }
	}
}


function alertBox(){
	if (document.cookie=="" || getCookie("dialog")== null ){
		$.confirm({
			title: 'Congratulations!',
			content: '<div >' +
			'<h3>You have sucessfully logged in</h3><br>'+
			'This application is created by <b>Nick</b> and not for commercial use.</br></br>'+
			'Thank you and Enjoy!</br>'+
			'<div>',
			type: 'green',
			theme: 'material',
			animationBounce: 1.5,
			boxWidth: '50%',
			useBootstrap: false,
			backgroundDismiss: true,
			buttons:{
				confirm: {
					btnClass: 'btn-green',
					text: 'OK'
				}
			}
		});
		setCookie('dialog','true',0.1);
	}
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteAllCookies() {
    document.cookie.split(";").forEach(
		function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
		}
	);
}