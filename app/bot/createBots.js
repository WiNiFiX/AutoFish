const runBot = require("./runBot.js");
const createBot = require("./createBot.js");

const { convertMs } = require('../utils/time.js');
const Stats = require('./stats.js');

const { createIdLog } = require("../utils/logger.js");
const EventLine = require("../utils/eventLine.js");
const { setWorker } = require("../utils/textReader.js");

const createWinSwitch = require("../game/winSwitch.js");

let tmStats = null;

const createBots = async (games, settings, config, log, tmBot) => {
  const winSwitch = createWinSwitch(new EventLine());

  if(settings.whitelist) {
    log.send(`Downloading data for ${settings.whitelistLanguage} language, it might take a while...`)
    await setWorker(settings.whitelistLanguage);
  }

  const bots = games.map((game, i) => {
    return {
      bot: createBot(game, {config: config.patch[settings.game], settings}, winSwitch, tmBot),
      log: createIdLog(log, ++i),
      state: { status: "initial", startTime: Date.now() },
      stats: new Stats()
  }
  });

  if(tmBot.bot) {
    tmStats = bots.map(({stats}) => stats);
    tmBot.bot.command(`statsbot`, (ctx) => {
      tmStats.forEach((stats, i) => ctx.reply(`WIN${i + 1}:${stats.show()}`));
    });
    tmBot.bot.command(`quitgame`, (ctx) => {
      games.forEach(({workwindow}) => workwindow.close());
      log.send('Stopping the bots...')
      log.setState(false);
      bots.forEach(({state}) => state.status = "stop");
      ctx.reply(`Quit all the windows of the game`);
    })
  }


  return {
    startBots(onError) {
      log.send("Starting the bots...")
      if (settings.timer) {
        setTimeout(() => {
          if(!bots.every(({state}) => state.status == 'stop')) {
            onError();
            if(config.patch[settings.game].timerQuit) {
              log.ok('Closing the windows...')
              games.forEach(({workwindow}) => workwindow.close());
            }
          }
        }, settings.timer * 1000 * 60);
      }

      bots.forEach((bot) => {
        runBot(bot)
        .then(() => {
            log.setState(true);
            bot.stats.show().forEach((stat) => bot.log.ok(stat));
            bot.log.ok(`Time Passed: ${convertMs(Date.now() - bot.state.startTime)}`);
        })
        .catch((error) => {
            bot.state.status = "stop";
            if (bots.every(({state}) => state.status == "stop")) {
              onError();
            }
            log.setState(true);
            bot.log.err(`${error.message}`);

            if(tmBot.bot) {
              tmBot.ctx.reply(`${error.message}`);
            }

            bot.stats.show().forEach((stat) => bot.log.ok(stat));
            bot.log.ok(`Time Passed: ${convertMs(Date.now() - bot.state.startTime)}`);
        });
      })
    },
    stopBots() {
      log.send('Stopping the bots...')
      log.setState(false);
      bots.forEach(({state}) => state.status = "stop");
    },
  };
};

module.exports = createBots;
