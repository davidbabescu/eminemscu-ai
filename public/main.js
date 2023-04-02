const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const poemTypeSelect = document.querySelector("select[id='poemType']");
const button = chatBox.querySelector("button");
console.log('ok', button);
const chatBoxBody = chatBox.querySelector(".chat-box-body");
console.log('body', chatBoxBody);

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  console.log('send message');
   const message = inputField.value;
   const poemType = poemTypeSelect.value
  // inputField.value = "";
  // chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  // chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  // scrollToBottom();
  // window.dotsGoingUp = true;
  //   var dots = window.setInterval( function() {
  //       var wait = document.getElementById("loading");
  //       if ( window.dotsGoingUp ) 
  //           wait.innerHTML += ".";
  //       else {
  //           wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
  //       if ( wait.innerHTML.length < 2)
  //           window.dotsGoingUp = true;
  //       }
  //       if ( wait.innerHTML.length > 3 )
  //           window.dotsGoingUp = false;
  //       }, 250);

  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prompt: message, poemType: poemType})
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log('data', data);
    //document.getElementById("loading").remove();
    chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}












