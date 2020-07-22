/* Axios
const sendBtn = document.querySelector(".sendBtn");
const collectionBtn = document.getElementById("collectionBtn");\\

const getData = () => {
    axios.get('http://127.0.0.1:5500/js/data.json').then(response => {
        console.log(response);
    });
    
};

const sendData = () => {
  axios.post('http://127.0.0.1:5500/js/data.json', {
        dummy:"hello world"
  }).then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err, err.response);
  });
};

sendBtn.addEventListener('click', sendData());
collectionBtn.addEventListener('click', getData());

*/