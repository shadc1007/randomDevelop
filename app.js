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
const inputText = document.querySelector("#textarea");
const plusButton = document.querySelector("#todoBtn");
const todoArea = document.querySelector(".todo-area");


// Event listeners 
greenButton.addEventListener('click', buttonFun);
redButton.addEventListener('click', removeBtn);
quoteButton.addEventListener('click', newQuote);
soundsBtn.addEventListener('click', soundsFun);
genCat.addEventListener('click', generateCat);
resetCat.addEventListener('click', removeCat);
plusButton.addEventListener('click', addTask);
todoArea.addEventListener('click', removeList)


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

// Challenge 4 todo list
function addTask(e) {
    // prevent from refreshing
    e.preventDefault();
    // input value
    const inputValue = inputText;
    // Creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating li 
    const todoList = document.createElement("li");
    todoList.innerText = inputValue.value
    todoList.classList.add("list");
    todoDiv.appendChild(todoList);
    // creating check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    todoDiv.appendChild(checkButton);
    // Creating delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.setAttribute('id', 'deleteId');
    todoDiv.appendChild(deleteButton); 
    // Append
    todoArea.appendChild(todoDiv);
    // reset input value
    inputValue.value = '';
};

// Delete list
function removeList(e) {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const parentEl = target.parentElement;
        parentEl.remove();
    }

    if (target.classList.contains("check-btn")) {
        const completed = target.parentElement;
        completed.classList.toggle("completed");
    }
};