import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  getRandomPositionToCard,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createTemplateBaseMarkup,
  displayNoneToggle,
  findKeyValueInExtraSets,
} from '../../../../_common_files/common_files/common_scripts.js'
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'singleChoice_2_task-1'
    // массив входящих вариантов ответа (максимум 5-6 элементов),
    /*
       const answersData = [
        {
          id: 1,
          text: "", // текст
          audioSrc: "", // звук опционально, если не нужен, то ставить ""
          answerTag: "1", // принадлежность к правильному/неправильному ответу
        },
      ];
      */

    const answersData = [
      {
        id: 1,
        text: '8',
        audioSrc: 'sound/8_s.mp3',
        answerTag: 'false',
      },
      {
        id: 2,
        text: '7',
        audioSrc: 'sound/7_s.mp3',
        answerTag: 'false',
      },
      {
        id: 3,
        text: '10',
        audioSrc: 'sound/10_s.mp3',
        answerTag: 'true',
      },
      {
        id: 4,
        text: '12',
        audioSrc: 'sound/12_s.mp3',
        answerTag: 'false',
      },
      {
        id: 5,
        text: '9',
        audioSrc: 'sound/9_s.mp3',
        answerTag: 'false',
      },
    ]

    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const winVarTask = 'true'
    // дополнительные параметры extraSets
    // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
    // winSound - путь к победному звуку, если не нужен, то оставить ""
    // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
    // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует

    const extraSets = {
      checkSound: {
        winSound: '',
        loseSound: '',
      },
      panelButtons: {
        checkButton: true,
      },
    }
    // сама функция, которая запускается, здесь ничего менять не нужно
    renderSingleChoice_2(answersData, winVarTask, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'singleChoice_2_task-2'
    // массив входящих вариантов ответа (максимум 5-6 элементов),
    /*
       const answersData = [
        {
          id: 1,
          text: "", // текст
          audioSrc: "", // звук опционально, если не нужен, то ставить ""
          answerTag: "1", // принадлежность к правильному/неправильному ответу
        },
      ];
      */

    const answersData = [
      {
        id: 1,
        text: 'Картошка',
        audioSrc: 'sound/kar.mp3',
        answerTag: 'false',
      },
      {
        id: 2,
        text: 'Капуста',
        audioSrc: 'sound/kap.mp3',
        answerTag: 'false',
      },
      {
        id: 3,
        text: 'Морковь',
        audioSrc: 'sound/mork.mp3',
        answerTag: 'true',
      },
      // {
      //   id: 1,
      //   text: "Картошка",
      //   audioSrc: '',
      // answerTag: "false",
      // },
      // {
      //   id: 2,
      //   text: "Капуста",
      //   audioSrc: '',
      // answerTag: "false",
      // },
      // {
      //   id: 3,
      //   text: "Огурец",
      //   audioSrc: '',
      // answerTag: "false",
      // },
    ]

    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const winVarTask = 'true'
    // дополнительные параметры extraSets
    // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
    // winSound - путь к победному звуку, если не нужен, то оставить ""
    // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
    // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует

    const extraSets = {
      checkSound: {
        winSound: '',
        loseSound: '',
      },
      panelButtons: {
        checkButton: true,
      },
    }
    // сама функция, которая запускается, здесь ничего менять не нужно
    renderSingleChoice_2(answersData, winVarTask, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'singleChoice_2_task-3'
    // массив входящих вариантов ответа (максимум 5-6 элементов),
    /*
       const answersData = [
        {
          id: 1,
          text: "", // текст
          audioSrc: "", // звук опционально, если не нужен, то ставить ""
          answerTag: "1", // принадлежность к правильному/неправильному ответу
        },
      ];
      */

    const answersData = [
      {
        id: 1,
        text: 'фиолетовый круглый мячик',
        audioSrc: '',
        answerTag: 'true',
      },
      {
        id: 2,
        text: 'Зелёное пластиковое ведёрко',
        audioSrc: '',
        answerTag: 'false',
      },
      {
        id: 3,
        text: 'Разноцветная деревянная пирамидка',
        audioSrc: '',
        answerTag: 'false',
      },
      {
        id: 1,
        text: 'Грузовая машинка с прицепом',
        audioSrc: '',
        answerTag: 'false',
      },
      {
        id: 2,
        text: 'Жёлтый резиновый утёнок',
        audioSrc: '',
        answerTag: 'false',
      },
      {
        id: 3,
        text: 'Красный деревянный кубик',
        audioSrc: '',
        answerTag: 'false',
      },
    ]

    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    // const winVarTask = "фиолетовый круглый мячик";
    const winVarTask = 'true'
    // дополнительные параметры extraSets
    // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
    // winSound - путь к победному звуку, если не нужен, то оставить ""
    // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
    // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует

    const extraSets = {
      checkSound: {
        winSound: '',
        loseSound: '',
      },
      panelButtons: {
        checkButton: true,
      },
    }
    // сама функция, которая запускается, здесь ничего менять не нужно
    renderSingleChoice_2(answersData, winVarTask, taskId, extraSets)
  })()

// ФУНКЦИЯ
function renderSingleChoice_2(answersData, winVarTask, taskId, extraSets) {
  let finishAnswer = null

  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }
  let isGameStart = false

  const taskWrapper = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const answers = taskWrapper.querySelector('.singleChoice_2_task_answers')

  createMarkup()
  renderCheckPanel(taskWrapper, true)
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper)
  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  const audioFiles = taskWrapper.querySelectorAll('.singleChoice_2_audio')

  answers.addEventListener('click', onAnswerClick)
  btnReset.addEventListener('click', onReloadBtnClick)
  btnTest.addEventListener('click', onCheckTaskBtnClick)

  function createMarkup() {
    answers.insertAdjacentHTML(
      'beforeend',
      insertAnswers(shuffleCards([...answersData]))
    )
  }

  function onAnswerClick(e) {
    if (e.target.classList.contains('singleChoice_2_task_answer')) {
      if (!isGameStart) {
        // открываем кнопку ПРОВЕРИТЬ
        toggleOpacityAndEventsElement(btnTest)
        isGameStart = true
      }
      if (e.target.classList.contains('targetChoice_color')) {
        removeActiveCardClass(e.target)

        // закрываем кнопку ПРОВЕРИТЬ
        isGameStart = false
        toggleOpacityAndEventsElement(btnTest)
        finishAnswer = null
      } else {
        if (finishAnswer) {
          removeActiveCardClass(finishAnswer)
        }

        addCheckClass(e.target)
        finishAnswer = e.target
      }
    }
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
  }

  function insertAnswers(arr) {
    const widthText = arr.some(el => el.text.length > 6)
    if (!widthText && arr.length > 5) {
      answers.classList.add('singleChoice_2_task_answers_width')
    }
    return arr
      .map(item => {
        let elementWidth
        let elWidthSmall = ''

        if (widthText) {
          if (arr.length > 4) {
            elementWidth = `"width: calc(100% / 3 - 10px)"`
          } else if (arr.length < 4) {
            elementWidth = `"width: calc(100% / ${arr.length} - 10px)"`
          } else if (arr.length === 4) {
            elementWidth = `"width: calc(100% / 2 - 10px)"`
          }
        } else {
          elWidthSmall = [
            'singleChoice_2_task_answer_width',
            'singleChoice_2_task_answer_height',
          ].join(' ')
          elementWidth = ''
        }

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="singleChoice_2_audio displayNoneAudio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        return `
                  <div class="singleChoice_2_task_answer ${elWidthSmall} oneMultiChoice_border hoveredActiveElement" data-name="${item.answerTag}" style=${elementWidth} >
                  ${isSound}
                  ${item.text}
                  </div>
              `
      })
      .join('')
  }

  function onReloadBtnClick() {
    btnTest.removeEventListener('click', onCheckTaskBtnClick)
    if (finishAnswer) {
      removeActiveCardClass(finishAnswer)
    }

    checkingAnswerReset(controlsBox, infoBox)
    finishAnswer = null

    resetSound(soundSetStates)
      ;[...answers.children].forEach(el => getRandomPositionToCard(el))

    answers.addEventListener('click', onAnswerClick)
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }
    btnTest.addEventListener('click', onCheckTaskBtnClick)
  }

  function onCheckTaskBtnClick() {
    if (!finishAnswer) {
      return
    }

    removeActiveCardClass(finishAnswer)
    if (finishAnswer.dataset.name === winVarTask) {
      addRightChoiceClass(finishAnswer)

      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      if (finishAnswer) {
        addWrongChoiceClass(finishAnswer)

        checkingAnswerNegative(controlsBox, infoBox, extraSets)
      }
    }

    resetSound(soundSetStates)
    answers.removeEventListener('click', onAnswerClick)
    btnTest.removeEventListener('click', onCheckTaskBtnClick)
  }

  function createBaseMarkup() {
    return `
   <div class="singleChoice_2_task_answers"></div>
      `
  }
}
