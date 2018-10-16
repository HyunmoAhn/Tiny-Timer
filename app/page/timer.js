import { remote } from 'electron';

function setTimer() {
  return `<div>Set!!</div>`
}

function countTimer() {
  return `<div>Count</div>`
}

function init() {
  const root = document.getElementById('root');

  console.log(remote);
  root.innerHTML = setTimer();
}

init();
