self.addEventListener('message', (message) => {
  console.log('%cСообщение из main thread: ', 'color: gray;', message)

  if (message.data === 'start') {
    someFunction()

    postMessage('Задача выполнена')
  }
})

async function someFunction() {
  doSomething()
  doSomethingElse()
}

function doSomething() {
  longFunc()
}

function doSomethingElse() {
  longFunc()
}

function longFunc(delay = 2000) {
  const startTime = Date.now()

  console.info('%cВыполняю длинную задачу в worker...', 'color: red;')

  while (Date.now() - startTime < delay) {}

  console.info('%cЗадача выполнена', 'color: green;')
}
