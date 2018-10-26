import { app, globalShortcut } from 'electron';
import path from 'path';
import url from 'url';
import TrayBar from 'menubar';

const tray = TrayBar({
  index: url.format({
    pathname: path.resolve(__dirname, 'page/timer.html'),
    protocol: 'file:',
    slashes: true,
  }),
  icon: path.resolve(__dirname, 'assets/clockTemplate.png'),
  width: 235,
  height: 130,
});

app.on('ready', () => {
  tray.showWindow();
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
