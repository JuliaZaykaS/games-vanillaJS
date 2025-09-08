import {
  onBtnRightClick,
  onBtnLeftClick,
  getBlocksSizes,
  showArrows,
  scaleImage,
  dropAppend,
  dragAppend,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  queryPointsListener,
  renderSliderWithButtonsMarkup,
  createTemplateBaseMarkup,
  sliderResetState,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'dnd_scales_task-1'

  //массив входящих картинок для поля откуда картинки будут переноситься(любое количество)
  //в поле answerTag указывается число от 1 до бесконечности, которое указывает на "вес" предмета (1-самый легкий предмет). Если предметы одинакового веса, то указываются одинаковые числа
  // imgSrc - обязательно, путь к картинке

  const dragCards = [
    {
      id: 1,
      name: 'leaf',
      imgSrc: 'Images_1/DOH_3-4_7_1_13.png',
      answerTag: '1',
    },
    {
      id: 2,
      name: 'ball',
      imgSrc: 'Images_1/D.OBR_0_1_4_10.png',
      answerTag: '2',
    },
    {
      id: 3,
      name: 'doll',
      imgSrc: 'Images_1/DOH_3-4_25_1_16.png',
      answerTag: '3',
    },
    {
      id: 4,
      name: 'ball',
      imgSrc: 'Images_1/DOH_3-4_25_1_13.png',
      answerTag: '2',
    },
  ]

  // дополнительные параметры extraSets (будут дополняться)
  const extraSets = {}

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDndScales(dragCards, taskId, extraSets)
})()

//ФУНКЦИЯ

function renderDndScales(dragCards, taskId, extraSets) {
  let draggingItem
  let elemBelow
  let isGameStart = false

  const topDirection = 'top' // обозначение направления движения
  const bottomDirection = 'bottom' // обозначение направления движения

  const breakPoints = [1366, 1280] // медиа-диапазоны

  const taskWrapper = document.getElementById(`${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)
  function createBaseMarkup() {
    return `
     <div class="dnd_scales_comparePicturesWrapper">
      <div class="dnd_scales_dropPlaceWrapper"></div>
      <div class="dnd_scales_dragPlaceWrapper"></div>
     </div>
        `
  }

  const dragBoxWrapper = taskWrapper.querySelector(
    '.dnd_scales_dragPlaceWrapper'
  )
  const dropBox = taskWrapper.querySelector('.dnd_scales_dropPlaceWrapper')
  dropBox.insertAdjacentHTML('beforeend', renderScalesMarkup())

  const {
    leftBtn,
    rightBtn,
    sliderBox: dragBox,
  } = renderSliderWithButtonsMarkup(dragBoxWrapper, 'dnd_scales_sliderContent')
  dragBox.insertAdjacentHTML(
    'beforeend',
    createDragPictureCardsMarkup(shuffleCards([...dragCards]))
  )

  const leftSideElements = taskWrapper.querySelectorAll('.dnd_scales_leftSide')
  const rightSideElements = taskWrapper.querySelectorAll(
    '.dnd_scales_rightSide'
  )
  const crossbarEl = taskWrapper.querySelector('#crossbar')
  const dropPartsBowls = taskWrapper.querySelectorAll(
    '.dnd_scales_dropPlacePart'
  )
  const svgEl = taskWrapper.querySelector('.dnd_scales_svg')

  renderCheckPanel(taskWrapper, true)

  const { btnReset, btnTest } = getCheckPanelElements(taskWrapper)
  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  let sliderSet = {
    sliderItemWidth: 0,
    sliderSize: 0,
    sliderWrapperSize: dragBox.offsetParent.clientWidth,
    sliderShift: 0,
  }

  getBlocksSizes(sliderSet, dragBox)
  showArrows(sliderSet, leftBtn, rightBtn)

  changeSvgViewBoxParameters(
    queryPointsListener(breakPoints, changeSvgViewBoxParameters)
  )

  taskWrapper.addEventListener('pointerdown', mouseDown)
  btnReset.addEventListener('click', onBtnResetClick)
  btnTest.addEventListener('click', onBtnTestClick)
  leftBtn.addEventListener('click', LeftClick)
  rightBtn.addEventListener('click', RightClick)

  function changeSvgViewBoxParameters(rangeMedia) {
    switch (rangeMedia) {
      case '0-1280':
        svgEl.setAttribute('viewBox', '0 -290 1280 586')

        break
      case '1280-1366':
        svgEl.setAttribute('viewBox', '0 -280 1280 586')

        break
      case '1366-infinit':
        svgEl.setAttribute('viewBox', '0 -270 1280 586')

        break
    }
  }

  function LeftClick() {
    onBtnLeftClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function RightClick() {
    onBtnRightClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function onBtnResetClick() {
    ;[...dropPartsBowls].forEach(item => {
      ;[...item.children].forEach(el => {
        dragBox.appendChild(el)
      })
    })
    removeAllTransformClasses()
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
    if (
      +leftSideElements[0].firstElementChild.getAttribute('drag-data') >
      +rightSideElements[0].firstElementChild.getAttribute('drag-data')
    ) {
      crossbarEl.classList.remove('dnd_scales_animation_none')
      crossbarEl.classList.add('dnd_scales_animation_left')

      moveLeftSideElements(bottomDirection)
      moveRightSideElements(topDirection)
    } else if (
      +leftSideElements[0].firstElementChild.getAttribute('drag-data') <
      +rightSideElements[0].firstElementChild.getAttribute('drag-data')
    ) {
      crossbarEl.classList.remove('dnd_scales_animation_none')
      crossbarEl.classList.add('dnd_scales_animation_right')
      moveLeftSideElements(topDirection)
      moveRightSideElements(bottomDirection)
    } else if (
      +leftSideElements[0].firstElementChild.getAttribute('drag-data') ===
      +rightSideElements[0].firstElementChild.getAttribute('drag-data')
    ) {
      leftSideElements[0].classList.add('dnd_scales_leftPartAnim')
      leftSideElements[1].classList.add('dnd_scales_leftBowlAnim')
      leftSideElements[2].classList.add('dnd_scales_leftBowlAnim')
      rightSideElements[0].classList.add('dnd_scales_rightPartAnim')
      rightSideElements[1].classList.add('dnd_scales_rightBowlAnim')
      rightSideElements[2].classList.add('dnd_scales_rightBowlAnim')
      crossbarEl.classList.add('dnd_scales_crossbarAnim')
    }

    taskWrapper.removeEventListener('pointerdown', mouseDown)
    btnTest.removeEventListener('click', onBtnTestClick)
  }

  function mouseDown(event) {
    if (event.button !== 0) return

    if (event.target.classList.contains('dnd_scales_dragPicture')) {
      draggingItem = event.target.parentElement
    } else if (event.target.classList.contains('dnd_scales_dragPicture_box')) {
      draggingItem = event.target
    } else return

    const findIdx = [...dragBox.children].findIndex(el => el === draggingItem)

    draggingItem.style.cursor = 'grabbing'
    draggingItem.style.touchAction = 'none' //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)

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
      dragAppend(dragBox, draggingItem, findIdx)

      window.removeEventListener('pointerup', moveOut)
      document.removeEventListener('pointermove', onMouseMove)
      draggingItem.removeEventListener('pointerup', onpointerup)
    }
    draggingItem.addEventListener('pointerup', onpointerup)

    function onpointerup(event) {
      document.removeEventListener('pointermove', onMouseMove)
      draggingItem.style.cursor = 'grab'
      if (!clickWithoutMove) {
        if (elemBelow.classList.contains('dnd_scales_dropPlacePart')) {
          dropAppend(elemBelow, draggingItem)
          if (
            dropPartsBowls[0].children.length > 0 &&
            dropPartsBowls[1].children.length > 0
          ) {
            // открываем кнопку ПРОВЕРИТЬ
            if (!isGameStart) {
              toggleOpacityAndEventsElement(btnTest)
              isGameStart = true
            }
          }
        } else {
          dragAppend(dragBox, draggingItem, findIdx)
          if (
            dropPartsBowls[0].children.length === 0 ||
            dropPartsBowls[1].children.length === 0
          ) {
            // закрываем кнопку ПРОВЕРИТЬ
            if (isGameStart) {
              toggleOpacityAndEventsElement(btnTest)
              isGameStart = false
            }
          }
        }
        sliderSet.sliderSize = dragBox.scrollWidth
        showArrows(sliderSet, leftBtn, rightBtn)
      } else if (event.target.classList.contains('dnd_scales_dragPicture')) {
        scaleImage(event.target)
      }
      draggingItem.removeEventListener('pointerup', onpointerup)
      elemBelow = null
    }
  }

  function moveLeftSideElements(direction) {
    if (direction === bottomDirection) {
      leftSideElements.forEach((el, index) => {
        switch (index) {
          case 0:
            el.classList.add('dnd_scales_animation_dppL_bottom')
            el.classList.remove('dnd_scales_animation_dppL_top')
            break
          case 1:
            el.classList.add('dnd_scales_animation_leftB_bottom')
            el.classList.remove('dnd_scales_animation_leftB_top')
            break
          case 2:
            el.classList.add('dnd_scales_animation_leftB_bottom')
            el.classList.remove('dnd_scales_animation_leftB_top')
            break

          default:
            break
        }
      })
    } else if (direction === topDirection) {
      leftSideElements.forEach((el, index) => {
        switch (index) {
          case 0:
            el.classList.add('dnd_scales_animation_dppL_top')
            el.classList.remove('dnd_scales_animation_dppL_bottom')
            break
          case 1:
            el.classList.add('dnd_scales_animation_leftB_top')
            el.classList.remove('dnd_scales_animation_leftB_bottom')
            break
          case 2:
            el.classList.add('dnd_scales_animation_leftB_top')
            el.classList.remove('dnd_scales_animation_leftB_bottom')
            break

          default:
            break
        }
      })
    }
  }

  function moveRightSideElements(direction) {
    if (direction === bottomDirection) {
      rightSideElements.forEach((el, index) => {
        switch (index) {
          case 0:
            el.classList.add('dnd_scales_animation_dppR_bottom')
            el.classList.remove('dnd_scales_animation_dppR_top')
            break
          case 1:
            el.classList.add('dnd_scales_animation_rightB_bottom')
            el.classList.remove('dnd_scales_animation_rightB_top')
            break
          case 2:
            el.classList.add('dnd_scales_animation_rightB_bottom')
            el.classList.remove('dnd_scales_animation_rightB_top')
            break

          default:
            break
        }
      })
    } else if (direction === topDirection) {
      rightSideElements.forEach((el, index) => {
        switch (index) {
          case 0:
            el.classList.add('dnd_scales_animation_dppR_top')
            el.classList.remove('dnd_scales_animation_dppR_bottom')
            break
          case 1:
            el.classList.add('dnd_scales_animation_rightB_top')
            el.classList.remove('dnd_scales_animation_rightB_bottom')
            break
          case 2:
            el.classList.add('dnd_scales_animation_rightB_top')
            el.classList.remove('dnd_scales_animation_rightB_bottom')
            break
          default:
            break
        }
      })
    }
  }

  function removeAllTransformClasses() {
    crossbarEl.classList.remove(
      'dnd_scales_animation_right',
      'dnd_scales_animation_left',
      'dnd_scales_crossbarAnim'
    )

    crossbarEl.classList.add('dnd_scales_animation_none')
    leftSideElements.forEach((el, index) => {
      switch (index) {
        case 0:
          el.classList.remove(
            'dnd_scales_animation_dppL_bottom',
            'dnd_scales_animation_dppL_top',
            'dnd_scales_leftPartAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break
        case 1:
          el.classList.remove(
            'dnd_scales_animation_leftB_bottom',
            'dnd_scales_animation_leftB_top',
            'dnd_scales_leftBowlAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break
        case 2:
          el.classList.remove(
            'dnd_scales_animation_leftB_bottom',
            'dnd_scales_animation_leftB_top',
            'dnd_scales_leftBowlAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break

        default:
          break
      }
    })
    rightSideElements.forEach((el, index) => {
      switch (index) {
        case 0:
          el.classList.remove(
            'dnd_scales_animation_dppR_top',
            'dnd_scales_animation_dppR_bottom',
            'dnd_scales_rightPartAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break
        case 1:
          el.classList.remove(
            'dnd_scales_animation_rightB_top',
            'dnd_scales_animation_rightB_bottom',
            'dnd_scales_rightBowlAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break
        case 2:
          el.classList.remove(
            'dnd_scales_animation_rightB_top',
            'dnd_scales_animation_rightB_bottom',
            'dnd_scales_rightBowlAnim'
          )
          el.classList.add('dnd_scales_animation_none')

          break

        default:
          break
      }
    })
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map(picture => {
        const isImage =
          picture.imgSrc &&
          `<img
                   class="dnd_scales_dragPicture"
                   src="${picture.imgSrc}"
                   alt="${picture.name}"
                   draggable="false"
                   />`

        return `<div
                class="dnd_scales_dragPicture_box hoveredActiveElement"
                draggable="false"
                drag-data="${picture.answerTag}"
              >
               ${isImage}

              </div>`
      })
      .join('')
  }

  function renderScalesMarkup() {
    return `
        <div class="dnd_scales_bowlOfScales">
              <div class="dnd_scales_dropPlacePart dnd_scales_dropPlacePart_left dnd_scales_leftSide"></div>
              <div class="dnd_scales_dropPlacePart dnd_scales_dropPlacePart_right dnd_scales_rightSide"></div>
              <svg
                version="1.1"
                id="Слой_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                style="enable-background: new 0 0 1280 586"
                xml:space="preserve"
                class="dnd_scales_svg"
              >
                <style type="text/css">
                  .st0 {
                    fill: #0c394c;
                  }
                  .st1 {
                    fill: #ffffff;
                  }
                  .st2 {
                    fill: #fcba02;
                  }
                  .st3 {
                    fill: #fdac03;
                  }
                  .st4 {
                    fill: #fc9302;
                  }
                </style>

                <path
                  id="screw-right"
                  class="dnd_scales_rightSide"
                  d="M1107.2,145h-35.7V99h35.7V145z"
                />
                <path
                  id="screw-left"
                  class="dnd_scales_leftSide"
                  d="M208.6,145h-35.7V99h35.7V145z"
                />

                <g id="crossbar">
                  <path
                    id="correles"
                    class="st0"
                    d="M1091.4,167.6l-452.2,42.1L187,167.6c-12.8-1.2-22.6-12-22.6-24.8l0,0
    c0-13.8,11.2-24.9,24.9-24.9H1089c13.8,0,24.9,11.2,24.9,24.9l0,0C1114,155.6,1104.2,166.4,1091.4,167.6z"
                  />
                  <path
                    id="screw-left_00000070115585112968436500000011328507701246409356_"
                    class="st1"
                    d="M202.6,142.5c0,6.6-5.3,11.9-11.9,11.9
    s-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9S202.6,135.9,202.6,142.5z"
                  />
                  <path
                    id="screw-right_00000147178022644377502450000004321213763736786861_"
                    class="st1"
                    d="M1101.2,142.5c0,6.6-5.3,11.9-11.9,11.9
    s-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9C1095.9,130.6,1101.2,135.9,1101.2,142.5z"
                  />
                </g>

                <g id="bowl-left" class="dnd_scales_leftSide">
                  <path
                    class="st2"
                    d="M18,50.9V12.3h345.4v38.6c0,30.4-24.6,55-55,55H73C42.6,105.9,18,81.3,18,50.9z"
                  />
                  <path
                    class="st3"
                    d="M18,12.3h345.4v38.6c0,8.2-1.8,15.9-5,22.9L18,39.7V12.3z"
                  />
                  <path
                    class="st4"
                    d="M371.4,25.9H10c-3.6,0-6.5-2.9-6.5-6.5v-9.1c0-3.6,2.9-6.5,6.5-6.5h361.4c3.6,0,6.5,2.9,6.5,6.5v9.1
		C377.9,23,375,25.9,371.4,25.9z"
                  />
                </g>

                <g id="bowl-right" class="dnd_scales_rightSide">
                  <path
                    class="st2"
                    d="M916.6,50.9V12.3H1262v38.6c0,30.4-24.6,55-55,55H971.6C941.2,105.9,916.6,81.3,916.6,50.9z"
                  />
                  <path
                    class="st3"
                    d="M916.6,12.3H1262v38.6c0,8.2-1.8,15.9-5,22.9L916.6,39.7V12.3z"
                  />
                  <path
                    class="st4"
                    d="M1270,25.9H908.6c-3.6,0-6.5-2.9-6.5-6.5v-9.1c0-3.6,2.9-6.5,6.5-6.5H1270c3.6,0,6.5,2.9,6.5,6.5v9.1
		C1276.5,23,1273.6,25.9,1270,25.9z"
                  />
                </g>
              </svg>

      </div>

      <svg class="dnd_scales_scaleBase" version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	              viewBox="0 205 1280 380" style="enable-background:new 0 0 1280 586;" xml:space="preserve">
	              <style type="text/css">
	                .st0{fill:#0C394C;}
	                .st1{fill:#154C68;}
                </style>
	        <path id="platform_00000066487454475970054830000007121464794044131464_" class="st0" d="M793.2,535.2v30.2h-308v-30.2
	                c0-14.3,11.6-26,26-26h256.1C781.5,509.2,793.2,520.9,793.2,535.2z"/>
	        <path id="platform" class="st1" d="M542.2,509.2l83.1-288.9c4-13.9,23.6-13.9,27.6,0l83.1,288.9H542.2z M821.7,582.2H456.6
	                c-3,0-5.5-2.5-5.5-5.5V569c0-3,2.5-5.5,5.5-5.5h365.1c3,0,5.5,2.5,5.5,5.5v7.7C827.2,579.8,824.7,582.2,821.7,582.2z"/>
      </svg>
              `
  }
}
