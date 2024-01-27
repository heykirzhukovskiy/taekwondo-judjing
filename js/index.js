const STAGES = {
  START: "START",
  FIRST_ROUND: "FIRST_ROUND",
  BREAK: "BREAK",
  SECOND_ROUND: "SECOND_ROUND",
  END: "END",
};

const TIMES = {
  ROUND: 60,
  BREAK: 30,
};

const TEXTS = {
  ROUND: "ROUND",
  BREAK: "ПЕРЕРЫВ",
  PAUSE: "ПАУЗА",
  END: "КОНЕЦ БОЯ",
};

const names = {
  left: "Боец",
  right: "Боец",
};

const halves = {
  right: document.getElementById("right-half"),
  left: document.getElementById("left-half"),
};

const timeWrap = document.getElementById("time-wrap");

const interface = {
  images: {
    fatality: document.getElementById("img-fatality"),
  },
  sounds: {
    round1: new Audio("../assets/sound/round1.mp3"),
    finalRound: new Audio("../assets/sound/finalround.mp3"),
    fatality: new Audio("../assets/sound/fatality.mp3"),
    gong: new Audio("../assets/sound/gong.mp3"),
    laugh: new Audio("../assets/sound/laugh.mp3"),
  },
  names: {
    right: halves.right.querySelector(".interface-name"),
    left: halves.left.querySelector(".interface-name"),
  },
  counts: {
    right: halves.right.querySelector(".interface-count"),
    left: halves.left.querySelector(".interface-count"),
  },
  fightNum: document.getElementById("fight-num"),
  roundNum: document.getElementById("round-num"),
  time: {
    minutes: timeWrap.querySelector("#minutes"),
    seconds: timeWrap.querySelector("#seconds"),
  },
};

const State = {
  currStage: STAGES.START,
  currTime: 0,
  currRound: 0,
  maxRounds: 2,
  currSound: null,
  currInterval: null,
  currTimeout: null,
  toDoPause: false,
  shouldUpdate: true,
};

const updateInfo = {
  pause: () => {
    interface.roundNum.innerText = TEXTS.PAUSE;
  },
  end: () => {
    interface.roundNum.innerText = TEXTS.END;
  },
  break: () => {
    if (State.shouldUpdate) {
      State.currTime = TIMES.BREAK;
    }
    interface.roundNum.innerText = TEXTS.BREAK;
  },
  start: () => {
    names.left = prompt("Введите имя левого бойца");
    names.right = prompt("Введите имя правого бойца");
    const fightNum = prompt("Введите номер боя");

    interface.fightNum.innerText = fightNum;
    interface.names.right.innerText = names.right;
    interface.names.left.innerText = names.left;
    interface.roundNum.innerText = TEXTS.ROUND + " " + State.currRound;
  },
  round: (round) => {
    if (State.shouldUpdate) {
      State.currTime = TIMES.ROUND;
    }
    State.currRound = round;
    interface.roundNum.innerText = TEXTS.ROUND + " " + State.currRound;
  },
};

const playSound = (sound) => {
  State.currSound = sound;
  sound.volume = 1;
  sound.muted = false;
  sound.play();
};

const updateStage = () => {
  const stagesNames = Object.keys(STAGES);
  console.log(stagesNames);
  const stagesLen = stagesNames.length - 1;
  const indexOfCurrStage = stagesNames.indexOf(State.currStage);

  if (indexOfCurrStage === stagesLen) {
    State.currStage = stagesNames[0];
  } else {
    State.currStage = stagesNames[indexOfCurrStage + 1];
  }

  State.shouldUpdate = true;
};

const updateTimer = () => {
  console.log(State);
  State.currTime = --State.currTime;
  if (State.currTime >= 60) {
    interface.time.minutes.innerText = "01";
    if (State.currTime < 70) {
      interface.time.seconds.innerText = "0" + (State.currTime - 60);
    } else {
      interface.time.seconds.innerText = State.currTime - 60;
    }
  } else {
    interface.time.minutes.innerText = "00";
    if (State.currTime < 10) {
      interface.time.seconds.innerText = "0" + State.currTime;
    } else {
      interface.time.seconds.innerText = State.currTime;
    }
  }
};

const showImage = (img) => {
  img.classList.remove("hidden");
  setTimeout(() => {
    hideImage(img);
  }, 700);
};

const hideImage = (img) => {
  img.classList.add("hidden");
};

const fightings = () => {
  console.log(State);
  if (State.toDoPause) {
    console.log(State);
    State.shouldUpdate = false;
    State.toDoPause = false;
    updateInfo.pause();
    playSound(interface.sounds.laugh);
    clearTimeout(State.currTimeout);
    clearInterval(State.currInterval);
  } else {
    switch (State.currStage) {
      case STAGES.START:
        State.shouldUpdate = true;
        State.toDoPause = false;
        updateInfo.start();
        updateStage();
        break;
      case STAGES.FIRST_ROUND:
        updateInfo.round(1);
        State.toDoPause = true;
        playSound(interface.sounds.round1);
        State.currInterval = setInterval(updateTimer, 1000);
        State.currTimeout = setTimeout(() => {
          clearInterval(State.currInterval);
          updateStage();
          State.toDoPause = false;
        }, State.currTime * 1000 + 1000);
        break;
      case STAGES.BREAK:
        updateInfo.break();
        State.toDoPause = true;
        playSound(interface.sounds.gong);
        State.currInterval = setInterval(updateTimer, 1000);
        State.currTimeout = setTimeout(() => {
          clearInterval(State.currInterval);
          updateStage();
          State.toDoPause = false;
        }, State.currTime * 1000 + 1000);
        break;
      case STAGES.SECOND_ROUND:
        updateInfo.round(2);
        State.toDoPause = true;
        playSound(interface.sounds.finalRound);
        State.currInterval = setInterval(updateTimer, 1000);
        State.currTimeout = setTimeout(() => {
          clearInterval(State.currInterval);
          updateStage();
          State.toDoPause = false;
        }, State.currTime * 1000 + 1000);
        break;
      case STAGES.END:
        State.toDoPause = false;
        updateInfo.end();
        playSound(interface.sounds.fatality);
        setTimeout(() => {
          showImage(interface.images.fatality);
        }, State.currSound.duration * 1000);
        updateStage();
        State.toDoPause = false;
        break;
      default:
        break;
    }
  }
};

const raiseScore = (side) => {
  interface.counts[side].innerText =
    Number(interface.counts[side].innerText) + 1;
};

const keyFunctionality = (key) => {
  switch (key) {
    case "ArrowRight":
      raiseScore("right");
      break;
    case "ArrowLeft":
      raiseScore("left");
      break;
    case "Space":
      fightings();
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.onkeyup = (e) => {
    keyFunctionality(e.code);
  };
});
