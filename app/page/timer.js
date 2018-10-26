import cx from 'classnames';
import Mousetrap from 'mousetrap';
import './timer.scss';

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
      const text = document.getElementsByClassName('Comment__input')[0].value;
      const notification = {
        title: 'Time is up',
        body: text,
        icon: path.join
      }

      new Notification(notification.title, notification);
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
    const minute = parseInt((number - hour * 3600) / 60);
    const second = number % 60;

    const hourClassName = cx('Progress__number', 'Progress__hour', { 'Progress__number--hide': hour === 0 });
    const minuteClassName = cx('Progress__number', 'Progress__minute', { 'Progress__number--hide': minute === 0 && hour === 0 });
    const secondClassName = cx('Progress__number', 'Progress__second');

    return `
    <div class="Progress__Container">
      <p class="${hourClassName}"><span>${hour}</span></p>
      <p class="${minuteClassName}"><span>${minute}</span></p>
      <p class="${secondClassName}"><span>${second}</span></p>
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
  const minute = parseInt((number - hour * 3600) / 60);
  const second = number % 60;

  return `
    <form class="Setting__container">
      <input class="Setting__input Setting__hour" autofocus placeholder="0" type="number" value=${hour} min=0 max=24>
      <span class="Setting__colon">:</span>
      <input class="Setting__input Setting__minute" placeholder="00" type="number" value=${minute} min=0 max=59>
      <span class="Setting__colon">:</span>
      <input class="Setting__input Setting__second" placeholder="00" type="number" value=${second} min=0 max=59>
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
    <div class="Comment__container">
      <textarea class="Comment__input" placeholder="Type to alert message">Please type to alert message</textarea>
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
