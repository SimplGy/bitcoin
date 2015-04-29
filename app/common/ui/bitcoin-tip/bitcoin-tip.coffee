# Create a bitcoin donation button. Requires a dom element to already exisit.
# Depends on google's chart API to generate the QR code.

attr = 'bitcoin-tip-address'
sel = "[#{attr}]"
address = null
#makeQr = (addr) -> "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=#{addr}"
makeQr = (addr) -> "https://chart.googleapis.com/chart?cht=qr&chl=bitcoin:#{addr}?amount=0.02&choe=UTF-8&chs=300x300"

init = ->
  el = document.querySelector sel
  return console.warn "Can't create a tip button without an element #{sel}" unless el
  address = el.getAttribute attr
  return console.warn "Can't make a meaningful tip button without an address", el unless address
  el.className += ' bitcoin-tip'
  el.href = makeQr address
  el.target = '_blank'









if document.readyState != 'loading'
  init()
else
  document.addEventListener 'DOMContentLoaded', init







