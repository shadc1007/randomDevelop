// Selectors
const flexResult = document.querySelector(".flex-container1-result");
const greenButton = document.querySelector(".greenBtn");
const redButton = document.querySelector(".redBtn");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const quoteButton = document.querySelector(".new-quote");
const soundsBtn = document.querySelector("#sounds");
const genCat = document.querySelector("#genCat");
const resetCat = document.querySelector("#resetCat");
const catDiv = document.querySelector(".cat-image");

// Event listeners 
greenButton.addEventListener('click', buttonFun);
redButton.addEventListener('click', removeBtn);
quoteButton.addEventListener('click', newQuote);
soundsBtn.addEventListener('click', soundsFun);
genCat.addEventListener('click', generateCat);
resetCat.addEventListener('click', removeCat);

// function 
function buttonFun() {
    // Green Button
    const popUp = prompt("wat year you were born?....");
    const logic = (2022 - popUp) * 365;
    const upLogic = "You are " + logic + " days old! wohoo!";
    // creating div for h1 - el
    const divEl = document.createElement('div');
    divEl.classList.add("resultDiv");
    // creating h1 el
    const h1El = document.createElement('h1');
    h1El.classList.add("h1-el");
    h1El.innerText = upLogic;
    divEl.appendChild(h1El);
    flexResult.appendChild(divEl);
    
}

// function remove 
function removeBtn() {
    const result = document.querySelector(".resultDiv");
    result.remove();
}   

// Function new quote
function newQuote() {
    const quoteAPI = "https://api.quotable.io/random";
    fetch(quoteAPI)
    .then(response => response.json())
    .then(result =>{
        quoteText.textContent = result.content;
        quoteAuthor.textContent = "__"+ result.author;
    });
};

// function Quote sounds
function soundsFun() {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.textContent}`);
    speechSynthesis.speak(utterance);
};

// Function generate cat and api
function generateCat() {
    catDiv.innerHTML = '';

    fetch ("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(result =>{
        const catImg = result[0].url;
        // Create image element
        const imageEl = document.createElement('img');
        imageEl.src = catImg;
        imageEl.classList.add("image-ofCat");
         
        catDiv.appendChild(imageEl);
 
    })
};

// Reset Cat / remove cat image
function removeCat() {
    catDiv.removeChild(catDiv.firstElementChild);

}