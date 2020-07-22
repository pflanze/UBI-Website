
//MODAL
// Get the modal
const body = document.querySelector("body");
const iModal = document.getElementById("iModal");
const whatModal = document.getElementById("whatModal");
const talkModal = document.getElementById("talkModal");
const modal = document.querySelector('.modal');
talkModal.style.display = "block"; //required for noModal(){if()}

// Get the button that opens the modal
const iBtn = document.getElementById("iBtn")
const talkBtn = document.getElementById("talkBtn");
const whatBtn = document.getElementById("whatBtn");

// Get the <span> tag that closes the modal
const talkClose = document.getElementsByClassName("talk-close")[0];
const whatClose = document.getElementsByClassName("what-close")[0];

/* if all modal windows are closed, display collectionPage,
but if collectionPage is already displayed, make no change. */
function noModal() {
  if (talkModal.style.display !== "block" && (iModal.style.display !== "block" && whatModal.style.display !== "block")){
    collectionPage.style.display = "block";
    body.style.background = "white";
    iBtn.style.color = "black";
    iBtn.style.borderColor = "black";
  } else if (collectionPage.style.display === "block") {
    collectionPage.style.display = "block"
  } else {
    collectionPage.style.display = "none"
  };
};


// specific iBtn & iModal function
iBtn.onclick = function() {
  if(iModal.style.display === "none") {
    iModal.style.display = "block";
    whatModal.style.zIndex = "1";
    talkModal.style.zIndex = "1";
    iModal.style.zIndex = "2";
  } else {
    iModal.style.display = "none";
  }
  noModal();
};

document.addEventListener('click', function(event) {
  const isClickInsideiBtn = iBtn.contains(event.target);
  const isClickInsideiModal = iModal.contains(event.target);
  const isClickInsidetalkClose = talkClose.contains(event.target);
  const isClickInsidewhatClose = whatClose.contains(event.target);
  const isClickInsidetalkBtn = talkBtn.contains(event.target);
  const isClickInsidewhatBtn = whatBtn.contains(event.target);
 
  if (!isClickInsideiBtn && !isClickInsideiModal &&
     !isClickInsidetalkClose && !isClickInsidewhatClose && 
     ! isClickInsidetalkBtn && !isClickInsidewhatBtn) {
    iModal.style.display = "none";
  } 
  noModal();
});

// z-index hierarchy of Modals

document.addEventListener('click', function(event) {
  const isClickInsidetalkModal = talkModal.contains(event.target);
  const isClickInsidewhatModal = whatModal.contains(event.target);
  const isClickInsidetalkBtn = talkBtn.contains(event.target);
  const isClickInsidewhatBtn = whatBtn.contains(event.target);
  
  if (isClickInsidetalkModal || isClickInsidetalkBtn) {
    talkModal.style.zIndex = "2";
    iModal.style.zIndex = "1";
    whatModal.style.zIndex = "1";
  } else if (isClickInsidewhatModal || isClickInsidewhatBtn) {
    whatModal.style.zIndex = "2";
    iModal.style.zIndex = "1";
    talkModal.style.zIndex = "1";
  };
});



// When the user clicks on the button, open the modal
talkBtn.onclick = function() {
  talkModal.style.display = "block";
};
whatBtn.onclick = function() {
    whatModal.style.display = "block";
  };

// When the user clicks on <span> (x), close the modal
talkClose.onclick = function() {
  talkModal.style.display = "none";
  noModal();
};
whatClose.onclick = function() {
  whatModal.style.display = "none";
  noModal();
};

// Copy email from whatModal
function copyEmail() {
  var tempInput = document.createElement("input");
  tempInput.value = "talk@progress.com";
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}



//DRAGGABLE
//Make the DIV element draggable:
dragElement(talkModal);
dragElement(whatModal);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    };
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  };

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };
};


//ANSWERS STORAGE

  //Get four elements and assign them to variables.
const form = document.getElementById("input-form");
const inputText = document.getElementById("answer-text");
const inputCountry = document.getElementById("country");
const sendBtn = document.querySelector(".sendBtn");
var collectionBtn = document.getElementById("collectionBtn");
const collectionPage = document.getElementById("collectionPage");
const collection = document.getElementById("answer-collection");
var count = 0;


// input limit-counter, not finished yet
function CountRemaining(string, targetcounter, limit) {
    var limit = 600;
    var count = document.getElementById(string).value.length;
    document.getElementById(targetcounter).innerHTML = ((limit-count) + " characters left");
    setTimeout(function(){ CountRemaining(string, targetcounter, limit); },50);
};



// POST and GET w/ fetch()
sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputText.value === null || inputText.value.match(/^ *$/) !== null) {
        alert("Please share your desires!");

    } else {
        console.log("answer=", inputText.value);
        console.log("country=", inputCountry.value);
        /*console.log("num=", count);*/
        async function postData() {

            const data = {
              answer: inputText.value,
              country: inputCountry.value,
              date: Date.now()
            };
            
            /*const numCount = {
              num: count
            }; */

            form.reset();

            const options = {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)/*,
              body2: JSON.stringify(numCount)*/
            };

            const response = await fetch('/api', options);
            const json = await response.json(data/*, numCount*/);
            console.log(data/*, numCount*/);


            addCount();
            function addCount () {
            count += 1;
            collectionBtn.textContent = count;
            console.log(collectionBtn.textContent);
            };
        };
        postData ();
        talkModal.style.display = "none";

        async function getData() {
          const response = await fetch('/api');
          const data = await response.json();
          console.log("response=", response);
          console.log("data=", data);
          count = data.length;

          for (item of data) {
            const answer = document.createElement('div');
            const country = document.createElement('div');
            const date = document.createElement('div');
      
            answer.textContent = `${item.answer}`;
            country.textContent = `${item.country}`;
            const dateString = new Date(item.date).toLocaleString();
            date.textContent = dateString;
            collection.append(answer, country, date);
          };
        };
        getData();
        alert("Thank you for your input!")
      };
// if all modal windows are closed, display the answer-collection page
      noModal();
});


// by clicking the answer-collection button, display the page
collectionBtn.addEventListener('click',  () => {
 collectionPage.style.display = "block";
 body.style.background = "white";
})





/*
// what I presented with Talk&Progress 23.06.20 evening
let answers = [ ];

const addAnswers = (e) => {
  e.preventDefault();
  let data = {
    text: input.value,
    location: "country",
    date: Date.now()
  }
  answers.push(data);
  form.reset();
  console.warn('added', {answers} );
  collection.textContent = '\n' + JSON.stringify(answers, '\t', 2);

  localStorage.setItem('answers-collection', JSON.stringify(answers));
}

document.addEventListener('DOMContentLoaded', ()=>{
  sendBtn.addEventListener('click', addAnswers);
});
*/




/* 
// dcode or some other guy's code 23.06.20 morning
const data = {
  text:"aaaa",
  location:"bbbb",
  date:"cccc"
}
const url = "data.json"
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  const { text, location, date } = data;
  const collection = document.getElementById("answer-collection");
  collection.textContent = text + "<br>" + location + "<br>" + date;
  console.log(data);
 
}

getData();

const otherPram = {
  headers: {
    "content-type":"application/json; charset=UTF-8"
  },
  body: data,
  method: "POST"
};

sendBtn.addEventListener("click", function() {
  talkModal.style.display = "none";
  fetch(url, otherPram)
  .then(data => {return data.json()})
  .then(res => {console.log(res)})
  .catch(error => console.log(error))
});
*/


