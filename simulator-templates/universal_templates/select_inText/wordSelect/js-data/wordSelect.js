import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createPencilsMarkup,
  createTemplateBaseMarkup,
  hexToRGB,
  displayNoneToggle,
  findKeyValueInExtraSets,
} from '../../../../_common_files/common_files/common_scripts.js'
  ; (() => {
    // это уникальный id для данного задания, который был присвоен в html
    const taskId = 'task-1'

    // массив слов/предложений, где рядом с каждым цветом указывается порядковый номер слова, которое должно быть им закрашено
    //    [
    //       { text: 'Предложение номер 1' }, - 1 строка
    //       {
    //         color: 'green', - цвет
    //         letters: [3, 8, 11, 16], - массив порядковых номеров слов в данной строке для этого цвета
    //       },
    //     ],

    const answer = [
      [
        { text: 'Предложение. номер, 1?' },
        {
          color: 'green',
          letters: [3],
        },
        {
          color: '#FFFF00',
          letters: [1],
        },
      ],
      [
        { text: 'Предложение! номер: 2' },
        {
          color: 'green',
          letters: [3],
        },
        {
          color: '#FFFF00',
          letters: [1],
        },
      ],
    ]

    // массив карандашей для раскрашивания

    const pencils = ['green', '#FFFF00', 'blue']

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
    renderWordSelect(taskId, pencils, answer, extraSets)
  })()

function renderWordSelect(taskId, pencils, answer, extraSets) {
  const taskWrapper = document.getElementById(`${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const pencilsBox = taskWrapper.querySelector('.wordSelect_pencilbox')
  const wordSelect = taskWrapper.querySelector('.wordSelect')
  let isGameStart = false
  let currentColor = null
  let rightAnswer = 0

  answer.forEach(item => {
    let str = item[0].text.split(' ')
    let p = document.createElement('div')
    p.classList.add('wordSelect_p')
    str.forEach(item => {
      let word = item
      let dot = ''
      let span = document.createElement('span')
      span.classList.add('wordSelect_selected', 'wordSelect_span')
      //span.classList.add('wordSelect_span')
      span.style.background = 'white'

      if (item[item.length - 1].match(/[.,:?!]/)) {
        dot = item[item.length - 1]
        word = item.slice(0, item.length - 1)
      }
      span.insertAdjacentHTML('afterbegin', word)
      p.append(span)
      let space = document.createElement('span')
      space.classList.add('wordSelect_span')
      space.style.background = 'white'
      space.insertAdjacentHTML('afterbegin', `${dot} `)
      p.append(space)
    })
    wordSelect.append(p)

    for (let i = 1; i < item.length; i++) {
      rightAnswer += item[i].letters.length
    }
  })
  const paragraphs = taskWrapper.querySelectorAll('.wordSelect_p')

  pencilsBox.insertAdjacentHTML(
    'beforeend',
    createPencilsMarkup(pencils, taskId, 'wordSelect_pencil')
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

  wordSelect.addEventListener('click', onWordclick)
  btnReset.addEventListener('click', resetTask)
  btnTest.addEventListener('click', checkTask)
  pencilsBox.addEventListener('click', onPencilClick)

  function onPencilClick(e) {
    if (!e.target.parentElement.classList.contains('wordSelect_pencil')) return
      ;[...pencilsBox.children].forEach(pencil => {
        pencil.classList.remove('wordSelect_pencil_pencilActive')
      })
    e.target.parentElement.classList.add('wordSelect_pencil_pencilActive')
    currentColor =
      e.target.parentElement.attributes.getNamedItem('data-color').value
  }

  function onWordclick(e) {
    // открываем кнопку ПРОВЕРИТЬ
    if (currentColor) {
      if (e.target.classList.contains('wordSelect_selected')) {
        if (!isGameStart) {
          toggleOpacityAndEventsElement(btnTest)
          isGameStart = true
        }
        e.target.style.background = currentColor
      }
    }
  }

  function checkTask() {
    wordSelect.removeEventListener('click', onWordclick)

    btnTest.removeEventListener('click', checkTask)
    pencilsBox.removeEventListener('click', onPencilClick)
    let winvar = 0
    let lettercount = 0

    paragraphs.forEach((item, index) => {
      item.querySelectorAll('.wordSelect_selected').forEach((letter, ind) => {
        if (
          letter.style.background !== 'white' &&
          letter.style.background !== 'rgb(255, 255, 255)'
        ) {
          lettercount++
          for (let i = 1; i < answer[index].length; i++) {
            answer[index][i].letters.forEach(j => {
              let ans = answer[index][i].color
              if (ans[0] === '#') {
                ans = hexToRGB(ans)
              }
              if (letter.style.background === ans && ind + 1 === j) {
                winvar++
              }
            })
          }
        }
      })
    })

    if (winvar === rightAnswer && winvar === lettercount) {
      checkingAnswerPositive(controlsBox, infoBox, extraSets)
    } else {
      checkingAnswerNegative(controlsBox, infoBox, extraSets)
    }
  }

  function resetTask() {
    ;[...pencilsBox.children].forEach(pencil => {
      pencil.classList.remove('wordSelect_pencil_pencilActive')
    })

    const letters = taskWrapper.querySelectorAll('.wordSelect_selected')
    letters.forEach(item => {
      item.style.background = 'white'
    })

    checkingAnswerReset(controlsBox, infoBox)
    wordSelect.addEventListener('click', onWordclick)

    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest)
      isGameStart = false
    }

    currentColor = null

    btnTest.addEventListener('click', checkTask)
    pencilsBox.addEventListener('click', onPencilClick)
  }

  function createBaseMarkup() {
    return `
    <div class="wordSelect"></div>
        <div class="wordSelect_pencilbox"></div>
      `
  }
}
