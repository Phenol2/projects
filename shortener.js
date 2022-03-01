let URL = "https://api.shrtco.de/v2/shorten?url=";

let shorten = document.querySelector('.shorten');



let arr = [];

//get the new url from the api
async function shortenUrl(myurl){
    try{
        let { data } = await new axios(`${URL}${myurl}`);

        let newLinks =  data.result.full_short_link;

        //displayLinks(myurl, newLinks);
        checkForDuplcateUrl(myurl, newLinks)
        //console.log(newLinks);
    }
    catch(err){
        if(!(err.okay)){
            console.log("bad url")
        }
    }
    
}


// function to check for dupliacate links or Urls...
function checkForDuplcateUrl(_oldUrl, _newUrl){

    //new Set helps to filter the list in other to remove duplicate...
    let filteredList = new Set(arr);

    //the list is being updated i.e new links are been added to array...
    arr.push(_newUrl);
    if(filteredList.has(_newUrl)){
        
        console.log("duplicate eixst")
    }else{
        displayLinks(_oldUrl, _newUrl)
    }
    //console.log(duplicate)
    //console.log(arr)
}




//display both old links and new links

function displayLinks(oldUrl, newUrl){
    let main = document.querySelector(".outputs");
    //let link = document.querySelector(".mylinks");

    let link = document.createElement("div");
    link.classList.add("mylinks");


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

    main.appendChild(link);

    // to copy link to clip board...
    let copies = document.querySelectorAll('.copy');

    copies.forEach(copy => {
        copy.addEventListener('click', (e) => {
            e.preventDefault();

            let copyParent = e.target.parentElement.firstElementChild;
            let textArea = document.createElement('textarea');
            const copiedLink = copyParent.innerHTML;

           if(copiedLink){

            textArea.value = copiedLink;
            document.body.appendChild(textArea);
    
            textArea.select();
            textArea.setSelectionRange(0, 9999);
        
           document.execCommand("copy");
    
           textArea.remove();
            }
        })
    })
    
}

let enter = document.querySelector('.enter')

//display error message when there is empty input field...
let error = document.createElement('div')


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
        parentName.style.border = 'none';
        error.innerHTML = ''
     
    }else{
       
        error.classList.add('error')
        error.innerText = 'please enter a url'
        enter.appendChild(error)
        parentName.style.border = '1px solid red'
        
        console.log("please enter a url")
    }

    parentName.value = "";
     //shortenUrl("https://www.frontendmentor.io/challenges")
    console.log(linksInput)
})


//opening the navigation bar...

let toggle = document.querySelector('.bars');
let nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
    nav.classList.toggle('open')
})