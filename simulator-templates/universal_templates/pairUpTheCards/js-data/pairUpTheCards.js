import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerReset,
  getRandomPositionToCard,
  shuffleCards,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
  removeActiveCardClass,
  addCheckClass,
  toggleDisplayVisibilityElement,
  toggleOpacityAndEventsElement,
  onSoundIconClick,
  resetSound,
  createTemplateBaseMarkup,
} from '../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'pairUpTheCards_task-2'
  // массив входящих картинок (от 4 до 24 элементов), всегда четное количество элементов, без лишних элементов
  // imgSrc - опционально, путь к картинке,  если контента нет, оставлять ''
  // audioSrc - опционально, путь к звуку,  если контента нет, оставлять ''
  // text  - опционально, максимум 8-9 символов помещается в 1 строку, оставлять ''
  // answerTag - вписывается слово по которому будет сверяться правильность выбранных карточек
  const arrayOfElements = [
    {
      id: 1,
      imgSrc: '',
      text: 'Кот',
      answerTag: '1',
      audioSrc: '',
    },
    {
      id: 2,
      imgSrc: '',
      text: 'Cat',
      answerTag: '1',
      audioSrc: '',
      // audioSrc: 'sound/002.mp3',
    },
    {
      id: 3,
      imgSrc: '',
      text: 'Boy',
      answerTag: '2',
      audioSrc: '',
    },
    {
      id: 4,
      imgSrc: '',
      text: 'Мальчик',
      answerTag: '2',
      audioSrc: '',
    },
    {
      id: 5,
      imgSrc: '',
      text: 'Дед',
      answerTag: '3',
      audioSrc: '',
    },
    {
      id: 6,
      imgSrc: '',
      text: 'GrandPa',
      answerTag: '3',
      audioSrc: '',
    },
    {
      id: 7,
      imgSrc: '',
      text: 'Dog',
      answerTag: '4',
      audioSrc: '',
    },
    {
      id: 8,
      imgSrc: '',
      text: 'Собака',
      answerTag: '4',
      audioSrc: '',
    },
  ]

  // дополнительные параметры extraSets
  // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
  // winSound - путь к победному звуку, если не нужен, то оставить ""
  // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""

  const extraSets = {
    checkSound: {
      winSound: '',
      loseSound: '',
    },
  }

  // сама функция, которая запускается, здесь ничего менять не нужно

  renderPairUpTheCards(arrayOfElements, taskId, extraSets)
})()

//ФУНКЦИЯ
function renderPairUpTheCards(arrayOfElements, taskId, extraSets) {
  // выбрана ли хоть одна карта
  let hasChosenCard = false
  // первая выбранная карта
  let firstCard
  // вторая выбранная карта
  let secondCard
  // запрет на действия, если выбраны 2 карты
  let lockBoard = false
  // таймер
  let timerId

  const soundDataAttribute = 'sound-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }

  const arrayLength = arrayOfElements.length

  const taskWrapper = document.querySelector(`#${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const listContainer = taskWrapper.querySelector(
    '.pairUpTheCards_cardsWrapper'
  )

  listContainer.insertAdjacentHTML(
    'beforeend',
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  )
  renderCheckPanel(taskWrapper, false)
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper)

  const cards = taskWrapper.querySelectorAll('.pairUpTheCards_card')
  const audioFiles = taskWrapper.querySelectorAll('.pairUpTheCards_audio')

  listContainer.addEventListener('pointerdown', onCardClick)
  btnReset.addEventListener('click', onBtnResetClick)

  function createPictureCardsMarkup(items) {
    return items
      .map(item => {
        let widthItem
        let heightItem
        if (arrayLength <= 10) {
          widthItem = `width: calc(100% / (${arrayLength}/2) - 10px)`
          heightItem = `height: calc(100% / 2 - 10px)`
        } else if (arrayLength === 12 || arrayLength === 18) {
          widthItem = `width: calc(100% / (${arrayLength}/3) - 10px)`
          heightItem = `height: calc(100% / 3 - 10px)`
        } else if (
          arrayLength === 16 ||
          arrayLength === 20 ||
          arrayLength === 24
        ) {
          widthItem = `width: calc(100% / (${arrayLength}/4) - 10px)`
          heightItem = `height: calc(100% / 4 - 10px)`
        } else if (arrayLength === 14) {
          widthItem = `width: calc(100% / 4 - 10px)`
          heightItem = `height: calc(100% / 4 - 10px)`
        } else if (arrayLength === 22) {
          widthItem = `width: calc(100% / 6 - 10px)`
          heightItem = `height: calc(100% / 4 - 10px)`
        }

        const isText =
          item.text &&
          `<div class='pairUpTheCards_cardTitle'>${item.text}</div>`
        const isImage =
          item.imgSrc &&
          `
          <div class="pairUpTheCards_cardImg" style='background-image: url(${item.imgSrc})'>
          <div class="zoom_open_button_white pairUpTheCards_enlarge_picture" title="Увеличить изображение">
              <div class="icon_zoomPicture whiteZoomImg"></div>
          </div>

          </div>
          `
        const isAudioBackground =
          !item.text && item.audioSrc ? 'audio_background_plug' : ''

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="pairUpTheCards_audio displayNoneAudio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        return `
          <div
          class="pairUpTheCards_card oneMultiChoice_border ${isAudioBackground} hoveredActiveElement"
          data-card ="${item.answerTag}"
          style="${widthItem}; ${heightItem}"
          >
          ${isSound}
          ${isImage}
          ${isText}

          </div>
          `
      })
      .join('')
  }

  function onBtnResetClick() {
    clearTimeout(timerId)
    ;[...cards].forEach(el => {
      removeActiveCardClass(el)
      if (el.classList.contains('noDisplayElement')) {
        toggleDisplayVisibilityElement(el)
      }
      if (el.classList.contains('noEventAddOpacity')) {
        toggleOpacityAndEventsElement(el)
      }
    })
    shuffle([...cards])
    checkingAnswerReset(controlsBox, infoBox)
    if (listContainer.classList.contains('noEventElement')) {
      togglePointerEventElement(listContainer)
    }
    resetSound(soundSetStates)
  }

  function onCardClick(e) {
    if (e.target.classList.contains('pairUpTheCards_enlarge_picture')) {
      scaleImage(e.target.parentElement)
      return
    }

    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
      return
    }

    const targetEl = e.target.closest('.pairUpTheCards_card')

    if (targetEl) {
      if (lockBoard) return

      if (!hasChosenCard) {
        hasChosenCard = true
        firstCard = targetEl
        addCheckClass(firstCard)
        return
      }

      if (targetEl.classList.contains('targetChoice_color')) {
        removeActiveCardClass(targetEl)
        hasChosenCard = false
      }

      secondCard = targetEl
      lockBoard = true

      // сравнение двух выбранных карт
      checkForMatch()
    }
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card

    // если карты совпадают, то убираем с поля, если нет, то снимаем выделение
    timerId = isMatch ? disableCards() : deselectCards()
  }

  function disableCards() {
    addCheckClass(secondCard)

    let timerId = setTimeout(() => {
      removeActiveCardClass(firstCard)
      removeActiveCardClass(secondCard)
      toggleDisplayVisibilityElement(firstCard)
      toggleDisplayVisibilityElement(secondCard)
      resetBoard()
      showTaskFinish()
    }, 500)

    return timerId
  }

  function deselectCards() {
    let timerId = setTimeout(() => {
      removeActiveCardClass(firstCard)
      removeActiveCardClass(secondCard)
      resetBoard()
    }, 500)
    return timerId
  }

  function resetBoard() {
    ;[hasChosenCard, lockBoard] = [false, false]
    ;[firstCard, secondCard] = [null, null]
  }

  function showTaskFinish() {
    if (
      [...cards].filter(el => el.classList.contains('noDisplayElement'))
        .length === [...cards].length
    ) {
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
      togglePointerEventElement(listContainer)
      ;[...cards].forEach(element => {
        toggleOpacityAndEventsElement(element)
      })
    }
  }

  function shuffle(cards) {
    cards.forEach(card => {
      getRandomPositionToCard(card)
    })
  }

  function createBaseMarkup() {
    return `
  <div class="pairUpTheCards_cardsWrapper"></div>
      `
  }
}
