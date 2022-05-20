;(function () {
  'use strict'
  themeManager.init()
  var cs = new CSInterface()

  document.getElementById('btn-import-1').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('importSkin(1)')
  })

  document.getElementById('btn-import-2').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('importSkin(2)')
  })

  document.getElementById('btn-import-3').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('importSkin(3)')
  })

  document.getElementById('btn-import-4').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('importSkin(4)')
  })

  document.getElementById('btn-comp').addEventListener('click', (e) => {
    e.preventDefault()
    var tabSelected =
      document.getElementsByClassName('tab-selected')[0].attributes[
        'data-number'
      ].value
    var positionArray = {}
    compInputIds.forEach((id) => {
      var value = document.getElementById(id).value
      var re = /-/gi
      var newId = id.replace(re, '_')
      positionArray[newId] = value
    })
    var script = 'composite('+tabSelected+', '+JSON.stringify(positionArray)+')'
    console.log(script)
    cs.evalScript(script)
  })
})()

function openTab(evt, tab) {
  var i, x, tabLinks
  x = document.getElementsByClassName('comp-tab')
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  tabLinks = document.getElementsByClassName('tab-link')
  for (i = 0; i < x.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' tab-selected', '')
  }
  document.getElementById(tab).style.display = 'block'
  evt.currentTarget.className += ' tab-selected'
}

// [attribute]-[number of windows]-[window number]
compInputIds = [
  'x-1-1',
  'y-1-1',
  's-1-1',
  'x-2-1',
  'y-2-1',
  's-2-1',
  'x-2-2',
  'y-2-2',
  's-2-2',
  'x-3-1',
  'y-3-1',
  's-3-1',
  'x-3-2',
  'y-3-2',
  's-3-2',
  'x-3-3',
  'y-3-3',
  's-3-3',
  'x-4-1',
  'y-4-1',
  's-4-1',
  'x-4-2',
  'y-4-2',
  's-4-2',
  'x-4-3',
  'y-4-3',
  's-4-3',
  'x-4-4',
  'y-4-4',
  's-4-4',
]

compInputIds.forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    localStorage.setItem(id, document.getElementById(id).value)
  })
})

document.getElementById('btn-clear-cache').addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.clear()
})

window.onload = () => {
  compInputIds.forEach((id) => {
    var element = document.getElementById(id)
    var value = localStorage.getItem(id)
    value ? (element.value = value) : (element.value = 0)
  })
}
