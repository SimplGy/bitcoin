# A very shallow, lightweight version of the browser, meant only to avoid errors.
# Don't expect any event handling, DOM node creation, etc.

window = {}
document =
  createElement: -> {}
  body:
    appendChild: ->



global.window = window
global.document = document

#module.exports =
#  window: window
#  document: document