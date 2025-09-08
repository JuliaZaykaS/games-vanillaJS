import {
  checkingAnswerReset,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../../_common_files/common_files/common_scripts.js";

(() => {
  const taskId = 'task-1'

  const data = [
    'Line13-3', 'Line07-5', 'Line01-2', 'Line02-1', 'Line02-2',
    'Line09-3', 'Line15-1', 'Line15-2', 'Line14-2', 'Line13-2'
  ]
  renderRepeateLines(taskId, data)
})();

function renderRepeateLines(taskId, data) {
  const taskWrapper = document.getElementById(`${taskId}`)
  const lineField = taskWrapper.querySelector('.repeatFieldContainer')
  let isGameStart = false;
  const textarea = taskWrapper.querySelector('.object')
  const picture = taskWrapper.querySelector('.picture')
  const sizes = taskWrapper.querySelectorAll('.size')
  let active = taskWrapper.querySelector('.active')
  let sqares = taskWrapper.querySelectorAll('.repeatField')
  let currentwrapper = taskWrapper.querySelector('.repeatField1')
  let currentSVG = currentwrapper.innerHTML

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } = getCheckPanelElements(taskWrapper);
  toggleOpacityAndEventsElement(btnTest);

  lineField.addEventListener('click', fillLine)
  btnReset.addEventListener('click', resetTask)
  btnTest.addEventListener('click', checkTask)

  sizes.forEach((item, index) => {
    item.addEventListener('click', () => {

      active.classList.remove('active')
      item.classList.add('active')
      sqares.forEach(item => item.classList.add('noDisplay'))
      sqares[index].classList.remove('noDisplay')
      currentwrapper = sqares[index]
      active = item
      resetTask()
      currentSVG = currentwrapper.innerHTML
    })
  })

  function fillLine(e) {
    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }
    if (e.target.classList.contains('line')) {
      e.target.classList.toggle('repeatLines_st1')
      e.target.classList.toggle('repeatLines_st3')

    }
  }

  function checkTask() {

    let lines = taskWrapper.querySelectorAll('.repeatLines_st3')
    let arr = []
    lines.forEach(item => {
      arr.push(`"${item.getAttribute('id')}"`)
    })
    console.log(arr, taskWrapper)
    textarea.innerText = arr
    picture.innerHTML = currentSVG
    var blob = new Blob([currentwrapper.innerHTML],
      { type: "svg" });
    saveAs(blob, "picture.svg");


    /*
    let lines = taskWrapper.querySelectorAll('.repeatLines_st3')
    let winVar = 0
    lines.forEach(item=> {
      item.classList.remove('repeatLines_st3')
      if(data.find(element=>item.id === element)){
        winVar++
        item.classList.add('repeatLines_st4')
      }else {
        item.classList.add('repeatLines_st5')
        winVar--
      }
    })
  
    if(winVar===data.length){
      checkingAnswerPositive(controlsBox,infoBox)
    }else checkingAnswerNegative(controlsBox,infoBox)
  
    lineField.removeEventListener('click', fillLine)*/
  }

  function resetTask() {
    textarea.innerText = '';
    picture.innerHTML = '';
    let lines = taskWrapper.querySelectorAll('.line')
    lines.forEach(item => item.classList.remove('repeatLines_st3'))
    lines.forEach(item => item.classList.remove('repeatLines_st4'))
    lines.forEach(item => item.classList.remove('repeatLines_st5'))
    lines.forEach(item => item.classList.add('repeatLines_st1'))
    checkingAnswerReset(controlsBox, infoBox)
    lineField.addEventListener('click', fillLine)

    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }

  }
}
