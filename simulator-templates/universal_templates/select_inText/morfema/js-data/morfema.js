import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  displayNoneToggle,
  findKeyValueInExtraSets,
  createTemplateBaseMarkup,
} from '../../../../_common_files/common_files/common_scripts.js'
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'task-1'

  //
  let Words = [
    [
      //Текст в шаблоне. Каждое слово, которое нужно разобрать ставим в теги <nobr><div class="morfema_stroka"><rs>СЛОВО</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div></nobr>.
      (Text = `Космонавт во время взлёта испытывает сильную <nobr><div class="morfema_stroka"><rs>перегрузку</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div>.</nobr>
          `),
      {
        word: 'перегрузку', //слово для разбора
        prefix_morf: '<m>пере</m>грузку', //приставка
        root_morf: 'пере<m>груз</m>ку', //корень
        suffix_morf: 'перегруз<m>к</m>у', //суффикс
        morfema_ending_morf: 'перегрузк<m>у</m>', //окончание
        base_morf: '', //основа
        base_begin_morf: '', //начало основы, если основа разорвана соединительной гласной
        base_end_morf: '', //конец основы, если основа разорвана соединительной гласной
        soed_glas_morf: '', //'шиpoк<m>o</m>лoбый', //соединительная гласная
      },
    ],
  ]
  const morfems = {
    prefix: true,
    root: true,
    suffix: true,
    ending: true,
    base: true,
    base_begin: false,
    base_end: false,
    soed_glas: true,
  }
  // дополнительные параметры extraSets
  // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
  // winSound - путь к победному звуку, если не нужен, то оставить ""
  // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
  // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует
  // images - пути к картинкам частей слова

  const extraSets = {
    checkSound: {
      winSound: '',
      loseSound: '',
    },
    panelButtons: {
      checkButton: true,
    },
    images: {
      root: '../../../_common_files/common_materials/morfemy/root.png',
      base: '../../../_common_files/common_materials/morfemy/base.png',
      base_begin:
        '../../../_common_files/common_materials/morfemy/base_begin.png',
      base_end: '../../../_common_files/common_materials/morfemy/base_end.png',
      prefix: '../../../_common_files/common_materials/morfemy/prefix.png',
      suffix: '../../../_common_files/common_materials/morfemy/suffiks.png',
      connect: '../../../_common_files/common_materials/morfemy/connect.png',
      ending: '../../../_common_files/common_materials/morfemy/end.png',
      null_end: '../../../_common_files/common_materials/morfemy/null_end.png',
      delete: '../../../_common_files/common_materials/morfemy/delete.png',
    },
    tooltips: true, //наличие/отсутствие подсказок с названиями для морфем
    bigSize: false, //наличие/отсутствие большой размер текста(для списка)
  }
  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMorfema(taskId, Words, morfems, extraSets)
})()
;(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = 'task-2'
  //
  let Words = [
    [
      //Текст в шаблоне. Каждое слово, которое нужно разобрать ставим в теги <nobr><div class="morfema_stroka"><rs>СЛОВО</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div></nobr>.
      (Text = `<nobr><div class="morfema_stroka"><rs>музыковед</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div>.</nobr>
      <nobr><div class="morfema_stroka"><rs>приграничный</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div>.</nobr>
      <nobr><div class="morfema_stroka"><rs>хорошо</rs><div class="morfema_resetWrapper"><span class="morfema_reset_word">↻</span></div></div>.</nobr>
      `),
      {
        word: 'музыковед', //слово для разбора
        prefix_morf: '', //приставка
        root_morf: '<m>музык</m>о<m>вед</m>', //корень
        suffix_morf: '', //суффикс
        morfema_ending_morf: 'музыковед<m></m>', //окончание
        base_morf: '', //основа
        base_begin_morf: '<m>музык</m>овед', //начало основы, если основа разорвана соединительной гласной
        base_end_morf: 'музыко<m>вед</m>', //конец основы, если основа разорвана соединительной гласной
        soed_glas_morf: 'музык<m>о</m>вед', //'шиpoк<m>o</m>лoбый', //соединительная гласная
      },
      {
        word: 'приграничный', //слово для разбора
        prefix_morf: '<m>при</m>граничный', //приставка
        root_morf: 'при<m>гранич</m>ный', //корень
        suffix_morf: 'пригранич<m>н</m>ый', //суффикс
        morfema_ending_morf: 'приграничн<m>ый</m>', //окончание
        base_morf: '<m>приграничн</m>ый', //основа
        base_begin_morf: '', //начало основы, если основа разорвана соединительной гласной
        base_end_morf: '', //конец основы, если основа разорвана соединительной гласной
        soed_glas_morf: '', //'шиpoк<m>o</m>лoбый', //соединительная гласная
      },
      {
        word: 'хорошо', //слово для разбора
        prefix_morf: '', //приставка
        root_morf: '<m>хорош</m>о', //корень
        suffix_morf: 'хорош<m>о</m>', //суффикс
        morfema_ending_morf: 'хорошо<m></m>', //окончание
        base_morf: '<m>хорошо</m>', //основа
        base_begin_morf: '', //начало основы, если основа разорвана соединительной гласной
        base_end_morf: '', //конец основы, если основа разорвана соединительной гласной
        soed_glas_morf: '', //'шиpoк<m>o</m>лoбый', //соединительная гласная
      },
    ],
  ]
  const morfems = {
    prefix: true,
    root: true,
    suffix: true,
    ending: true,
    base: true,
    base_begin: true,
    base_end: true,
    soed_glas: true,
  }
  // дополнительные параметры extraSets
  // пути для аудио, если нужно,чтобы при проверке воспроизводились звуки победа/попробуй еще
  // winSound - путь к победному звуку, если не нужен, то оставить ""
  // loseSound - путь к попробуй еще звуку, если не нужен, то оставить ""
  // panelButtons.checkButton: true - кнопка проверки присутствует, false кнопка отсутствует
  // images - пути к картинкам частей слова
  const extraSets = {
    checkSound: {
      winSound: '',
      loseSound: '',
    },
    panelButtons: {
      checkButton: true,
    },
    images: {
      root: '../../../_common_files/common_materials/morfemy/root.png',
      base: '../../../_common_files/common_materials/morfemy/base.png',
      base_begin:
        '../../../_common_files/common_materials/morfemy/base_begin.png',
      base_end: '../../../_common_files/common_materials/morfemy/base_end.png',
      prefix: '../../../_common_files/common_materials/morfemy/prefix.png',
      suffix: '../../../_common_files/common_materials/morfemy/suffiks.png',
      connect: '../../../_common_files/common_materials/morfemy/connect.png',
      ending: '../../../_common_files/common_materials/morfemy/end.png',
      null_end: '../../../_common_files/common_materials/morfemy/null_end.png',
      delete: '../../../_common_files/common_materials/morfemy/delete.png',
    },
    tooltips: false, //наличие/отсутствие подсказок с названиями для морфем
    bigSize: true, //наличие/отсутствие большой размер текста(для списка)
  }
  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMorfema(taskId, Words, morfems, extraSets)
})()

function renderMorfema(taskId, Words, morfems, extraSets) {
  const taskWrapper = document.getElementById(`${taskId}`)
  createTemplateBaseMarkup(taskWrapper, createBaseMarkup)
  renderCheckPanel(taskWrapper, true)
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper)

  let isGameStart = false
  // закрываем кнопку ПРОВЕРИТЬ
  if (
    extraSets?.panelButtons &&
    !findKeyValueInExtraSets(extraSets, 'checkButton')
  ) {
    displayNoneToggle(btnTest)
  } else {
    toggleOpacityAndEventsElement(btnTest)
  }

  function createBaseMarkup() {
    return `
  <div class="morfema_razbor_slova">
    <rs><!-- здесь происходит сборка --></rs>
  </div>`
  }
  let tooltip_class = extraSets.tooltips ? 'morfema_tooltip' : ''
  let bigSize = extraSets.bigSize
    ? 'morfema_razbor_text_big'
    : 'morfema_razbor_text'

  //Для работы с touch-устройствами
  /*!
   * jQuery UI Touch Punch 0.2.3
   *
   * Copyright 2011–2014, Dave Furfero
   * Dual licensed under the MIT or GPL Version 2 licenses.
   *
   * Depends:
   *  jquery.ui.widget.js
   *  jquery.ui.mouse.js
   */
  /*
  !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
   */
  //конец кода для touch-устройств

  //var Words = [];

  $(document).ready(function () {
    $(taskWrapper)
      .find('.morfema_razbor_slova')
      .each(function () {
        var checkRazborAmount = 0
        var wordSplit = []
        var WordsNum = $('.morfema_razbor_slova').index(this)

        var stringSearch = Words[0][0]

        var html
        html = '<div class="morfema_work-area">'
        html += `<div class="morfema_symbol-area  ${tooltip_class}">`
        morfems.root &&
          (html += `<div class="morfema_symbol" name="root" style="margin-left:1em"><img src="${extraSets.images.root}"></div>`)
        morfems.base &&
          (html += `<div class="morfema_symbol" name="base"><img src="${extraSets.images.base}"></div>`)
        morfems.base_begin &&
          (html += `<div class="morfema_symbol" name="base_begin"><img src="${extraSets.images.base_begin}"></div>`)
        morfems.base_end &&
          (html += `<div class="morfema_symbol" name="base_end"><img src="${extraSets.images.base_end}"></div>`)
        morfems.prefix &&
          (html += `<div class="morfema_symbol" name="prefix"><img src="${extraSets.images.prefix}"></div>`)
        morfems.suffix &&
          (html += `<div class="morfema_symbol" name="suffix"><img src="${extraSets.images.suffix}"></div>`)
        morfems.soed_glas &&
          (html += `<div class="morfema_symbol" name="connect"><img src="${extraSets.images.connect}"></div>`)
        morfems.ending &&
          (html += `<div class="morfema_symbol" name="ending"><img src="${extraSets.images.ending}"></div>`)
        morfems.ending &&
          (html += `<div class="morfema_symbol" name="null_end"><img src="${extraSets.images.null_end}"></div>`)

        html += `<div class="morfema_symbol morf_del ${tooltip_class}" name="delete"><img src="${extraSets.images.delete}"></div><br>`
        html += '</div>'

        html += `<div class="${bigSize}" >` + Words[0][0] + `</div>`

        html += '</div>'

        html += '</div>'
        $(this).html(html)

        let strokeNum = 0

        /* $(this)
         .find(".morfema_razbor_text")
         .find("rs")
         .each(function () {
           html = "";

           $(this).contents().remove();
           console.log($(this).index("rs"))

           wordSplit[$(this).index("rs")] = Words[WordsNum][$(this).index("rs") + 1].word.split("");
           for (var k = 0; k < wordSplit[$(this).index("rs")].length; k++) {
             html += '<div class="morfema_spell morfema_symbols">' + wordSplit[$(this).index("rs")][k] + "</div>";
           }
           /* html+='<div class="morfema_spell null_end">_</div>'; */
        /*  $(html).appendTo(this);
        $(this).parents(".morfema_stroka").attr("strokeNum", strokeNum);
        strokeNum++;
      });*/

        taskWrapper.querySelectorAll('rs').forEach((item, index) => {
          // console.log(item, index, taskWrapper)
          item.innerText = ''
          let html = ''
          //$(this).contents().remove();

          wordSplit[index] = Words[0][index + 1].word.split('')
          //console.log(wordSplit[index])
          for (var k = 0; k < wordSplit[index].length; k++) {
            html +=
              '<div class="morfema_spell morfema_symbols">' +
              wordSplit[index][k] +
              '</div>'
          }
          //console.log(html)
          $(html).appendTo(item)
          $(item).parents('.morfema_stroka').attr('strokeNum', strokeNum)
          strokeNum++
        })
        taskWrapper.addEventListener('click', e => {
          if (e.target.classList.contains('morfema_reset_word')) {
            $(e.target)
              .parent()
              .parent()
              .find('.morfema_spell')
              .each(function () {
                $(this).removeAttr('name')
                $(this).removeAttr('number')
                $(this).removeAttr('select')
                $(this).removeClass('morfema_choose')
              })
            $(e.target).parent().parent().prevAll('[class*=morf]').remove()
            $(e.target).parent().parent().nextAll('[class*=morf]').remove()
            $(e.target)
              .parent()
              .parent()
              .find('.morfema_ending_morf')
              .each(function () {
                $(this).removeClass('morfema_ending_morf')
                $(this)
                  .find('.morfema_spell')
                  .eq(0)
                  .css({ 'margin-left': '0.2em' })
                $(this)
                  .find('.morfema_spell')
                  .each(function () {
                    $(this).insertBefore($(this).parent())
                    $(this).removeAttr('name')
                  })
                $(this).remove()
              })

            //if($(this).hasClass("morfema_razbor_slova"))

            $(e.target)
              .parent()
              .parent()
              .find('.morfema_connect')
              .each(function () {
                //для случая соединительной гласной
                $(this).removeClass('morfema_connect')
                $(this).css({ 'border-radius': '0.3em', outline: 'none' })
                $(this).removeAttr('name')
                $(this).removeClass('morfema_choose')
              })
            checkingAnswerReset(controlsBox, infoBox)

            if (isGameStart) {
              toggleOpacityAndEventsElement(btnTest)
              isGameStart = false
            }
          }
        })

        var newPosition
        var oldPosition
        $(this).find('rs').sortable()
        var newW =
          $(this).find('rs').width() +
          $(this).find('rs').find('.morfema_spell').width()
        //	console.log(newW, $(this).find("rs").css("width"))
        //	$(this).find("rs").css({"width":newW})
        $(this)
          .find('rs')
          .sortable('option', 'cancel', '.morfema_spell.morfema_symbols')
        $(this).find('rs').sortable('option', 'containment', 'parent')
        $(this).find('rs').sortable({ axis: 'x' })
        $(this)
          .find('rs')
          .sortable({
            items: '.morfema_spell:not(.null-end-drop-disabled)',
            start: function () {
              oldPosition = $('.morfema_spell-null').index()
            },
            stop: function () {
              //убираем запрет на элементы сортировки после ее завершения
              $(this)
                .parents('.morfema_stroka')
                .find('.morfema_spell.morfema_symbols')
                .each(function () {
                  if ($(this).hasClass('null-end-drop-disabled')) {
                    //определяем символы, которые не могут быть местом для сброса по атрибуту number
                    $(this).removeClass('null-end-drop-disabled')
                  }
                })

              newPosition = $('.morfema_spell-null').index()
              var spellMas = $(this).find('.morfema_spell')
              var min = oldPosition
              var max = newPosition
              //console.log(min, max)
              var signCheck = 1
              if (min > max) {
                min = newPosition
                max = oldPosition
                signCheck = 0
              }

              if (
                $(this)
                  .parents('.morfema_stroka')
                  .find('.morfema_spell')
                  .eq(newPosition - 1)
                  .attr('name') == 'morfema_ending_morf'
              ) {
                $(this)
                  .parents('.morfema_stroka')
                  .find('.morfema_spell-null')
                  .insertAfter(
                    $(this)
                      .parents('.morfema_stroka')
                      .find('.morfema_spell')
                      .eq(newPosition - 1)
                      .parents('.morfema_ending_morf')
                  )
              }

              for (var i = min; i <= max; i++) {
                if (i == newPosition) continue
                //console.log(i, $(spellMas[i]), $(spellMas[i]).attr("number"))
                if ($(spellMas[i]).attr('number')) {
                  if (
                    $(spellMas[i]).attr('number') ==
                    $(spellMas[i - 1]).attr('number')
                  ) {
                    //console.log("spellMas, continue", $(spellMas[i]).attr("number"))
                    continue
                  }

                  var moveFlag = 1
                  var moveNotNum

                  if ($(spellMas[i - 1]).attr('number')) {
                    var spellMasCurrent = $(spellMas[i])
                      .attr('number')
                      .split(' ')
                    var spellMasPrev = $(spellMas[i - 1])
                      .attr('number')
                      .split(' ')

                    for (var m = 0; m < spellMasCurrent.length; m++) {
                      //console.log("current", spellMasCurrent[m])
                      for (var n = 0; n < spellMasPrev.length; n++) {
                        //console.log("prev", spellMasPrev[n])
                        if (spellMasCurrent[m] == spellMasPrev[n])
                          //moveFlag=0;
                          moveNotNum = spellMasCurrent[m]
                      }
                    }
                  }

                  var pictNum = $(spellMas[i]).attr('number').split(' ')

                  var morfema_strokaNum = $(spellMas[i])
                    .parents('.morfema_stroka')
                    .attr('strokenum')

                  for (var j = 0; j < pictNum.length; j++) {
                    //console.log("pictNum", pictNum[j], moveNotNum);
                    if (pictNum[j] == moveNotNum) {
                      //console.log("moveNotNum, continue", pictNum[j])
                      continue
                    }
                    var Left = parseInt(
                      $(this)
                        .parents('.morfema_razbor_slova')
                        .find(
                          '[number=' +
                            pictNum[j] +
                            '][strokenum=' +
                            morfema_strokaNum +
                            ']'
                        )
                        .css('margin-left')
                    )

                    if (signCheck)
                      Left =
                        Left -
                        $(this).find('.morfema_spell').width() -
                        parseInt(
                          $(this)
                            .find('.morfema_spell')
                            .eq(0)
                            .css('margin-left')
                        )
                    if (!signCheck)
                      Left =
                        Left +
                        $(this).find('.morfema_spell').width() +
                        parseInt(
                          $(this)
                            .find('.morfema_spell')
                            .eq(0)
                            .css('margin-left')
                        )

                    $(this)
                      .parents('.morfema_razbor_slova')
                      .find(
                        '[number=' +
                          pictNum[j] +
                          '][strokenum=' +
                          morfema_strokaNum +
                          ']'
                      )
                      .css({
                        'margin-left': Left, //перемещаем смещаемую морфему в новое место
                      })
                  }
                }
              }
            },
          })

        var stopForChoose = 0

        $(this)
          .find('.morfema_spell, .morfema_spell-null')
          .click(function () {
            //console.log("click")
            $(this).parents('.morfema_stroka').attr('selected', 'yes')
            $(this)
              .parents('.morfema_work-area')
              .find('.morfema_stroka')
              .each(function () {
                if ($(this).attr('selected') != 'yes')
                  if ($(this).find('.morfema_choose').length != 0)
                    stopForChoose = 1
              })

            if (
              $(this).parents('.morfema_stroka').find('.morfema_choose')
                .length != 0
            )
              stopForChoose = 0
            if (stopForChoose == 0) $(this).toggleClass('morfema_choose')
          })

        var Number_of_turn = 0
        $(this)
          .find('.morfema_symbol')
          .click(function () {
            var name = $(this).find('img').attr('src')
            //console.log(name)
            var SelectFlag = true
            checkingAnswerReset(controlsBox, infoBox)
            //if (name!='morfemy/end.png') {
            if (
              $(this).parents('.morfema_razbor_slova').find('.morfema_choose')
                .length > 1
            ) {
              var $begin_morfema_choose_prov = $(this)
                .parents('.morfema_razbor_slova')
                .find('.morfema_choose')
                .eq(0)
              var $end = $(this)
                .parents('.morfema_razbor_slova')
                .find('.morfema_choose')
                .eq(-1)
              var $next = $begin_morfema_choose_prov

              while (true) {
                //пока цикл не прерван будем брать каждый символ по порядку
                if ($next.attr('name')) {
                  var ChooseName = $next.attr('name').split(' ')
                  if (
                    name != extraSets.images.delete &&
                    name != extraSets.images.null_end
                  ) {
                    for (var i = 0; i < ChooseName.length; i++) {
                      if (
                        ChooseName[i] != 'base_morf' &&
                        ChooseName[i] != 'base_begin_morf' &&
                        ChooseName[i] != 'base_end_morf'
                      ) {
                        if (
                          name != extraSets.images.base &&
                          name != extraSets.images.base_begin &&
                          name != extraSets.images.base_end
                        ) {
                          SelectFlag = false
                          break
                        }
                      } else if (
                        ChooseName[i] == 'base_morf' ||
                        ChooseName[i] == 'base_begin_morf' ||
                        ChooseName[i] == 'base_end_morf'
                      ) {
                        if (
                          name == extraSets.images.base ||
                          name == extraSets.images.base_begin ||
                          name == extraSets.images.base_end
                        )
                          SelectFlag = false
                        break
                      }
                    }
                  }
                }

                if (!$next.parent().hasClass('morfema_ending_morf'))
                  $next = $next.next()
                else {
                  $(this)
                    .parents('.interakt_zadanie')
                    .find('.morfema_choose')
                    .removeClass('morfema_choose')
                  break
                }

                if (!$next || $next.is($end) || $next.find($end).length != 0) {
                  break
                }
              }
            }

            $(this)
              .parents('.morfema_razbor_slova')
              .find('.morfema_work-area')
              .find('.morfema_choose')
              .each(function () {
                if ($(this).attr('name')) {
                  var ChooseName = $(this).attr('name').split(' ')
                  if (
                    name != extraSets.images.delete &&
                    name != extraSets.images.null_end
                  ) {
                    for (var i = 0; i < ChooseName.length; i++) {
                      if (
                        ChooseName[i] != 'base_morf' &&
                        ChooseName[i] != 'base_begin_morf' &&
                        ChooseName[i] != 'base_end_morf'
                      ) {
                        if (
                          name != extraSets.images.base &&
                          name != extraSets.images.base_begin &&
                          name != extraSets.images.base_end
                        ) {
                          SelectFlag = false
                        }
                      } else if (
                        ChooseName[i] == 'base_morf' ||
                        ChooseName[i] == 'base_begin_morf' ||
                        ChooseName[i] == 'base_end_morf'
                      ) {
                        if (
                          name == extraSets.images.base ||
                          name == extraSets.images.base_begin ||
                          name == extraSets.images.base_end
                        )
                          SelectFlag = false
                      }
                    }
                  }
                }
              })

            if (SelectFlag) {
              stopForChoose = 0

              if (
                name != extraSets.images.end &&
                name != extraSets.images.connect
              ) {
                if (
                  $(this)
                    .parents('.morfema_razbor_slova')
                    .find('.morfema_choose').length > 1
                ) {
                  var $begin_morfema_choose_morfema_spell = $(this)
                    .parents('.morfema_razbor_slova')
                    .find('.morfema_choose')
                    .eq(0) //первый выделенный символ в строке

                  $begin_morfema_choose_morfema_spell.attr('select', 'morfem')
                  var $end = $(this)
                    .parents('.morfema_razbor_slova')
                    .find('.morfema_choose')
                    .eq(-1) //последний выделенный символ в строке

                  var $next = $begin_morfema_choose_morfema_spell //каждый символ между первым и последним выделенным по порядку

                  while (true) {
                    //пока цикл не прерван будем брать каждый символ по порядку

                    if (
                      !$begin_morfema_choose_morfema_spell.next().attr('class')
                    ) {
                      $begin_morfema_choose_morfema_spell =
                        $begin_morfema_choose_morfema_spell.parent()
                      $next = $begin_morfema_choose_morfema_spell
                    }

                    /* 	if (!$next.hasClass("morfema_spell")) {
                var nextIndex=$next.index()
                //console.log(nextIndex)
              } */

                    $next = $next.next()
                    //console.log($next.attr("class"));
                    if (!$next.hasClass('morfema_spell')) {
                      //если выделенный символ внутри окончания

                      if ($next.find('.morfema_choose').length != 0) {
                        var endChooseNum = $next.find('.morfema_choose').index()
                        //console.log(endChooseNum);
                        var endMas = []
                        endMas = $next.find('.morfema_spell')
                        for (var i = 0; i <= endChooseNum; i++) {
                          $(endMas[i]).attr('select', 'morfem')
                        }
                      } else {
                        //console.log("null");
                        var endMas = []
                        endMas = $next.find('.morfema_spell')
                        for (var i = 0; i < endMas.length; i++) {
                          $(endMas[i]).attr('select', 'morfem')
                        }
                      }
                      /* $next.find(".morfema_choose").each(function(){
                  $(this).attr("select", "morfem")
                }) */
                    } else {
                      $next.attr('select', 'morfem')
                    }
                    if (
                      !$next ||
                      $next.is($end) ||
                      $next.find($end).length != 0
                    ) {
                      break
                    }
                  }
                }

                if (
                  $(this)
                    .parents('.morfema_razbor_slova')
                    .find('.morfema_choose').length == 1
                ) {
                  $(this)
                    .parents('.morfema_razbor_slova')
                    .find('.morfema_choose')
                    .attr('select', 'morfem')
                }

                var obj = $(this)
                  .parents('.morfema_razbor_slova')
                  .find("[select = 'morfem']")
              } else {
                var obj = $('.morfema_work-area').find('.morfema_choose')
              }

              if ($(obj).position()) {
                var otstup =
                  $(obj).position().left -
                  parseInt($('.morfema_work-area').css('padding')) +
                  parseInt($('.morfema_spell').css('margin-left'))
              } else {
                return
              }

              if (isNaN(otstup)) {
                otstup = $(obj).position().left - $(obj).width() / 1.5
              }
              var a = parseInt($('.morfema_spell').css('marginLeft'))
              var b = obj.length - 0.5
              // console.log(
              //   $(taskWrapper).find('.morfema_spell').eq(0),
              //   $(taskWrapper).find('.morfema_spell').eq(0).width()
              // )
              var symbLength =
                ((obj.length *
                  $(taskWrapper).find('.morfema_spell').eq(0).width() +
                  a * b) /
                  $(this).parents('.morfema_razbor_slova').width()) *
                100
              //console.log(obj.length*($(".morfema_spell").width())+a*b, $(this).parents(".morfema_razbor_slova").width())

              if (name == extraSets.images.root) {
                //koren

                var svg_pic =
                  '<div class="root_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup * 0.993 +
                  'px; top: ' +
                  ($(obj).position().top - $(obj).height()) +
                  'px; margin-top:0.2em; width:' +
                  symbLength +
                  '%"> <svg preserveAspectRatio="none" width="100%" height="1em"'
                svg_pic +=
                  'viewBox="692.5 415.5 60 19" x="0px" y="0px" xmlns:xml="http://www.w3.org/XML/1998/namespace" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<rect fill="none" x="366.6" y="2938.9" width="3002.7" height="314.2" />'
                svg_pic +=
                  '<path fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" d="M 695.4 433.1 c 0 0 25.2 -31.2 58 0" />'
                svg_pic += '</svg></div>'

                $(svg_pic).offset({ top: $(obj).position().top })
                $(svg_pic).insertBefore($(obj).parents('.morfema_stroka'))

                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' root_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'root_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              if (name == extraSets.images.prefix) {
                //pristavka

                var svg_pic =
                  '<div class="prefix_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup +
                  'px; top: ' +
                  ($(obj).position().top - $(obj).height()) +
                  'px; width:' +
                  symbLength +
                  '%"> <svg preserveAspectRatio="none" width="100%" height="0.6em" '
                svg_pic +=
                  'viewBox="709.5 415.5 30 10.6" enable-background="new 709.5 415.5 30 10.6" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<rect x="200.6" y="3757.7" fill="none" width="3834.3" height="401.3" />'
                svg_pic +=
                  '<polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" points="738.5,425.2 738.5,416.5 710.5,416.5 " />'
                svg_pic += '</svg></div>'
                $(svg_pic).insertBefore($(obj).parents('.morfema_stroka'))

                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' prefix_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'prefix_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                  //});
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              // suffix

              if (name == extraSets.images.suffix) {
                var svg_pic =
                  '<div class="suffix_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup +
                  'px; margin-top: 0.2em; top: ' +
                  ($(obj).position().top - $(obj).height()) +
                  'px; width:' +
                  symbLength +
                  '%"> <svg preserveAspectRatio="none" width="100%" height="1em"'
                svg_pic +=
                  ' viewBox="699.4 415.5 37.9 20.3" enable-background="new 699.4 415.5 37.9 20.3" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="700.4" y1="434.3" x2="718.3" y2="416.5"/>'
                svg_pic +=
                  '<line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="718.4" y1="416.7" x2="736.2" y2="434.5"/>'
                svg_pic += '</svg></div>'
                $(svg_pic).insertBefore($(obj).parents('.morfema_stroka'))
                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' suffix_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'suffix_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              // base

              if (name == extraSets.images.base) {
                var svg_pic =
                  '<div class="base_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup +
                  'px; margin-top:-1.3em; width:' +
                  symbLength +
                  '%" > <svg preserveAspectRatio="none" width="100%" height="0.5em"'
                svg_pic +=
                  ' viewBox="694.5 415.5 60 11.1" enable-background="new 694.5 415.5 60 11.1" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<rect x="68.6" y="1565.1" fill="none" width="1311.7" height="137.3"/>'
                svg_pic +=
                  '<polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" points="753.5,416.6 753.5,425.5 695.5,425.5 695.5,416.5 "/>'
                svg_pic += '</svg></div>'
                $(svg_pic).insertAfter($(obj).parents('.morfema_stroka'))
                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' base_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'base_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                  //});
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              if (name == extraSets.images.base_begin) {
                //var svg_pic='<div class="morfemy" style="width:'+symbLength+'px;"';
                var svg_pic =
                  '<div class="base_begin_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup +
                  'px; margin-top:-1.3em; width:' +
                  symbLength +
                  '%" > <svg preserveAspectRatio="none" width="100%" height="0.5em"'
                svg_pic +=
                  ' viewBox="709.5 415.5 30 10.6" enable-background="new 709.5 415.5 30 10.6" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<rect x="200.6" y="3757.7" fill="none" width="3834.3" height="401.3"/>'
                svg_pic +=
                  '<polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" points="710.5,416.5 710.5,425.2 738.5,425.2 "/>'
                svg_pic += '</svg></div>'
                $(svg_pic).insertAfter($(obj).parents('.morfema_stroka'))
                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' base_begin_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'base_begin_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                  //});
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              if (name == extraSets.images.null_end) {
                //нулевое окончание
                if (
                  $(obj).parents('.morfema_stroka').find('.morfema_spell-null')
                    .length == 0
                ) {
                  var nullEnd =
                    '<div class="morfema_spell morfema_spell-null morfema_ending_morf" name="null-end">_<div> '
                  var morfema_spellNum = $(obj)
                    .parents('.morfema_stroka')
                    .find('.morfema_spell').length
                  if (
                    $(obj)
                      .parents('.morfema_stroka')
                      .find('.morfema_spell')
                      .eq(morfema_spellNum - 1)
                      .attr('name') == 'morfema_ending_morf'
                  ) {
                    $(nullEnd).insertAfter(
                      $(obj)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell')
                        .eq(morfema_spellNum - 1)
                        .parents('.morfema_ending_morf')
                    )
                  } else
                    $(nullEnd).insertAfter(
                      $(obj)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell')
                        .eq(morfema_spellNum - 1)
                    )
                  $(obj).removeClass('morfema_choose')
                  $(obj).removeAttr('select')
                  $('.morfema_spell-null').click(function () {
                    $(this).toggleClass('morfema_choose')
                  })
                  $(this)
                    .parents('.interakt_zadanie')
                    .find('.morfema_spell-null')
                    .mousedown(function () {
                      //для запрета сброса внутрь уже проставленных морфем после сортировки
                      $(this)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell.morfema_symbols')
                        .eq(0)
                        .addClass('null-end-drop-disabled')
                      $(this)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell.morfema_symbols')
                        .each(function () {
                          /* 	if ($(this).attr("name")) {

              } */

                          if ($(this).attr('number')) {
                            //определяем символы, которые не могут быть местом для сброса по атрибуту number
                            //	if (($(this).attr("name")!='base_begin_morf')&&($(this).attr("name")!='base_end_morf')&&($(this).attr("name")!='base_morf')) {
                            var numberVal = $(this).attr('number').split(' ')
                            //console.log(numberVal)
                            for (var i = 0; i < numberVal.length; i++) {
                              var numberAmount = $(this)
                                .parents('.morfema_stroka')
                                .find('[number*=' + numberVal[i] + ']').length
                              //console.log(numberAmount)
                              if (numberAmount > 1) {
                                $(this)
                                  .parents('.morfema_stroka')
                                  .find('[number*=' + numberVal[i] + ']')
                                  .addClass('null-end-drop-disabled')
                              }
                            }
                            //	}
                          }

                          if (
                            $(this).parent().attr('class') ==
                            'morfema_ending_morf'
                          ) {
                            //определяем символы, которые не могут быть местом для сброса по атрибуту number
                            $(this).addClass('null-end-drop-disabled')
                          }
                        })
                    })

                  $(this)
                    .parents('.interakt_zadanie')
                    .find('.morfema_spell-null')
                    .mouseup(function () {
                      //для запрета сброса внутрь уже проставленных морфем после сортировки
                      //console.log(233333)
                      $(this)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell.morfema_symbols')
                        .each(function () {
                          //console.log ($(this).attr("class"))
                          if ($(this).hasClass('null-end-drop-disabled')) {
                            //определяем символы, которые не могут быть местом для сброса по атрибуту number
                            $(this).removeClass('null-end-drop-disabled')
                          }
                        })
                    })
                } else {
                  $(obj).removeClass('morfema_choose')
                  $(obj).removeAttr('select')
                }
              }

              if (name == extraSets.images.base_end) {
                var svg_pic =
                  '<div class="base_end_morf" number=' +
                  Number_of_turn +
                  ' strokeNum=' +
                  $(obj).parents('.morfema_stroka').attr('strokeNum') +
                  ' style="position:absolute; margin-left:' +
                  otstup +
                  'px; margin-top:-1.3em; width:' +
                  symbLength +
                  '%"> <svg preserveAspectRatio="none" width="100%" height="0.5em"'
                svg_pic +=
                  ' viewBox="709.5 415.5 30 10.6" enable-background="new 709.5 415.5 30 10.6" xml:space="preserve" version="1.1">'
                svg_pic +=
                  '<rect x="200.6" y="3757.7" fill="none" width="3834.3" height="401.3"/>'
                svg_pic +=
                  '<polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" points="738.5,416.5 738.5,425.2 710.5,425.2 "/>'
                svg_pic += '</svg></div>'
                $(svg_pic).insertAfter($(obj).parents('.morfema_stroka'))
                for (var i = 0; i < obj.length; i++) {
                  var nameAttr1 = $(obj[i]).attr('name')
                  if (nameAttr1) {
                    //устанавливам сигнал, что символ состоит в части слова
                    nameAttr1 += ' base_end_morf'
                    $(obj[i]).attr('name', nameAttr1)
                  } else $(obj[i]).attr('name', 'base_end_morf')

                  var NumberAttr = $(obj[i]).attr('number')
                  if (NumberAttr) {
                    //устанавливам сигнал, что символ состоит в части слова
                    NumberAttr += ' ' + Number_of_turn + ''
                    $(obj[i]).attr('number', NumberAttr)
                  } else $(obj[i]).attr('number', Number_of_turn)
                }
                $(obj).removeClass('morfema_choose')
                $(obj).removeAttr('select')
                Number_of_turn++
              }

              if (name == extraSets.images.ending) {
                //окончание
                var name = $(this).attr('name')
                $(this)
                  .parents('.morfema_work-area')
                  .find('.morfema_choose')
                  .each(function () {
                    if ($(this).attr('name')) {
                      //проверка, что окончание уже есть
                      var attrstr = $(this).attr('name')
                      //console.log(attrstr)
                      if (attrstr.indexOf('morfema_ending_morf') != -1) {
                        $(this).removeClass('morfema_choose') //снимаем выделение
                      }
                    }
                  })

                if (
                  $(this).parents('.morfema_work-area').find('.morfema_choose')
                    .length > 1
                ) {
                  var $begin_morfema_spell = $(this)
                    .parents('.morfema_work-area')
                    .find('.morfema_choose')
                    .eq(0) //первый выделенный символ в строке
                  $begin_morfema_spell.attr('select', 'select')
                  var $end = $(this)
                    .parents('.morfema_work-area')
                    .find('.morfema_choose')
                    .eq(-1) //последний выделенный символ в строке
                  var $next = $begin_morfema_spell //каждый символ между первым и последним выделенным по порядку
                  while (true) {
                    //пока цикл не прерван будем брать каждый символ по порядку
                    $next = $next.next()
                    $next.attr('select', 'select')
                    if (!$next || $next.is($end)) {
                      break
                    }
                  }
                }
                if (
                  $(this).parents('.morfema_work-area').find('.morfema_choose')
                    .length == 1
                ) {
                  $(this)
                    .parents('.morfema_work-area')
                    .find('.morfema_choose')
                    .attr('select', 'select')
                }
                $(this)
                  .parents('.morfema_work-area')
                  .find("[select = 'select']")
                  .eq(0)
                  .css({ 'margin-left': 0 })
                $(this)
                  .parents('.morfema_work-area')
                  .find('.morfema_choose')
                  .removeClass('morfema_choose')
                // console.log($(this))
                //$(this).attr("name", "morfema_ending_morf");

                $(this)
                  .parents('.morfema_work-area')
                  .find("[select = 'select']")
                  .wrapAll(
                    '<div class="morfema_ending_morf" name="' +
                      name +
                      '_morf"></div>'
                  )

                $(this)
                  .parents('.morfema_work-area')
                  .find("[select = 'select']")
                  .each(function () {
                    var nameAttr1 = $(this).attr('name')
                    if (nameAttr1) {
                      nameAttr1 += ' morfema_ending_morf'
                      $(this).attr('name', nameAttr1)
                    } else $(this).attr('name', 'morfema_ending_morf')
                    $(this).removeAttr('select')
                  })
              }

              if (name == extraSets.images.connect) {
                var name = $(this).attr('name')
                $(this)
                  .parents('.morfema_razbor_slova')
                  .find('.morfema_work-area')
                  .find('.morfema_stroka')
                  .each(function () {
                    $(this).find('.morfema_choose').addClass('morfema_connect')
                    $(this)
                      .find('.morfema_choose')
                      .each(function () {
                        var nameAttr1 = $(this).attr('name')
                        if (nameAttr1) {
                          nameAttr1 += ' connect_morf'
                          $(this).attr('name', nameAttr1)
                        } else $(this).attr('name', '' + name + '_morf')
                        $(this).css({
                          //"margin-left": 0,
                          'border-radius': '100px',
                          outline: '1px solid black',
                        })
                      })
                    $(this).find('.morfema_choose').removeAttr('select')
                    $(this)
                      .find('.morfema_choose')
                      .removeClass('morfema_choose')

                    //console.log($(this).find(".morfema_choose").length)
                  })
              }
              var checkMorfemAmount = 0

              $(this)
                .parents('.morfema_razbor_slova')
                .find('.morfema_work-area')
                .find('.morfema_stroka')
                .each(function () {
                  if ($(this).find('[name]').length != 0) checkMorfemAmount++
                })

              if (
                checkMorfemAmount ==
                $(this)
                  .parents('.morfema_razbor_slova')
                  .find('.morfema_work-area')
                  .find('.morfema_stroka').length
              )
                checkRazborAmount = 1

              if (checkRazborAmount == 1) {
                /*$(this)
                .parents(".interakt_zadanie")
                .siblings(".head")
                .find(".check_your")
                .css({ background: "url('/upload/cdn/1-5/styles/img/5.png') no-repeat", "background-size": "auto 100%" });*/
                if (!isGameStart) {
                  toggleOpacityAndEventsElement(btnTest)
                  isGameStart = true
                }
                $(this).parents('.morfema_razbor_slova').attr('name', 1)
              }
            } else {
              $(this)
                .parents('.interakt_zadanie')
                .find('.morfema_choose')
                .removeClass('morfema_choose')
            }
          })

        $(this)
          .find('.morf_del')
          .click(function () {
            //удаляем морфему
            checkingAnswerReset(controlsBox, infoBox)
            $(taskWrapper)
              .find('.morfema_choose')
              .each(function () {
                if ($(this).hasClass('morfema_spell-null')) {
                  var NullPos = $(this)
                    .parents('.morfema_stroka')
                    .find('.morfema_spell-null')
                    .index('.morfema_spell')
                  //console.log(NullPos)
                  if ($(this).attr('number')) {
                    var NullNum = $(this).attr('number')
                    var nameStr
                    var NullName = $(this).attr('name').split(' ')
                    for (var i = 0; i < NullName.length; i++) {
                      if (NullName[i] != 'null-end') {
                        nameStr = NullName[i]
                      }
                    }

                    $(this)
                      .parents('.morfema_stroka')
                      .prevAll('[number="' + $(this).attr('number') + '"]')
                      .remove()
                    $(this)
                      .parents('.morfema_stroka')
                      .nextAll('[number="' + $(this).attr('number') + '"]')
                      .remove()

                    $(this)
                      .parents('.morfema_stroka')
                      .find('[number*="' + $(this).attr('number') + '"]')
                      .each(function () {
                        var numStr = $(this).attr('number').split(' ')

                        if (numStr.length > 1) {
                          var newNum = []
                          var j = 0
                          for (var i = 0; i < numStr.length; i++) {
                            if (numStr[i] != NullNum) {
                              newNum[j] = numStr[i]
                              j++
                            }
                          }
                          $(this).attr('number', newNum)
                          var nameRep = $(this).attr('name').split(' ')
                          var newName = []
                          var k = 0
                          for (var i = 0; i < nameRep.length; i++) {
                            if (nameRep[i] != nameStr) {
                              newName[k] = nameRep[i]
                              k++
                            }
                          }
                          $(this).attr('name', newName)
                        } else {
                          $(this).removeAttr('name')
                          $(this).removeAttr('number')
                        }
                      })
                  }

                  var morfema_spellAmount = $(this)
                    .parents('.morfema_stroka')
                    .find('.morfema_spell').length
                  //console.log(111, NullPos, morfema_spellAmount);
                  var morfema_strokaNum = $(this)
                    .parents('.morfema_stroka')
                    .attr('strokenum')
                  var morfNum = []
                  var m = 0
                  for (var i = NullPos; i < morfema_spellAmount; i++) {
                    if (
                      $(this)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell')
                        .eq(i)
                        .attr('number')
                    ) {
                      var morfema_spellNumber = $(this)
                        .parents('.morfema_stroka')
                        .find('.morfema_spell')
                        .eq(i)
                        .attr('number')
                        .split(' ')
                      for (var j = 0; j < morfema_spellNumber.length; j++) {
                        if (morfNum.indexOf(morfema_spellNumber[j]) == -1) {
                          morfNum[m] = morfema_spellNumber[j]
                          m++
                        }
                      }
                    }
                  }

                  for (var i = 0; i < morfNum.length; i++) {
                    var Left = parseInt(
                      $(this)
                        .parents('.morfema_razbor_slova')
                        .find(
                          '[number=' +
                            morfNum[i] +
                            '][strokenum=' +
                            morfema_strokaNum +
                            ']'
                        )
                        .css('margin-left')
                    )
                    // console.log(Left, $(this).width(), $(this).parents(".morfema_stroka").find(".morfema_spell").eq(0).css("margin-left"));
                    Left =
                      Left -
                      $(this).width() -
                      parseInt(
                        $(this)
                          .parents('.morfema_stroka')
                          .find('.morfema_spell')
                          .eq(0)
                          .css('margin-left')
                      )
                    $(this)
                      .parents('.morfema_razbor_slova')
                      .find(
                        '[number=' +
                          morfNum[i] +
                          '][strokenum=' +
                          morfema_strokaNum +
                          ']'
                      )
                      .css({
                        'margin-left': Left, //перемещаем смещаемую морфему в новое место
                      })
                  }

                  $(this).remove()
                } else {
                  if ($(this).attr('name')) {
                    var obj = $(this) //выделенная буква

                    var obj_select = $(obj).attr('name').split(' ') //морфемы

                    var end_flag = 0
                    var connect_flag = 0

                    for (var i = 0; i < obj_select.length; i++) {
                      if (obj_select[i] == 'morfema_ending_morf') {
                        end_flag = 1
                      } else if (obj_select[i] == 'connect_morf') {
                        connect_flag = 1
                      }
                    }

                    for (var z = 0; z < obj_select.length; z++) {
                      if (obj_select[z] == 'morfema_ending_morf') {
                        continue
                      } else if (obj_select[z] == 'connect_morf') {
                        continue
                      }

                      if ($(obj).attr('number')) {
                        //console.log(3)

                        if ($(obj).attr('number').split(' ').length > 1) {
                          //если несколько морфем

                          var elemNumber = $(obj).attr('number').split(' ') //номера морфем
                          for (var m = 0; m < elemNumber.length; m++) {
                            $(obj)
                              .parents('.morfema_stroka')
                              .prevAll('[number="' + elemNumber[m] + '"]')
                              .remove()
                            $(obj)
                              .parents('.morfema_stroka')
                              .nextAll('[number="' + elemNumber[m] + '"]')
                              .remove()

                            var siblingsAttr = $(obj)
                              .parents('.morfema_stroka')
                              .find('[number*="' + elemNumber[m] + '"]')

                            if (siblingsAttr != 0) {
                              for (var j = 0; j < siblingsAttr.length; j++) {
                                if (
                                  $(siblingsAttr[j]).attr('number').split(' ')
                                    .length <= 1
                                ) {
                                  $(siblingsAttr[j]).removeAttr('name')
                                  $(siblingsAttr[j]).removeAttr('number')
                                } else {
                                  //console.log("ping")
                                  var SiblingsNum = $(siblingsAttr[j])
                                    .attr('number')
                                    .split(' ')
                                  var snum = 0
                                  var newSiblNum = []
                                  for (var i = 0; i < SiblingsNum.length; i++) {
                                    if (SiblingsNum[i] != elemNumber[m]) {
                                      newSiblNum[snum] = SiblingsNum[i]
                                      snum++
                                    }
                                  }
                                  $(siblingsAttr[j]).attr('number', newSiblNum)

                                  var newSiblName = []
                                  var sname = 0
                                  var SiblingsName = $(siblingsAttr[j])
                                    .attr('name')
                                    .split(' ')
                                  //console.log(SiblingsName)
                                  for (
                                    var i = 0;
                                    i < SiblingsName.length;
                                    i++
                                  ) {
                                    //console.log(SiblingsName[i], obj_select[z])
                                    if (SiblingsName[i] != obj_select[z]) {
                                      newSiblName[snum] = SiblingsName[i]
                                      snum++
                                    }
                                  }
                                  $(siblingsAttr[j]).attr('name', newSiblName)
                                }
                              }
                            }
                          }
                        } else {
                          /* if ($(obj).attr("name").split(" ").length>1) {
            if ($(obj).attr("name"))
          } */
                          $(obj)
                            .parents('.morfema_stroka')
                            .prevAll('[number="' + $(obj).attr('number') + '"]')
                            .remove()
                          $(obj)
                            .parents('.morfema_stroka')
                            .nextAll('[number="' + $(obj).attr('number') + '"]')
                            .remove()
                          if (
                            $(obj)
                              .attr('name')
                              .indexOf('morfema_ending_morf') == -1
                          ) {
                            $(obj)
                              .parents('.morfema_stroka')
                              .find('[number="' + $(obj).attr('number') + '"]')
                              .each(function () {
                                $(this).removeAttr('name')
                              })
                            $(obj)
                              .parents('.morfema_stroka')
                              .find('[number="' + $(obj).attr('number') + '"]')
                              .each(function () {
                                $(this).removeAttr('number')
                              })
                          }
                        }
                      }
                    }

                    if (end_flag == 1) {
                      //если выделенный символ находился в окончании
                      $(obj).parent().removeClass('ending')

                      var object_parent = $(obj).parent()
                      $(obj).removeClass('morfema_answer_true')
                      $(obj).removeClass('morfema_answer_false')
                      $(obj).removeClass('morfema_choose')

                      $(object_parent)
                        .find('.morfema_spell')
                        .eq(0)
                        .css({ 'margin-left': '0.2em' })
                      $(object_parent)
                        .find('.morfema_spell')
                        .each(function () {
                          var nameStr = $(this).attr('name')
                          nameStr = nameStr.replace(
                            new RegExp('morfema_ending_morf', 'g'),
                            ''
                          )
                          $(this).attr('name', nameStr)
                          $(this).insertBefore($(object_parent))
                        })
                      $(object_parent).remove()
                    }

                    if (connect_flag == 1) {
                      //если выделенный символ находился в соединительной гласной
                      $(obj).removeClass('morfema_connect')
                      $(obj).css({ 'border-radius': '0.3em', outline: 'none' })
                      $(obj).removeAttr('name')
                      $(obj).removeClass('morfema_choose')
                      $(obj).removeClass('morfema_answer_true')
                      $(obj).removeClass('morfema_answer_false')
                    }
                    $(this).removeClass('morfema_choose')
                    $(this).removeAttr('name')
                    $(this).removeAttr('number')
                    $(this).removeAttr('select')
                  } else {
                    $(this).removeClass('morfema_choose')
                    $(this).removeAttr('select')
                    $(this).removeAttr('number')
                    $(this).removeAttr('name')
                  }
                }
              })

            var checkSn = 0
            $(this)
              .parents('.morfema_razbor_slova')
              .find('.morfema_work-area')
              .find('.morfema_stroka')
              .each(function () {
                if ($(this).find('[name]').length != 0) checkSn++
              })

            if (
              checkSn !=
              $(this)
                .parents('.morfema_razbor_slova')
                .find('.morfema_work-area')
                .find('.morfema_stroka').length
            )
              checkRazborAmount = 0

            if (checkRazborAmount == 0) {
              if (isGameStart) {
                toggleOpacityAndEventsElement(btnTest)
                isGameStart = false
              }

              $(this).parents('.morfema_razbor_slova').attr('name', 0)
            }

            /* var endMorf = 0;
           console.log($(this).parents(".morfema_razbor_slova"))
           endMorf.length = $(this).parents(".morfema_razbor_slova");*/
          })

        $(btnTest).click(function () {
          //проверка
          if ($(taskWrapper).find('.morfema_razbor_slova').attr('name') == 1) {
            var n = 1
            var str
            var flag = 1

            $(taskWrapper)
              .find('.morfema_stroka')
              .each(function () {
                //для каждого элемента
                // console.log($(this).find(".morfema_ending_morf").length)
                if ($(this).find('rs') != 0) {
                  for (var key in Words[0][n]) {
                    //по каждой морфеме

                    var divAm = $(this).find('[name*="' + key + '"]') //проверяем что выделено учеником

                    var currentStroke = $(this)

                    var mAmount = 0
                    var mNum = Words[0][n]['' + key + ''].indexOf('<m>')
                    var mEndNum = Words[0][n]['' + key + ''].indexOf('</m>') + 4

                    while (mNum != -1) {
                      //проверяем морфемы
                      mAmount++
                      mNum = Words[0][n]['' + key + ''].indexOf('<m>', mEndNum)
                      mEndNum =
                        Words[0][n]['' + key + ''].indexOf('</m>', mNum + 3) + 4
                      // console.log(
                      //   Words[0][n]['' + key + ''],
                      //   Words[0][n]['' + key + ''],
                      //   mAmount
                      // )
                    }

                    if (
                      mAmount !=
                        $(this)
                          .parents('.morfema_razbor_slova')
                          .find(
                            '[class=' +
                              key +
                              '][strokeNum=' +
                              $(this).attr('strokeNum') +
                              ']'
                          ).length &&
                      key != 'morfema_ending_morf' &&
                      key != 'soed_glas_morf'
                    ) {
                      flag = 0
                    }

                    mNum = Words[0][n]['' + key + ''].indexOf('<m>')

                    mEndNum = Words[0][n]['' + key + ''].indexOf('</m>') + 4
                    mAmount = 0
                    if (key != 'morfema_ending_morf' || key != 'soed_glas_morf')
                      if (mNum != -1) {
                        $(this)
                          .parents('.morfema_razbor_slova')
                          .find(
                            '[class=' +
                              key +
                              '][strokeNum=' +
                              $(this).attr('strokeNum') +
                              ']'
                          )
                          .each(function () {
                            if (mNum != -1) {
                              //повторная проверка на случай, если в слове должно быть несоклько одинаковых морфем
                              mAmount++
                              var nN = $(this).attr('number')
                              var SpelLength = $(currentStroke).find(
                                '[number*=' + nN + ']'
                              ).length
                              var firstMarkedSpell = $(currentStroke)
                                .find('.morfema_spell')
                                .index(
                                  $(currentStroke)
                                    .find('[number*=' + nN + ']')
                                    .eq(0)
                                )
                              var lastMarkedSpell = $(currentStroke)
                                .find('.morfema_spell')
                                .index(
                                  $(currentStroke)
                                    .find('[number*=' + nN + ']')
                                    .eq(
                                      $(currentStroke).find(
                                        '[number*=' + nN + ']'
                                      ).length - 1
                                    )
                                )
                              var morfLength =
                                mEndNum - 4 * mAmount - mNum - 3 * mAmount
                              if (
                                SpelLength != morfLength ||
                                mNum != firstMarkedSpell ||
                                mEndNum - 3 * mAmount - 4 * mAmount - 1 !=
                                  lastMarkedSpell
                              ) {
                                flag = 0
                              }

                              mNum =
                                Words[0][n]['' + key + ''].indexOf(
                                  '<m>',
                                  mEndNum
                                ) -
                                3 * mAmount -
                                4 * mAmount
                              mEndNum =
                                Words[0][n]['' + key + ''].indexOf(
                                  '</m>',
                                  mNum + 3
                                ) + 4
                            }
                          })
                      }

                    if (key == 'morfema_ending_morf') {
                      mAmount = 0

                      if (mNum != -1) {
                        if ($(this).find('.morfema_ending_morf').length > 1) {
                          $(this)
                            .find('.morfema_ending_morf')
                            .each(function () {
                              if ($(this).hasClass('morfema_spell-null')) {
                                mAmount++
                              }
                            })
                        }

                        $(this)
                          .find('.morfema_ending_morf')
                          .each(function () {
                            // console.log($(this).parents(".morfema_stroka").find(".morfema_ending_morf").length)
                            if (mNum != -1) {
                              mAmount++
                              if ($(this).hasClass('morfema_spell-null')) {
                                if (mEndNum - 4 - mNum - 3 != 0) {
                                  flag = 0
                                }
                              }
                              if (mEndNum - 4 - mNum - 3 == 0) {
                                //для нулевого окончания
                                if (
                                  !$(this)
                                    //.find('.morfema_spell')
                                    .hasClass('morfema_spell-null')
                                ) {
                                  flag = 0
                                }

                                if (
                                  $(this)
                                    .parents('.morfema_stroka')
                                    .find('.morfema_spell')
                                    .index(
                                      this
                                      // $(this).find('.morfema_spell').eq(0)
                                    ) !=
                                  mNum - 3 * (mAmount - 1) - 4 * (mAmount - 1)
                                ) {
                                  flag = 0
                                }
                              }

                              if (
                                $(this).find('.morfema_spell').length !=
                                mEndNum - 4 - mNum - 3
                              ) {
                                flag = 0
                              }

                              if (
                                !$(this).hasClass('morfema_spell-null') &&
                                $(this)
                                  .parents('.morfema_stroka')
                                  .find('.morfema_spell')
                                  .index(
                                    $(this).find('.morfema_spell').eq(0)
                                  ) !=
                                  mNum - 3 * (mAmount - 1) - 4 * (mAmount - 1)
                              ) {
                                flag = 0
                              }
                              if (
                                !$(this).hasClass('morfema_spell-null') &&
                                $(this)
                                  .parents('.morfema_stroka')
                                  .find('.morfema_spell')
                                  .index(
                                    $(this)
                                      .find('.morfema_spell')
                                      .eq(
                                        $(this).find('.morfema_spell').length -
                                          1
                                      )
                                  ) !=
                                  mEndNum - 3 * mAmount - 4 * mAmount - 1
                              ) {
                                flag = 0
                              }
                              mNum = Words[0][n]['' + key + ''].indexOf(
                                '<m>',
                                mEndNum
                              )
                              mEndNum =
                                Words[0][n]['' + key + ''].indexOf(
                                  '</m>',
                                  mNum + 3
                                ) + 4
                            }
                          })
                      } else {
                        if ($(this).find('.morfema_ending_morf').length > 0) {
                          flag = 0
                        }
                      }
                    }

                    if (key == 'soed_glas_morf') {
                      mAmount = 0
                      if (mNum != -1) {
                        $(this)
                          .find('.morfema_connect')
                          .each(function () {
                            if (mNum != -1) {
                              mAmount++

                              if (
                                $(this)
                                  .parents('.morfema_stroka')
                                  .find('.morfema_spell')
                                  .index(this) !=
                                mNum - 3 * (mAmount - 1) - 4 * (mAmount - 1)
                              ) {
                                flag = 0
                              }

                              mNum = Words[0][n]['' + key + ''].indexOf(
                                '<m>',
                                mEndNum
                              )
                              mEndNum =
                                Words[0][n]['' + key + ''].indexOf(
                                  '</m>',
                                  mNum + 3
                                ) + 4
                            }
                          })
                      }
                    }

                    var curMorf = Words[0][n]['' + key + ''].slice(
                      Words[0][n]['' + key + ''].indexOf('<m>') + 3,
                      Words[0][n]['' + key + ''].indexOf('</m>')
                    )

                    if (
                      mAmount !=
                        $(this)
                          .parents('.morfema_razbor_slova')
                          .find(
                            '[class=' +
                              key +
                              '][strokeNum=' +
                              $(this).attr('strokeNum') +
                              ']'
                          ).length &&
                      key != 'morfema_ending_morf' &&
                      key != 'soed_glas_morf'
                    ) {
                      //если морфем поставлено больше, чем нужно
                      flag = 0
                    }

                    if (key == 'soed_glas_morf' && Words[0][n]['' + key + '']) {
                      if ($(this).find('.morfema_connect').length != 1) {
                        flag = 0
                      }
                    }

                    if (
                      key == 'morfema_ending_morf' &&
                      Words[0][n]['' + key + '']
                    ) {
                      if ($(this).find('.morfema_ending_morf').length != 1) {
                        flag = 0
                      }
                    }
                  }
                  n++
                }
              })
            if (flag !== 0) {
              checkingAnswerPositive(controlsBox, infoBox, extraSets)
            } else {
              checkingAnswerNegative(controlsBox, infoBox, extraSets)
            }
          }
        })

        $(btnReset).on('click', function () {
          //проверка
          $(taskWrapper)
            .find('.morfema_stroka')
            .each(function () {
              //для каждого элемента
              $(this)
                .find('.morfema_spell')
                .each(function () {
                  $(this).removeAttr('name')
                  $(this).removeAttr('number')
                  $(this).removeAttr('select')
                  $(this).removeClass('morfema_choose')
                })
              $(this).prevAll('[class*=morf]').remove()
              $(this).nextAll('[class*=morf]').remove()
              $(this)
                .find('.morfema_ending_morf')
                .each(function () {
                  $(this).removeClass('morfema_ending_morf')
                  $(this)
                    .find('.morfema_spell')
                    .eq(0)
                    .css({ 'margin-left': '0.2em' })
                  $(this)
                    .find('.morfema_spell')
                    .each(function () {
                      $(this).insertBefore($(this).parent())
                      $(this).removeAttr('name')
                    })
                  $(this).remove()
                })

              //if($(this).hasClass("morfema_razbor_slova"))

              $(this)
                .find('.morfema_connect')
                .each(function () {
                  //для случая соединительной гласной
                  $(this).removeClass('morfema_connect')
                  $(this).css({ 'border-radius': '0.3em', outline: 'none' })
                  $(this).removeAttr('name')
                  $(this).removeClass('morfema_choose')
                })
            })

          // $(this).siblings(".result").css({ background: "none" });
          checkingAnswerReset(controlsBox, infoBox)
          if (isGameStart) {
            toggleOpacityAndEventsElement(btnTest)
            isGameStart = false
          }

          $(this)
            .parents('.head')
            .siblings('.interakt_zadanie')
            .find('.morfema_razbor_slova')
            .attr('name', 0)
          checkRazborAmount = 0
          stopForChoose = 0
        })

        $(window).resize(function () {
          $(taskWrapper)
            .find('.morfema_stroka')
            .each(function () {
              var srokeNum = $(this).attr('strokenum')
              var ResNum = []
              var k = 0
              $(this)
                .find('.morfema_spell')
                .each(function () {
                  if ($(this).attr('number')) {
                    var spNum = $(this).attr('number').split(' ')
                    for (var i = 0; i < spNum.length; i++) {
                      if (ResNum.indexOf(spNum[i]) == -1) {
                        ResNum[k] = spNum[i]
                        k++
                      }
                    }
                  }
                })
              //console.log("resize", ResNum);

              for (var i = 0; i < ResNum.length; i++) {
                var spAmount = $(this).find(
                  '[number*=' + ResNum[i] + ']'
                ).length
                //console.log(spAmount);
                var spLength =
                  $(this).find('.morfema_spell').width() * spAmount +
                  spAmount *
                    parseInt($(this).find('.morfema_spell').css('margin-left'))
                //console.log(spLength);
                var spLeft =
                  $(this)
                    .find('[number*=' + ResNum[i] + ']')
                    .eq(0)
                    .position().left -
                  parseInt($('.morfema_work-area').css('padding')) +
                  parseInt($('.morfema_spell').css('margin-left'))
                //console.log(spLeft);

                var MorfClass = $(this)
                  .parents('.morfema_razbor_slova')
                  .find(
                    '[strokenum=' + srokeNum + '][number=' + ResNum[i] + ']'
                  )
                  .attr('class')

                if (
                  MorfClass != 'base_morf' &&
                  MorfClass != 'base_begin_morf' &&
                  MorfClass != 'base_end_morf'
                ) {
                  var SpTop =
                    $(this)
                      .find('[number*=' + ResNum[i] + ']')
                      .eq(0)
                      .position().top -
                    $(this)
                      .find('[number*=' + ResNum[i] + ']')
                      .height()
                } else {
                  var SpTop =
                    $(this)
                      .find('[number*=' + ResNum[i] + ']')
                      .eq(0)
                      .position().top +
                    25 +
                    $(this)
                      .find('[number*=' + ResNum[i] + ']')
                      .height()
                }

                $(this)
                  .parents('.morfema_razbor_slova')
                  .find(
                    '[strokenum=' + srokeNum + '][number=' + ResNum[i] + ']'
                  )
                  .css({
                    width: spLength,
                    'margin-left': spLeft,
                    top: SpTop,
                  })
              }
            })
        })
      })
  })
}
