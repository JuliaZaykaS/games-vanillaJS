import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  onSoundIconClick,
  resetSound,
  togglePointerEventElement,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createTemplateBaseMarkup,
  displayNoneToggle,
  findKeyValueInExtraSets,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  //уникальный id задания как в HTML
  const taskId = 'singleChoice_1_task-1'
  //входящие данные
  //максимальное количество  9 если умещается в 1 строку, 3 если 5 строк
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  //поле text - обязательное поле
  const data = [
    {
      id: 1,
      text: 'Тычинка',
      audioSrc: '',
    },
    {
      id: 2,
      text: 'Пестик',
      audioSrc: '',
    },
    {
      id: 3,
      text: 'Семя',
      audioSrc: '',
    },
    {
      id: 4,
      text: 'Плод',
      audioSrc: '',
    },
  ]
  // здесь указывается правильный ответ, он проверяется по полю id  в массиве
  // const rightAnswer = "Семя";
  const rightAnswer = 3

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
  renderSingleChoice_1(data, taskId, rightAnswer, extraSets)
})()
;(() => {
  //уникальный id задания как в HTML
  const taskId = 'singleChoice_1_task-2'
  //входящие данные
  //максимальное количество  9 если умещается в 1 строку, 3 если 5 строк
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  //поле text - обязательное поле
  const data = [
    {
      id: 1,
      text: 'шапка снега',
      audioSrc: 'sound/8045.mp3',
    },
    {
      id: 2,
      text: 'столовое серебро',
      audioSrc: 'sound/8053.mp3',
    },
    {
      id: 3,
      text: 'чугунная голова',
      audioSrc: 'sound/8060.mp3',
    },
    {
      id: 4,
      text: 'дождь барабанит по крыше',
      audioSrc: 'sound/8067.mp3',
    },
  ]
  // здесь указывается правильный ответ, он проверяется по полю id  в массиве
  // const rightAnswer = "шапка снега";
  const rightAnswer = 1
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
  renderSingleChoice_1(data, taskId, rightAnswer, extraSets)
})()
;(() => {
  //уникальный id задания как в HTML
  const taskId = 'singleChoice_1_task-3'
  //входящие данные
  //максимальное количество  9 если умещается в 1 строку, 3 если 5 строк
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  //поле text - обязательное поле
  const data = [
    {
      id: 1,
      text: 'М. В. Ломоносов — наш русский университет.',
      audioSrc: '',
    },
    {
      id: 2,
      text: 'Многие явления в природе помогают предсказать погоду.',
      audioSrc: '',
    },
    {
      id: 3,
      text: 'Самым дальним предком бумаги был камень.',
      audioSrc: '',
    },
    {
      id: 4,
      text: 'Лингвистика — наука о языке.',
      audioSrc: '',
    },
    {
      id: 5,
      text: 'Наука ускоряет наше движение вперёд.',
      audioSrc: '',
    },
  ]
  // здесь указывается правильный ответ, он проверяется по полю id  в массиве
  // const rightAnswer = "Лингвистика — наука о языке.";
  const rightAnswer = 4
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
  renderSingleChoice_1(data, taskId, rightAnswer, extraSets)
})()
;(() => {
  //уникальный id задания как в HTML
  const taskId = 'singleChoice_1_task-4'
  //входящие данные
  //максимальное количество  9 если умещается в 1 строку, 3 если 5 строк
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  //поле text - обязательное поле
  const data = [
    {
      id: 1,
      text: 'А знаете ли, я удивляюсь, как вы хорошо говорите по-русски. (И.С. Тургенев) (сложное, повеств., невоскл., 1: двусост., нераспр., полное, осложн. вводными словами со значением привлечения внимания собеседника; 2: двусост., распр., полное, неосложн.)',
      audioSrc: '',
    },
    {
      id: 2,
      text: 'Он услал её, наконец, и после долгих колебаний решился отправиться к Калягиным. (И.С. Тургенев) (сложное, повеств., невоскл., 1: двусост., нераспр., полное, осложн. вводными словами, содержащими указания на связь мыслей; 2: двусост., распр., полное, неосложн.)',
      audioSrc: '',
    },
    {
      id: 3,
      text: 'Казалось, вместе с вечерними парами отовсюду поднималась и даже с вышины лилась темнота. (И.С. Тургенев) (повеств., невоскл., простое, двусост., распр., полное, осложн. однородными сказуемыми и вводными словами со значением различной степени уверенности)',
      audioSrc: '',
    },
  ]
  // здесь указывается правильный ответ, он проверяется по полю id  в массиве
  // const rightAnswer =
  //   "Он услал её, наконец, и после долгих колебаний решился отправиться к Калягиным. (И.С. Тургенев) (сложное, повеств., невоскл., 1: двусост., нераспр., полное, осложн. вводными словами, содержащими указания на связь мыслей; 2: двусост., распр., полное, неосложн.)";
  const rightAnswer = 2
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
  renderSingleChoice_1(data, taskId, rightAnswer, extraSets)
})()

//ФУНКЦИЯ
function renderSingleChoice_1(data, taskId, rightAnswer, extraSets) {
  let answer
  let isGameStart = false

  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }

  const task = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(task, createBaseMarkup)

  const field = task.querySelector('.singleChoice_1_inputList')

  field.insertAdjacentHTML('beforeend', cardsMarkup(data))
  renderCheckPanel(task, true)
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(task)
  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  let inputs = task.querySelectorAll('.singleChoice_1-input')
  const audioFiles = task.querySelectorAll('.singleChoice_1-audio')

  inputs.forEach(item => {
    item.addEventListener('change', changeAnswer)
  })

  field.addEventListener('click', onAudioIconClick)
  btnTest.addEventListener('click', onCheckTaskBtnClick)
  btnReset.addEventListener('click', onReloadBtnClick)

  function onAudioIconClick(e) {
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
  }

  function cardsMarkup(items) {
    return items
      .map(item => {
        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="singleChoice_1-audio displayNoneAudio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        return `<div class="singleChoice_1_inputWrapper">
        <input class="singleChoice_1-input" type="radio" value="${item.text}" name="${taskId}" id="${item.id}${taskId}" data="${item.id}">
        ${isSound}
        <label for="${item.id}${taskId}">${item.text}</label>
        </div>`
      })
      .join('')
  }

  function changeAnswer(e) {
    // answer = e.target.value;
    answer = e.target.getAttribute('data')

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = true
    }
  }

  function onCheckTaskBtnClick() {
    // if (answer === rightAnswer) {
    if (answer === String(rightAnswer)) {
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      checkingAnswerNegative(controlsBox, infoBox, extraSets)
    }

    resetSound(soundSetStates)

    togglePointerEventElement(field)
    btnTest.removeEventListener('click', onCheckTaskBtnClick)
  }

  function onReloadBtnClick() {
    btnTest.removeEventListener('click', onCheckTaskBtnClick)
    inputs.forEach(item => {
      item.checked = 0
    })
    answer = null

    checkingAnswerReset(controlsBox, infoBox)

    resetSound(soundSetStates)
    if (field.classList.contains('noEventElement')) {
      togglePointerEventElement(field)
    }
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }
    btnTest.addEventListener('click', onCheckTaskBtnClick)
  }

  function createBaseMarkup() {
    return `
    <div class="singleChoice_1_wrapper">
          <div class="singleChoice_1_inputList"></div>
        </div>
      `
  }
}
