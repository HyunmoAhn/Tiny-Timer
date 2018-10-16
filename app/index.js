import { app } from 'electron';
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
  width: 250,
  height: 100,
});

app.on('ready', () => {
  tray.showWindow();
});
