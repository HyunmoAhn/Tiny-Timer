import cx from 'classnames';

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

/**
 * Update DOM about progress count.
 * @param(Number) time: number of remain timer
 */
function renderProgressView(time) {
  function progressView(number) {
    const hour = parseInt(number / 3600);
    const minute = parseInt((number - hour * 60) / 60);
    const second = number % 60;

    const hourClassName = cx('Progress__hour', { 'Progress__hour--hide': hour === 0 });
    const minuteClassName = cx('Progress__minute', { 'Progress__minute--hide': minute === 0 && hour === 0 });
    const secondClassName = cx('Progress__second');

    return `
    <div class="Progress__Container">
      <span class=${hourClassName}>${hour}</span>
      <span class=${minuteClassName}>${minute}</span>
      <span class=${secondClassName}>${second}</span>
    </div>
  `;
  }

  const timerRoot = document.getElementById('timer-root');

  timerRoot.innerHTML = progressView(time);
}

/**
 * Update DOM about setting count.
 * @param(Number) time: number of set timer
 */
function settingView(number) {
  const hour = parseInt(number / 3600);
  const minute = parseInt((number - hour * 60) / 60);
  const second = number % 60;

  return `
    <form>
      <input class="Setting__hour" autofocus placeholder="0" type="number" value=${hour}>
      <span>:</span>
      <input class="Setting__minute" placeholder="00" type="number" value=${minute}>
      <span>:</span>
      <input class="Setting__second" placeholder="00" type="number" value=${second}>
      <input class="Setting__submit-btn" type="submit">
    </form>
  `;
}

/**
 * DOM about comment for alert when time is zero.
 * @returns {string}
 */
function commentView() {
  return `
    <div>
      <input type="text" placeholder="Please type to alert message">
    </div>
  `;
}

function init() {
  const root = document.getElementById('root');

  console.log(remote);
  root.innerHTML = setTimer();
}

init();
