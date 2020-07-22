// FETCH()
const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      Headers: data ? {'Content-Type': 'application/json' } : {}
    }).then(response => {
      if (response.status >= 400) {
        response.json().then(errResData => {
          const error = new Error ('something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
  });
  };
  
  const getData = () => {
    sendHttpRequest('GET', 'http://127.0.0.1:5500/js/data.json' )
    .then(responseData => {
      console.log(responseData);
    });
  };
  
  const sendData = () => {
    sendHttpRequest('POST', 'http://127.0.0.1:5500/js/data.json', {mssg:"i love you"})
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  const sendBtn = document.querySelector(".sendBtn");
  const collectionBtn = document.getElementById("collectionBtn");
  collectionBtn.addEventListener('click', getData());
  sendBtn.addEventListener('click', sendData());