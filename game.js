const question = document.querySelector('question')
const choices = Array.from(document.querySelector('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('score')
const progressBarFull = document.querySelector('progressBarrFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'what is 2+2?',
    choice1: '2',
    choice2: '4',
    choice3: '45',
    choice4: '6',
    answer: 2
  },
  {
    question: 'What is 3+2',
    choice1: '5',
    choice2: '4',
    choice3: '21',
    choice4: '3',
    answer: 1
  },
  {
    question: 'What is 7-1',
    choice1: '2',
    choice2: '4',
    choice3: '6',
    choice4: '3',
    answer: 3
  },
  {
    question: 'What is 8+10',
    choice1: '2',
    choice2: '4',
    choice3: '21',
    choice4: '18',
    answer: 4
  }
]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQquestion()
}

getNewQquestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

  progressBarFull.style.width = ` ${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choices.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classtoApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    if (classtoApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classtoApply)
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classtoApply)
      getNewQquestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}
startGame()
