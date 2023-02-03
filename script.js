// Elements
const selection = document.querySelector('.selection');
const display = document.querySelector('.display');
const user = document.querySelector('.user');
const ranks = document.querySelector('#ranks');
const userStats = document.querySelector('#userStats');
const timer = document.querySelector('#timer');
const words = document.querySelector('#words');
const userWords = document.querySelector('#userWords');
const userInfo = document.querySelector('#user');
const body = document.querySelector('body');
const githubLogo = document.querySelector('#github');

// Buttons 
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

// Game Data
const challenges = [
    {
        challenge: "The quick brown fox jumps over the lazy dog. The quick brown dog soon caught up and they became friends."
    },
    {
        challenge: "A prince sets out on a journey to find true love and become a great king. He overcomes challenges and finds happiness in the end."
    },
    {
        challenge: "It was the best of times, it was the worst of times. Society was split between wisdom and foolishness, belief and incredulity."
    },
    {
        challenge: "Our fathers brought forth a new nation conceived in Liberty. The nation faces a great civil war to test its endurance."
    },
    {
        challenge: "To be or not to be, that is the question. Is it nobler to suffer or to take arms against troubles?"
    },
    {
        challenge: "A war between the Galactic Empire and the Rebel Alliance takes place in a far away galaxy. The Rebels triumph over the Empire."
    },
    {
        challenge: "The road less traveled has made all the difference. It has led to self-discovery, growth, and appreciation for life."
    },
    {
        challenge: "There are many variations of Lorem Ipsum passages. Most have been altered by injected humor or random words."
    },
    {
        challenge: "Call me Ishmael. I am the narrator of a tale of adventure, discovery, and a search for meaning."
    },
    {
        challenge: "A young man sets out on a journey to see the world. He discovers beauty, kindness, and bravery along the way."
    }
]

// Game Variables
let usersName;
let currentChallenge;
let time = 0;
let count = 0;
let wordsArray = [];
let userInputArray = [];
let userScore = 0;
let userErrors = 0;
let index = 0;

// Startup
const start = () => {
    usersName = prompt('Please type in your name');
    userInfo.textContent = `Up for a challenge ${usersName}?`
    initiateChallenges();
}

// Helper Functions
const changeChallenge = (e) => {
    words.innerHTML = '';
    currentChallenge = challenges[e.target.id];
    wordsArray = currentChallenge.challenge.split('');
    wordsArray.map((letter, index) => {
        let element = document.createElement('span');
        element.className = 'letter';
        element.id = index;
        element.textContent = letter;
        words.append(element);
    })
    resetStats();
    startButton.style.cursor = 'pointer';
    resetButton.style.cursor = 'pointer';
}

const initiateChallenges = () => {
    challenges.forEach((challenge, index) => {
        let button = document.createElement('button');
        button.textContent = `Challenge ${index+1}`;
        button.id = index;
        button.className = 'button'
        button.addEventListener('click', changeChallenge);
        selection.appendChild(button);
    })
}

const countdown = () => {
    time++;
    if(time <= 1) {
        timer.textContent = `${time} second`;
    } else {
        timer.textContent = `${time} seconds`;
    }
    checkSolution();
}

const checkSolution = () => {
    if(userInputArray.length === wordsArray.length) {
        completeChallenge();
    }
}

const startChallenge = () => {
    window.removeEventListener('keyup', secretFunction);
    window.addEventListener('keydown', startOrStop)
    count = setInterval(countdown, 1000);
}

const completeChallenge = () => {
    window.removeEventListener('keydown', startOrStop);
    window.clearInterval(countdown);
    window.addEventListener('keyup', secretFunction);
    index = 0;
    calculateStats()
}

const calculateStats = () => {
    let count = wordsArray.length;
    userInputArray.map((letter, index) => {
        if(letter != wordsArray[index]) {
            count--;
        }
    })
    userScore = Math.trunc((count / wordsArray.length) * 100);
    createUserStats();
}

const createUserStats = () => {
    userStats.innerHTML = '';
    let rating = document.createElement('li');
    rating.className = 'items';
    rating.textContent = `${userScore} %`;
    let errors = document.createElement('li');
    errors.className = 'items';
    errors.textContent = `${userErrors} Errors`;
    userStats.appendChild(rating);
    userStats.appendChild(errors);
    userInfo.textContent = `How did you do ${usersName}?`
    userStats.style.visibility = 'visible';
}

const resetChallenge = () => {
    userInputArray = [];
    userStats.innerHTML = '';
    clearInterval(count);
    resetStats();
}

const resetStats = () => {
    index = 0;
    userErrors = 0;
    userScore = 0;
    time = 0;
    words.childNodes.forEach(child => {
        child.style.color = '#000';
    });
    userInfo.textContent = `Up for a challenge ${usersName}?`
}

const startOrStop = (e) => {
    if(e.key !== 'Shift') {
        if(e.key === wordsArray[index]) {
            words.children[index].style.color = 'green';
        } else {
            words.children[index].style.color = 'red';
            userErrors++;
        }
        index++;
        userInputArray.push(e.key);
    }    
}

// Event Listeners
startButton.addEventListener('click', startChallenge);
resetButton.addEventListener('click', resetChallenge);

start();

// Secrets
const testCode = [];
const secretCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a','Enter']
const secretFunction = (e) => {
    testCode.push(e.key);
    testCode.splice(-secretCode.length - 1, testCode.length - secretCode.length);
    console.log(testCode, secretCode);
    if(JSON.stringify(testCode) === JSON.stringify(secretCode)) {
        body.style.backgroundColor = '#000';
        body.style.color = '#FFF';
        githubLogo.style.color = '#FFF';
    }
}

window.addEventListener('keyup', secretFunction);