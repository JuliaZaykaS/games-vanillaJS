import {
  shuffleTracing,
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createTemplateBaseMarkup,
  displayNoneToggle,
  findKeyValueInExtraSets,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'findCoupleByLines_1_task-1'
  // максимальное количество пар 8, если слова  вмещаются в 1 строку и нет заголовков у столбцов
  // максимальное количество пар 7, если слова  вмещаются в 1 строку и есть заголовки у столбцов
  // id-порядковый номер
  // textLeft - слово/предложение в левой колонке
  // audioSrc - озвучка текста для левой колонки;
  // textRight - слово/предложение в правой колонке
  // audioSrc_2 -озвучка текста для правой колонки;
  const data = [
    {
      id: 1,
      textLeft: 'bat',
      audioSrc: 'sound/bat.mp3',
      textRight: 'летучая мышь',
      audioSrc_2: 'sound/bat-2.mp3',
    },
    {
      id: 2,
      textLeft: 'witch',
      audioSrc: 'sound/witch.mp3',
      textRight: 'ведьма',
      audioSrc_2: 'sound/witch-2.mp3',
    },
    {
      id: 3,
      textLeft: 'spider',
      audioSrc: 'sound/spider.mp3',
      textRight: 'паук',
      audioSrc_2: 'sound/spider-2.mp3',
    },
    {
      id: 4,
      textLeft: 'ghost',
      audioSrc: 'sound/ghost.mp3',
      textRight: 'привидение',
      audioSrc_2: 'sound/ghost-2.mp3',
    },
    {
      id: 5,
      textLeft: 'I realized that I had forgotten my passport at my place',
      audioSrc: 'sound/I-realized.mp3',
      textRight: 'Я понял, что забыл паспорт дома',
      audioSrc_2: 'sound/i-realized-2.mp3',
    },
  ]

  // объект с заголовками для столбцов (опционально), максимум 2 строки(40 символов)
  // для переноса строки можно добавить тег <br/>
  // если заголовков нет, то оставить ""
  // left - для левого столбца,
  // right - для правого столбца
  const titlesToColumns = {
    left: '',
    right: '',
  }

  // дополнительные параметры extraSets
  // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
  // winSound - путь к победному звуку, если не нужен, то оставить ""
  // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
  // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует

  const extraSets = {
    checkSound: {
      winSound: '../../../_common_files/common_materials/winSound.mp3',
      loseSound: '../../../_common_files/common_materials/loseSound.mp3',
    },
    panelButtons: {
      checkButton: true,
    },
  }
  // сама функция, которая запускается, здесь ничего менять не нужно
  // renderPairsByLines(data, taskId, titlesToColumns)
  renderPairsByLines(data, taskId, titlesToColumns, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'findCoupleByLines_1_task-2'
  // максимальное количество пар 8, если слова  вмещаются в 1 строку и нет заголовков у столбцов
  // максимальное количество пар 7, если слова  вмещаются в 1 строку и есть заголовки у столбцов
  // id-порядковый номер
  // textLeft - слово/предложение в левой колонке
  // audioSrc - озвучка текста для левой колонки;
  // textRight - слово/предложение в правой колонке
  // audioSrc_2 -озвучка текста для правой колонки;
  const data = [
    {
      id: 1,
      textLeft: 'bat',
      audioSrc: '',
      textRight: 'летучая мышь',
      audioSrc_2: '',
    },
    {
      id: 2,
      textLeft: 'witch',
      audioSrc: '',
      textRight: 'ведьма',
      audioSrc_2: '',
    },
    {
      id: 3,
      textLeft: 'spider',
      audioSrc: '',
      textRight: 'паук',
      audioSrc_2: '',
    },
    {
      id: 4,
      textLeft: 'ghost',
      audioSrc: '',
      textRight: 'привидение',
      audioSrc_2: '',
    },
    {
      id: 5,
      textLeft: 'I realized that I had forgotten my passport at my place',
      audioSrc: '',
      textRight: 'Я понял, что забыл паспорт дома',
      audioSrc_2: '',
    },
  ]
  // объект с заголовками для столбцов (опционально), максимум 2 строки(40 символов)
  // для переноса строки можно добавить тег <br/>
  // если заголовков нет, то оставить ""
  // left - для левого столбца,
  // right - для правого столбца
  const titlesToColumns = {
    left: 'Английский текст <br/> транскрипция',
    right: 'Русский текст <br/> транскрипция',
  }

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

  renderPairsByLines(data, taskId, titlesToColumns, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'findCoupleByLines_1_task-3'
  // максимальное количество пар 8, если слова  вмещаются в 1 строку и нет заголовков у столбцов
  // максимальное количество пар 7, если слова  вмещаются в 1 строку и есть заголовки у столбцов
  // id-порядковый номер
  // textLeft - слово/предложение в левой колонке
  // audioSrc - озвучка текста для левой колонки;
  // textRight - слово/предложение в правой колонке
  // audioSrc_2 -озвучка текста для правой колонки;
  const data = [
    {
      id: 1,
      textLeft: 'bat',
      audioSrc: '',
      textRight: 'летучая мышь',
      audioSrc_2: '',
    },
    {
      id: 2,
      textLeft: 'witch',
      audioSrc: '',
      textRight: 'ведьма',
      audioSrc_2: '',
    },
    {
      id: 3,
      textLeft: 'spider',
      audioSrc: '',
      textRight: 'паук',
      audioSrc_2: '',
    },
    {
      id: 4,
      textLeft: 'ghost',
      audioSrc: '',
      textRight: 'привидение',
      audioSrc_2: '',
    },
    {
      id: 5,
      textLeft: 'I realized that I had forgotten my passport at my place',
      audioSrc: '',
      textRight: 'Я понял, что забыл паспорт дома',
      audioSrc_2: '',
    },
  ]
  // объект с заголовками для столбцов (опционально), максимум 2 строки(40 символов)
  // для переноса строки можно добавить тег <br/>
  // если заголовков нет, то оставить ""
  // left - для левого столбца,
  // right - для правого столбца
  const titlesToColumns = {
    left: 'Английский текст <br/> транскрипция',
    right: 'Русский текст <br/> транскрипция',
  }

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderPairsByLines(data, taskId, titlesToColumns)
})()

function renderPairsByLines(data, taskId, titlesToColumns, extraSets) {
  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }
  let isGameStart = false

  const leftCol = 'leftCol'
  const rightCol = 'rightCol'

  let x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    firstItem = null,
    secondItem = null,
    answers = []

  const task = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(task, createBaseMarkup)

  const table = task.querySelector('.findCoupleByLines_1_findCouple_table')
  const leftSide = task.querySelector('.findCoupleByLines_1_findCouple_left')
  const rightSide = task.querySelector('.findCoupleByLines_1_findCouple_right')

  fillTask()
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

  const allAudioFiles = task.querySelectorAll(
    '.findCoupleByLines_1_findCouple_audio'
  )

  btnReset.addEventListener('click', onReloadBtnClick)
  btnTest.addEventListener('click', onCheckTaskBtnClick)
  table.addEventListener('click', startSelect)

  shuffleTracing(
    rightSide,
    'findCoupleByLines_1_findCouple_item',
    data,
    onReloadBtnClick,
    'data-answer',
    'id'
  )

  function playSoundsButton(soundSrc, id, column) {
    let audio = document.createElement('audio')
    audio.setAttribute('src', soundSrc)
    audio.setAttribute('id', `${column}_${id}${taskId}`)
    audio.classList.add('findCoupleByLines_1_findCouple_audio', 'displayNoneAudio')
    let playButton_body = document.createElement('div')
    playButton_body.classList.add('buttonPlayPausePlayPause_wrap')
    playButton_body.classList.add('buttonPlayPause--play')
    playButton_body.classList.add('findCoupleByLines_1_soundIconPosition')
    playButton_body.setAttribute(soundDataAttribute, `${column}_${id}${taskId}`)
    let playButton_one = document.createElement('div')
    playButton_one.classList.add('buttonPlayPause__shape')
    playButton_one.classList.add('buttonPlayPause__shape--one')
    let playButton_two = document.createElement('div')
    playButton_two.classList.add('buttonPlayPause__shape')
    playButton_two.classList.add('buttonPlayPause__shape--two')

    playButton_body.append(playButton_one, playButton_two, audio)

    return playButton_body
  }

  function fillTask() {
    table.parentElement.insertAdjacentHTML(
      'afterbegin',
      createTitlesMarkup(titlesToColumns)
    )

    createOneSide(data, leftSide, leftCol)
    createOneSide(shuffleCards([...data]), rightSide, rightCol)
  }

  function createOneSide(data, placeAppend, side) {
    data.forEach(item => {
      let text
      let sound
      let word = document.createElement('div')
      word.classList.add(
        'findCoupleByLines_1_findCouple_item',
        'oneMultiChoice_border'
      )
      word.setAttribute('data-answer', item.id)
      word.setAttribute('busy', false)

      if (side === rightCol) {
        text = item.textRight
        sound = item.audioSrc_2
      } else {
        text = item.textLeft
        sound = item.audioSrc
      }

      if (sound) {
        word.append(playSoundsButton(sound, item.id, side))
      }
      if (text) {
        let div = document.createElement('div')
        div.insertAdjacentHTML('afterbegin', text)
        div.classList.add('findCoupleByLines_1_findCouple_item_text')
        word.append(div)
      }
      placeAppend.append(word)
    })
  }

  function createTitlesMarkup(titles) {
    let titleLeft
    let titleRight

    if (titles.right) {
      titleRight = `
    <div class="findCoupleByLines_1_findCouple_title">
        ${titles.right}
    </div>
    `
    } else {
      titleRight = `
    <div class="findCoupleByLines_1_findCouple_title"></div>`
    }

    if (titles.left) {
      titleLeft = `
    <div class="findCoupleByLines_1_findCouple_title">
      ${titles.left}
    </div>
    `
    } else {
      titleLeft = `
    <div class="findCoupleByLines_1_findCouple_title"></div>`
    }

    if (titles.left || titles.right) {
      return `
    <div class="findCoupleByLines_1_findCouple_titleBox">
        ${titleLeft}
        ${titleRight}
    </div>
    `
    } else {
      return ''
    }
  }

  function startSelect(e) {
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, allAudioFiles, soundDataAttribute)
    }
    let coords2 = table.getBoundingClientRect()
    if (
      e.target.classList.contains('findCoupleByLines_1_findCouple_item') ||
      e.target.classList.contains('findCoupleByLines_1_findCouple_item_text')
    ) {
      if (!isGameStart) {
        // открываем кнопку ПРОВЕРИТЬ
        toggleOpacityAndEventsElement(btnTest)
        isGameStart = true
      }
      let elem = e.target.closest('.findCoupleByLines_1_findCouple_item')
      if (
        elem.parentElement.classList.contains(
          'findCoupleByLines_1_findCouple_left'
        )
      ) {
        firstItem = elem
        let coords = elem.getBoundingClientRect()

        if (elem.classList.contains('targetChoice_color')) {
          checkBusyElementAndRemove(elem)
          removeActiveCardClass(elem)

          firstItem = null
          x1 = 0
          x2 = 0
        } else {
          getAllSideElementsAndRemoveClass(leftSide)
          addCheckClass(elem)

          x1 = coords.right - coords2.left
          y1 = coords.top + coords.height / 2 - coords2.top

          if (x2 !== 0) {
            firstItem.setAttribute('busy', true)
            secondItem.setAttribute('busy', true)
            let svg = createSvgLine(x1, y1, x2, y2, table)

            answers.push([firstItem, secondItem, svg])
            x1 = 0
            x2 = 0
            y1 = 0
            y2 = 0
            firstItem = null
            secondItem = null
          }
        }
      } else if (
        elem.parentElement.classList.contains(
          'findCoupleByLines_1_findCouple_right'
        )
      ) {
        secondItem = elem
        let coords = elem.getBoundingClientRect()
        if (elem.classList.contains('targetChoice_color')) {
          checkBusyElementAndRemove(elem)
          removeActiveCardClass(elem)

          secondItem = null
          x1 = 0
          x2 = 0
        } else {
          getAllSideElementsAndRemoveClass(rightSide)
          addCheckClass(elem)
          x2 = coords.left - coords2.left
          y2 = coords.bottom - coords.height / 2 - coords2.top

          if (x1 !== 0) {
            firstItem.setAttribute('busy', true)
            secondItem.setAttribute('busy', true)
            let svg = createSvgLine(x1, y1, x2, y2, table)

            answers.push([firstItem, secondItem, svg])
            x1 = 0
            x2 = 0
            y1 = 0
            y2 = 0
          }
        }
      }
    }
  }

  function getAllSideElementsAndRemoveClass(sideElement) {
    sideElement
      .querySelectorAll('.findCoupleByLines_1_findCouple_item')
      .forEach(item => {
        if (item.getAttribute('busy') === 'false') {
          removeActiveCardClass(item)
        }
      })
  }

  function checkBusyElementAndRemove(elem) {
    if (elem.getAttribute('busy') === 'true') {
      let removableEl = null
      answers.forEach((item, index) => {
        if (item.indexOf(elem) != -1) {
          removableEl = index
          item[2].remove()

          removeActiveCardClass(item[0])
          removeActiveCardClass(item[1])
          item[0].setAttribute('busy', false)
          item[1].setAttribute('busy', false)

          if (firstItem) {
            removeActiveCardClass(firstItem)
          }
          if (secondItem) {
            removeActiveCardClass(secondItem)
          }
          secondItem = null
          firstItem = null
        }
      })

      answers.splice(removableEl, 1)
    }
  }

  function createSvgLine(x1, y1, x2, y2, table) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.innerHTML = `<circle r='1.2mm' cx=${x1} cy=${y1}></circle><line x1=${x1} y1=${y1} x2=${x2} y2=${y2} ></line><circle r='1.2mm' cx=${x2} cy=${y2}></circle>`
    svg.classList.add('findCoupleByLines_1_findCouple_svg')
    table.append(svg)
    return svg
  }

  function onReloadBtnClick() {
    task
      .querySelectorAll('.findCoupleByLines_1_findCouple_svg')
      .forEach(item => item.remove())
    ;(firstItem = null), (secondItem = null), (answers = [])
    ;[...table.children].forEach(el => {
      ;[...el.children].forEach(elem => {
        elem.setAttribute('busy', false)
        removeActiveCardClass(elem)
      })
    })
    let lines = rightSide.querySelectorAll(
      '.findCoupleByLines_1_findCouple_item '
    )
    shuffleCards([...lines]).forEach(item => {
      rightSide.append(item)
    })

    shuffleTracing(
      rightSide,
      'findCoupleByLines_1_findCouple_item',
      data,
      onReloadBtnClick,
      'data-answer',
      'id'
    )

    checkingAnswerReset(controlsBox, infoBox)

    resetSound(soundSetStates)
    table.addEventListener('click', startSelect)
    btnTest.addEventListener('click', onCheckTaskBtnClick)

    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }
  }

  function onCheckTaskBtnClick() {
    table.removeEventListener('click', startSelect)
    btnTest.removeEventListener('click', onCheckTaskBtnClick)

    let winVar = 0
    answers.forEach(item => {
      if (
        item[0].getAttribute('data-answer') ===
        item[1].getAttribute('data-answer')
      ) {
        winVar++

        addRightChoiceClass(item[0])
        addRightChoiceClass(item[1])
        item[2].classList.add('findCoupleByLines_1_findCouple_true_line')
      } else {
        addWrongChoiceClass(item[0])
        addWrongChoiceClass(item[1])
        item[2].classList.add('findCoupleByLines_1_findCouple_wrong_line')
      }
    })

    if (winVar === data.length) {
      // checkingAnswerPositive(controlsBox, infoBox)
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      // checkingAnswerNegative(controlsBox, infoBox)
      checkingAnswerNegative(controlsBox, infoBox, extraSets)
    }
    resetSound(soundSetStates)
  }

  function createBaseMarkup() {
    return `
    <div class="findCoupleByLines_1_findCouple">
          <div class="findCoupleByLines_1_findCouple_table">
            <div class="findCoupleByLines_1_findCouple_left"></div>
            <div class="findCoupleByLines_1_findCouple_right"></div>
          </div>
        </div>
      `
  }
}
