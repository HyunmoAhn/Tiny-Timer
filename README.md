# Tiny-Timer
<p align="center">
  <img width="256" height="256" src="https://user-images.githubusercontent.com/23732795/47601493-760fa680-da0c-11e8-828c-0a5c2a23d447.png">
</p>

### For application
Simple timer desktop app using electron

### For boilerplate
Can be referred to electron basic setting like `hot-loading`, `build`, `auto-launch`, `auto-update` etc.
> I have managed [oh-my-desk](https://github.com/ahki/oh-my-desk) maked electron.
> [oh-my-desk](https://github.com/ahki/oh-my-desk) has a core feature that is needed for other electron projects as well. (like `hot-loading`, `auto-update`, `auto-launch` etc.) But It is huge project to consult a core features. Therefore, [Tiny-Timer](https://github.com/hyunmoahn/tiny-timer) is a simple project and is easy to consult about how to make a core feature.
## Downloads
Following [link](https://github.com/HyunmoAhn/Tiny-Timer/releases/tag/v1.0.1) and Download matched file about OS.

[MAC download Tiny-Timer-1.0.1.dmg](https://github.com/HyunmoAhn/Tiny-Timer/releases/download/v1.0.1/Tiny-Timer-1.0.1.dmg)

[Window download Tiny-Timer-Setup-1.0.1.exe](https://github.com/HyunmoAhn/Tiny-Timer/releases/download/v1.0.1/Tiny-Timer-Setup-1.0.1.exe)
## Overview
<p align="center">
  <img src="https://user-images.githubusercontent.com/23732795/47601521-1d8cd900-da0d-11e8-92e7-daad4e214dd1.png">
  <img src="https://user-images.githubusercontent.com/23732795/47601527-2e3d4f00-da0d-11e8-9601-6c58a5a25be3.png">
  <img src="https://user-images.githubusercontent.com/23732795/47601535-4b721d80-da0d-11e8-9e60-bba573952feb.png">
  <img src="https://user-images.githubusercontent.com/23732795/47601556-b6235900-da0d-11e8-8cd4-627bf8c41e4e.png">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/23732795/47601562-d3582780-da0d-11e8-8f52-7c9fe0bfbea5.png">
</p>

## Feature
Setting time and script then occur notification with script when time up.

### Hotkey
- `Enter`: run the timer.
- `back-space`: reset the timer.
- `space or click`: stop the timer.

## Use
```
npm install // install external library
npm run start // run `Tiny-Timer` in development mode.
npm build // build `Tiny-Timer` in production mode.
```

# Electron Boilerplate
I make this project to help initialize about electron project.
I leave the guide for initialize electron project.
Please reter to this repository.

## Progress about development

- [Basic Setting about Electron App](https://github.com/HyunmoAhn/Tiny-Timer/pull/1)
  - Feature **Hot Loading**
  - use [babel](https://babeljs.io/), [electron](https://electronjs.org), [nodemon](https://nodemon.io/).
- [Setting Tray window](https://github.com/HyunmoAhn/Tiny-Timer/pull/2)
  - use [menubar](https://github.com/maxogden/menubar).
- [Bundle using webpack](https://github.com/HyunmoAhn/Tiny-Timer/pull/3)
  - Feature **Bundling using webpack in electron**, **Hot Loading with webpack**
  - use [webpack](https://webpack.js.org/)
- [Make timer logic](https://github.com/HyunmoAhn/Tiny-Timer/pull/4)
- [Markup using sass](https://github.com/HyunmoAhn/Tiny-Timer/pull/5)
- [Detail feature(Notification, Menu, auto-launch)](https://github.com/HyunmoAhn/Tiny-Timer/pull/6)
  - Feature **Notification**, **Menu in application**, **auto launch when login**
  - use [auto-launch](https://github.com/Teamwork/node-auto-launch)
- [Build for production](https://github.com/HyunmoAhn/Tiny-Timer/pull/7)
  - Feature **Build**
  - use [electron-builder](https://github.com/electron-userland/electron-builder)
- [Config Auto-Updater](https://github.com/HyunmoAhn/Tiny-Timer/pull/8)
  - Feature **Auto Update**
  - use [electron-updater](https://github.com/electron-userland/electron-builder)
  - **Auto Update need to [Code-Signing](https://www.electron.build/code-signing). If you want, commit about code-signing, leave an issue!**
  
## Contributing

Welcome about Both of case refactor timer feature and question about Progress of development.
I hope to help your project.

You can ask using [Issue](https://github.com/HyunmoAhn/Tiny-Timer/issues) or Comment in [closed Pull requests](https://github.com/HyunmoAhn/Tiny-Timer/pulls?q=is%3Apr+is%3Aclosed) 

## License
[MIT](https://opensource.org/licenses/MIT)
