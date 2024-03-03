let list = document.getElementById("linksList");
let links = [];
let shorts = [];
let buttons = [];

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return "https://rel.ink/" + result;
}

function copy(button) {
    var id = button.getAttribute("id");
    buttons.forEach((element) => {
        if (element.classList.contains("copied")) {
            element.classList.remove("copied");
            element.value = "Copy";
        }
    });
    buttons[id].classList.add("copied");
    buttons[id].value = "Copied!";
    var test = shorts[id];
    navigator.clipboard.writeText(shorts[id]);
}

function writeLink(currentLink) {
    if (!links.includes(currentLink)) {
        var li = document.createElement("li");
        
        var long = document.createElement("span");
        long.classList.add("longURL");
        long.appendChild(document.createTextNode(currentLink));
        li.appendChild(long);
        
        var short = document.createElement("span");
        short.classList.add("shortURL");
        
        var shortURL = "";
        while (shortURL == "" || shorts.includes(shortURL)) {
            shortURL = makeid(6);            
        }
        shorts.push(shortURL);
        short.appendChild(document.createTextNode(shortURL));
        li.appendChild(short);
        
        var button = document.createElement("input");
        button.type="submit";
        button.value="Copy";
        button.classList.add("copyButton");
        button.setAttribute("id", buttons.length) ;
        buttons.push(button);
        button.addEventListener("click", function() {copy(this);});
        li.appendChild(button);
        
        links.push(currentLink);
        list.appendChild(li);
    }    
}

function errorLink(url) {
    url.classList.remove("normalURL");
    url.classList.add("errorInput");
    document.getElementById("errorURL").textContent = "Please add a link";
}

function removeError(url) {
    url.classList.remove("errorInput");
    url.classList.add("normalURL");    
    document.getElementById("errorURL").textContent = "";
}

function addLink() {
    var url = document.getElementById("url");
    if(!url.checkValidity()) {
        errorLink(url);
        return;
    } else {
        removeError(url);
        writeLink(url.value);
    }
}