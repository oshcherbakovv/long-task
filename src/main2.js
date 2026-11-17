import Worker from './worker?worker'

import './style.css'

addItemButton.addEventListener('click', appendListItem)
clearButton.addEventListener('click', clearList)
runLongTaskButton.addEventListener('click', startWorker)

let index = 0
const worker = new Worker()

function appendListItem() {
  const listItem = document.createElement('li')

  listItem.textContent = `Item ${index + 1}`

  list.appendChild(listItem)

  console.info(`%cItem ${index + 1} добавлен`, 'color: blue;')

  index += 1
}

function clearList() {
  list.innerHTML = ''

  console.clear()

  index = 0
}

function startWorker() {
  worker.postMessage('start')

  worker.onmessage = (message) => {
    console.log('%cСообщение из worker: ', 'color: gray;', message)
  }
}
