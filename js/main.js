;(function () {
  'use strict'
  themeManager.init()
  var cs = new CSInterface()

  document.getElementById('button1').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('importSkin()')
  })

  document.getElementById('button2').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('compIt(501, 653, 46.4, 1417, 651, 46.4)')
  })

  document.getElementById('button3').addEventListener('click', (e) => {
    e.preventDefault()
    cs.evalScript('compIt(501, 653, 46.4, 1417, 651, 46.4)')
  })
})()
