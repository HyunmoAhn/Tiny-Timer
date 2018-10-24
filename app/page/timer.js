import { remote } from 'electron';

/**
 * Manager data of timer.
 */
class Timer {
  constructor(time) {
    this.time = time;
    this.remain = this.time;
    this.tick = null;
  }

  setTime(num) {
    this.time = num;
    this.remain = num;
  }

  getRemainTime() {
    return this.remain;
  }

  runTimeProgress(cb) {
    this.tick = setInterval(() => {
      this.remain -= 1;
      cb();
    }, 1000);
  }

  stopTimeProgress() {
    clearInterval(this.tick);
    this.tick = null;
  }
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
