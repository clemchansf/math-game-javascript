const gameElement = document.querySelector(".game")
const gameForm = document.querySelector('.game-form')
const formField = document.querySelector('.form-field')
const pointsNeededField = document.querySelector('.points-needed')
const mistakesAllowedField = document.querySelector('.mistakes-allowed')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('.end-message')
const resetButton = document.querySelector('.reset-button')


function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateGame() {
  return {
    firstNumber: generateNumber(10),
    secondNumber: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateGame() {
  state.currentProblem = generateGame()
  const p = state.currentProblem
  gameElement.innerHTML = `<span>${p.firstNumber}</span> ${p.operator} <span>${p.secondNumber}</span>`
  formField.value = ""
  formField.focus()
}

updateGame()

gameForm.addEventListener("submit", e => {
  e.preventDefault();
  checkAnswer()
})

function checkAnswer() {

  let p = state.currentProblem
  let currentAnswer
  if (p.operator === '+') currentAnswer = p.firstNumber + p.secondNumber
  if (p.operator === '-') currentAnswer = p.firstNumber - p.secondNumber
  if (p.operator === 'x') currentAnswer = p.firstNumber * p.secondNumber

  if (parseInt(formField.value, 10) === currentAnswer) {
    state.score++
    pointsNeededField.textContent = 10 - state.score
    updateGame()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowedField.textContent = 3 - state.wrongAnswers
    // updateGame()
    gameElement.classList.add("animate-wrong")
    setTimeout(() => gameElement.classList.remove("animate-wrong"), 331)
  }

  checkLogic()
}

function checkLogic() {
  if (state.score === 10) {
    endMessage.textContent = "Congrats, you won!"
    document.body.classList.add("overlay-is-open")
    // resetGame(), move manual reset to user interaction handler

    // animation takes .33 s to complete, set docus on start over button
    // in .331s, for user to use space bar to start game over again
    setTimeout(() => resetButton.focus(), 331)

  }

  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, you lose!"
    document.body.classList.add("overlay-is-open")
    // resetGame()

    // animation takes .33 s to complete, set docus on start over button
    // in .331s, for user to use space bar to start game over again
    setTimeout(() => resetButton.focus(), 331)
  }

  // return default, if neither condition are met
}

resetButton.addEventListener('click', resetGame)

function resetGame() {
  updateGame()
  // remove overlay
  document.body.classList.remove("overlay-is-open")
  state.score = 0
  state.wrongAnswers = 0
  pointsNeededField.textContent = 10
  mistakesAllowedField.textContent = 3
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}