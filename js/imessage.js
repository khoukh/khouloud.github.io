window.addEventListener("load", () => {
  const chat = document.getElementById("chat");
  const imessageSection = document.getElementById("imessage-section");
  const desktopSection = document.getElementById("desktop-section");
  const sendSound = document.getElementById("sendSound");
  const receiveSound = document.getElementById("receiveSound");

  if (sessionStorage.getItem("introShown")) {
    imessageSection.classList.add("hidden");
    desktopSection.classList.remove("hidden");
    return;
  }

  let audioUnlocked = false;

  // CREATE SOUND HINT
  const soundHint = document.createElement("div");
  soundHint.id = "sound-hint";
  soundHint.textContent = "🔊 Tap anywhere to enable sound";
  document.body.appendChild(soundHint);

  // Fade in hint
  requestAnimationFrame(() => soundHint.classList.add("visible"));

  function playSound(sound) {
    if (!audioUnlocked) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function startIntro() {
    soundHint.classList.remove("visible");
    soundHint.classList.add("hidden");
    imessageSection.classList.remove("hidden");

    let index = 0;
    const messages = [
      { from: "them", text: "Hey Khouloud, what do you do?" },
      { from: "me", text: "I’m a Data Analyst with a focus on marketing data." },
      { from: "them", text: "Can you show me?" }
    ];

    function showMessage() {
      if (index >= messages.length) {
        const welcomeMsg = document.createElement("div");
        welcomeMsg.classList.add("bubble", "me", "welcome");
        welcomeMsg.textContent = "Sure, welcome to my workspace!";
        chat.appendChild(welcomeMsg);

        welcomeMsg.style.transform = "scale(0.7)";
        welcomeMsg.style.opacity = "0";
        welcomeMsg.style.transition = "transform 0.9s ease, opacity 0.9s ease";

        setTimeout(() => {
          welcomeMsg.style.transform = "scale(1.4)";
          welcomeMsg.style.opacity = "1";
          playSound(sendSound);
        }, 50);

        setTimeout(() => {
          imessageSection.classList.add("fade-out");
          setTimeout(() => {
            imessageSection.classList.add("hidden");
            desktopSection.classList.remove("hidden");
          }, 800);
        }, 1500);

        sessionStorage.setItem("introShown", "true");
        return;
      }

      const msg = document.createElement("div");
      msg.className = `bubble ${messages[index].from}`;
      msg.textContent = messages[index].text;
      chat.appendChild(msg);

      if (messages[index].from === "me") playSound(sendSound);
      else playSound(receiveSound);

      index++;
      setTimeout(showMessage, 1200);
    }

    showMessage();
  }

  // UNLOCK AUDIO AND START INTRO ON FIRST CLICK
  window.addEventListener(
    "click",
    () => {
      audioUnlocked = true;
      startIntro();
    },
    { once: true }
  );
});
