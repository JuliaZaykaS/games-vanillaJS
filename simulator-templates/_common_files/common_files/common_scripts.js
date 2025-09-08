// const breakPoints = [2040, 1920, 1366, 1280, 920]; - цифры в массиве - number
// function yourFunction(rangeMedia) {}
// при первом запуске страницы yourFunction(queryPointsListener(breakPoints, yourFunction)), чтобы получить диапазон при первом запуске

// function yourFunction(rangeMedia) {
//   switch (rangeMedia) {
//     case '0-920':
//       console.log('твой код для разрешения ниже 920');
//       break;
//     case '1366-1920':
//       console.log('твой код для диапазона от 1366 до 1920');
//       break;
//     case '2040-infinit':
//       console.log('твой код для разрешения от 2040 и выше');
//       break;
//   }
// }

// ВАЖНО!!!!
// кейсы расписывать диапазонами, взятыми из чисел передаваемого массива, прописывать как строку!!!
// '1366-1920' - существующий диапазон точек из переданного вами массива [2040, 1920, 1366, 1280, 920]
// в случае крайних чисел массива (в примере это 2040 и 920) прописывать строго '0-920' и '2040-infinit'

// Функция вешает слушатели на ширины экрана из принимаемого массива [2040, 1920, 1366, 1280, 920] (в любом порядке, можно не сортировать)
// вторым аргументом принимается ваша функция yourFunction  которая сработает при прохождении точек и первой загрузке страницы (при условии наличия вызова)
// ваша функция принимает аргумент в виде строки - диапазон вида '1280-1366'

export function queryPointsListener(targetQueries, actionFunc) {
  const sortedArray = targetQueries.sort((a, b) => a - b)
  sortedArray.map(query => {
    window
      .matchMedia(`(max-width: ${query}px)`)
      .addEventListener('change', e => actionFunc(rangeMedia(e)), false)
  })
  function rangeMedia(e) {
    if (e) {
      const targetMedia = parseInt(e.media?.replace(/[^0-9]/g, ''))
      const index = sortedArray.indexOf(targetMedia)
      const lessRange = !sortedArray[index - 1]
        ? `0-${targetMedia}`
        : `${sortedArray[index - 1]}-${targetMedia}`
      const largeRange = sortedArray[index + 1]
        ? `${targetMedia}-${sortedArray[index + 1]}`
        : `${targetMedia}-infinit`
      const range = e.matches ? lessRange : largeRange
      return range
    } else {
      // const targetMedia = window.screen.width;
      const targetMedia = window.innerWidth

      let larger, lesser
      for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i] < targetMedia) {
          lesser = sortedArray[i]
        } else {
          larger = sortedArray[i]
          break
        }
      }
      const startLessRange = lesser || '0'
      const startLargerRange = larger || 'infinit'
      const startRange = `${startLessRange}-${startLargerRange}`
      return startRange
    }
  }
  return rangeMedia()
}

// относится к scaleImage - блокирует скролл
function preventScroll(e) {
  e.preventDefault()
}
// относится к scaleImage - возвращает если в модалке - true
const hasIframeInParents = element => {
  let currentElement = element
  while (currentElement) {
    if (
      currentElement.tagName &&
      currentElement.tagName.toLowerCase() === 'md-dialog'
    ) {
      return true
    }
    currentElement = currentElement.parentNode
  }
  let currentWindow = window
  while (currentWindow !== window.top) {
    currentWindow = currentWindow.parent
    let parentDocument = currentWindow.document
    if (parentDocument.querySelector('md-dialog')) {
      return true
    }
  }

  return false
}
// относится к scaleImage - запускает код для увеличения картинки внутри блока interaktiv
function modalScale(targetEl, task) {
  let modal = document.createElement('div')
  modal.classList.add('modal_scaleInModal')
  let div = document.createElement('div')
  div.classList.add('screen_scaleInModal')
  if (targetEl.classList.contains('audio_background_plug')) return

  let img = document.createElement('img')

  if (targetEl.tagName === 'IMG') {
    img.src = targetEl.src
  } else {
    img.src = targetEl.style.backgroundImage.slice(5, -2)
  }
  img.style.maxWidth = '100%'
  img.style.maxHeight = '100%'

  div.append(img)
  modal.append(div)
  let close = document.createElement('div')
  close.classList.add(
    'icon_close_button',
    'close_icon_dark',
    'closeIcon_scaleInModal'
  )
  div.append(close)
  modal.addEventListener('pointerdown', e => {
    modal.remove()
    task.style.position = 'inherit'
  })
  task.style.position = 'relative'
  task.append(modal)
}
// относится к scaleImage - запускает код для увеличения картинки на полный экран
function standartScale(targetEl, task) {
  let modal = document.createElement('div')
  modal.classList.add('modalOverlay_scaleInStandart')
  window.addEventListener('wheel', preventScroll, { passive: false })

  let div = document.createElement('div')
  div.classList.add('screen_scaleinStandart')

  if (targetEl.classList.contains('audio_background_plug')) return

  let img = document.createElement('img')

  if (targetEl.tagName === 'IMG') {
    img.src = targetEl.src
  } else {
    img.src = targetEl.style.backgroundImage.slice(5, -2)
  }

  if (getFileExtensionFromString(img.src) === 'svg') {
    img.style.minWidth = '50vh'
    img.style.minHeight = '60vh'
  }

  img.style.maxWidth = '80vw'
  img.style.maxHeight = '90vh'

  div.append(img)
  modal.append(div)
  let close = document.createElement('div')
  close.classList.add(
    'icon_close_button',
    'close_icon_dark',
    'closeIcon_scaleInStandart'
  )
  div.append(close)
  modal.addEventListener('pointerdown', e => {
    modal.remove()
    window.removeEventListener('wheel', preventScroll)
  })
  task.append(modal)
}

// регулярка для поиска расширения файла из строки
export function getFileExtensionFromString(str) {
  return str.match(/\.([^.]+)$/)?.[1]
}

// увеличение картинки
export function scaleImage(targetEl) {
  let task =
    targetEl.closest('.trainerTaskWrapper').closest('.interaktiv') ||
    targetEl.closest('.trainerTaskWrapper')

  // если в модалке то исполняем код для открытия в окне interaktiv
  if (hasIframeInParents(targetEl)) {
    modalScale(targetEl, task)
  }
  // если не в модалке то исполняем код для открытия на полный экран
  else {
    standartScale(targetEl, task)
  }
}

// вывод и сброс результатов проверки в панели

// вспомогательная функция для рендера аудио-тега для оценочных звуков
// sound - путь к аудио-файлу
// box - блок, куда размещать аудио-файл
function createWinLoseSoundMarkup(sound, box) {
  const audioEl = document.createElement('audio')
  audioEl.classList.add('displayNoneAudio')
  audioEl.setAttribute('src', sound)
  box.append(audioEl)
  audioEl.play()
}

export function checkingAnswerPositive(controlsBox, infoBox, extraSets) {
  controlsBox.classList.add('chek_answer_rightChoice_color')
  infoBox.innerHTML =
    '<div class="answer_indicator">&#128516;&nbsp;&nbsp;Молодец!</div>'
  if (extraSets) {
    if (extraSets.checkSound?.winSound) {
      createWinLoseSoundMarkup(extraSets.checkSound.winSound, infoBox)
    }
  }
}

export function checkingAnswerNegative(controlsBox, infoBox, extraSets) {
  controlsBox.classList.add('chek_answer_wrongChoice_color')
  infoBox.innerHTML =
    '<div class="answer_indicator">&#128528;&nbsp;&nbsp;Попробуй&nbsp;еще!</div>'
  if (extraSets) {
    if (extraSets.checkSound?.loseSound) {
      createWinLoseSoundMarkup(extraSets.checkSound.loseSound, infoBox)
    }
  }
}

export function checkingAnswerReset(controlsBox, infoBox) {
  controlsBox.classList.remove('chek_answer_wrongChoice_color')
  controlsBox.classList.remove('chek_answer_rightChoice_color')

  infoBox.firstElementChild !== null &&
    infoBox.removeChild(infoBox.firstElementChild)
}

// управление индикацией проверенных элементов

export function removeActiveCardClass(card) {
  card.classList.remove('targetChoice_color')
  card.classList.remove('rightChoice_answered')
  card.classList.remove('wrongChoice_answered')
}

export function addCheckClass(card) {
  card.classList.add('targetChoice_color')
}

export function addRightChoiceClass(card) {
  card.classList.add('rightChoice_answered')
}

export function addWrongChoiceClass(card) {
  card.classList.add('wrongChoice_answered')
}

// управление звуком
// пример объекта
/*
const soundDataAttribute =  "drop-data";
let soundSetStates = {
currentAudio: null,
currentAudioIcon: null,
isPlaying: false
};
*/
export function onSoundIconClick(e, soundSet, allAudioFiles, audioAttribute) {
  if (soundSet.currentAudio && soundSet.currentAudioIcon !== e.target) {
    soundSet.currentAudio.pause()
    soundSet.currentAudio.currentTime = 0
    soundSet.isPlaying = false
    soundSet.currentAudioIcon.classList.remove('buttonPlayPause--active')
  }

  e.stopPropagation()
  const audio = [...allAudioFiles].find(
    el => el.id === e.target.getAttribute(audioAttribute)
  )

  soundSet.currentAudioIcon = e.target
  soundSet.currentAudio = audio
  soundSet.isPlaying ? audio.pause() : audio.play()
  if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
    e.target.classList.toggle('buttonPlayPause--active')
  }
  audio.onplaying = function () {
    soundSet.isPlaying = true
  }
  audio.onpause = function () {
    soundSet.isPlaying = false
  }
  audio.onended = function () {
    e.target.classList.remove('buttonPlayPause--active')
    soundSet.isPlaying = false
    soundSet.currentAudio = null
    soundSet.currentAudioIcon = null
  }
}

export function resetSound(soundSet) {
  if (soundSet.currentAudio && soundSet.currentAudioIcon) {
    soundSet.currentAudio.pause()
    soundSet.currentAudio.currentTime = 0
    soundSet.isPlaying = false
    soundSet.currentAudioIcon.classList.remove('buttonPlayPause--active')
  }
}
// рандомайзер объектов
export function getRandomPositionToCard(card) {
  let randomPos = Math.floor(Math.random() * 12)
  card.style.order = randomPos
}
export function shuffleCards(array) {
  const length = array.length
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i)
    const currentIndex = i - 1
    const temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}

// кнопки слайдера
/*
let sliderSetStates = {
sliderItemWidth: null,
sliderSize: null,
sliderWrapperSize: null,
sliderShift: 0
}


onBtnLeftClick(
  sliderSetStates, - данные для управления слайдером
  dragBox, - стартовый контейнер с перетаскиваемыми элементами
  leftBtn, - кнопка влево, которую скрыть
  rightBtn); - кнопка вправо, которую скрыть

onBtnRightClick(sliderSetStates, dragBox, leftBtn, rightBtn);
*/

export function getBlocksSizes(sliderSet, dragContainer) {
  sliderSet.sliderSize = dragContainer.scrollWidth
  sliderSet.sliderItemWidth = dragContainer.children[0].clientWidth
}
export function getVerticalBlocksSizes(sliderSet, dragContainer) {
  sliderSet.sliderSize = dragContainer.scrollHeight
  sliderSet.sliderItemHeight = dragContainer.children[0].clientHeight
}

export function sliderResetState(sliderSet, elem, position) {
  if (position === 'horisontal') {
    sliderSet.sliderShift = 0
    elem.style.left = `${sliderSet.sliderShift}px`
  } else if (position === 'vertical') {
    sliderSet.sliderShift = 0
    elem.style.top = `${sliderSet.sliderShift}px`
  }
}

export function onBtnLeftClick(
  sliderSet,
  dragContainer,
  leftButton,
  rightButton
) {
  getBlocksSizes(sliderSet, dragContainer)

  if (sliderSet.sliderShift < 0) {
    sliderSet.sliderShift += sliderSet.sliderItemWidth
    dragContainer.style.left = `${sliderSet.sliderShift}px`
  }
  showArrows(sliderSet, leftButton, rightButton)
}

export function onBtnTopClick(
  sliderSet,
  dragContainer,
  leftButton,
  rightButton
) {
  getVerticalBlocksSizes(sliderSet, dragContainer)

  if (sliderSet.sliderShift < 0) {
    sliderSet.sliderShift += sliderSet.sliderItemHeight
    dragContainer.style.top = `${sliderSet.sliderShift}px`
  }
  showArrows(sliderSet, leftButton, rightButton)
}

export function onBtnRightClick(
  sliderSet, //  - данные для управления слайдером
  dragContainer, // - стартовый контейнер с перетаскиваемыми элементами
  leftButton, // - кнопка влево, которую скрыть
  rightButton
) {
  // -кнопка вправо, которую скрыть

  getBlocksSizes(sliderSet, dragContainer)

  if (
    sliderSet.sliderShift >
    -sliderSet.sliderSize + sliderSet.sliderWrapperSize
  ) {
    sliderSet.sliderShift -= sliderSet.sliderItemWidth
    dragContainer.style.left = `${sliderSet.sliderShift}px`
  }
  showArrows(sliderSet, leftButton, rightButton)
}
export function onBtnBottomClick(
  sliderSet, //  - данные для управления слайдером
  dragContainer, // - стартовый контейнер с перетаскиваемыми элементами
  leftButton, // - кнопка влево, которую скрыть
  rightButton
) {
  // -кнопка вправо, которую скрыть

  getVerticalBlocksSizes(sliderSet, dragContainer)

  if (
    sliderSet.sliderShift >
    -sliderSet.sliderSize + sliderSet.sliderWrapperSize
  ) {
    sliderSet.sliderShift -= sliderSet.sliderItemHeight
    dragContainer.style.top = `${sliderSet.sliderShift}px`
  }
  showArrows(sliderSet, leftButton, rightButton)
}

export function showArrows(sliderSet, leftButton, rightButton) {
  if (sliderSet.sliderShift === 0) {
    leftButton.classList.add('noDisplayElement')
  } else leftButton.classList.remove('noDisplayElement')

  if (
    sliderSet.sliderShift <=
    -sliderSet.sliderSize + sliderSet.sliderWrapperSize
  ) {
    rightButton.classList.add('noDisplayElement')
  } else rightButton.classList.remove('noDisplayElement')
}

// кнопки слайдшоу
// пример объекта
/*
const slideshowParameters = {
  currentShowImg: slideBoxImages[0], // первый слайд
  counter: 1, // начальный счетчик
};
*/
export function changeSlideMoveLeft(
  slideshowParameters, // данные для слайда
  numberOfSlide, //блок, куда пишется цифра
  arrayOfSlides, // массив слайдов
  leftBtn, // кнопка влево, которую скрыть
  rightBtn // кнопка вправо, которую скрыть
) {
  if (slideshowParameters.counter > 1) {
    slideshowParameters.counter -= 1
    slideshowParameters.currentShowImg.classList.add('visually-hidden')

    slideshowParameters.currentShowImg =
      arrayOfSlides[slideshowParameters.counter - 1]

    slideshowParameters.currentShowImg.classList.remove('visually-hidden')
    numberOfSlide.textContent = slideshowParameters.counter
    rightBtn.classList.remove('noDisplayElement')
  }

  if (slideshowParameters.counter === 1) {
    leftBtn.classList.add('noDisplayElement')
  }
}

export function changeSlideMoveRight(
  slideshowParameters, // данные для слайда
  numberOfSlide, //блок, куда пишется цифра
  arrayOfSlides, // массив слайдов
  leftBtn, // кнопка влево, которую скрыть
  rightBtn // кнопка вправо, которую скрыть
) {
  if (slideshowParameters.counter < arrayOfSlides.length) {
    slideshowParameters.counter += 1

    leftBtn.classList.remove('noDisplayElement')

    slideshowParameters.currentShowImg.classList.add('visually-hidden')

    slideshowParameters.currentShowImg =
      arrayOfSlides[slideshowParameters.counter - 1]

    slideshowParameters.currentShowImg.classList.remove('visually-hidden')

    numberOfSlide.textContent = slideshowParameters.counter
  }

  if (slideshowParameters.counter === arrayOfSlides.length) {
    rightBtn.classList.add('noDisplayElement')
  }
}

// сброс стилей и append
export function changeStyles(draggingElem) {
  draggingElem.style.position = 'relative'
  draggingElem.style.zIndex = null
  draggingElem.style.top = null
  draggingElem.style.left = null
}

export function dragAppend(dropPlace, draggingElem, findIdx) {
  const referenceElement = [...dropPlace.children][findIdx]
  dropPlace.insertBefore(draggingElem, referenceElement)
  changeStyles(draggingElem)
}

export function dropAppend(dropPlace, draggingElem) {
  dropPlace.appendChild(draggingElem)
  changeStyles(draggingElem)
}

// полная исчезалка (для тренажёров без проверки)
export function toggleDisplayVisibilityElement(elem) {
  elem.classList.toggle('noDisplayElement')
}

// глушилка без опасити (для панели после нажатия проверки)
export function togglePointerEventElement(elem) {
  elem.classList.toggle('noEventElement')
}

// глушилка с опасити (для индикации неактивности элемента)
/* НА ПРИМЕРЕ КНОПКИ -ПРОВЕРИТЬ-:

вводим переменную
let isGameStart = false;
----------------------------------------
при запуске сборщика - запускаем для сокрытия
toggleOpacityAndEventsElement(btnTest);
----------------------------------------
в функцию сброс:
  ....function onBtnResetClick(e) {
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
    .....

в условие запускающееся по взаимодействии с игровыми элементами (игнорируя плеер и scaleImage):
   ....
  if (!isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }
  .......
*/
export function toggleOpacityAndEventsElement(elem) {
  elem.classList.toggle('noEventAddOpacity')
}

// функция для скрытия/отображения целого блока
export function toggleVisuallyHiddenClass(elem) {
  elem.classList.toggle('visually-hidden')
}

// ФУНКЦИИ ДЛЯ РЕНДЕРА ПАНЕЛИ ПРОВЕРКИ

// функция для рендера панели проверки

// renderCheckPanel(taskWrapper, true); // вызов в тренажере

export function renderCheckPanel(wrapper, isCheckBtnActive) {
  // isCheckBtnActive : true - если кнопка  "Проверить" нужна в тренажере,
  // false -если нет
  const isActive = isCheckBtnActive ? '' : 'noDisplayElement'
  const markup = `
     <div class="show-answer-controls checkTask">
            <div type="button" class="resetButton taskBtn">
              СБРОС
              <div class="reloadIconTask">&#8635;</div>
            </div>
            <div class="show-answer-info chek_answer"></div>
            <div type="button" class="checkButton taskBtn ${isActive}">
              <div class="checkIconTask">&#10004;</div>
              ПРОВЕРИТЬ
            </div>
          </div>
    `
  return wrapper.insertAdjacentHTML('beforeend', markup)
}

// функция для получения ссылок на элементы панели проверки

// const { btnReset, btnTest, controlsBox, infoBox } =
//   getCheckPanelElements(taskWrapper); получение ссылок в тренажере (имена переменных в объекте должны быть такими/не изменять)

export function getCheckPanelElements(wrapper) {
  const checkPanelControls = {
    btnReset: wrapper.querySelector('.resetButton'),
    btnTest: wrapper.querySelector('.checkButton'),
    controlsBox: wrapper.querySelector('.show-answer-controls'),
    infoBox: wrapper.querySelector('.show-answer-info'),
  }

  return checkPanelControls
}
//проверка на правильный порядок элементов до начала решения упражнения
//itemsClass - класс перетаскиваемых элементов(СТРОКА)
//data - исходный массив данных
//resetTask - функция для перерендера
//attribute - атрибут по которому сравнивается правильность последовательности(id или другой уникальный атрибут)(СТРОКА)
//key - ключ для сравнения с атрибутом(СТРОКА)
//функция вызывается после первого рендера таска, и во время taskReset
export function shuffleTracing(
  taskWrapper,
  itemsClass,
  data,
  resetTask,
  attribute,
  key
) {
  const tempArr = data.map(el => el.answerTag)

  if (tempArr.every(el => el === tempArr[0])) {
    return
  } else {
    let winVar = 0
    let cards = taskWrapper.querySelectorAll(`.${itemsClass}`)

    cards.forEach((item, index) => {
      if (item.getAttribute(`${attribute}`) === data[index][key].toString()) {
        winVar++
      }
    })
    if (winVar === data.length) {
      resetTask()
    }
  }
}

// ФУНКЦИЯ ДЛЯ ОТРИСОВКИ КАРАНДАШЕЙ ПО МАССИВУ ЦВЕТОВ
// pencils - массив цветов карандашей
// taskId -  id тренажера
// pencilClassName - css-класс для карандашей под конкретный тренажер
export function createPencilsMarkup(pencils, taskId, pencilClassName) {
  const pencils_ready = pencils
    .map(pencil => {
      return `
        <svg class="${pencilClassName}" version="1.1" id="pencils" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 33.8 113.2" style="enable-background:new 0 0 33.8 113.2;" xml:space="preserve"  alt="${pencil}"  data-color="${pencil}">
     <path id="_x31_0_6_${taskId}" style="fill:#F4DC8F;" d="M0,26.6L14.4,1.2c0.9-1.6,3.1-1.6,4,0l15.3,27v81.3H0.1L0,26.6L0,26.6z"/>
     <path id="_x30_9_6_${taskId}" style="fill:#E5C67A;" d="M15.3,8.3l-0.9,26.2H0v-7.8L14.4,1.3c0.2-0.4,0.5-0.7,0.9-0.9C15.3,0.4,15.3,8.3,15.3,8.3z"/>
     <path id="_x30_8_6_${taskId}" style="fill:${pencil}" d="M16.2,8.3c-4.8,0-5.6-0.6-5.6-0.6l3.7-6.5c0.9-1.6,3.2-1.6,4.1,0l3.4,6
       C21.8,7.2,21.1,8.3,16.2,8.3z"/>
     <path id="_x30_7_6_${taskId}" style="filter: brightness(77%); fill:${pencil};" d="M15.3,8.3c-3.9-0.1-4.6-0.6-4.6-0.6l3.7-6.5c0.2-0.4,0.6-0.7,1-0.9v8H15.3z"/>
     <path id="_x30_6_6_${taskId}" style="filter: brightness(77%); fill:${pencil};" d="M16.8,113.1l-12.6-1V30.4c0,0,3.8-1.6,6.3-1.6s6.3,1.6,6.3,1.6V113.1z"/>
     <path id="_x30_5_6_${taskId}" style="filter: brightness(67%); fill:${pencil};" d="M2.8,111.9c0,0-0.8-0.2-1.4-0.4c-0.6-0.2-1.4-0.7-1.4-0.7V26.6c0,0,1.1,0.4,1.8,1.4s1,2.4,1,2.4
       V111.9L2.8,111.9z"/>
     <path id="_x30_4_6_${taskId}" style="fill:${pencil};  filter: brightness(82%);" d="M4.2,112.1l-1.5-0.2V30.4h1.5V112.1z"/>
     <path id="_x30_3_6_${taskId}" style="fill:${pencil}" d="M33.7,28.2v54.1v9.2v18.3c0,0-3.4,2.1-7.6,2.8c-4.5,0.7-7.6,0.6-7.6,0.6V91.4v-9.2v-51
       c0,0,4.4-1.8,8.2-2.6C30.8,27.6,33.7,28.2,33.7,28.2z"/>
     <path id="_x30_2_6_${taskId}" style="fill:${pencil};  filter: brightness(120%);" d="M18.5,113.1h-1.6V30.4l1.6,0.7V113.1z"/>
     <path id="_x30_1_6_${taskId}" style="fill:#e5e2d8;" d="M33.7,94c0,0-7.6,0.8-17.2,0.8C7.9,94.8,0,94,0,94v-2.8c0,0,9.3,0.5,15.8,0.5s17.9-0.5,17.9-0.5
       V94z"/>
     </svg>
        `
    })
    .join('')
  return `
      ${pencils_ready}
      <svg class="${pencilClassName}" version="1.1" id="pencils" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 33.8 113.2" style="enable-background:new 0 0 33.8 113.2;" xml:space="preserve"  data-color="#FFF">
   <style type="text/css">
     .st0_erasier_${taskId}{fill:#DBD7BD;}
     .st1_erasier_${taskId}{fill:#EDEBDD;}
     .st2_erasier_${taskId}{fill:#F6F5EE;}
     .st3_erasier_${taskId}{fill:#00B4EC;}
     .st4_erasier_${taskId}{fill:#89D2F6;}
     .st5_erasier_${taskId}{fill:#71CBF4;}
     .st6_erasier_${taskId}{fill:#C6C6C6;}
     .st7_erasier_${taskId}{fill:#ACACAC;}
     .st8_erasier_${taskId}{opacity:0.3;fill:#FFFFFF;enable-background:new    ;}
   </style>
     <path id="eraser3_${taskId}" class="st0_erasier_${taskId}" d="M33,86v16.4c0,5.9-4.8,10.8-10.7,10.8H11.4c-5.8,0-10.7-4.8-10.7-10.8V86H33z"/>
     <path id="eraser2_${taskId}" class="st1_erasier_${taskId}" d="M28.2,86v15.7c0,5.7-4.1,10.3-9,10.3H9.8c-5,0-9-4.6-9-10.3V86H28.2z"/>
     <path id="eraser1_${taskId}" class="st2_erasier_${taskId}" d="M22.5,86v14.7c0,5.3-3.2,9.6-7.2,9.6H7.9c-4,0-7.2-4.3-7.2-9.6V86H22.5z"/>
     <path id="pencil3_${taskId}" class="st3_erasier_${taskId}" d="M33.8,76.2H22.5V0h11.3V76.2z"/>
     <path id="pencil2_${taskId}" class="st4_erasier_${taskId}" d="M11.3,76.2H0V0h11.3V76.2z"/>
     <path id="pencil1_${taskId}" class="st5_erasier_${taskId}" d="M22.5,76.2H11.3V0h11.3L22.5,76.2L22.5,76.2z"/>
     <path id="oundation1_${taskId}" class="st6_erasier_${taskId}" d="M33.8,90.8H0V76.1h33.8V90.8z"/>
     <path id="oundation2_${taskId}" class="st7_erasier_${taskId}" d="M33.8,86H0v-5.2h33.8V86z"/>
     <path id="light_${taskId}" class="st8_erasier_${taskId}" d="M8.3,91.4H3.7V0.2h4.7V91.4z"/>
   </svg>
      `
}

//ФУНКЦИЯ-КОНВЕРТЕР RGB-ЦВЕТА В HEX
export function rgbToHex(rgb) {
  const color =
    '#' +
    (
      (1 << 24) +
      +(rgb.match(/\d{1,3}/gi)[0] << 16) +
      +(rgb.match(/\d{1,3}/gi)[1] << 8) +
      +rgb.match(/\d{1,3}/gi)[2]
    )

      // (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) +
      // (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) +
      // Number(rgb.match(/\d{1,3}/gi)[2])
      .toString(16)
      .slice(1)
  return color
}

// ФУНКЦИЯ-РАНДОМИЗАТОР ЦВЕТОВ
export function rgbRandom() {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min
  const rgb = `rgb(${getRandomInt(100, 255)},${getRandomInt(
    80,
    255
  )},${getRandomInt(80, 255)})`
  return rgb
}

// ФУНКЦИЯ-РЕНДЕР ДЛЯ СЛАЙДЕРА (КНОПКИ + БЛОК ДЛЯ ЭЛЕМЕНТОВ)
// применение в скрипте
// const { leftBtn, rightBtn, sliderBox } = renderSliderWithButtonsMarkup(wrapper,"sliderClass");

// wrapper - блок, куда в разметке вставляется слайдер (блок для драг элементов)
// sliderClass -  css-класс для внешнего блока слайдера, применимый именно для этого тренажера, если нужны доп стили, если класса нет, передать ""

export function renderSliderWithButtonsMarkup(wrapper, sliderClass) {
  const leftBtnMarkup = ` <div class="scrollBar_button arrowButton_left_event">
              <div class="scrollBar_arrow scrollBar_arrow_left"></div>
            </div>`

  const rightBtnMarkUp = ` <div class="scrollBar_button arrowButton_right_event">
          <div class="scrollBar_arrow scrollBar_arrow_right"></div>
        </div>`

  const sliderMarkup = `<div class="commonSlider_sliderContent ${sliderClass}">
              <div class="commonSlider_slider_box"></div>
            </div>`

  const sliderFullMarkup = `
                        ${leftBtnMarkup}
                        ${sliderMarkup}
                        ${rightBtnMarkUp}
                      `
  wrapper.insertAdjacentHTML('beforeend', sliderFullMarkup)

  const leftBtn = wrapper.querySelector('.arrowButton_left_event')
  const rightBtn = wrapper.querySelector('.arrowButton_right_event')
  const sliderBox = wrapper.querySelector(`.commonSlider_slider_box`)

  return { leftBtn, rightBtn, sliderBox }
}

// для вертикального слайдера
export function renderVerticalSliderWithButtonsMarkup(wrapper, sliderClass) {
  const leftBtnMarkup = ` <div class="scrollBar_button arrowButton_left_event vertical_button">
              <div class="scrollBar_arrow scrollBar_arrow_left"></div>
            </div>`

  const rightBtnMarkUp = ` <div class="scrollBar_button arrowButton_right_event vertical_button">
          <div class="scrollBar_arrow scrollBar_arrow_right"></div>
        </div>`

  const sliderMarkup = `<div class="verticalSlider_sliderContent ${sliderClass}">
              <div class="verticalSlider_slider_box"></div>
            </div>`

  const sliderFullMarkup = `
                        ${leftBtnMarkup}
                        ${sliderMarkup}
                        ${rightBtnMarkUp}
                      `
  wrapper.insertAdjacentHTML('beforeend', sliderFullMarkup)

  const topBtn = wrapper.querySelector('.arrowButton_left_event')
  const bottomBtn = wrapper.querySelector('.arrowButton_right_event')
  const sliderBox = wrapper.querySelector(`.verticalSlider_slider_box`)

  return { topBtn, bottomBtn, sliderBox }
}
// ФУНКЦИЯ ДЛЯ СОЗДАНИЯ БАЗОВОЙ РАЗМЕТКИ (КАРКАСА ШАБЛОНА)
// taskWrapper - общий контейнер шаблона trainerTaskWrapper
// callback - функция по созданию базовой разметки шаблона, добавляется сразу после получения данных о контейнере
// пример  callback
// function createBaseMarkup() {
//   return `
//  <div class="superSlider_comparePicturesWrapper">
//           <div class="superSlider_dropPlaceWrapper"></div>
//           <div class="superSlider_dragPlaceWrapper"></div>
//         </div>
//     `
// }

// пример использования
// createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

export function createTemplateBaseMarkup(taskWrapper, callback) {
  if (taskWrapper.children.length === 0) {
    taskWrapper.insertAdjacentHTML('beforeend', callback())
  }
}

export function hexToRGB(hex) {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) h = [...h].map(x => x + x).join('')
  else if (h.length === 8) alpha = true
  h = parseInt(h, 16)
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  )
}

export function displayNoneToggle(element) {
  element.classList.toggle('displayNoneElement')
}

export function findKeyValueInExtraSets(object, key) {
  // проверка на отсутствие входящего объекта
  if (!object) return undefined
  if (key in object) {
    //возвращаем значение
    return object[key]
  }
  for (const prop in object) {
    if (typeof object[prop] === 'object') {
      const result = findKeyValueInExtraSets(object[prop], key)
      if (result !== undefined) {
        return result
      }
    }
  }
  return undefined
}

// ОБЩИЕ ФУНКЦИИ ПО РАБОТЕ С КАСТОМНЫМИ СЕЛЕКТАМИ

// функция по созданию разметки кастомного селекта
// cssClass - класс, по которыму собираются селекты со страницы и для стилизации
// options - массив опций селекта
export function createCustomSelectMarkup(cssClass, options) {
  const selectsMarkup = options
    .map((option, index) => {
      const selectedOption = index === 0 ? 'customSelect_selected' : ''

      return `
              <li class="customSelect_option ${selectedOption}" role="option" aria-selected="false" tabindex="-1" data-value="${index}">${option}</li>

            `
    })
    .join('')

  return `
<div class="customSelect_custom-select ${cssClass}" tabindex="0" aria-haspopup="listbox" aria-expanded="false">
  <div class="customSelect_selected-option" role="button" aria-haspopup="listbox">
    ${options[0]}
  </div>
  <ul class="customSelect_options-list" role="listbox" aria-hidden="true">

  ${selectsMarkup}
  </ul>
</div>

  `
}

// функция по обработке клика мыши
export function onSelectClickByMouse(event, allSelects) {
  // проходимся по всем селектам в тренажере
  allSelects.forEach(customSelect => {
    // получаем ноду, которая содержит список всех опций
    const optionsList = customSelect.querySelector('.customSelect_options-list')
    // получаем поле, где отображается выбранная опция
    const selectedOption = customSelect.querySelector(
      '.customSelect_selected-option'
    )
    // получаем массив опций
    const options = Array.from(
      customSelect.querySelectorAll('.customSelect_option')
    )

    // если в данном селекте содержится та нода, на которую мы нажали
    if (customSelect.contains(event.target)) {
      // если тренажером пользуются с мобильного устройства
      if (event.pointerType === 'touch') {
        const targetEl =
          event.target.closest('.customSelect_selected-option') ||
          event.target.closest('.customSelect_option')

        if (!targetEl) return
        let task =
          targetEl.closest('.trainerTaskWrapper').closest('.interaktiv') ||
          targetEl.closest('.trainerTaskWrapper')

        let modal = document.createElement('div')
        modal.style.position = 'absolute'
        modal.style.left = 0
        modal.style.top = 0
        modal.style.bottom = 0
        modal.style.right = 0
        modal.style.background = 'rgb(235 232 232 / 90%)'
        modal.style.zIndex = 100
        modal.style.display = 'flex'
        modal.style.justifyContent = 'center'
        modal.style.flexDirection = 'column'
        modal.style.alignItems = 'center'

        let div = document.createElement('div')
        div.style.position = 'absolute'
        // div.style.width = '50%'
        div.style.width = '80%'
        div.style.height = '80%'
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        // div.style.alignItems = 'center'
        div.style.textAlign = 'center'
        div.style.overflowY = 'scroll'
        div.classList.add('customSelect_mobileList')

        const selectList = targetEl.nextElementSibling
        div.insertAdjacentHTML('beforeend', selectList.outerHTML)

        modal.append(div)

        const modalList = modal.querySelector('.customSelect_options-list')

        const modalOptions = Array.from(
          modalList.querySelectorAll('.customSelect_option')
        )

        // открываем список опций, фокусируемся на нем
        modalList.setAttribute('aria-hidden', 'false')

        modalOptions.forEach(option => {
          if (
            option.classList.contains('customSelect_selected') &&
            option.dataset.value !== selectedOption.dataset.value
          ) {
            option.classList.remove('customSelect_selected')
          } else if (
            !option.classList.contains('customSelect_selected') &&
            option.dataset.value === selectedOption.dataset.value
          ) {
            option.classList.add('customSelect_selected')
          } else if (selectedOption.dataset.value === undefined) {
            modalOptions[0].classList.add('customSelect_selected')
          }
        })

        modal.addEventListener('pointerdown', e => {
          const targetSelect = e.target.closest('.customSelect_option')
          // если такой элемент есть
          if (targetSelect) {
            // если у поля выбора уже есть данные о ранее выбранной опции
            if (selectedOption.dataset.value) {
              // убираем у старой опции обозначения выбранной
              modalOptions[selectedOption.dataset.value].classList.remove(
                'customSelect_selected'
              )
              modalOptions[selectedOption.dataset.value].setAttribute(
                'aria-selected',
                false
              )
            }
            // записываем в окончательное поле выбора свой новый выбор
            selectedOption.innerHTML = targetSelect.innerHTML
            selectedOption.setAttribute(
              'data-value',
              targetSelect.dataset.value
            )
            // отмечаем выбранную опцию выделением
            modalOptions[selectedOption.dataset.value].classList.add(
              'customSelect_selected'
            )
            modalOptions[selectedOption.dataset.value].setAttribute(
              'aria-selected',
              true
            )
          }
          modal.remove()
          task.style.position = 'inherit'
        })
        task.style.position = 'relative'
        task.append(modal)
      } else {
        // Toggle dropdown (меняем отображение чтобы указать, развернут ли элемент управления или свернут, а также отображаются или скрыты контролируемые элементы. )
        customSelect.setAttribute(
          'aria-expanded',
          customSelect.getAttribute('aria-expanded') === 'true'
            ? 'false'
            : 'true'
        )

        // если селект отображается
        if (customSelect.getAttribute('aria-expanded') === 'true') {
          // открываем список опций, фокусируемся на нем
          optionsList.setAttribute('aria-hidden', 'false')
          optionsList.focus()
        } else {
          // закрываем список опций
          optionsList.setAttribute('aria-hidden', 'true')
          // фокусируемся на поле, в котором отображается выбор
          selectedOption.focus()
          // получаем целевой элемент (исключая вложенные теги)
          const targetSelect = event.target.closest('.customSelect_option')
          // если такой элемент есть
          if (targetSelect) {
            // убираем у начальной опции обозначение выбранной
            options[0].classList.remove('customSelect_selected')
            // если у поля выбора уже есть данные о ранее выбранной опции
            if (selectedOption.dataset.value) {
              // убираем у старой опции обозначения выбранной
              options[selectedOption.dataset.value].classList.remove(
                'customSelect_selected'
              )
              options[selectedOption.dataset.value].setAttribute(
                'aria-selected',
                false
              )
            }
            // записываем в окончательное поле выбора свой новый выбор
            selectedOption.innerHTML = targetSelect.innerHTML
            selectedOption.setAttribute(
              'data-value',
              targetSelect.dataset.value
            )
            // отмечаем выбранную опцию выделением
            options[selectedOption.dataset.value].classList.add(
              'customSelect_selected'
            )
            options[selectedOption.dataset.value].setAttribute(
              'aria-selected',
              true
            )
          } else {
            return
          }
        }
      }
    } else {
      // Close dropdown if clicked outside
      customSelect.setAttribute('aria-expanded', 'false')
      optionsList.setAttribute('aria-hidden', 'true')
    }

    // добавляем слушатель на клик вне области тренажера и селекта, чтобы лист с опциями закрывался
    document.addEventListener('pointerdown', clickingOutsideSelects)

    function clickingOutsideSelects(e) {
      if (!e.target.closest('.customSelect_custom-select')) {
        customSelect.setAttribute('aria-expanded', 'false')
        optionsList.setAttribute('aria-hidden', 'true')
        document.removeEventListener('pointerdown', clickingOutsideSelects)
      }
    }
  })
}

// функция для обработки нажатия по клавиатуре
export function onSelectClickByKeyboard(event, allSelects) {
  // проходимся по всем селектам в тренажере
  allSelects.forEach(customSelect => {
    // получаем ноду, которая содержит список всех опций
    const optionsList = customSelect.querySelector('.customSelect_options-list')
    // получаем поле, где отображается выбранная опция
    const selectedOption = customSelect.querySelector(
      '.customSelect_selected-option'
    )
    // получаем массив опций
    const options = Array.from(
      customSelect.querySelectorAll('.customSelect_option')
    )

    // переменная, куда будем записывать индекс выбранной опции
    let index

    // если в данном селекте содержится та нода, на которую мы нажали
    if (customSelect.contains(event.target)) {
      // если массив опций содержит ту ноду, на которой сейчас находится фокус
      if (options.includes(document.activeElement)) {
        // в переменную записываем индекс данной ноды
        index = options.indexOf(document.activeElement)
      } else {
        // или в переменную записываем индекс ноды, найденный по классу selected(выбранный)
        index = options.findIndex(el =>
          el.classList.contains('customSelect_selected')
        )
      }
      // обработка нажатия стрелочки вниз
      if (event.code === 'ArrowDown') {
        // Open dropdown
        customSelect.setAttribute('aria-expanded', 'true')
        optionsList.setAttribute('aria-hidden', 'false')

        // Move to the next option
        if (index < options.length - 1) {
          options[index].classList.remove('customSelect_selected')
          options[index + 1].classList.add('customSelect_selected')
          options[index + 1].focus()
        }
        event.preventDefault()
        // обработка нажатия стрелочки вверх
      } else if (event.code === 'ArrowUp') {
        // Open dropdown
        customSelect.setAttribute('aria-expanded', 'true')
        optionsList.setAttribute('aria-hidden', 'false')

        // Move to the previous option
        if (index > 0) {
          options[index].classList.remove('customSelect_selected')
          options[index - 1].classList.add('customSelect_selected')
          options[index - 1].focus()
        }
        event.preventDefault()
        //  обработка нажатия Escape
      } else if (event.code === 'Escape') {
        // Close dropdown and focus selected option
        customSelect.setAttribute('aria-expanded', 'false')
        optionsList.setAttribute('aria-hidden', 'true')
        selectedOption.focus()
        event.preventDefault()
        // обработка нажатия клавиш выбора
      } else if (event.code === 'Enter' || event.code === 'Space') {
        // Toggle dropdown and select option
        if (customSelect.getAttribute('aria-expanded') === 'true') {
          if (index >= 0) {
            options.forEach((el, idx) => {
              if (idx === index) {
                el.click()
                el.setAttribute('aria-selected', true)
                // Update selected option
                selectedOption.innerHTML = el.innerHTML
                selectedOption.setAttribute('data-value', el.dataset.value)
              } else {
                el.setAttribute('aria-selected', false)
              }
            })

            // после выбора опции закрыть список опций
            optionsList.setAttribute('aria-hidden', 'true')
            customSelect.setAttribute('aria-expanded', 'false')
            selectedOption.parentElement.focus()
          }
        } else {
          customSelect.setAttribute('aria-expanded', 'true')
          optionsList.setAttribute('aria-hidden', 'false')

          if (
            !options.some(
              el =>
                el.classList.contains('customSelect_selected') &&
                el !== options[0]
            )
          ) {
            options[0].focus()
          }

          event.preventDefault()
        }
      }
      //  обработка клавиши Tab
    } else if (event.code === 'Tab') {
      // Close dropdown when focus moves outside

      customSelect.setAttribute('aria-expanded', 'false')
      optionsList.setAttribute('aria-hidden', 'true')
    }
  })
}

// функция для рендера заблюренного контейнера для старта тренажера
// taskWrapper - контейнер для всего тренажера
// btnText - текст для кнопки старта тренажера
// parentBox - внутри какого блока будет располагаться блюр экран
export function createBlurSplashScreenMarkup(taskWrapper, btnText, parentBox) {
  const blurElement = `<div class="blur_splash_screen">
        <div class="blur_splash_screen_startBtn">${btnText}</div>

    </div>
    `
  parentBox.classList.add('blur_splash_screen_parentElementPosition')
  parentBox.insertAdjacentHTML('beforeend', blurElement)

  // необходим для работы с кнопкой
  const startGameBtn = taskWrapper.querySelector('.blur_splash_screen_startBtn')
  // необходим для работы с отображением/скрытием блюра
  const blurElementBox = taskWrapper.querySelector('.blur_splash_screen')
  return { startGameBtn, blurElementBox }
}

// функция для проверки одинаковых ответов в разных столбцах таблицы

// dropCard - один хтмл-элемент из дроп поля, у которого указан аттрибут для сравнения (колонка)
// dragCard - один хтмл-элемент из драп поля, у которого указан аттрибут для сравнения
// dropAttr и dragAttr - теги для сравнения дроп и драг полей
export function getWinVarCellDnd(dropCard, dropAttr, dragAttr) {
  // для подсчета количества правильных элементов в одной колонке
  let winVar = 0
  // массив значений, записанных в качестве атрибута из поля answerTag
  const splitAttr = dropCard.attributes
    .getNamedItem(dropAttr)
    .value.split(',')
    .map(elem => elem.trim())

  // проверка на старый/новый вариант проверки (если указано больше одного значения в поле answerTag)
  const isSomeRightAnswers = splitAttr.length > 1

  // создаем временный массив для хранения
  let tmpArr = splitAttr

  // проходимся по всем элементам (драг) внутри отдельной колонки (дроп-поля)
  ;[...dropCard.children].forEach(el => {
    // если во временном массиве содержится данное значение answerTag драг-элемента
    if (tmpArr.includes(el.attributes.getNamedItem(dragAttr).value)) {
      winVar += 1
      addRightChoiceClass(el)

      // если новый вариант проверки, то находим индекс данного атрибута
      // во временном массиве и вырезаем его, чтобы он в дальнейшем не участвовал в проверке
      if (isSomeRightAnswers) {
        const idx = tmpArr.findIndex(
          elem => elem === el.attributes.getNamedItem(dragAttr).value
        )

        tmpArr = tmpArr.filter((_, index) => index !== idx)
      }
    } else {
      winVar -= 1
      addWrongChoiceClass(el)
    }
  })

  return winVar
}
