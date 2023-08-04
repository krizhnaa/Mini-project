
let paragraphs;

fetch('paragraphs.json')
  .then(response => response.json())
  .then(data => {
    paragraphs = data;
    console.log('Fetched data:', paragraphs); 
    loadParagraph();

    inpField.addEventListener("input", initTyping);
    tryAgainBtn.addEventListener("click", resetGame);
  })
  .catch(error => console.error('Error fetching data:', error));




const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 20,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

    function loadParagraph() {
        const ranIndex = Math.floor(Math.random() * paragraphs.length);
        const paragraphText = paragraphs[ranIndex].text;
        
        typingText.innerHTML = "";
        paragraphText.split("").forEach(char => {
          let span = `<span>${char}</span>`;
          typingText.innerHTML += span;
        });
      
        typingText.querySelectorAll("span")[0].classList.add("active");
        document.addEventListener("keydown", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
      }
      

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
        if (timeLeft === 0) {
            console.log(wpm)
            if (wpm <= 50) {
                alert('You have not improved')
                // window.location.href = "intermediate/intermediate.html"
            }
            else {
                alert('You are still a pro')
                window.location.href = "../expert/expert.html"
            }
        }
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);



