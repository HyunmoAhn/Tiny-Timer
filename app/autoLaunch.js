import AutoLaunch from 'auto-launch';
import '@babel/polyfill';
/**
 * Auto Launch TinyTimer when boot.
 * Use node-auto-launch
 * https://github.com/Teamwork/node-auto-launch
 */
function autoLaunch() {
  const AutoLauncher = new AutoLaunch({
    name: 'Tiny-Timer',
    mac: {
      useLaunchAgent: true,
    },
  });

  AutoLauncher.isEnabled()
    .then((isEnable) => {
      if (!isEnable) {
        AutoLauncher.enable();
      } else if (isEnable) {
        AutoLauncher.disable();
      }
    });
}

/**
 * Check current setting for auto launch.
 * @returns {Promise<void>}
 */
async function isAutoLaunch() {
  const AutoLauncher = new AutoLaunch({
    name: 'Tiny-Timer',
    mac: {
      useLaunchAgent: true,
    },
  });

  const isLaunch = await AutoLauncher.isEnabled();

  return isLaunch;
}

export {
  autoLaunch,
  isAutoLaunch,
};
