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

// ВЫЗОВ ФУНКЦИИ ДЛЯ СЛУЧАЯ ТОЛЬКО КАРТИНКА
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'singleChoice_3_task-3'
  // массив входящих картинок (максимум 5 элементов при вертикальном расположении, 15-при горизонтальном),
  // поле text, audioSrc  заполняется по необходимости, если надписи или звука нет, то ставится ''
  // в поле answerTag указывается уникальное слово или цифра, по которой будет сверяться правильный ответ
  // в поле id указывается уникальная цифра, по которым воспроизводятся звуки
  // imgSrc -  обязательное поле, путь к картинке
  const arrayOfElements = [
    {
      id: 1,
      name: 'lion',
      imgSrc: 'Images_1/singleChoice_3/lion.dbd8c13b.png',
      text: '',
      audioSrc: '',
      answerTag: 'lion',
    },
    {
      id: 2,
      name: 'monkey',
      imgSrc: 'Images_1/singleChoice_3/monkey.0cf4077b.png',
      text: '',
      audioSrc: '',
      answerTag: 'monkey',
    },
    {
      id: 3,
      name: 'tiger',
      imgSrc: 'Images_1/singleChoice_3/tiger.7bc5058d.png',
      text: '',
      audioSrc: '',
      answerTag: 'tiger',
    },
  ]

  // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
  const rightAnswer = 'monkey'

  // заполняется для правильного отображения сетки
  // 'h' -  ставится, если поля расположены в несколько столбцов
  // 'v' - если поля должны быть расположены строго в столбик друг под другом (максимум 5 элементов)
  // const orientation = "v";
  const orientation = 'h'
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
  renderSingleChoice_3(
    arrayOfElements,
    rightAnswer,
    taskId,
    orientation,
    extraSets
  )
})()

// НИЖЕ САМА ФУНКЦИЯ
function renderSingleChoice_3(
  arrayOfElements,
  rightAnswer,
  taskId,
  orientation,
  extraSets
) {
  let currentActiveCard
  let isGameStart = false

  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }

  const arrayLength = arrayOfElements.length

  const taskWrapper = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const listContainer = taskWrapper.querySelector('.singleChoice_3_List')

  orientation === 'v' &&
    listContainer.parentElement.classList.add('singleChoice_3_Wrapper_vertical')

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

  listContainer.addEventListener('pointerdown', onListItemClick)

  btnReset.addEventListener('click', onBtnResetClick)
  btnTest.addEventListener('click', onBtnTestClick)

  const audioFiles = taskWrapper.querySelectorAll('.singleChoice_3_audio')

  function onBtnResetClick(e) {
    btnTest.removeEventListener('click', onBtnTestClick)
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }

    currentActiveCard && removeActiveCardClass(currentActiveCard)
    ;[...listContainer.children].forEach(el => getRandomPositionToCard(el))

    resetSound(soundSetStates)
    checkingAnswerReset(controlsBox, infoBox)
    currentActiveCard = null

    listContainer.addEventListener('pointerdown', onListItemClick)
    btnTest.addEventListener('click', onBtnTestClick)
  }

  function onBtnTestClick(e) {
    if (currentActiveCard && currentActiveCard.dataset.name === rightAnswer) {
      addRightChoiceClass(currentActiveCard)
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      addWrongChoiceClass(currentActiveCard)
      checkingAnswerNegative(controlsBox, infoBox, extraSets)
    }

    resetSound(soundSetStates)

    listContainer.removeEventListener('pointerdown', onListItemClick)
    btnTest.removeEventListener('click', onBtnTestClick)
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map(picture => {
        let widthItem
        let heightItem

        if (arrayLength > 10) {
          widthItem = `"width: calc(100% / 5 - 10px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_small'
        } else if (arrayLength > 8 && arrayLength <= 10) {
          widthItem = `"width: calc(100% / 5 - 20px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_middle'
        } else if (arrayLength > 6 && arrayLength <= 8) {
          widthItem = `"width: calc(100% / 4 - 20px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_middle'
        } else if (arrayLength > 4 && arrayLength <= 6) {
          widthItem = `"width: calc(100% / 3 - 20px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_middle'
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_big'
        } else if (arrayLength < 4) {
          widthItem = `"width: calc(100% / ${arrayLength} - 10px)"`
          heightItem = 'singleChoice_3_ImageBox_horizontal_big'
        }

        const isTitle =
          picture.text &&
          `<div class='singleChoice_3_Title'>${picture.text}</div>`

        const isSound =
          picture.audioSrc &&
          `
                  <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${picture.id}${taskId}">
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                      <audio class="singleChoice_3_audio displayNoneAudio" id="${picture.id}${taskId}" src="${picture.audioSrc}">
                                Your browser does not support the
                                <code>audio</code> element.
                      </audio>
                  </div>
              `
        if (orientation === 'h') {
          return `
                          <div class="singleChoice_3_Item oneMultiChoice_border ${heightItem} hoveredActiveElement" data-name="${picture.answerTag}" style=${widthItem}>
                              <div class='singleChoice_3_ImageBox singleChoice_3_ImageBox_horizontal ' style="background-image: url(${picture.imgSrc})">
                                 <div class="zoom_open_button_white singleChoice_3_enlarge_picture" title="Увеличить изображение">
                                    <div class="icon_zoomPicture whiteZoomImg"></div>
                                 </div>
                              </div>
                              ${isSound}
                              ${isTitle}
                              </div>
                              `
        } else if (orientation === 'v') {
          let isText = picture.text
            ? 'singleChoice_3_ImageBox_vertical_withText'
            : 'singleChoice_3_ImageBox_vertical'
          heightItem = `"height: calc(100% / ${arrayLength} - 10px)"`

          return `
                <div class="singleChoice_3_Item oneMultiChoice_border singleChoice_3_Item_vertical hoveredActiveElement" data-name="${picture.answerTag}" style=${heightItem}>
                ${isSound}
                ${isTitle}
                    <div class='singleChoice_3_ImageBox ${isText}' style="background-image: url(${picture.imgSrc})">
                       <div class="zoom_open_button_white singleChoice_3_enlarge_picture" title="Увеличить изображение">
                          <div class="icon_zoomPicture whiteZoomImg"></div>
                       </div>
                    </div>
                    </div>
                    `
        }
      })
      .join('')
  }

  function onListItemClick(e) {
    let imgEl
    if (e.target.classList.contains('singleChoice_3_enlarge_picture')) {
      scaleImage(e.target.parentElement)
    }
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
    const isImgEl =
      e.target.classList.contains('singleChoice_3_ImageBox') ||
      e.target.classList.contains('singleChoice_3_Title') ||
      e.target.classList.contains('singleChoice_3_Item')

    if (!isImgEl) {
      return
    }

    if (
      e.target.classList.contains('singleChoice_3_ImageBox') ||
      e.target.classList.contains('singleChoice_3_Title')
    ) {
      imgEl = e.target.parentElement
    } else imgEl = e.target

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = true
    }

    if (imgEl.classList.contains('targetChoice_color')) {
      removeActiveCardClass(imgEl)
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false
      toggleOpacityAndEventsElement(btnTest)
    } else if (imgEl.classList.contains('singleChoice_3_Item')) {
      currentActiveCard && removeActiveCardClass(currentActiveCard)
      addCheckClass(imgEl)
      currentActiveCard = imgEl
    }
  }

  function createBaseMarkup() {
    return `
   <div class="singleChoice_3_Wrapper">
          <div class="singleChoice_3_List"></div>
        </div>
      `
  }
}
