function hideGuide() {
    let d = document.getElementById('game-info');
    let b = document.getElementById('btn-hide');
    if (b.value == "hide") {
        b.value = "not-hide";
        d.style.display = "block";
        b.style.transform = "rotate(180deg)";
    } else {
        b.value = "hide";
        d.style.display = "none";
        b.style.transform = "rotate(0deg)";
    }
}

function openTab(evt, tab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}


var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function checkLocalStorage(key) {
    return localStorage.getItem(key) != null && localStorage.getItem(key).length != 0;
}

function rankingSorter(firstKey, secondKey) {
    return function(a, b) {  
        if (a[firstKey] > b[firstKey]) {  
            return -1;  
        } else if (a[firstKey] < b[firstKey]) {  
            return 1;  
        }  
        else {
            if (a[secondKey] > b[secondKey]) {  
                return 1;  
            } else if (a[secondKey] < b[secondKey]) {  
                return -1;  
            } else {
                return 0;
            }
        } 
    }  
}