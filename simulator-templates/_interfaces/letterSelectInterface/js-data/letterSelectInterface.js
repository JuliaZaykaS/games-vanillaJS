
; (() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'task-1'

  // массив слов/предложений, где рядом с каждым цветом указывается порядковый номер буквы, которая должна быть им закрашена
  //    [
  //       { text: 'Предложение номер 1' }, - 1 строка
  //       {
  //         color: 'green', - цвет
  //         letters: [3, 8, 11, 16], - массив порядковых номеров символов для этого цвета
  //       },
  //     ],

  const answer = [
    [
      { text: 'Предложение номер 1' },
      {
        color: 'green',
        letters: [3, 8, 11, 16],
      },
      {
        color: '#FFFF00',
        letters: [6, 14],
      },
    ],
    [
      { text: 'Предложение номер 2' },
      {
        color: 'green',
        letters: [3, 8, 11, 16],
      },
      {
        color: '#FFFF00',
        letters: [6, 14],
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
  renderLetterSelect(taskId, pencils, answer, extraSets)
})()

function renderLetterSelect(taskId, pencils, answer, extraSets) {
  const taskWrapper = document.getElementById(`${taskId}`)
  const textarea = document.querySelector('.text')
  textarea.innerText = ''
  const answer1 = document.querySelector('.answer')
  const array = document.querySelector('.array')
  const generate = document.querySelector('.generate')
  const create = document.querySelector('.create')
  const clear = document.querySelector('.clear')
  let text = ''

  taskWrapper.addEventListener('click', (e) => {
    if (e.target.closest('.letterblock')) {
      e.target.closest('.letterblock').classList.toggle('selected')
    }
  })
  generate.addEventListener('click', () => {
    text = textarea.value
    answer1.innerHTML = ''
    text.split('').forEach((item, index) => {
      let letterBlock = document.createElement('div')
      letterBlock.classList.add('letterblock')
      let number = document.createElement('div')
      let letter = document.createElement('div')
      number.innerText = index + 1
      letter.innerText = item
      letterBlock.append(number, letter)
      answer1.append(letterBlock)
    })
  })
  create.addEventListener('click', () => {
    let selected = document.querySelectorAll('.selected')
    let arr = []
    selected.forEach(item => {
      arr.push(item.firstChild.innerText)
    })

    array.innerText = `[${arr}]`
  })

  /*  textarea.addEventListener('change', () => {
     
    })*/
  clear.addEventListener('click', () => {
    let selected = document.querySelectorAll('.selected')
    selected.forEach(item => {
      item.classList.remove('selected')
    })
    array.innerText = ``
  })

}
