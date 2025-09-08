import {
  scaleImage,
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
    const taskId = 'multipleChoice_3_task-5'
    // массив входящих картинок (минимум 4, максимум 15 элементов),
    // imgSrc - путь к изображению, обязательное поле
    //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    // поле id должно быть уникально, по нему идет воспроизведение звуков
    //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

    const arrayOfElements = [
      {
        id: 1,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_1.fc6646c7.png',
        answerTag: 'wrong',
        audioSrc: '',
        text: '',
      },
      {
        id: 2,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_2.9500f353.png',
        audioSrc: '',
        answerTag: 'right',
        text: '',
      },
      {
        id: 3,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_3.7d5ad98d.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 4,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_4.d7b2671d.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 5,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_5.720ae862.png',
        answerTag: 'wrong',
        audioSrc: '',
        text: '',
      },
      {
        id: 6,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_6.24aa76d0.png',
        audioSrc: '',
        answerTag: 'right',
        text: '',
      },
      {
        id: 7,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_7.71ee141a.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 8,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DO_3-4_22_2_8.88a64fe6.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
    ]
    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const rightAnswer = 'right'
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
    renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'multipleChoice_3_task-1'
    // массив входящих картинок (минимум 4, максимум 15 элементов),
    // imgSrc - путь к изображению, обязательное поле
    //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    // поле id должно быть уникально, по нему идет воспроизведение звуков
    //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

    const arrayOfElements = [
      {
        id: 1,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_2.png',
        answerTag: 'right',
        audioSrc: 'sound/multipleChoice_3/002.mp3',
        text: 'Фрукты',
      },
      {
        id: 2,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_3.png',
        audioSrc: 'sound/multipleChoice_3/003.mp3',
        answerTag: 'wrong',
        text: 'Овощи',
      },
      {
        id: 3,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: 'sound/multipleChoice_3/004.mp3',
        answerTag: 'right',
        text: 'Конфеты',
      },
      {
        id: 4,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: 'sound/multipleChoice_3/005.mp3',
        answerTag: 'wrong',
        text: 'Печенье',
      },
    ]
    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const rightAnswer = 'right'
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
    renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'multipleChoice_3_task-2'
    // массив входящих картинок (минимум 4, максимум 15 элементов),
    // imgSrc - путь к изображению, обязательное поле
    //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    // поле id должно быть уникально, по нему идет воспроизведение звуков
    //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

    const arrayOfElements = [
      {
        id: 1,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_2.png',
        answerTag: 'right',
        audioSrc: '',
        text: 'Фрукты',
      },
      {
        id: 2,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_3.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: 'Овощи',
      },
      {
        id: 3,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: '',
        answerTag: 'right',
        text: 'Конфеты',
      },
      {
        id: 4,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: 'Печенье',
      },
      {
        id: 5,
        name: 'candies-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: '',
        answerTag: 'right',
        text: 'Конфеты',
      },
      {
        id: 6,
        name: 'biscuits-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: 'Печенье',
      },
    ]
    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const rightAnswer = 'right'
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
    renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'multipleChoice_3_task-3'
    // массив входящих картинок (минимум 4, максимум 15 элементов),
    // imgSrc - путь к изображению, обязательное поле
    //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    // поле id должно быть уникально, по нему идет воспроизведение звуков
    //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

    const arrayOfElements = [
      {
        id: 1,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_2.png',
        answerTag: 'right',
        audioSrc: 'sound/multipleChoice_3/002.mp3',
        text: '',
      },
      {
        id: 2,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_3.png',
        audioSrc: 'sound/multipleChoice_3/003.mp3',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 3,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: 'sound/multipleChoice_3/004.mp3',
        answerTag: 'right',
        text: '',
      },
      {
        id: 4,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: 'sound/multipleChoice_3/005.mp3',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 5,
        name: 'candies-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: 'sound/multipleChoice_3/004.mp3',
        answerTag: 'right',
        text: '',
      },
      {
        id: 6,
        name: 'biscuits-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: 'sound/multipleChoice_3/005.mp3',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 1,
        name: 'fruits-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_2.png',
        answerTag: 'right',
        audioSrc: 'sound/multipleChoice_3/002.mp3',
        text: '',
      },
      {
        id: 2,
        name: 'vegetables-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_3.png',
        audioSrc: 'sound/multipleChoice_3/003.mp3',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 3,
        name: 'candies-3',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: 'sound/multipleChoice_3/004.mp3',
        answerTag: 'right',
        text: '',
      },
      {
        id: 4,
        name: 'biscuits-3',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: 'sound/multipleChoice_3/005.mp3',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 5,
        name: 'candies-4',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: 'sound/multipleChoice_3/004.mp3',
        answerTag: 'right',
        text: '',
      },
      {
        id: 6,
        name: 'biscuits-4',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: 'sound/multipleChoice_3/005.mp3',
        answerTag: 'wrong',
        text: '',
      },
    ]
    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const rightAnswer = 'right'
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
    renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId, extraSets)
  })()
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'multipleChoice_3_task-4'
    // массив входящих картинок (минимум 4, максимум 15 элементов),
    // imgSrc - путь к изображению, обязательное поле
    //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
    // поле id должно быть уникально, по нему идет воспроизведение звуков
    //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

    const arrayOfElements = [
      {
        id: 1,
        name: 'fruits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_2.png',
        answerTag: 'right',
        audioSrc: '',
        text: '',
      },
      {
        id: 2,
        name: 'vegetables',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_3.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 3,
        name: 'candies',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: '',
        answerTag: 'right',
        text: '',
      },
      {
        id: 4,
        name: 'biscuits',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_5.png',
        audioSrc: '',
        answerTag: 'wrong',
        text: '',
      },
      {
        id: 5,
        name: 'candies-2',
        imgSrc: 'Images_1/multipleChoice_3/DOH_3-4_25_5_4.png',
        audioSrc: '',
        answerTag: 'right',
        text: '',
      },
    ]
    // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
    const rightAnswer = 'right'
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
    renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId, extraSets)
  })()

//ФУНКЦИЯ
function renderMultipleChoice_3(
  arrayOfElements,
  rightAnswer,
  taskId,
  extraSets
) {
  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }
  let isGameStart = false

  const arrayLength = arrayOfElements.length
  const rightAnswersLength = arrayOfElements.filter(
    el => el.answerTag === rightAnswer
  ).length

  const taskWrapper = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const listContainer = taskWrapper.querySelector('.multipleChoice_3_List')

  listContainer.insertAdjacentHTML(
    'beforeend',
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  )
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

  listContainer.addEventListener('pointerdown', matchingHandler)
  btnReset.addEventListener('click', onBtnResetClick)
  btnTest.addEventListener('click', onBtnTestClick)

  const audioFiles = taskWrapper.querySelectorAll('.multipleChoice_3-audio')

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map(item => {
        let widthItem
        let heightItem
        if (arrayLength > 10) {
          widthItem = `"width: calc(100% / 5 - 10px)"`
          heightItem = 'multipleChoice_3_Card_small'
        } else if (arrayLength > 8 && arrayLength <= 10) {
          widthItem = `"width: calc(100% / 5 - 20px)"`
          heightItem = 'multipleChoice_3_Card_middle'
        } else if (arrayLength > 6 && arrayLength <= 8) {
          widthItem = `"width: calc(100% / 4 - 20px)"`
          heightItem = 'multipleChoice_3_Card_middle'
        } else if (arrayLength > 4 && arrayLength <= 6) {
          widthItem = `"width: calc(100% / 3 - 20px)"`
          heightItem = 'multipleChoice_3_Card_middle'
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`
          heightItem = 'multipleChoice_3_Card_big'
        }

        const isTitle =
          item.text && `<div class='multipleChoice_3_Title'>${item.text}</div>`

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="multipleChoice_3-audio displayNoneAudio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        return `<div class="multipleChoice_3_Card oneMultiChoice_border ${heightItem} hoveredActiveElement" data="${item.answerTag}" style=${widthItem}>
                  <div class='multipleChoice_3_ImageBox ' style="background-image: url(${item.imgSrc})">
                      <div class="zoom_open_button_white multipleChoice_3-enlarge_picture" title="Увеличить изображение">
                          <div class="icon_zoomPicture whiteZoomImg"></div>
                       </div>
                  </div>

                  ${isSound}
                  ${isTitle}
                </div>
                `
      })
      .join('')
  }

  function onBtnResetClick() {
    ;[...listContainer.children].forEach(item => {
      removeActiveCardClass(item)
      getRandomPositionToCard(item)
    })
    checkingAnswerReset(controlsBox, infoBox)

    resetSound(soundSetStates)

    listContainer.addEventListener('pointerdown', matchingHandler)
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }
    btnTest.addEventListener('click', onBtnTestClick)
  }

  function onBtnTestClick() {
    let winCount = 0

    const selectedItems = [...listContainer.children].filter(el =>
      el.classList.contains('targetChoice_color')
    )

    selectedItems.forEach(item => {
      if (item.attributes.getNamedItem('data').value === rightAnswer) {
        winCount += 1
        addRightChoiceClass(item)
      } else {
        winCount -= 1
        addWrongChoiceClass(item)
      }
    })
    if (winCount === rightAnswersLength) {
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else checkingAnswerNegative(controlsBox, infoBox, extraSets)

    resetSound(soundSetStates)

    listContainer.removeEventListener('pointerdown', matchingHandler)
    btnTest.removeEventListener('click', onBtnTestClick)
  }

  function matchingHandler(e) {
    let matchedItem
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
    if (e.target.classList.contains('multipleChoice_3-enlarge_picture')) {
      scaleImage(e.target.parentElement)
    }
    const isImgEl =
      e.target.classList.contains('multipleChoice_3_Card') ||
      e.target.classList.contains('multipleChoice_3_Title') ||
      e.target.classList.contains('multipleChoice_3_ImageBox')

    if (!isImgEl) {
      return
    }

    if (
      e.target.classList.contains('multipleChoice_3_ImageBox') ||
      e.target.classList.contains('multipleChoice_3_Title')
    ) {
      matchedItem = e.target.parentElement
    } else matchedItem = e.target

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = true
    }

    if (matchedItem.classList.contains('targetChoice_color')) {
      removeActiveCardClass(matchedItem)
    } else {
      addCheckClass(matchedItem)
    }
    const isSelectedItems = [...listContainer.children].some(el =>
      el.classList.contains('targetChoice_color')
    )
    if (!isSelectedItems) {
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false
      toggleOpacityAndEventsElement(btnTest)
    }
  }

  function createBaseMarkup() {
    return `
   <div class="multipleChoice_3_Wrapper">
          <div class="multipleChoice_3_List"></div>
        </div>
      `
  }
}
