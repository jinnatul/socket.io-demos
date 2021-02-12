let socket = io();
let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value) {
    console.log(input.value);
    socket.emit('chat message', input.value);
    input.value = '';
  }
})