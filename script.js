const circle = document.getElementById('circle')
const startButton = document.getElementById('button_start')
const sec = document.getElementById('sec')
const minute = document.getElementById('min')
const hours = document.getElementById('hours')
const roundButton = document.getElementById('button_round')
const timerBlock = document.getElementById('timer-block')

const STEP = 0.6

let deg = STEP
let secCount = 1
let minCount = 0
let hourCount = 0
let roundCounter = 1

let rotateLoop
let counterLoop

const rotate = () => {
  circle.style.transform = `rotate(${deg}deg)`
  deg += STEP
}

const count = () => {
  sec.innerText = secCount < 10 ? `0${secCount}` : secCount
  if (secCount >= 60) {
    secCount = 0
    sec.innerText = '00'
    minCount += 1
    minute.innerText = minCount < 10 ? `0${minCount}` : minCount
  }
  if (minCount >= 60) {
    minCount = 0
    minute.innerText = '00'
    hourCount += 1
    hours.innerText = hours < 10 ? `0${hourCount}` : hourCount
  }
  secCount += 1
}

function click() {
  rotateLoop = setInterval(rotate, 100)
  counterLoop = setInterval(count, 1000)
}

function stopAll() {
  clearInterval(counterLoop)
  clearInterval(rotateLoop)

  secCount = 1
  minCount = 0
  hourCount = 0

  circle.style.transform = `rotate(${0}deg)`
  deg = STEP

  sec.innerText = '00'
  minute.innerText = '00'
  hours.innerText = '00'
}

startButton.addEventListener('click', () => {
  if (startButton.classList.value.includes('active')) {
    startButton.classList.remove('active')
    startButton.innerText = 'START'
    stopAll()
  } else {
    startButton.classList.add('active')
    startButton.innerText = 'STOP'
    const spans = document.querySelectorAll('.round-block')
    console.log('spans', spans)
    click()
  }
})

function round() {
  const roundBlock = document.querySelector('.round-block')
  const li = document.createElement('li')
  li.innerText = `${roundCounter}  ${hours.innerText} : ${minute.innerText} : ${sec.innerText}`
  li.className = 'round-item'
  roundBlock.prepend(li)
  roundCounter += 1
}

roundButton.addEventListener('click', round)