//Loading the content
function LoadContent(){
    let content = document.getElementById("content");
    let url = window.location.href.split("?");
    if(url.length < 2)
        return;
    let pg = url[url.length-1];
    url = pg.split("#");
    pg = "module1/";
    pg += url[0];
    pg += ".html";
    
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) 
                content.innerHTML = this.responseText;
            else if (this.status == 404)
                content.innerHTML = "Error 404 Page not found.";
        }
    }
    request.open("GET", pg, false);
    request.send();
}

LoadContent();

//set <title> element of page
let pageTitle = document.querySelector("main h1");
let modTitle = document.querySelector(".mod");
document.getElementsByTagName("title")[0].textContent = modTitle.textContent + " | " + pageTitle.textContent;

//find pageTitle in nav, set class to here, href it to top of page, link prev and next
let navHeads = document.querySelectorAll("nav a[href]:not(.group-header)");
let prevButton = document.querySelectorAll(".prev-next a[href]")[0];
let nextButton = document.querySelectorAll(".prev-next a[href]")[1];
for(let i = 0; i < navHeads.length; i++)
{
    if(navHeads[i].textContent == pageTitle.textContent)
    {
        //setting "here"
        navHeads[i].classList.add("here");
        navHeads[i].href = "#title";

        //setting prev
        try{
            prevButton.href = navHeads[i-1].href;
        }
        catch(err){
            prevButton.remove();
            document.querySelector(".prev-next").style.justifyContent = "flex-end";
        }
        //setting next
        try{
            nextButton.href = navHeads[i+1].href;
        }
        catch(err){
            nextButton.remove();
        }
    }
}

//Appending sub-headings
let subheadsText = "<ul>";
let subheads = document.querySelectorAll("main h2");
for(let i = 0; i < subheads.length; i++)
{
    let subheadTitle = subheads[i].id;
    subheadsText += "<li><a href='#" + subheadTitle + "'>" + subheads[i].textContent + "</a></li>";
}
subheadsText += "</ul>";

let curNav = document.querySelector(".here").parentElement; //the list item
curNav.innerHTML += subheadsText;

//navi-toggle workings
let aside = document.querySelector("aside");
let toggle = document.querySelector(".navi-toggle");
let width = window.innerWidth;
window.addEventListener('resize', navOrNo);
toggle.onclick = function(){showNavigation();}

function navOrNo(){
    if(window.innerWidth != width)
    {
        width = window.innerWidth;
        if(window.innerWidth < 800)
        {
            document.querySelector("main").style.marginInlineStart = "0px";
            document.querySelector(".prev-next").style.marginInlineStart = "0px";
            document.querySelector("footer").style.marginInlineStart = "0px";
            aside.style.left = "-266px";
            toggle.style.left = "0px";
            toggle.onclick = function() {showNavigation();}
        }
        else
        {
            document.querySelector("main").style.marginInlineStart = "266px";
            document.querySelector(".prev-next").style.marginInlineStart = "266px";
            document.querySelector("footer").style.marginInlineStart = "270px";
            aside.style.left = "0px";
            toggle.style.left = "266px";
        }
    }
}

function showNavigation() {
    if(aside.style.left != "0px")
    {
        aside.style.left = "0px";
        toggle.style.left = "266px";
    }
    else
    {
        aside.style.left = "-266px";
        toggle.style.left = "0px";
    }
}

//searchBar workings
let searchBar = document.querySelector("form[role='search']");
let searchInput = document.querySelector(".search input[type='search']");
let TofC = document.querySelector("#tofc");
let results = document.querySelector("#results");
let cancel = document.querySelector(".search input[role='cancel']");

searchBar.addEventListener('submit', function(event){
    event.preventDefault();
    if(searchInput.value !== "")
    {
        TofC.removeAttribute("role");
        TofC.style.display = "none";
        results.removeAttribute("hidden");
        cancel.removeAttribute("hidden");
        results.setAttribute("role", "alert");
    }
});

cancel.addEventListener('click', function(event){
    event.preventDefault();
    searchInput.value = "";
    results.removeAttribute("role");
    results.setAttribute("hidden", "");
    cancel.setAttribute("hidden", "");
    TofC.style.display = "block";
    TofC.setAttribute("role", "alert")
});

//linking current styles
let pg = window.location.href.split("?");
if(pg.length > 1)
{
    pg = pg[pg.length-1];
    document.querySelector("#cur-styles").href = "styles/" + pg + "-styles.css";
}