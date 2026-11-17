const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry)
  })
})

observer.observe({ type: 'longtask' })

function yieldToMain() {
  if (globalThis.scheduler?.yield) {
    return scheduler.yield()
  }

  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
