class FsmGuessingGame {

  constructor() {
    this.currentState = "START"
    this.numberToGuess = this.randomNumber()
    this.allGuesses = document.querySelector("#all-guesses")
    this.userGuess = document.querySelector("#user-guess");
    this.userGuess.addEventListener("submit", this.listenForSubmit)
  }

  states = {
    START: (_) => {
      this.numberToGuess = this.randomNumber()
      while(this.allGuesses.firstChild) {
        this.allGuesses.removeChild(this.allGuesses.firstChild)
      }
    },
    GUESS: (userGuess) => {
      let answer = this.checkGuess(userGuess)
      if(answer === "correct") {
        this.progress("CORRECT")
        this.dispatch(userGuess)
      } else if(answer === "high") {
        this.progress("HIGH")
        this.dispatch(userGuess)
      } else if(answer === "low") {
        this.progress("LOW")
        this.dispatch(userGuess)
      } 
    },
    HIGH: (userGuess) => {
      let newElem = this.generateElement(userGuess)
      newElem.classList.add("too-high")
      this.allGuesses.appendChild(newElem)
      this.progress("GUESS")
    },
    LOW:  (userGuess) => {
      let newElem = this.generateElement(userGuess)
      newElem.classList.add("too-low")
      this.allGuesses.appendChild(newElem)
      this.progress("GUESS")
    },
    CORRECT: (userGuess) => {
      let newElem = this.generateElement(userGuess)
      newElem.classList.add("correct")
      this.allGuesses.appendChild(newElem)
      this.progress("START")
      setTimeout(this.dispatch.bind(this), 3000)
    }
  }

  progress(newState) {
    console.log("progress: ", newState)
    this.currentState = newState
  }

  checkGuess(newGuess) {
    console.log("checkGuess: ", newGuess)
    newGuess = parseInt(newGuess)
    if(newGuess === this.numberToGuess) {
      return 'correct'
    } else if(newGuess > this.numberToGuess) {
      return 'high'
    } else if (newGuess < this.numberToGuess) {
      return 'low'
    }
  }

  listenForSubmit = (e) => {
    console.log(this.numberToGuess)
    let newGuess = this.userGuess.elements.guess.value
    if(newGuess) {
      this.progress('GUESS')
      this.dispatch(newGuess)
    } else {
      this.dispatch()
    }
    e.preventDefault();
    this.userGuess.reset()
  }

  dispatch(userGuess) {
    console.log(this.currentState)
    this.states[this.currentState](userGuess)
  }

  generateElement(newGuess) {
    newGuess = parseInt(newGuess)
    let singleGuess = document.createElement("span")
    singleGuess.innerHTML = newGuess
    return singleGuess
  }

  randomNumber() {
    return Math.floor(Math.random() * 3 + 1)
  }

}

new FsmGuessingGame()
