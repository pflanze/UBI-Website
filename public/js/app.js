
//MODAL
// Get the modal
const body = document.querySelector("body");
const iModal = document.getElementById("iModal");
const whatModal = document.getElementById("whatModal");
const talkModal = document.getElementById("talkModal");
const modal = document.querySelector('.modal');
talkModal.style.display = "block"; //required for noModal(){if()}

// Get the button that opens the modal
const iBtn = document.getElementById("iBtn");
const iGrid =  document.querySelector(".iGrid");
const talkBtn = document.getElementById("talkBtn");
const whatBtn = document.getElementById("whatBtn");

// Get the <span> tag that closes the modal
const talkClose = document.getElementsByClassName("talk-close")[0];
const whatClose = document.getElementsByClassName("what-close")[0];

// brings iModal forward when clicking iBtn 
// and closes iModal when clicking again
iBtn.addEventListener('click', function() {
      if(iModal.style.display === "none") {
        iModal.style.display = "block";
        iModal.style.zIndex = "3";
        iGrid.style.zIndex = "3";
        iBtn.style.zIndex = "3";
        whatModal.style.zIndex = "2";
        talkModal.style.zIndex = "2";
      } else {
        iModal.style.display = "none";
        iGrid.style.zIndex = "2";
        iBtn.style.zIndex = "2";
      };

      //displays collectionPage
      //noModal();
});


/* if all modal windows are closed, display collectionPage,
but if collectionPage is already displayed, make no change. */
function noModal() {
      if (talkModal.style.display !== "block" && (iModal.style.display !== "block" && whatModal.style.display !== "block")){
            landingGet();
            loadCollectionPageStyle();
      } else if (collectionPage.style.display === "block") {
            collectionPage.style.display = "block";

      } else {
            collectionPage.style.display = "none";
      };
};

function loadCollectionPageStyle() {
      const topBarGrid = document.querySelector(".TOP-BAR-GRID");
      topBarGrid.style.backgroundColor = "white";
      iBtn.style.color = "black";
      iBtn.style.borderColor = "black";
      collectionPage.style.display = "block";
      body.style.background = "white";
      
};


//clicking anywhere besides these buttons closes iModal
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

      //displays collectionPage
      //noModal();
});


// brings z-index hierarchy of Modals forward with a click
document.addEventListener('click', function(event) {
      const isClickInsidetalkModal = talkModal.contains(event.target);
      const isClickInsidewhatModal = whatModal.contains(event.target);
      const isClickInsidetalkBtn = talkBtn.contains(event.target);
      const isClickInsidewhatBtn = whatBtn.contains(event.target);
      
      if (isClickInsidetalkModal || isClickInsidetalkBtn) {
            talkModal.style.zIndex = "3";
            whatModal.style.zIndex = "2";
      } else if (isClickInsidewhatModal || isClickInsidewhatBtn) {
            whatModal.style.zIndex = "3";
            talkModal.style.zIndex = "2";
      };
});



// When the user clicks on the NavBar button, open the modal
talkBtn.onclick = function() {
      talkModal.style.top = "10px";
      talkModal.style.right = "0";
      talkModal.style.bottom = "0";
      talkModal.style.left = "430px";
      talkModal.style.display = "block";
};
whatBtn.onclick = function() {
      whatModal.style.top = "10px";
      whatModal.style.right = "0";
      whatModal.style.bottom = "0";
      whatModal.style.left = "900px";
      whatModal.style.display = "block";
  };


// When the user clicks on <span> (x), close the modal
talkClose.onclick = function() {
      talkModal.style.display = "none";
      talkModal.style.top = "10px";
      talkModal.style.right = "0";
      talkModal.style.bottom = "0";
      talkModal.style.left = "430px";
      noModal();
};
whatClose.onclick = function() {
      whatModal.style.display = "none";
      whatModal.style.top = "10px";
      whatModal.style.right = "0";
      whatModal.style.bottom = "0";
      whatModal.style.left = "900px";
      noModal();
};


// Textarea autoExpand
document.addEventListener('input', function (event) {
      if (event.target.tagName.toLowerCase() !== 'textarea') {return};
      autoExpand(event.target);
}, false);

var autoExpand = function(field){
      // Reset field height
      field.style.height = 'inherit';

      // Get the computed styles for the element
      var computed = window.getComputedStyle(field);

      // Calculate the height
      var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                  + parseInt(computed.getPropertyValue('padding-top'), 10)
                  + field.scrollHeight
                  + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                  + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';
}

/* NOT NEEDED
// Copy email from whatModal
function copyEmail() {
      var tempInput = document.createElement("input");
      tempInput.value = "talk@progress.com";
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
}
*/


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

//ANSWER SUBMISSIONS and DATA STORAGE

  //Get four elements and assign them to variables.
const form = document.getElementById("input-form");
const inputText = document.getElementById("answer-text");
const inputCountry = document.getElementById("country");
const sendBtn = document.querySelector(".sendBtn");
const collectionBtn = document.getElementById("collectionBtn");
const collectionPage = document.getElementById("collectionPage");
const collection = document.getElementById("answer-collection");



// counts the text of input when typing
function CountRemaining() {
      var stringCount = document.getElementById("answer-text").value.length;
      document.getElementById("stringCounter").textContent = stringCount + "/600";
      setTimeout(function(){ CountRemaining(); },0);
};

CountRemaining();


// PAGINATION
// global JavaScript variables

// stores json data _id from database to avoid redundant appending on display
const dataID = [];
const dataIterArr = new Array;
var backCounter = 0;
const nextBtn = document.getElementById("next");


// GET w/ fetch()

async function getDataCount() {
      const response = await fetch('/api');
      const data = await response.json();

      var count = data.length;
      collectionBtn.textContent = count;

};
getDataCount();



async function getDataNew() {
      const response = await fetch('/api');
      const data = await response.json();

      for (const item of data){
            if (collectionPage.style.display === "block" && dataID.includes(item._id) === false && /*NEED to confirm this works*/item.ID === data.length){
           
                  //create divs for each data property
                  const filler = document.createElement('div');
                  const answer = document.createElement('div');
                  const country = document.createElement('div');
                  const date = document.createElement('div');
                  const dataUnit = document.createElement("div");
                  const row = document.createElement("div");

                  //css bootstrap
                  filler.classList.add("col-md-5");
                  
                  answer.classList.add("col-md-5");
                  answer.classList.add("answer");

                  row.classList.add("col-md-2");
                  country.classList.add("country");
                  date.classList.add("date");

                  dataUnit.classList.add("row");
                  dataUnit.classList.add("dataUnit");

                  //puts each item of data into a unit to display in HTML
                  answer.textContent = `${item.answer}`;
                  country.textContent = `${item.country}`;
                  const dateString = new Date(item.date).toLocaleString();
                  date.textContent = dateString;

                  //combine data as one unit
                  row.append(country, date)
                  dataUnit.append(answer, row);

                  //prepend new data to collection
                  collection.prepend(dataUnit);
                  dataID.push(item._id);
                  backCounter += 1;
                  console.log("getNew = ", item);
            };
      };
};

async function getDataIter() {
      const response = await fetch('/api');
      const data = await response.json();

      const mark = data.length-backCounter;

      for(var i = mark - 1; i >= mark-10; i--) {
            dataIterArr.push(data[i]);
            backCounter+=1;

            console.log("getDataIter = ", data[i]);
            console.log("backCoutner = ", backCounter);
      };


      for (const item of dataIterArr){
            if (dataID.includes(item._id) === false){

                  //create divs for each data property
                  const filler = document.createElement('div');
                  const answer = document.createElement('div');
                  const country = document.createElement('div');
                  const date = document.createElement('div');
                  const dataUnit = document.createElement("div");
                  const row = document.createElement("div");

                  //css bootstrap
                  filler.classList.add("col-md-5");
                  
                  answer.classList.add("col-md-5");
                  answer.classList.add("answer");

                  row.classList.add("col-md-2");
                  country.classList.add("country");
                  date.classList.add("date");

                  dataUnit.classList.add("row");
                  dataUnit.classList.add("dataUnit");

                  
                  //puts each item of data into a unit to display in HTML
                  answer.textContent = `${item.answer}`;
                  country.textContent = `${item.country}`;
                  const dateString = new Date(item.date).toLocaleString();
                  date.textContent = dateString;

                  //combine data as one unit
                  row.append(country, date);
                  dataUnit.append(filler,answer, row);
                  
                  //append 10 data to collection
                  collection.append(dataUnit);
                  dataID.push(item._id);
                  console.log("appendDataIter = ", item);
            };
      };
};




// POST w/ fetch()
sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputText.value === null || inputText.value.match(/^ *$/) !== null) {
        alert("Please share your desires!");
    } else {
            console.log("answer = ", inputText.value);
            console.log("country = ", inputCountry.value);

            async function postData() {

                  const data = {
                        answer: inputText.value,
                        country: inputCountry.value,
                        date: Date.now(),
                      
                              
                  };

                  const options = {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                  };

                  form.reset();

                  const response = await fetch('/api', options);
                  const json = await response.json(data);
                  
                  console.log("post =", JSON.stringify(data));
            };

            postData();
            
            talkModal.style.display = "none";

            // if all modal windows are closed, display the answer-collection page and getDataNew() & getDataIter()
            //landingGet();
            getDataNew();
            
            getDataCount();
            noModal();
      };
});


function landingGet() {
      if (collectionPage.style.display !== "block"){
            getDataIter();
      };
};


// by clicking the answer-collection button, display the page
collectionBtn.addEventListener('click',  () => {
      if (collectionPage.style.display !== "block"){
            getDataIter();
            loadCollectionPageStyle();


            //NEEDS MORE WORKING HERE 
      } else if(collectionPage.style.display === "block"){
        for(var i = 0; i <= 10; i++){
          if(dataID[i].includes() === false){
            getDataNew();
          }
        }
      
          
      };
});


//Load more content by scroll

nextBtn.addEventListener('click', function(){
  getDataIter();
});


/*
$(window).scroll(function () {
  // End of the document reached?
  if ($("#collectionPage").height() - $(this).height() == $(this).scrollTop()) {
    getDataIter();
  }
});
*/
