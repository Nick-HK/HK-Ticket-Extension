
function openDashboard(){
    chrome.tabs.create({url: "html/dashboard/index.html"});
}
document.getElementById('dashboard_button').addEventListener("click", function(){
    openDashboard()
    window.close();
});
