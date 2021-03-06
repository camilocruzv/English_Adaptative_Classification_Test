let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/candidate", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/candidate/profile');
        }
    }
    http.send(JSON.stringify({ doctype: document.getElementById("doctype").value, 
                        docnumber: document.getElementById("docnumber").value }));
}