const houseByOptionIndex = ["flame", "wisdom", "shadow", "earth"];

const questions = [
  {
    text: "You enter a mysterious magical academy for the first time. What do you notice first?",
    options: [
      "The huge battle statues near the gate",
      "The old library tower",
      "The hidden dark hallway",
      "The peaceful garden courtyard"
    ]
  },
  {
    text: "A friend is in trouble. What do you do?",
    options: [
      "Act immediately and protect them",
      "Think carefully and find the smartest solution",
      "Find out who caused the problem and stop them",
      "Stay beside your friend and support them"
    ]
  },
  {
    text: "Which magical subject would you enjoy most?",
    options: [
      "Combat magic",
      "Ancient spells and magical theory",
      "Dark mysteries and hidden powers",
      "Healing magic and nature spells"
    ]
  },
  {
    text: "What is your biggest strength?",
    options: [
      "Courage",
      "Intelligence",
      "Ambition",
      "Loyalty"
    ]
  },
  {
    text: "You find a powerful magical object. What do you do?",
    options: [
      "Use it to protect everyone right away",
      "Study it deeply before using it",
      "Keep it hidden and use it strategically",
      "Guard it carefully and use it only to help others"
    ]
  },
  {
    text: "Which place feels most like home?",
    options: [
      "A castle training ground",
      "A quiet library",
      "A hidden underground chamber",
      "A warm forest cabin"
    ]
  },
  {
    text: "What kind of leader are you?",
    options: [
      "Brave and inspiring",
      "Wise and fair",
      "Strategic and powerful",
      "Caring and protective"
    ]
  },
  {
    text: "Your biggest weakness might be:",
    options: [
      "Acting too fast",
      "Overthinking",
      "Being too secretive",
      "Trusting people too much"
    ]
  },
  {
    text: "Choose a magical creature.",
    options: [
      "Phoenix",
      "Owl",
      "Serpent",
      "Wolf"
    ]
  },
  {
    text: "What motivates you most?",
    options: [
      "Becoming stronger",
      "Learning the truth",
      "Achieving greatness",
      "Protecting people you care about"
    ]
  },
  {
    text: "In a dangerous situation, you usually:",
    options: [
      "Face it directly",
      "Observe before acting",
      "Use strategy to win",
      "Help others escape first"
    ]
  },
  {
    text: "Pick a symbol.",
    options: [
      "Fire",
      "Star",
      "Moon",
      "Tree"
    ]
  }
];

const resultContent = {
  flame: {
    className: "flame",
    title: "Result: Gryffindor",
    intro: "You belong to Gryffindor.",
    crest: "assets/houses/gryffindor.png",
    crestAlt: "Gryffindor crest",
    bodyA: "You are brave, passionate, and full of energy. You do not like standing still when something important is happening. You are the type of person who takes action, protects others, and faces challenges directly.",
    bodyB: "Your strength is courage. Your weakness is that sometimes you may act before thinking. But when your heart is in the right place, you can become a powerful leader.",
    stats: "Traits: Brave, bold, energetic, protective | Symbol: Fire | Color: Red / Gold | Best role: Warrior, leader, protector"
  },
  wisdom: {
    className: "wisdom",
    title: "Result: Ravenclaw",
    intro: "You belong to Ravenclaw.",
    crest: "assets/houses/ravenclaw.png",
    crestAlt: "Ravenclaw crest",
    bodyA: "You are thoughtful, intelligent, and curious. You enjoy learning new things and understanding the deeper meaning behind situations. You may not always rush into action, but when you act, you usually have a good reason.",
    bodyB: "Your strength is knowledge. Your weakness is overthinking. But your calm mind and sharp thinking make you someone others can trust.",
    stats: "Traits: Intelligent, calm, creative, curious | Symbol: Star | Color: Blue / Silver | Best role: Scholar, strategist, spell master"
  },
  shadow: {
    className: "shadow",
    title: "Result: Slytherin",
    intro: "You belong to Slytherin.",
    crest: "assets/houses/slytherin.png",
    crestAlt: "Slytherin crest",
    bodyA: "You are ambitious, mysterious, and strategic. You think deeply, plan carefully, and do not easily reveal your next move. You are not afraid of power, success, or difficult paths.",
    bodyB: "Your strength is ambition. Your weakness is that people may not always understand your intentions. But when you use your power wisely, you can achieve great things.",
    stats: "Traits: Ambitious, clever, mysterious, focused | Symbol: Moon | Color: Black / Purple | Best role: Strategist, ruler, mystery seeker"
  },
  earth: {
    className: "earth",
    title: "Result: Hufflepuff",
    intro: "You belong to Hufflepuff.",
    crest: "assets/houses/hufflepuff.png",
    crestAlt: "Hufflepuff crest",
    bodyA: "You are loyal, kind, patient, and dependable. You care deeply about the people around you and often become the emotional support of your group. You may not always seek attention, but your presence matters.",
    bodyB: "Your strength is loyalty. Your weakness is that you may sometimes put others before yourself too much. But your heart and patience make you truly valuable.",
    stats: "Traits: Loyal, kind, patient, trustworthy | Symbol: Tree | Color: Green / Brown | Best role: Healer, guardian, peacekeeper"
  }
};

const quizShell = document.getElementById("quizShell");
const resultSection = document.getElementById("resultSection");
const crestShowcase = document.getElementById("crestShowcase");
const introScreen = document.getElementById("introScreen");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const hintText = document.getElementById("hintText");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultIntro = document.getElementById("resultIntro");
const resultBodyA = document.getElementById("resultBodyA");
const resultBodyB = document.getElementById("resultBodyB");
const resultStats = document.getElementById("resultStats");
const resultCrest = document.getElementById("resultCrest");
const pageBody = document.body;

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);

function renderQuestion() {
  const current = questions[currentQuestionIndex];
  const answeredIndex = selectedAnswers[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressFill.style.width = `${progressValue}%`;
  questionText.textContent = current.text;
  hintText.textContent = "";

  optionsContainer.innerHTML = "";
  current.options.forEach((optionText, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = optionText;
    button.setAttribute("aria-pressed", "false");

    if (answeredIndex === optionIndex) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
    }

    button.addEventListener("click", () => {
      selectedAnswers[currentQuestionIndex] = optionIndex;
      renderQuestion();
    });

    optionsContainer.appendChild(button);
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Reveal My House" : "Next Question";
}

function getWinningHouse() {
  const scores = {
    flame: 0,
    wisdom: 0,
    shadow: 0,
    earth: 0
  };

  selectedAnswers.forEach((optionIndex) => {
    const house = houseByOptionIndex[optionIndex];
    scores[house] += 1;
  });

  const maxScore = Math.max(...Object.values(scores));
  const tiedHouses = Object.keys(scores).filter((house) => scores[house] === maxScore);

  if (tiedHouses.length === 1) {
    return tiedHouses[0];
  }

  for (let i = selectedAnswers.length - 1; i >= 0; i -= 1) {
    const house = houseByOptionIndex[selectedAnswers[i]];
    if (tiedHouses.includes(house)) {
      return house;
    }
  }

  return "flame";
}

function showResult() {
  const winner = getWinningHouse();
  const content = resultContent[winner];
  const houseClasses = ["flame", "wisdom", "shadow", "earth"];

  houseClasses.forEach((houseClass) => {
    resultCard.classList.remove(houseClass);
  });

  resultCard.classList.add(content.className);
  resultCrest.src = content.crest;
  resultCrest.alt = content.crestAlt;
  resultCrest.classList.remove("animate-in");
  void resultCrest.offsetWidth;
  resultCrest.classList.add("animate-in");
  resultTitle.textContent = content.title;
  resultIntro.textContent = content.intro;
  resultBodyA.textContent = content.bodyA;
  resultBodyB.textContent = content.bodyB;
  resultStats.textContent = content.stats;

  introScreen.classList.add("hidden");
  quizShell.classList.add("hidden");
  resultSection.classList.remove("hidden");
  crestShowcase.classList.add("hidden");
  pageBody.classList.add("result-mode");
}

function handleNext() {
  if (selectedAnswers[currentQuestionIndex] === null) {
    hintText.textContent = "Please select an answer before moving forward.";
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    showResult();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
}

function handlePrevious() {
  if (currentQuestionIndex === 0) {
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  selectedAnswers = new Array(questions.length).fill(null);
  resultSection.classList.add("hidden");
  quizShell.classList.remove("hidden");
  introScreen.classList.add("hidden");
  crestShowcase.classList.remove("hidden");
  resultCrest.classList.remove("animate-in");
  pageBody.classList.remove("result-mode");
  renderQuestion();
}

function startQuiz() {
  introScreen.classList.add("hidden");
  quizShell.classList.remove("hidden");
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", handlePrevious);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
