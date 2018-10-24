import cx from 'classnames';
import Mousetrap from 'mousetrap';

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
 * Draw view and handle event for setting mode.
 * @param(Timer) timer: data for timer.
 */
function settingMode(timer) {
  const timerRoot = document.getElementById('timer-root');
  timerRoot.innerHTML = settingView(timer.time);
  const submitDOM = document.getElementsByTagName('form')[0];
  submitDOM.addEventListener('submit', () => countingMode(timer));

  timer.stopTimeProgress();
  Mousetrap.unbind('space');
  Mousetrap.unbind('backspace');
  Mousetrap.bind('enter', () => countingMode(timer));
}

/**
 * Draw view and handle event for counting mode.
 * @param(Timer) timer: data for timer.
 */
function countingMode(timer) {
  /**
   * progress timer or stop timer.
   */
  function toggleTimer() {
    if (timer.tick) {
      timer.stopTimeProgress();
    } else {
      timer.runTimeProgress(progressTimer);
    }
  }

  function progressTimer() {
    if (timer.remain > 0) {
      renderProgressView(timer.getRemainTime())
    } else {
      timer.stopTimeProgress();
      settingMode(timer);
    }
  }

  /**
   * Calculate second using extracted data from DOM.
   * @returns {number}: second of timer.
   */
  function calculateTime() {
    const hour = Number(document.getElementsByClassName('Setting__hour')[0].value);
    const minute = Number(document.getElementsByClassName('Setting__minute')[0].value);
    const second = Number(document.getElementsByClassName('Setting__second')[0].value);

    return hour * 3600 + minute * 60 + second;
  }

  const time = calculateTime();
  renderProgressView(time);
  timer.setTime(time);
  timer.runTimeProgress(progressTimer);

  const container = document.getElementsByClassName('Progress__Container')[0];
  container.addEventListener('click', toggleTimer);
  Mousetrap.bind('space', toggleTimer);
  Mousetrap.bind('backspace', () => settingMode(timer));
  Mousetrap.unbind('enter');
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
  const commentRoot = document.getElementById('comment-root');
  commentRoot.innerHTML = commentView();

  const timer = new Timer(300);

  settingMode(timer);
}

init();
