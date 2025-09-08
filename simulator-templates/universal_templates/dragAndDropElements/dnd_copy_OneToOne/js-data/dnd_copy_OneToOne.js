import {
  scaleImage,
  dropAppend,
  resetSound,
  onSoundIconClick,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  shuffleCards,
  addRightChoiceClass,
  addWrongChoiceClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createTemplateBaseMarkup,
  displayNoneToggle,
  findKeyValueInExtraSets,
  renderSliderWithButtonsMarkup,
  getBlocksSizes,
  showArrows,
  onBtnLeftClick,
  onBtnRightClick,
  sliderResetState,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-1'

  // указывается количество верно перетащенных элементов (или общее количество из arrayOfDragElements, или любое меньшее число)
  const rightCount = 5

  // перетаскивание происходит посредством копирования
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // массивы входящих картинок (максимум 5-6 элементов),
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc, audioSrcTwo - если нужна озвучка в полях для перетаскивания (дроп) в у элементов, которые перетаскиваются соответственно
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова
  // в поле id пишется уникальное значение на оба массива с данными, по которому воспроизводятся звуки

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'mother',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_24.png',
      bgSrc: '',
      audioSrc: 'sound/dnd_copy-OneToOne/007.mp3', //"sound/dnd_copy-OneToOne/007.mp3",
      text: '',
      answerTag: 'adult',
    },
    {
      id: 2,
      name: 'father',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_25.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'adult',
    },
    {
      id: 3,
      name: 'son',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_26.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'child',
    },
    {
      id: 4,
      name: 'dauther',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_27.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'child',
    },
    {
      id: 5,
      name: 'grandmother',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_28.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'adult',
    },
    /*{
              id: 6,
              name: "grandmother",
              imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_28.png",
              bgSrc: "",
              text: "",
              audioSrc: "",
              answerTag: "adult",
            },*/
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'big-cake',
      imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png',
      audioSrcTwo: '',
      text_2: '',
      answerTag: 'adult',
    },
    {
      id: 2,
      name: 'small-cake',
      imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png',
      text_2: '',
      audioSrcTwo: '',
      answerTag: 'child',
    },
    // {
    //   id: 1,
    //   name: 'big-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png',
    //   audioSrcTwo: '',
    //   text_2: '',
    //   answerTag: 'adult',
    // },
    // {
    //   id: 2,
    //   name: 'small-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png',
    //   text_2: '',
    //   audioSrcTwo: '',
    //   answerTag: 'child',
    // },
    // {
    //   id: 1,
    //   name: 'big-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png',
    //   audioSrcTwo: '',
    //   text_2: '',
    //   answerTag: 'adult',
    // },
    // {
    //   id: 2,
    //   name: 'small-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png',
    //   text_2: '',
    //   audioSrcTwo: '',
    //   answerTag: 'child',
    // },
    // {
    //   id: 1,
    //   name: 'big-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png',
    //   audioSrcTwo: '',
    //   text_2: '',
    //   answerTag: 'adult',
    // },
    // {
    //   id: 2,
    //   name: 'small-cake',
    //   imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png',
    //   text_2: '',
    //   audioSrcTwo: '',
    //   answerTag: 'child',
    // },
  ]

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
  renderDndCopyOneToOne(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId,
    rightCount,
    extraSets
  )
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-2'
  // указывается количество верно перетащенных элементов ( или общее количество из arrayOfDragElements, или любое меньшее число)
  const rightCount = 1

  // перетаскивание происходит посредством копирования
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // массивы входящих картинок (максимум 5-6 элементов),
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc, audioSrcTwo - если нужна озвучка в полях для перетаскивания (дроп) в у элементов, которые перетаскиваются соответственно
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова
  // в поле id пишется уникальное значение на оба массива с данными, по которому воспроизводятся звуки

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'mother',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_24.png',
      bgSrc: '',
      audioSrc: '',
      text: '',
      answerTag: 'adult',
      // answerTag: "grandma",
    },
    {
      id: 2,
      name: 'father',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_25.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'adult',
    },
    {
      id: 3,
      name: 'son',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_26.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'child',
    },
    {
      id: 4,
      name: 'dauther',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_27.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'child',
    },
    {
      id: 5,
      name: 'grandmother',
      imgSrc: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_28.png',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'grandma',
    },
  ]
  const arrayOfDragElements = [
    {
      id: 7,
      name: 'big-cake',
      imgSrc_2: 'Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png',
      // imgSrc_2: "",
      // audioSrcTwo: "sound/dnd_copy-OneToOne/007.mp3",
      audioSrcTwo: '',
      // text_2: "Бабушка",
      text_2: '',
      answerTag: 'grandma',
    },
    // {
    //   id: 8,
    //   name: "small-cake",
    //   imgSrc_2: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png",
    //   text_2: "",
    //   audioSrcTwo: "",
    //   answerTag: "child",
    // },
  ]

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
  renderDndCopyOneToOne(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId,
    rightCount,
    extraSets
  )
})()

//ФУНКЦИЯ

function renderDndCopyOneToOne(
  arrayOfDropElements,
  arrayOfDragElements,
  taskId,
  rightCount,
  extraSets
) {
  let draggingItem
  let elemBelow
  let isGameStart = false
  const dropId = 'drop'
  const dragId = 'drag'
  const soundDataAttribute = 'drop-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }
  const taskWrapper = document.getElementById(`${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const dropBox = taskWrapper.querySelector(
    '.dnd_copy-OneToOne_dropPlaceWrapper'
  )
  const answersWrapper = taskWrapper.querySelector(
    '.dnd_copy-OneToOne_dragPlaceWrapper'
  )

  const {
    leftBtn,
    rightBtn,
    sliderBox: dragBox,
  } = renderSliderWithButtonsMarkup(answersWrapper, 'dnd_copy-OneToOne_drag')

  dropBox.insertAdjacentHTML(
    'beforeend',
    createDropPictureCardsMarkup(arrayOfDropElements)
  )
  dragBox.insertAdjacentHTML(
    'beforeend',
    createDragPictureCardsMarkup(shuffleCards([...arrayOfDragElements]))
  )
  renderCheckPanel(taskWrapper, true)
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper)

  let sliderSet = {
    sliderItemWidth: 0,
    sliderSize: 0,
    sliderWrapperSize: dragBox.offsetParent.clientWidth,
    sliderShift: 0,
  }

  const audioFiles = taskWrapper.querySelectorAll('.dnd_copy-OneToOne_audio')
  getBlocksSizes(sliderSet, dragBox)
  showArrows(sliderSet, leftBtn, rightBtn)

  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  taskWrapper.addEventListener('pointerdown', mouseDown)
  btnReset.addEventListener('click', onBtnResetClick)
  btnTest.addEventListener('click', onBtnTestClick)
  dropBox.addEventListener('pointerdown', onDropBoxClick)

  taskWrapper.addEventListener('click', onIconClick)
  leftBtn.addEventListener('click', LeftClick)
  rightBtn.addEventListener('click', RightClick)

  function LeftClick() {
    onBtnLeftClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function RightClick() {
    onBtnRightClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function onIconClick(e) {
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
  }

  function onDropBoxClick(event) {
    if (
      event.target.classList.contains('dnd_copy-OneToOne_dropPicture') ||
      event.target.classList.contains('dnd_copy-OneToOne_dropPlace_box')
    ) {
      scaleImage(event.target)
    }
  }

  function onBtnResetClick() {
    ;[...dropBox.children].forEach(item => {
      if (item.children[1].children.length === 2) {
        item.children[1].removeChild(item.children[1].children[1])
      }
    })
    resetSound(soundSetStates)
    checkingAnswerReset(controlsBox, infoBox)
    sliderResetState(sliderSet, dragBox, 'horisontal')
    getBlocksSizes(sliderSet, dragBox)
    showArrows(sliderSet, leftBtn, rightBtn)
    draggingItem = null
    taskWrapper.addEventListener('pointerdown', mouseDown)
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }
    btnTest.addEventListener('click', onBtnTestClick)
  }

  function onBtnTestClick() {
    resetSound(soundSetStates)
    let winVar = 0
    ;[...dropBox.children].forEach(item => {
      if (item.children[1].children.length === 2) {
        if (
          item.children[1].children[0].attributes.getNamedItem('drop-data')
            .value ===
          item.children[1].children[1]?.attributes.getNamedItem('drag-data')
            .value
        ) {
          winVar += 1
          addRightChoiceClass(item.children[1].children[1])
        } else {
          winVar -= 1
          addWrongChoiceClass(item.children[1].children[1])
        }
      }
    })

    if (winVar === rightCount) {
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      checkingAnswerNegative(controlsBox, infoBox, extraSets)
    }
    taskWrapper.removeEventListener('pointerdown', mouseDown)
    btnTest.removeEventListener('click', onBtnTestClick)
  }

  function mouseDown(event) {
    if (event.button !== 0) return

    if (
      event.target.classList.contains('dnd_copy-OneToOne_dragPicture') ||
      event.target.classList.contains('dnd_copy-OneToOne_dragTitle')
    ) {
      draggingItem = event.target.parentElement
    } else if (
      event.target.classList.contains('dnd_copy-OneToOne_dragPicture_box')
    ) {
      draggingItem = event.target
    } else return

    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top

    // ЛИМИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК

    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    }

    if (!draggingItem.classList.contains('dnd_copy-OneToOne_clone')) {
      draggingItem = draggingItem.cloneNode(true)
      draggingItem.lastElementChild?.classList.remove('buttonPlayPause--active')
      draggingItem.classList.add('dnd_copy-OneToOne_clone')
    }
    draggingItem.style.touchAction = 'none'
    draggingItem.style.cursor = 'grabbing'

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + 'px'
      draggingItem.style.top = pageY - shiftY + 'px'
    }

    let clickWithoutMove = true

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.position = 'absolute'
        draggingItem.style.zIndex = 1000
        taskWrapper.appendChild(draggingItem)
      }
      let newLocation = {
        x: limits.left,
        y: limits.top,
      }
      if (event.pageX > limits.right) {
        newLocation.x = limits.right
      } else if (event.pageX > limits.left) {
        newLocation.x = event.pageX
      }
      if (event.pageY > limits.bottom) {
        newLocation.y = limits.bottom
      } else if (event.pageY > limits.top) {
        newLocation.y = event.pageY
      }

      clickWithoutMove = false

      moveAt(newLocation.x, newLocation.y)

      if (!event.composedPath().includes(draggingItem)) {
        window.addEventListener('pointerup', moveOut)
      }
      if (event.composedPath().includes(draggingItem)) {
        window.removeEventListener('pointerup', moveOut)
      }

      draggingItem.style.visibility = 'hidden'
      elemBelow = document.elementFromPoint(event.clientX, event.clientY)

      draggingItem.style.visibility = 'visible'

      if (!elemBelow) return
    }
    document.addEventListener('pointermove', onMouseMove)

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      const elemUnderPoint = document.elementFromPoint(e.clientX, e.clientY)

      if (
        elemUnderPoint === null ||
        (elemUnderPoint !== draggingItem &&
          !elemUnderPoint.classList.contains(
            'dnd_copy-OneToOne_dragPicture_box'
          ) &&
          !elemUnderPoint.classList.contains('dnd_copy-OneToOne_dragPicture') &&
          !elemUnderPoint.classList.contains('dnd_copy-OneToOne_dragTitle') &&
          !elemUnderPoint.classList.contains(
            'dnd_copy-OneToOne_dropPlace_imageBox'
          ))
      ) {
        draggingItem.remove()
      }

      window.removeEventListener('pointerup', moveOut)
      document.removeEventListener('pointermove', onMouseMove)
      taskWrapper.removeEventListener('pointerup', onpointerup)
    }

    taskWrapper.addEventListener('pointerup', onpointerup)

    function onpointerup(event) {
      if (clickWithoutMove) {
        if (
          event.target.classList.contains(
            'dnd_copy-OneToOne_dragPicture_box'
          ) &&
          event.target.firstElementChild.classList.contains(
            'dnd_copy-OneToOne_dragPicture'
          )
        ) {
          scaleImage(event.target.firstElementChild)
        } else if (
          event.target.classList.contains('dnd_copy-OneToOne_dragPicture')
        ) {
          scaleImage(event.target)
        }

        taskWrapper.removeEventListener('pointerup', onpointerup)
      }

      if (draggingItem) draggingItem.style.cursor = 'grab'
      document.removeEventListener('pointermove', onMouseMove)

      if (elemBelow) {
        if (
          elemBelow.classList.contains(
            'dnd_copy-OneToOne_dropPlace_imageBox'
          ) &&
          elemBelow.parentElement.children.length < 2
        ) {
          dropAppend(elemBelow.parentElement, draggingItem)
          draggingItem.classList.remove('dnd_copy-OneToOne_dnd-check')
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest)
            isGameStart = true
          }
        } else {
          draggingItem.remove()
        }
      }

      taskWrapper.removeEventListener('pointerup', onpointerup)
      elemBelow = null
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map(picture => {
        const isTitle =
          picture.text &&
          `<div class='dnd_copy-OneToOne_dropTitle'>${picture.text}</div>`

        const isSound =
          picture.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-OneToOne_audio displayNoneAudio" id="${dropId}_${picture.id}${taskId}" src="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        const isImage =
          picture.imgSrc &&
          `<div class="dnd_copy-OneToOne_dropPicture" style="background-image: url(${picture.imgSrc}" draggable="false">
                    </div>`

        const isBackgroundImage = picture.bgSrc
          ? `<div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_box dnd_copy-OneToOne_border" style='background-image: url(${picture.bgSrc})'>
             </div>`
          : `<div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_box">
                    <div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_imageBox"></div>
             </div>`

        const isAudioBackground =
          !picture.text && !picture.imgSrc && picture.audioSrc
            ? 'audio_background_plug'
            : ''

        return `<div class="dnd_copy-OneToOne_dropPlace">
                    <div class="dnd_copy-OneToOne_dropPicture_box ${isAudioBackground}">
                        ${isImage}
                        ${isSound}
                        ${isTitle}
                    </div>
                    ${isBackgroundImage}
                </div>

                                  `
      })
      .join('')
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map(picture => {
        const isTitle =
          picture.text_2 &&
          `<div class='dnd_copy-OneToOne_dragTitle'>${picture.text_2}</div>`

        const isImage =
          picture.imgSrc_2 &&
          `<div class="dnd_copy-OneToOne_dragPicture" style="background-image: url(${picture.imgSrc_2}" draggable="false">
                    </div>`

        const isSound =
          picture.audioSrcTwo &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-OneToOne_audio displayNoneAudio" id="${dragId}_${picture.id}${taskId}" src="${picture.audioSrcTwo}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        const isAudioBackground =
          !picture.text_2 && !picture.imgSrc_2 && picture.audioSrcTwo
            ? 'audio_background_plug'
            : ''

        return `<div class="dnd_copy-OneToOne_dragPicture_box ${isAudioBackground} hoveredActiveElement" draggable="false" drag-data="${picture.answerTag}" sound-data="${picture.id}">
                    ${isImage}
                    ${isSound}
                    ${isTitle}
                </div>

                                  `
      })
      .join('')
  }

  function createBaseMarkup() {
    return `
    <div class="dnd_copy-OneToOne_comparePicturesWrapper">
          <div class="dnd_copy-OneToOne_dropPlaceWrapper"></div>
          <div class="dnd_copy-OneToOne_dragPlaceWrapper"></div>
    </div>
      `
  }
}
