import { app, globalShortcut } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import url from 'url';
import TrayBar from 'menubar';
import createMenu from './menu.js';

const tray = TrayBar({
  index: url.format({
    pathname: process.env.NODE_ENV === 'development' ? path.resolve(__dirname, 'page/timer.html') : path.resolve(__dirname, 'timer.html'),
    protocol: 'file:',
    slashes: true,
  }),
  icon: process.env.NODE_ENV === 'development' ? path.join(__dirname, 'assets/clockTemplate.png') : path.join(__dirname, '../app/assets/clockTemplate.png'),
  width: 235,
  height: 145,
  showDockIcon: true,
});

app.on('ready', () => {
  tray.showWindow();
  createMenu();
  autoUpdater.checkForUpdatesAndNotify()
    .then((data) => console.log('data', data))
    .catch((err) => console.log(err));
});

app.on('activate', (e, isOpenWindow) => {
  if (!isOpenWindow) {
    tray.showWindow();
  } else {
    tray.hideWindow();
  }
});

tray.on('show', () => {
  globalShortcut.register('Escape', () => {
    if (tray.window && tray.window.isFocused()) {
      tray.window.blur(); // Need to reopen in windowOS
      tray.hideWindow(); // Need to reopen in macOS
    }
  });
});

tray.on('hide', () => {
  /**
   * If you don't this, Escape key doesn't active another application.
   */
  globalShortcut.unregister('Escape');
});

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'hyunmoahn',
  protocol: 'https',
  repo: 'tiny-timer',
});
