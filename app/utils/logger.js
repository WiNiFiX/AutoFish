class Log {
  constructor(win) {
    this.win = win;
  }

  send(text, type = 'black') {
    const date = getCurrentTime();
    text = `[${date.hr}:${date.min}:${date.sec}] ${text}`;
    this.win.webContents.send('log-data', {text, type});
  }

  ok(text) {
    this.send(text, 'green');
  }

  warn(text) {
    this.send(text, 'orange');
  }

  err(text) {
    this.send(text, 'red')
  }

  static setTo(win) {
    return new Log(win);
  }
}

const getCurrentTime = () => {
  let date = new Date();
  let times = {hr: date.getHours(),min: date.getMinutes(), sec: date.getSeconds()};
  for(let time of Object.keys(times)) {
    times[time] = times[time].toString();
    if(times[time].length < 2) {
      times[time] = times[time].padStart(2, `0`);
    }
  }

  return times;
};

module.exports = Log;
