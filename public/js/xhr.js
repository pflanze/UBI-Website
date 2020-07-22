//XMLHttpRequest
const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(method, url);
  
      xhr.responseType = 'json';
  
      if(data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.onload = () => {
        if (xhr.status >= 400){
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
  
      xhr.onerror = () => {
          reject('something went wrong');
      };
  
      xhr.send(JSON.stringify(data));
    });
    return promise;
  };
  
  const getData = () => {
    sendHttpRequest('GET', 'http://127.0.0.1:5500/js/data.json').then(responseData => {
      console.log(responseData);
      let answers = [];
      collection.textContent = '\n' + JSON.stringify(answers, '\t', 2);
    });
    };
   
  
  const sendData = () => {
    sendHttpRequest('POST', 'http://127.0.0.1:5500/js/data.json', answerText.value).then(responseData => {
      console.log(responseData)
    }).catch(err => {
      console.log(err);
    });
  
  };

  const sendBtn = document.querySelector(".sendBtn");
  const collectionBtn = document.getElementById("collectionBtn");
  //get
  collectionBtn.addEventListener('click', getData());
  //post
  sendBtn.addEventListener('click', sendData());