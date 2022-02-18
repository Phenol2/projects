let URL = "https://api.shrtco.de/v2/shorten?url=";

let shorten = document.querySelector('.shorten');

//get the new url from the api
async function shortenUrl(myurl){
    try{
        let { data } = await new axios(`${URL}${myurl}`);

        displayLinks(myurl, data.result.full_short_link);

        console.log(data.result.full_short_link);
    }
    catch(err){
        if(!(err.okay)){
            console.log("bad url")
        }
    }
    
}

//document.addEventListener("DOMContentLoaded",)

function displayLinks(oldUrl, newUrl){
    let main = document.querySelector(".shorten-link");
    let link = document.querySelector(".mylinks");

    let links = `
    <div class="old-links">
        ${oldUrl}
    </div>

    <div class="new-links">
       <a href=${newUrl} class="shrt" target = "_blank"> ${newUrl}</a>
       <button class="copy"> copy</button>
    </div> 
    `;

    link.innerHTML = links

    main.appendChild(link)
}


// get values from the input...
shorten.addEventListener("click",(e) => {
    
    e.preventDefault();
    let btn = e.target;
    let parentName = btn
                    .parentElement
                    .firstElementChild;

    let linksInput = parentName.value
    if(linksInput){

        shortenUrl(linksInput)
    }else{
        console.log("please enter a url")
    }
    
     //shortenUrl("https://www.frontendmentor.io/challenges")
    console.log(linksInput)
})
