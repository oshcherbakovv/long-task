import './style.css'

addItemButton.addEventListener('click', appendListItem)
clearButton.addEventListener('click', clearList)
runLongTaskButton.addEventListener('click', someFunction)

let index = 0

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

// yield to main
function yieldToMain() {
  if (globalThis.scheduler?.yield) {
    return scheduler.yield()
  }

  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

async function someFunction() {
  doSomething()

  // 1
  // setTimeout(() => {
  //   doSomethingElse()
  // }, 0)

  // 2
  // await yieldToMain()

  // 3
  // await scheduler.yield()

  // 4
  scheduler.postTask(() => doSomethingElse('background'), { priority: 'background' })
  scheduler.postTask(() => doSomethingElse('user-blocking'), { priority: 'user-blocking' })
  scheduler.postTask(() => doSomethingElse('user-visible'), { priority: 'user-visible' })
}

function doSomething() {
  longFunc()
}

function doSomethingElse(arg) {
  longFunc(arg)
}

function longFunc(arg, delay = 2000) {
  console.info(arg)
  console.info(`%cБлокирую основной поток на ${Math.floor(delay / 1000)} секунд`, 'color: red;')

  const startTime = Date.now()

  console.info('Выполняю длинную задачу...')

  while (Date.now() - startTime < delay) {}

  console.info('%cОсновной поток разблокирован', 'color: green;')
}

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry)
  })
})

observer.observe({ type: 'longtask' })
