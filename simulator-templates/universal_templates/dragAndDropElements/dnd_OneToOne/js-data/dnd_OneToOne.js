import {
  shuffleTracing,
  resetSound,
  onSoundIconClick,
  scaleImage,
  dropAppend,
  dragAppend,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  shuffleCards,
  addRightChoiceClass,
  addWrongChoiceClass,
  removeActiveCardClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  createTemplateBaseMarkup,
  displayNoneToggle,
  findKeyValueInExtraSets,
  onBtnRightClick,
  onBtnLeftClick,
  getBlocksSizes,
  showArrows,
  renderSliderWithButtonsMarkup,
  sliderResetState,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-1'

  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg',
      bgSrc: '',
      audioSrc: 'sound/dnd_OneToOne/007.mp3',
      text: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg',
      bgSrc: '',
      text: 'Ель',
      audioSrc: 'sound/dnd_OneToOne/009.mp3',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg',
      bgSrc: '',
      text: 'Сосна',
      audioSrc: 'sound/dnd_OneToOne/011.mp3',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg',
      bgSrc: '',
      text: 'Дуб',
      audioSrc: 'sound/dnd_OneToOne/008.mp3',
      answerTag: 'oak',
    },
    /* {
            id: 5,
            name: "maple",
            imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg",
            bgSrc: "",
            text: "Клён",
            audioSrc: "sound/dnd_OneToOne/012.mp3",
            answerTag: "maple",
          },
          {
            id: 6,
            name: "aspen",
            imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_6.jpg",
            bgSrc: "",
            text: "Осина",
            audioSrc: "sound/dnd_OneToOne/013.mp3",
            answerTag: "aspen",
          },*/
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg',
      audioSrc_2: 'sound/dnd_OneToOne/007.mp3',
      text_2: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg',
      text_2: 'Ель',
      audioSrc_2: 'sound/dnd_OneToOne/009.mp3',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg',
      text_2: 'Сосна',
      audioSrc_2: 'sound/dnd_OneToOne/011.mp3',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg',
      text_2: 'Дуб',
      audioSrc_2: 'sound/dnd_OneToOne/008.mp3',
      answerTag: 'oak',
    },
    /* {
            id: 11,
            name: "maple",
            imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg",
            text_2: "Клён",
            audioSrc_2: "sound/dnd_OneToOne/012.mp3",
            answerTag: "maple",
          },
          {
            id: 12,
            name: "aspen",
            imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_12.jpg",
            text_2: "Осина",
            audioSrc_2: "sound/dnd_OneToOne/013.mp3",
            answerTag: "aspen",
          },*/
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-2'
  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg',
      bgSrc: '',
      audioSrc: '',
      text: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg',
      bgSrc: '',
      text: 'Ель',
      audioSrc: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg',
      bgSrc: '',
      text: 'Сосна',
      audioSrc: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg',
      bgSrc: '',
      text: 'Дуб',
      audioSrc: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg',
      bgSrc: '',
      text: 'Клён',
      audioSrc: '',
      answerTag: 'maple',
    },
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg',
      audioSrc_2: '',
      text_2: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg',
      text_2: 'Ель',
      audioSrc_2: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg',
      text_2: 'Сосна',
      audioSrc_2: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg',
      text_2: 'Дуб',
      audioSrc_2: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg',
      text_2: 'Клён',
      audioSrc_2: '',
      answerTag: 'maple',
    },
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-3'

  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg',
      bgSrc: '',
      audioSrc: '',
      text: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg',
      bgSrc: '',
      text: 'Ель',
      audioSrc: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg',
      bgSrc: '',
      text: 'Сосна',
      audioSrc: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg',
      bgSrc: '',
      text: 'Дуб',
      audioSrc: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg',
      bgSrc: '',
      text: 'Клён',
      audioSrc: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_6.jpg',
      bgSrc: '',
      text: 'Осина',
      audioSrc: '',
      answerTag: 'aspen',
    },
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: '',
      audioSrc_2: '',
      text_2: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc_2: '',
      text_2: 'Ель',
      audioSrc_2: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc_2: '',
      text_2: 'Сосна',
      audioSrc_2: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc_2: '',
      text_2: 'Дуб',
      audioSrc_2: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc_2: '',
      text_2: 'Клён',
      audioSrc_2: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc_2: '',
      text_2: 'Осина',
      audioSrc_2: '',
      answerTag: 'aspen',
    },
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-4'

  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg',
      bgSrc: '',
      audioSrc: '',
      text: '',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_6.jpg',
      bgSrc: '',
      text: '',
      audioSrc: '',
      answerTag: 'aspen',
    },
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg',
      audioSrc_2: '',
      text_2: '',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg',
      text_2: '',
      audioSrc_2: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg',
      text_2: '',
      audioSrc_2: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg',
      text_2: '',
      audioSrc_2: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg',
      text_2: '',
      audioSrc_2: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_12.jpg',
      text_2: '',
      audioSrc_2: '',
      answerTag: 'aspen',
    },
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-5'
  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: '',
      bgSrc: '',
      audioSrc: '',
      text: 'Береза',

      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: '',
      bgSrc: '',
      text: 'Ель',
      audioSrc: '',
      answerTag: 'spruce',
    },
    // {
    //   id: 3,
    //   name: "pine",
    //   imgSrc: "",
    // bgSrc: "",
    //   text: "Сосна",
    //   audioSrc: "",
    //   answerTag: "pine",
    // },
    // {
    //   id: 4,
    //   name: "oak",
    //   imgSrc: "",
    // bgSrc: "",
    //   text: "Дуб",
    //   audioSrc: "",
    //   answerTag: "oak",
    // },
    {
      id: 5,
      name: 'maple',
      imgSrc: '',
      bgSrc: '',
      text: 'Клён',
      audioSrc: '',
      answerTag: 'maple',
    },
    // {
    //   id: 6,
    //   name: "aspen",
    //   imgSrc: "",
    // bgSrc: "",
    //   text: "Осина",
    //   audioSrc: "",
    //   answerTag: "aspen",
    // },
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: '',
      audioSrc_2: 'sound/dnd_OneToOne/007.mp3',
      // text_2: "Береза",
      text_2: '',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc_2: '',
      // text_2: "Ель",
      text_2: '',
      audioSrc_2: 'sound/dnd_OneToOne/009.mp3',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc_2: '',
      text_2: 'Сосна',
      audioSrc_2: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc_2: '',
      text_2: 'Дуб',
      audioSrc_2: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc_2: '',
      text_2: 'Клен',
      audioSrc_2: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc_2: '',
      text_2: 'Осина',
      audioSrc_2: '',
      answerTag: 'aspen',
    },
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html

  const taskId = 'task-6'
  // массивы входящих картинок (максимум 6 полей для перетаскивания,любое количество перетаскиваемых элементов),
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text, text_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) и в у элементов, которые перетаскиваются соответственно(драг)
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение, по которому воспроизводятся звуки
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg',
      bgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg',
      audioSrc: '',
      text: 'Берёза',
      answerTag: 'birch',
    },
    {
      id: 2,
      name: 'spruce',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg',
      bgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg',
      text: 'Ель',
      audioSrc: '',
      answerTag: 'spruce',
    },
    {
      id: 3,
      name: 'pine',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg',
      bgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg',
      text: 'Сосна',
      audioSrc: '',
      answerTag: 'pine',
    },
    {
      id: 4,
      name: 'oak',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg',
      bgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg',
      text: 'Дуб',
      audioSrc: '',
      answerTag: 'oak',
    },
    {
      id: 5,
      name: 'maple',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg',
      bgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg',
      text: 'Клён',
      audioSrc: '',
      answerTag: 'maple',
    },
    {
      id: 6,
      name: 'aspen',
      imgSrc: 'Images_1/dnd_OneToOne/DO_3-4_10_1_6.jpg',
      bgSrc: '',
      text: 'Осина',
      audioSrc: '',
      answerTag: 'aspen',
    },
  ]
  const arrayOfDragElements = [
    {
      id: 1,
      name: 'birch',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg',
      audioSrc_2: '',
      text_2: 'Берёза',
      answerTag: 'birch',
    },
    // {
    //   id: 8,
    //   name: "spruce",
    //   imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg",
    //   text_2: "Ель",
    //  audioSrc_2: "",
    //   answerTag: "spruce",
    // },
    // {
    //   id: 9,
    //   name: "pine",
    //   imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg",
    //   text_2: "Сосна",
    //  audioSrc_2: "",
    //   answerTag: "pine",
    // },
    {
      id: 2,
      name: 'oak',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg',
      text_2: 'Дуб',
      audioSrc_2: '',
      answerTag: 'oak',
    },
    {
      id: 3,
      name: 'maple',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg',
      text_2: 'Клён',
      audioSrc_2: '',
      answerTag: 'maple',
    },
    {
      id: 4,
      name: 'aspen',
      imgSrc_2: 'Images_1/dnd_OneToOne/DO_3-4_10_1_12.jpg',
      text_2: 'Осина',
      audioSrc_2: '',
      answerTag: 'aspen',
    },
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

  renderDndOneToOne(arrayOfDropElements, arrayOfDragElements, taskId, extraSets)
})()

//ФУНКЦИЯ

function renderDndOneToOne(
  arrayOfDropElements,
  arrayOfDragElements,
  taskId,
  extraSets
) {
  let draggingItem
  let elemBelow
  let isGameStart = false
  const dropId = 'drop'
  const dragId = 'drag'
  const taskWrapper = document.getElementById(`${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)

  const soundDataAttribute = 'drop-data'
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  }
  const arrayOfElementsLength = Math.max(
    arrayOfDropElements.length,
    arrayOfDragElements.length
  )

  let elementsSizesClass = addClassesToElements(
    arrayOfElementsLength
  ).elementsSizes
  let dragHeightClass = addClassesToElements(arrayOfElementsLength).dragHeight

  const dropPlacesCount = arrayOfDropElements.filter(el => !el.bgSrc).length
  const dropBox = taskWrapper.querySelector('.dnd_OneToOne_dropPlaceWrapper')
  const dragBoxWrapper = taskWrapper.querySelector(
    '.dnd_OneToOne_dragPlaceWrapper'
  )

  const {
    leftBtn,
    rightBtn,
    sliderBox: dragBox,
  } = renderSliderWithButtonsMarkup(
    dragBoxWrapper,
    'dnd_OneToOne_sliderContent'
  )

  dragBox.parentElement.classList.add(`${dragHeightClass}`)

  dropBox.insertAdjacentHTML(
    'beforeend',
    createDropPictureCardsMarkup(arrayOfDropElements)
  )
  dragBox.insertAdjacentHTML(
    'beforeend',
    createDragPictureCardsMarkup(shuffleCards([...arrayOfDragElements]))
  )

  let sliderSet = {
    sliderItemWidth: 0,
    sliderSize: 0,
    sliderWrapperSize: dragBox.offsetParent.clientWidth,
    sliderShift: 0,
  }

  getBlocksSizes(sliderSet, dragBox)
  showArrows(sliderSet, leftBtn, rightBtn)

  renderCheckPanel(taskWrapper, true)
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper)

  const audioFiles = taskWrapper.querySelectorAll('.dnd_OneToOne_audio')

  taskWrapper.addEventListener('pointerdown', mouseDown)

  btnReset.addEventListener('click', onBtnResetClick)
  btnTest.addEventListener('click', onBtnTestClick)
  dropBox.addEventListener('pointerdown', onDropBoxClick)
  taskWrapper.addEventListener('click', onIconClick)
  leftBtn.addEventListener('click', LeftClick)
  rightBtn.addEventListener('click', RightClick)

  shuffleTracing(
    taskWrapper,
    'dnd_OneToOne_dragPicture_box ',
    arrayOfDragElements,
    onBtnResetClick,
    'drag-data',
    'answerTag'
  )

  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  function LeftClick() {
    onBtnLeftClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function RightClick() {
    onBtnRightClick(sliderSet, dragBox, leftBtn, rightBtn)
  }

  function onDropBoxClick(event) {
    if (
      event.target.classList.contains('dnd_OneToOne_dropPicture') ||
      event.target.classList.contains('dnd_OneToOne_dropPlace_box')
    ) {
      scaleImage(event.target)
    }
  }
  function addClassesToElements(arrayOfElementsLength) {
    let elementsSizes
    let dragHeight
    if (arrayOfElementsLength <= 4) {
      elementsSizes = 'dnd_OneToOne_box_sizes_big'
      dragHeight = 'dnd_OneToOne_DragPlace_height-big'
    } else if (arrayOfElementsLength === 5) {
      elementsSizes = 'dnd_OneToOne_box_sizes_middle'
      dragHeight = 'dnd_OneToOne_DragPlace_height-middle'
    } else if (arrayOfElementsLength >= 6) {
      elementsSizes = 'dnd_OneToOne_box_sizes_small'
      dragHeight = 'dnd_OneToOne_DragPlace_height-small'
    }
    return { elementsSizes, dragHeight }
  }

  function onIconClick(e) {
    if (e.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
    }
  }

  function onBtnResetClick() {
    resetSound(soundSetStates)

    let answers = taskWrapper.querySelectorAll('.dnd_OneToOne_dragPicture_box ')
    shuffleCards([...answers]).forEach(item => {
      dragBox.append(item)
      removeActiveCardClass(item)
    })

    shuffleTracing(
      taskWrapper,
      'dnd_OneToOne_dragPicture_box ',
      arrayOfDragElements,
      onBtnResetClick,
      'drag-data',
      'answerTag'
    )
    sliderResetState(sliderSet, dragBox, 'horisontal')
    getBlocksSizes(sliderSet, dragBox)
    showArrows(sliderSet, leftBtn, rightBtn)
    checkingAnswerReset(controlsBox, infoBox)
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
          item.children[1].children[1].attributes.getNamedItem('drag-data')
            .value
        ) {
          winVar += 1

          addRightChoiceClass(item.children[1].children[1])
        } else addWrongChoiceClass(item.children[1].children[1])
      }
    })

    if (winVar === dropPlacesCount) {
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
      event.target.classList.contains('dnd_OneToOne_dragPicture') ||
      event.target.classList.contains('dnd_OneToOne_dragTitle')
    ) {
      draggingItem = event.target.parentElement
    } else if (
      event.target.classList.contains('dnd_OneToOne_dragPicture_box')
    ) {
      draggingItem = event.target
    } else return

    draggingItem.style.touchAction = 'none'
    const findIdx = [...dragBox.children].findIndex(el => el === draggingItem)

    draggingItem.style.cursor = 'grabbing'
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
      resetSound(soundSetStates)

      document.removeEventListener('pointermove', onMouseMove)
      draggingItem.style.cursor = 'grab'

      if (clickWithoutMove) {
        if (
          event.target.classList.contains('dnd_OneToOne_dragPicture_box') &&
          event.target.firstElementChild.classList.contains(
            'dnd_OneToOne_dragPicture'
          )
        ) {
          scaleImage(event.target.firstElementChild)
        } else if (
          event.target.classList.contains('dnd_OneToOne_dragPicture')
        ) {
          scaleImage(event.target)
        }
      } else {
        if (elemBelow.classList.contains('dnd_OneToOne_dropPlace_imageBox')) {
          dropAppend(elemBelow.parentElement, draggingItem)
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest)
            isGameStart = true
          }
        } else if (
          elemBelow.closest('.dnd_OneToOne_dropPlace') &&
          elemBelow.closest('.dnd_OneToOne_dropPlace').children[2] ===
            draggingItem
        ) {
          dropAppend(elemBelow.closest('.dnd_OneToOne_dropPlace'), draggingItem)
        } else {
          dragAppend(dragBox, draggingItem, findIdx)
        }
        sliderSet.sliderSize = dragBox.scrollWidth
        showArrows(sliderSet, leftBtn, rightBtn)
      }

      draggingItem.removeEventListener('pointerup', onpointerup)
      elemBelow = null
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map(picture => {
        const isTitle =
          picture.text &&
          `<div class='dnd_OneToOne_dropTitle'>${picture.text}</div>`

        const isSound =
          picture.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_OneToOne_audio displayNoneAudio" id="${dropId}_${picture.id}${taskId}" src="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        const isImage =
          picture.imgSrc &&
          `<div class="dnd_OneToOne_dropPicture ${elementsSizesClass}" style="background-image: url(${picture.imgSrc})" draggable="false">
                    </div>`

        const isBackgroundImage = picture.bgSrc
          ? `<div drop-data="${picture.answerTag}" class ="dnd_OneToOne_dropPlace_box dnd_OneToOne_border ${elementsSizesClass}" style='background-image: url(${picture.bgSrc})'>
             </div>`
          : `<div drop-data="${picture.answerTag}" class="dnd_OneToOne_dropPlace_box ${elementsSizesClass}">
                    <div drop-data="${picture.answerTag}" class="dnd_OneToOne_dropPlace_imageBox"></div>
             </div>`

        const isAudioBackground =
          !picture.text && !picture.imgSrc && picture.audioSrc
            ? 'audio_background_plug'
            : ''

        return `<div class="dnd_OneToOne_dropPlace">
                    <div class="dnd_OneToOne_dropPicture_box ${isAudioBackground}">
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
          `<div class='dnd_OneToOne_dragTitle'>${picture.text_2}</div>`

        const isImage =
          picture.imgSrc_2 &&
          `<div class="dnd_OneToOne_dragPicture" style="background-image: url(${picture.imgSrc_2}" draggable="false">
                    </div>`

        const isSound =
          picture.audioSrc_2 &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_OneToOne_audio displayNoneAudio" id="${dragId}_${picture.id}${taskId}" src="${picture.audioSrc_2}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `

        const isAudioBackground =
          !picture.text_2 && !picture.imgSrc_2 && picture.audioSrc_2
            ? 'audio_background_plug'
            : ''

        return `<div class="dnd_OneToOne_dragPicture_box hoveredActiveElement ${elementsSizesClass} ${isAudioBackground}" draggable="false" drag-data="${picture.answerTag}" sound-data="${picture.id}">
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
  <div class="dnd_OneToOne_comparePicturesWrapper">
          <div class="dnd_OneToOne_dropPlaceWrapper"></div>
          <div class="dnd_OneToOne_dragPlaceWrapper"></div>
  </div>
      `
  }
}
