const { ipcRenderer } = require("electron");
const elt = require("../../ui/utils/elt.js");
const wrapInLabel = require("../../ui/utils/wrapInLabel.js");

const convertValue = (node) => {
  let value = node.value;
  if (node.type == "checkbox") {
    value = node.checked;
  }

  if (node.type == "number" || node.type == "range") {
    value = Number(node.value) || 0;
  }

  return value;
};

const renderDelay = ({delay}) => {
  return elt(`div`, {"data-collection": `delay`}, elt(`span`, {className: `option_text`}, `from:`),
     elt('input', {type: `number`, name: `from`, value: delay.from}), elt(`span`, {className: `option_text`}, `to:`),
     elt('input', {type: `number`, name: `to`, value: delay.to}));
};


const renderShiftClick = ({shiftClick}) => {
  let dom = elt("input", {
    type: "checkbox",
    className: "option",
    checked: shiftClick,
    name: "shiftClick",
  });
  return dom;
};


const renderCastDelay = ({castDelay}) => {
  return elt('input', {type: `number`, name: `castDelay`, value: castDelay})
};

const renderLogOut = ({logOut}) => {
  return elt('input', {type: `checkbox`, name: `logOut`, checked: logOut})
};

const renderLogOutEvery = ({logOutEvery, logOut}) => {
  return elt(`div`, {"data-collection": `logOutEvery`}, elt(`span`, {className: `option_text`}, `from:`),
     elt('input', {type: `number`, name: `from`, value: logOutEvery.from, disabled: !logOut}), elt(`span`, {className: `option_text`}, `to:`),
     elt('input', {type: `number`, name: `to`, value: logOutEvery.to, disabled: !logOut}));
};

const renderMaxAttempts = ({ maxAttempts }) => {
  return elt('input', {type: 'number', name:"maxAttempts", value: maxAttempts})
};

const renderAfterHookDelay = ({sleepAfterHook, afterHookDelay}) => {
  return elt(`div`, {"data-collection": `afterHookDelay`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', {type: `number`, name: `from`, value: afterHookDelay.from, disabled: !sleepAfterHook}), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', {type: `number`, name: `to`, value: afterHookDelay.to, disabled: !sleepAfterHook})
  );
};

const renderMaxFishTime = ({maxFishTime}) => {
  return elt(`input`, {type: `number`, name: `maxFishTime`, value: maxFishTime});
};

const renderRelZone = ({relZone}) => {
  return elt(`div`, {"data-collection": `relZone`},
      elt(`span`, {className: `option_text`}, `x:`), elt(`input`, {type: `number`, step: 0.1, name: `x`, value: relZone.x}),
      elt(`span`, {className: `option_text`}, `y:`), elt(`input`, {type: `number`, step: 0.1, name: `y`, value: relZone.y}),
      elt(`span`, {className: `option_text`}, `w:`), elt(`input`, {type: `number`, step: 0.1, name: `width`, value: relZone.width}),
      elt(`span`, {className: `option_text`}, `h:`), elt(`input`, {type: `number`, step: 0.1, name: `height`, value: relZone.height})
    );
};

const renderChatZone = ({chatZone}) => {
  return elt(`div`, {"data-collection": `chatZone`},
      elt(`span`, {className: `option_text`}, `x:`), elt(`input`, {type: `number`, step: 0.1, name: `x`, value: chatZone.x}),
      elt(`span`, {className: `option_text`}, `y:`), elt(`input`, {type: `number`, step: 0.1, name: `y`, value: chatZone.y}),
      elt(`span`, {className: `option_text`}, `w:`), elt(`input`, {type: `number`, step: 0.1, name: `width`, value: chatZone.width}),
      elt(`span`, {className: `option_text`}, `h:`), elt(`input`, {type: `number`, step: 0.1, name: `height`, value: chatZone.height})
    );
}

const renderCheckingDelay = ({checkingDelay}) => {
  return elt(`input`, {type: `number`, name:`checkingDelay`, value: checkingDelay});
};

const renderMouseMoveSpeed = ({mouseMoveSpeed}) => {
  return elt(`div`, {"data-collection": `mouseMoveSpeed`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', { type: `number`, step: 0.1, name: `from`, value: mouseMoveSpeed.from }), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', { type: `number`, step: 0.1, name: `to`, value: mouseMoveSpeed.to })
  );
};

const renderMouseCurvature = ({mouseCurvatureStrength}) => {
  return elt(`div`, {"data-collection": `mouseCurvatureStrength`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', { type: `number`, name: `from`, value: mouseCurvatureStrength.from }), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', { type: `number`, name: `to`, value: mouseCurvatureStrength.to })
  );
};

const renderLuresDelay = ({luresDelay}) => {
  return elt(`input`, {type: `number`, name: `luresDelay`, value: luresDelay});
};

const renderRandomSleep = ({randomSleep}) => {
  return elt(`input`, {type: `checkbox`, name: `randomSleep`, checked: randomSleep});
};

const renderRandomSleepEvery = ({randomSleepEvery, randomSleep}) => {
  return elt(`div`, {"data-collection": `randomSleepEvery`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', {type: `number`, name: `from`, value: randomSleepEvery.from, disabled: !randomSleep}), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', {type: `number`, name: `to`, value: randomSleepEvery.to, disabled: !randomSleep})
  );
};

const renderRandomSleepDelay = ({randomSleepDelay, randomSleep}) => {
  return elt(`div`, {"data-collection": `randomSleepDelay`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', {type: `number`, name: `from`, value: randomSleepDelay.from, disabled: !randomSleep}), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', {type: `number`, name: `to`, value: randomSleepDelay.to, disabled: !randomSleep})
  );
};

const renderReaction = ({reaction}) => {
  return elt(`input`, {type: `checkbox`, name:`reaction`, checked: reaction});
};

const renderMissOnPurpose = ({missOnPurpose}) => {
  if(missOnPurpose < 0) missOnPurpose = 0
  else if(missOnPurpose > 100) missOnPurpose = 100

  return elt(`input`, { type: `number`, name:`missOnPurpose`, value: missOnPurpose, min: 0, max: 100 });
};

const renderReactionDelay = ({reaction, reactionDelay}) => {
  return elt(`div`, {"data-collection": `reactionDelay`}, elt(`span`, {className: `option_text`}, `from:`),
  elt('input', {type: `number`, name: `from`, value: reactionDelay.from, disabled: !reaction}), elt(`span`, {className: `option_text`}, `to:`),
  elt('input', {type: `number`, name: `to`, value: reactionDelay.to, disabled: !reaction})
  );
};

const renderSleepAfterHook = ({sleepAfterHook}) => {
  return elt(`input`, {type: `checkbox`, name: `sleepAfterHook`, checked: sleepAfterHook});
};

const renderCustomWindow = ({useCustomWindow, customWindow}) => {
  const select = elt(`select`, {name: `customWindow`, disabled: !useCustomWindow, value: customWindow});
  const renderUseCustomWindow = elt(`input`, {name: `useCustomWindow`, type: `checkbox`, checked: useCustomWindow});

  if(useCustomWindow) {
    ipcRenderer.invoke('get-all-windows')
    .then((windows) => {
      windows.forEach(({title}) => {
        select.append(elt(`option`, { selected: title == customWindow }, title));
      })
    });
  }
  return elt(`div`, null, renderUseCustomWindow, select);

};

const renderTimerQuit = ({timerQuit}) => {
  return elt('input', {type: 'checkbox', checked: timerQuit, name: "timerQuit"});
};

const renderTmApiKey = ({tmApiKey}) => {
  return elt('div', null, elt('input', {type: `text`, name: `tmApiKey`, value: tmApiKey, className: `tmApiKey`}), elt('input', {type: `button`, value: `Connect`}));
};

const renderDetectWhisper = ({detectWhisper}) => {
  return elt('input', {type: `checkbox`, checked: detectWhisper, name: `detectWhisper`});
};

const renderWhisperThreshold = ({whisperThreshold}) => {
  return elt(`div`, null, elt('input', {type: `range`, min: 0, max: 255, value: whisperThreshold, name: `whisperThreshold`, className: `whisperRange`}),
   elt(`div`, {className: `whisperColorBox`, style: `background-color: rgb(${whisperThreshold},0,${whisperThreshold})`}, `${whisperThreshold}`));
}

const renderSettings = (config) => {
  return elt('section', {className: `settings`},
  elt(`p`, {className: `settings_header advanced_settings_header`}, `General`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Custom window: `, renderCustomWindow(config), `If for some reason your game window isn't "World of Warcraft" you can choose a custom window from all the windows opened on your computer.`),
  wrapInLabel(`Mouse/keyboard random delay (ms): `, renderDelay(config), `The bot will generate a random number between the provided values. The number is generated every time bot utilizes your mouse or keyboard and represents the delay between pressing/releasing of mouse/keyboard clicks and pressing.`),
  wrapInLabel(`Random mouse speed: `, renderMouseMoveSpeed(config), `The bot will generate a random number between the provided values. The higher the value the faster the bot moves the cursor. Works only if Like a human option is on.`),
  wrapInLabel(`Random mouse curvature: `, renderMouseCurvature(config), `The bot will generate a random number between the provided values. The higher the value the stronger is the deviation of the movement. Works only if Like a human option is on.`),
  wrapInLabel(`Applying lures delay (ms):`, renderLuresDelay(config), `How much it takes the bot to apply the lure.`),
  wrapInLabel(`Attempts limit: `, renderMaxAttempts(config), `How many times the bot will fail finding bobber before stopping.`),
  wrapInLabel(`Miss on purpose (%): `, renderMissOnPurpose(config), `Use this option if you play on official servers, it might decrease chances of being detected. Always Change this value before each fishing session.`),
  wrapInLabel( "Quit after timer: ", renderTimerQuit(config),`The bot will quit the game after timer elapsed.`),
  wrapInLabel(
    "Use shift+click: ",
    renderShiftClick(config),
    `Use shift + click instead of Auto Loot. Check this option if you don't want to turn on Auto Loot option in the game. Your "Loot key" in the game should be assign to shift.`
  )),
  elt(`p`, {className: `settings_header`}, `Logging out`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Log out/Log in:`, renderLogOut(config), `The bot will log out from the game after the given time, wait for a couple of minutes and log back to the game. This functionality might decrease chances of being detected.`),
  wrapInLabel(`Random Log out/Log in: (min)`, renderLogOutEvery(config), `The bot will generate a random number from the provided values. The number is generated every time the bot logs out: so the next time the bot logs out, it will be always different (randomly generated).`),
  ),
  elt(`p`, {className: `settings_header`}, `Random sleep`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Random sleep:`, renderRandomSleep(config), `The bot will sleep randomly from time to time for the random duration.`),
  wrapInLabel(`Random sleep every (min):`, renderRandomSleepEvery(config), `The bot will generate a random number from the provided values. The number is generated every time the bot goes to sleep: so the next time the bot goes to sleep it will be always different (randomly generated).`),
  wrapInLabel(`Random sleep for (ms):`, renderRandomSleepDelay(config), `The bot will generate a random number from the provided values. The number is generated every time the bot goes to sleep: so the next time the bot goes to sleep it will be always different(randomly generated).`)
  ),
  elt(`p`, {className: `settings_header`}, `Random reaction`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Reaction:`, renderReaction(config), `Randomise reaction time before any action.`),
  wrapInLabel(`Reaction random delay (ms):`, renderReactionDelay(config), `The bot will generate a random number from the provided values. The number is generated every time the bot needs to move/press/click something: so the next time the bot uses your mouse/keyboard the reaction time will be always different(randomly generated)`)),
  elt(`p`, {className: `settings_header`}, `Sleep after hook`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Sleep after hook:`, renderSleepAfterHook(config), `The bot will sleep after it hooked the fish for the random duration.`),
  wrapInLabel(`After hook random delay (ms): `, renderAfterHookDelay(config), `The bot will generate a random number from the provided values. The number is generated every time the bot hooked the fish.`),
  ),
  elt(`p`, {className: `settings_header`}, `Remote control`),
  elt(`div`, {className: `settings_section`},
    wrapInLabel(`Telegram token:`, renderTmApiKey(config), `Provide telegram token created by t.me/BotFather and press connect.`),
    wrapInLabel(`Detect whisper:`, renderDetectWhisper(config), `The bot will analyze Chat Zone for Whisper Threshold purple colors, if it finds any it will notifiy telegram bot you connected through token.`),
    wrapInLabel(`Whisper Threshold:`, renderWhisperThreshold(config), `The intensity of purple color the bot will recognize as whispering.`),
    wrapInLabel(`Chat zone (%):`, renderChatZone(config), `The same logic as with Fishing Zone. The bot will analyze this zone for Whisper Threshold purple colors.`),

  ),
  elt(`p`, {className: `settings_header`}, `Critical (might break the bot)`),
  elt('div', {className: "settings_section"},
  wrapInLabel(`Max check time (ms):`, renderMaxFishTime(config), `Maximum time the bot will wait for the bobber to jerk before casting again.`),
  wrapInLabel(`Checking delay (ms):`, renderCheckingDelay(config), `How often the bot needs to check the hook for changes.`),
  wrapInLabel(`Fishing zone (%):`, renderRelZone(config), `A zone in which the bot looks for the bobber. The values are percentages of the dimensions of the window: 0.3 = 30%, 0.4 = 40% etc.`),
  wrapInLabel(`Cast animation delay (ms):`, renderCastDelay(config), `How long the bot will wait before starting to look for the bobber in the fishing zone. This value is related to appearing and casting animations.`),
  ));
}

const runApp = async () => {
  let config = await ipcRenderer.invoke("get-game-config");
  const settings = elt(`form`, {className: `advSettings_settings`}, renderSettings(config));
  const buttons = elt(`div`, {className: `buttons`},
     elt('input', {type: `button`, value: `Ok`}),
     elt('input', {type: `button`, value: `Cancel`}),
     elt('input', {type: `button`, value: `Defaults`}))

  settings.addEventListener(`click`, (event) => {
    if(event.target.value == `Connect`) {
      ipcRenderer.invoke(`connect-telegram`, config.tmApiKey)
      .then(() => event.target.value = `Done!`)
      .catch(() => event.target.value = `Error!`);

      setTimeout(() => event.target.value = `Connect`, 1000);
    }
  });

  buttons.addEventListener(`click`, async (event) => {
    if(event.target.value == 'Ok') {
      gatherConfig();
      ipcRenderer.send('advanced-click', config);
    }

    if(event.target.value == 'Cancel') {
      ipcRenderer.send('advanced-click');
    }

    if(event.target.value == 'Defaults') {
      let defaultConfig = await ipcRenderer.invoke('advanced-defaults');
      settings.innerHTML = ``;
      config = defaultConfig;
      settings.append(renderSettings(config));
    }
  });

  const advancedSettings = elt('div', {className: `advSettings`},
  settings,
  buttons);
  document.body.append(advancedSettings);

  const gatherConfig = () => {
    [...settings.elements].forEach(option => {
      if(!option.name) return;

      let value = convertValue(option);
      let collection = option.parentNode["data-collection"];
      if(collection) {
        config[collection][option.name] = value;
      } else {
        config[option.name] = value;
      }
    });
  };

  settings.addEventListener('change', () => {
    gatherConfig();
    settings.innerHTML = ``;
    settings.append(renderSettings(config));
  });
};

runApp();
