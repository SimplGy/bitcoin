blockDisplay = require 'pages/block-display/block-display'

if document.readyState != 'loading'
  blockDisplay.init()
else
  document.addEventListener 'DOMContentLoaded', blockDisplay.init
