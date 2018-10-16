function setTimer() {
  return `<div>Set!!</div>`
}

function countTimer() {
  return `<div>Count</div>`
}

function init() {
  const root = document.getElementById('root');

  root.innerHTML = setTimer();
}

init();
