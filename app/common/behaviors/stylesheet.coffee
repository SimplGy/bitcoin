
css = null

onReady = ->
  css = document.createElement 'style' # Browsers recognize them anywhere. Avoids cross browser issues of document.getElementsByTagName("head")[0] insertRule/addRule
  css.type = "text/css"
  document.body.appendChild css

if document.readyState != 'loading'
  onReady()
else
  document.addEventListener 'DOMContentLoaded', onReady



module.exports =
  # Given a string css rule, add it to the stylesheet
  # format: stylesheet.add '.myClass',  'color: red; font-weight: bold;'
  # returns the selector
  add: (selector, rules) ->
    css.innerHTML += "#{selector} { #{rules} }\n"
#    console.log 'stylesheet.add()', css.innerHTML
    selector

  # Remove all instances of the given selector from the stylesheet
  remove: (selector) ->
    lines = css.innerHTML.split '\n'
    i = lines.length - 1
    removeCount = 0
    while i >= 0
      line = lines[i]
      if line.indexOf("#{selector} { ") isnt -1
        lines.splice i, 1
        removeCount++
      i--
    css.innerHTML = lines.join '\n'
#    console.log 'stylesheet.remove() ' + removeCount, css.innerHTML
    removeCount


