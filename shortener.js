let URL = "https://api.shrtco.de/v2/shorten?url=";

let shorten = document.querySelector('.shorten');

async function shortenUrl(myurl){
    try{
        let { data } = await new axios(`${URL}${myurl}`)
        console.log(data.result.full_short_link);
    }
    catch(err){
        if(err.responce.status === 404){
            console.log("bad url")
        }
    }
    
}



shorten.addEventListener("click",(e) => {
    
    e.preventDefault();
    let btn = e.target;
    let parentName = btn
                    .parentElement
                    .firstElementChild;

    let linksInput = parentName.value
    shortenUrl(linksInput)
     //shortenUrl("https://www.frontendmentor.io/challenges")
    //console.log(linksInput)
})
