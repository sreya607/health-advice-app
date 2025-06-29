
const adviceBox = document.getElementById('advice');
const symptomBox = document.getElementById('symptoms');

document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

function getAdvice() {
  const text = symptomBox.value.toLowerCase().trim();
  if (!text) {
    adviceBox.value = "⚠ Please enter some symptoms first.";
    return;
  }

  let response = "";

  if (text.includes("fever")) {
    response += "🧊 Stay hydrated. Take paracetamol and rest.\n";
  }
  if (text.includes("headache")) {
    response += "💤 Rest in a dark room. Drink water.\n";
  }
  if (text.includes("cold") || text.includes("cough")) {
    response += "🍵 Drink warm liquids. Try steam inhalation.\n";
  }
  if (text.includes("vomit") || text.includes("nausea")) {
    response += "🥤 Sip ORS. Avoid heavy food. Consult doctor if frequent.\n";
  }
  if (!response) {
    response = "🤖 No specific advice found. Please consult a physician.";
  }

  adviceBox.value = response;
  saveHistory(text, response);
}

function startSpeech() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    symptomBox.value = event.results[0][0].transcript;
  };
  recognition.start();
}

function speakAdvice() {
  const msg = new SpeechSynthesisUtterance(adviceBox.value);
  window.speechSynthesis.speak(msg);
}

function downloadPDF() {
  alert("📄 PDF Downloaded (simulated). Real PDF requires html2pdf or jsPDF.");
}

function saveHistory(symptom, advice) {
  const existing = JSON.parse(localStorage.getItem("adviceHistory") || "[]");
  existing.push({ symptom, advice, time: new Date().toLocaleString() });
  localStorage.setItem("adviceHistory", JSON.stringify(existing));
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value.trim();

  // Hardcoded correct credentials
  var correctUsername = "admin";
  var correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    // Successful login - redirect to index.html
    window.location.href = "index.html";
  } else {
    // Show error message
    document.getElementById("errorMessage").innerText = "Invalid username or password.";
  }
});
