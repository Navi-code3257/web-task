// --- Quiz Section ---
const quizData = [
  {
    question: "What does CSS stand for?",
    answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Syntax"],
    correct: 1
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    answers: ["<js>", "<javascript>", "<script>"],
    correct: 2
  }
];

let currentQuiz = 0;
const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");

function loadQuiz() {
  const q = quizData[currentQuiz];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.answers
      .map(
        (ans, i) => `
        <label>
          <input type="radio" name="answer" value="${i}" /> ${ans}
        </label><br/>
      `
      )
      .join("")}
  `;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer!");
  const isCorrect = Number(selected.value) === quizData[currentQuiz].correct;
  alert(isCorrect ? "✅ Correct!" : "❌ Wrong!");

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quizContainer.innerHTML = "<h3>🎉 Quiz completed!</h3>";
    nextBtn.style.display = "none";
  }
});

loadQuiz();

// --- Joke API Section ---
const setup = document.getElementById("joke-setup");
const punchline = document.getElementById("joke-punchline");
const newJokeBtn = document.getElementById("new-joke");

async function fetchJoke() {
  setup.textContent = "Loading...";
  punchline.textContent = "";

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    setup.textContent = data.setup;
    punchline.textContent = data.punchline;
  } catch (error) {
    setup.textContent = "Failed to load joke.";
  }
}

newJokeBtn.addEventListener("click", fetchJoke);
fetchJoke();
