// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Chatbot functionality
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");

// Toggle chatbot
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("active");
});

chatbotClose.addEventListener("click", () => {
  chatbotContainer.classList.remove("active");
});

// Chatbot responses
const chatbotResponses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What would you like to know?",
    "Hey! Feel free to ask me anything!",
  ],
  about: [
    "Keepa is a Computer Science and Mathematics major at Caldwell University with a strong interest in problem solving and analytical thinking.",
    "Keepa is passionate about learning and exploring how theory and practice connect, especially in technical and quantitative fields.",
    "As an international student, Keepa has developed resilience, adaptability, and a strong work ethic.",
  ],
  projects: [
    "Keepa has worked on programming-based projects using HTML, CSS, and JavaScript to build responsive and interactive web applications.",
    "The projects have strengthened technical skills and understanding of front-end development.",
  ],
  skills: [
    "Technical skills include problem solving, logical reasoning, and programming with a strong foundation in computer science and mathematics.",
    "Soft skills include strong communication, teamwork, adaptability, and a disciplined work ethic.",
  ],
  contact: [
    "You can contact Keepa through the contact form on this website. Just fill out the form with your name, email, subject, and message!",
    "Feel free to use the contact form in the Contact tab to reach out.",
  ],
  help: [
    "I can help you explore this portfolio! Try commands like:",
    "• 'show me the weather' or 'weather in [City]'\n• 'play music' or 'stop music'\n• 'where am I' or 'show map'\n• 'go to projects'\n• 'clear' to reset chat",
  ],
  default: [
    "I'm not sure how to answer that. Could you ask about Keepa's background, projects, skills, or how to contact?",
    "That's an interesting question! Try asking about Keepa's education, projects, or skills.",
    "I can help you learn more about Keepa's background, projects, technical skills, or how to get in touch!",
  ],
};

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  let response = "";
  let redirect = null;
  let carouselIndex = null;
  let action = null;
  let params = null;

  if (message.includes("help") || message.includes("command") || message.includes("what can you do")) {
    response = chatbotResponses.help.join("\n");
  } else if (message.includes("clear") || message.includes("reset")) {
    response = "Clearing chat history...";
    action = "clear";
  } else if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";

    response = `${timeGreeting}! How can I help you today?`;
  } else if (message.includes("play") && (message.includes("music") || message.includes("song"))) {
    response = "Starting the music for you!";
    action = "playMusic";
    redirect = "demos";
    carouselIndex = 2;
  } else if (message.includes("stop") && (message.includes("music") || message.includes("song"))) {
    response = "Stopping the music.";
    action = "stopMusic";
  } else if (message.includes("weather")) {
    redirect = "demos";
    carouselIndex = 1;
    if (message.includes("weather in")) {
      const parts = message.split("weather in");
      const city = parts.length > 1 ? parts[1].trim() : "";
      if (city) {
        response = `Checking the weather in ${city}...`;
        action = "searchWeather";
        params = city;
      } else {
        response = "Which city would you like to check?";
      }
    } else {
      response = "I'll show you the weather widget!";
    }
  } else if (
    message.includes("map") ||
    message.includes("location") ||
    message.includes("where")
  ) {
    response = "Let me show you your current location on the map!";
    redirect = "demos";
    carouselIndex = 3;
    action = "showLocation";
  } else if (
    message.includes("about") ||
    message.includes("who") ||
    message.includes("background") ||
    message.includes("education")
  ) {
    response = chatbotResponses.about[
      Math.floor(Math.random() * chatbotResponses.about.length)
    ];
    if (message.includes("go to") || message.includes("show") || message.includes("section")) {
      redirect = "about";
    }
  } else if (
    message.includes("project") ||
    message.includes("work") ||
    message.includes("portfolio")
  ) {
    response = chatbotResponses.projects[
      Math.floor(Math.random() * chatbotResponses.projects.length)
    ];
    if (message.includes("go to") || message.includes("show") || message.includes("section")) {
      redirect = "projects";
    }
  } else if (
    message.includes("demo") ||
    message.includes("widget") ||
    message.includes("app") ||
    message.includes("video") ||
    message.includes("intro")
  ) {
    response = "I'll show you that widget in the showcase section!";
    redirect = "demos";
    if (message.includes("video") || message.includes("intro")) {
      carouselIndex = 0;
    }
  } else if (
    message.includes("skill") ||
    message.includes("ability") ||
    message.includes("technical") ||
    message.includes("programming")
  ) {
    response = chatbotResponses.skills[
      Math.floor(Math.random() * chatbotResponses.skills.length)
    ];
    if (message.includes("go to") || message.includes("show") || message.includes("section")) {
      redirect = "projects";
    }
  } else if (
    message.includes("contact") ||
    message.includes("email") ||
    message.includes("reach") ||
    message.includes("message")
  ) {
    response = chatbotResponses.contact[
      Math.floor(Math.random() * chatbotResponses.contact.length)
    ];
    if (message.includes("go to") || message.includes("show") || message.includes("section") || message.includes("how to")) {
      redirect = "contact";
    }
  } else if (message.includes("home") || message.includes("top")) {
    response = "Taking you back to the top of the page!";
    redirect = "home";
  } else {
    response = chatbotResponses.default[
      Math.floor(Math.random() * chatbotResponses.default.length)
    ];
  }

  return { text: response, redirect: redirect, carouselIndex: carouselIndex, action: action, params: params };
}

function addMessage(text, isUser, isTyping = false) {
  if (isTyping) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message typing-indicator";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = '<p><span>.</span><span>.</span><span>.</span></p>';
    chatbotMessages.appendChild(typingDiv);
  } else {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) typingIndicator.remove();

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;
    const p = document.createElement("p");
    // Handle newlines in bot responses
    p.innerHTML = text.replace(/\n/g, '<br>');
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
  }
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message === "") return;

  addMessage(message, true);
  chatbotInput.value = "";

  // Show typing indicator
  addMessage("", false, true);

  // Simulate bot thinking
  setTimeout(() => {
    const responseData = getBotResponse(message);
    addMessage(responseData.text, false);

    // Execute special actions
    if (responseData.action) {
      setTimeout(() => {
        switch (responseData.action) {
          case "clear":
            chatbotMessages.innerHTML = "";
            addMessage("Chat history cleared!", false);
            break;
          case "playMusic":
            if (typeof playPause === "function") playPause();
            break;
          case "stopMusic":
            if (typeof stopMusic === "function") stopMusic();
            break;
          case "searchWeather":
            const cityInput = document.getElementById("cityInput");
            if (cityInput) {
              cityInput.value = responseData.params;
              if (typeof getWeather === "function") getWeather();
            }
            break;
          case "showLocation":
            if (typeof showMyLocation === "function") showMyLocation();
            break;
        }
      }, 500);
    }

    if (responseData.redirect) {
      const target = document.getElementById(responseData.redirect);
      if (target) {
        // Briefly wait before scrolling so user can see the message
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });

          // If a specific carousel slide is requested
          if (responseData.carouselIndex !== null && typeof window.moveToChatbotSlide === 'function') {
            window.moveToChatbotSlide(responseData.carouselIndex);
          }

          // If mobile menu is open, close it
          if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
          }
        }, 800);
      }
    }
  }, 1000); // 1s typing simulation
}

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Voice Command Functionality
const chatbotMic = document.getElementById("chatbotMic");

if (chatbotMic) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let isListening = false;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      chatbotMic.classList.add("listening");
      chatbotInput.placeholder = "Listening...";
    };

    recognition.onend = () => {
      isListening = false;
      chatbotMic.classList.remove("listening");
      chatbotInput.placeholder = "Type your message...";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatbotInput.value = transcript;
      sendMessage();
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      isListening = false;
      chatbotMic.classList.remove("listening");
      chatbotInput.placeholder = "Speech error. Try again.";

      setTimeout(() => {
        chatbotInput.placeholder = "Type your message...";
      }, 2000);
    };
  }

  chatbotMic.addEventListener("click", () => {
    if (!SpeechRecognition) {
      addMessage("Voice commands are not supported in this browser. Try Chrome or Edge!", false);
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
}

// Weather App Functionality
async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const weatherInfo = document.getElementById("weather-info");
  const city = cityInput.value.trim();

  if (!city) {
    weatherInfo.innerHTML =
      '<p style="color: rgba(220, 53, 69, 0.9);">Please enter a city name</p>';
    return;
  }

  weatherInfo.innerHTML =
    '<p style="color: rgba(255, 255, 255, 0.7);">Loading weather data...</p>';

  // Using OpenWeatherMap API (demo - you'll need to replace with your own API key)
  // For demo purposes, we'll use a mock response
  try {
    // Note: Replace 'YOUR_API_KEY' with an actual OpenWeatherMap API key for real functionality
    // const apiKey = 'YOUR_API_KEY';
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    // const data = await response.json();

    // Demo response (simulated)
    setTimeout(() => {
      const demoData = {
        name: city,
        main: {
          temp: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 40) + 40,
        },
        weather: [{ description: "Partly cloudy", main: "Clouds" }],
        wind: { speed: (Math.random() * 10 + 5).toFixed(1) },
      };

      weatherInfo.innerHTML = `
        <div class="weather-result">
          <h3>${demoData.name}</h3>
          <p class="temp">${demoData.main.temp}°C</p>
          <p style="text-transform: capitalize;">${demoData.weather[0].description}</p>
          <p>Humidity: ${demoData.main.humidity}%</p>
          <p>Wind Speed: ${demoData.wind.speed} m/s</p>
          <p style="margin-top: 15px; font-size: 12px; color: rgba(255, 255, 255, 0.5);">* This is a demo. For real weather data, integrate with OpenWeatherMap API.</p>
        </div>
      `;
    }, 500);
  } catch (error) {
    weatherInfo.innerHTML =
      '<p style="color: rgba(220, 53, 69, 0.9);">Error fetching weather data. Please try again.</p>';
  }
}

// Get weather by user's current location
async function getWeatherByLocation() {
  const weatherInfo = document.getElementById("weather-info");
  const cityInput = document.getElementById("cityInput");

  if (!navigator.geolocation) {
    weatherInfo.innerHTML =
      '<p style="color: rgba(220, 53, 69, 0.9);">Geolocation is not supported by your browser</p>';
    return;
  }

  weatherInfo.innerHTML =
    '<p style="color: rgba(255, 255, 255, 0.7);">Getting your location...</p>';

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      weatherInfo.innerHTML =
        '<p style="color: rgba(255, 255, 255, 0.7);">Loading weather data for your location...</p>';

      try {
        // For demo purposes, we'll use a mock response
        // In production, you would use:
        // const apiKey = 'YOUR_API_KEY';
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        // const data = await response.json();

        setTimeout(() => {
          const demoData = {
            name: "Your Location",
            main: {
              temp: Math.floor(Math.random() * 30) + 10,
              humidity: Math.floor(Math.random() * 40) + 40,
            },
            weather: [{ description: "Sunny", main: "Clear" }],
            wind: { speed: (Math.random() * 10 + 5).toFixed(1) },
            coord: { lat: lat.toFixed(4), lon: lon.toFixed(4) },
          };

          weatherInfo.innerHTML = `
            <div class="weather-result">
              <h3>${demoData.name}</h3>
              <p style="font-size: 12px; color: rgba(255, 255, 255, 0.6); margin-bottom: 10px;">📍 Coordinates: ${demoData.coord.lat}, ${demoData.coord.lon}</p>
              <p class="temp">${demoData.main.temp}°C</p>
              <p style="text-transform: capitalize;">${demoData.weather[0].description}</p>
              <p>Humidity: ${demoData.main.humidity}%</p>
              <p>Wind Speed: ${demoData.wind.speed} m/s</p>
              <p style="margin-top: 15px; font-size: 12px; color: rgba(255, 255, 255, 0.5);">* This is a demo. For real weather data, integrate with OpenWeatherMap API.</p>
            </div>
          `;

          // Update city input with approximate location
          cityInput.value = "Current Location";
        }, 500);
      } catch (error) {
        weatherInfo.innerHTML =
          '<p style="color: rgba(220, 53, 69, 0.9);">Error fetching weather data. Please try again.</p>';
      }
    },
    (error) => {
      let errorMsg = "Unable to retrieve your location. ";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg += "Location access denied by user.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg += "Location information unavailable.";
          break;
        case error.TIMEOUT:
          errorMsg += "Location request timed out.";
          break;
        default:
          errorMsg += "An unknown error occurred.";
          break;
      }
      weatherInfo.innerHTML = `<p style="color: rgba(220, 53, 69, 0.9);">${errorMsg}</p>`;
    },
  );
}

// Allow Enter key to trigger weather search
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  if (cityInput) {
    cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        getWeather();
      }
    });
  }
});

// Map Location Functionality
function showMyLocation() {
  const locationInfo = document.getElementById("location-info");
  const mapFrame = document.getElementById("mapFrame");

  if (!navigator.geolocation) {
    locationInfo.innerHTML =
      '<p style="color: rgba(220, 53, 69, 0.9);">Geolocation is not supported by your browser</p>';
    return;
  }

  locationInfo.innerHTML =
    '<p style="color: rgba(255, 255, 255, 0.7);">📍 Getting your location...</p>';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Update map iframe with user's location
      // Using Google Maps embed with coordinates
      const embedUrl = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=15&output=embed`;

      mapFrame.src = embedUrl;

      locationInfo.innerHTML = `
        <p style="color: rgba(220, 38, 38, 0.9);">
          ✅ Location found!<br>
          <span style="font-size: 12px; color: rgba(255, 255, 255, 0.6);">
            Latitude: ${lat.toFixed(6)}, Longitude: ${lon.toFixed(6)}
          </span>
        </p>
      `;
    },
    (error) => {
      let errorMsg = "Unable to retrieve your location. ";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg +=
            "Location access denied. Please allow location access and try again.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg += "Location information unavailable.";
          break;
        case error.TIMEOUT:
          errorMsg += "Location request timed out. Please try again.";
          break;
        default:
          errorMsg += "An unknown error occurred.";
          break;
      }
      locationInfo.innerHTML = `<p style="color: rgba(220, 53, 69, 0.9);">${errorMsg}</p>`;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    },
  );
}

// Music Player Functionality
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");
const volumeValue = document.getElementById("volumeValue");

function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
    playPauseBtn.style.background =
      "linear-gradient(135deg, rgba(220, 38, 38, 1), rgba(185, 28, 28, 1))";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
    playPauseBtn.style.background =
      "linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9))";
  }
}

function stopMusic() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playPauseBtn.textContent = "Play";
  playPauseBtn.style.background =
    "linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9))";
}

function setVolume(value) {
  audioPlayer.volume = value / 100;
  volumeValue.textContent = value + "%";
}

// Update button when audio ends
if (audioPlayer) {
  audioPlayer.addEventListener("ended", () => {
    playPauseBtn.textContent = "Play";
    playPauseBtn.style.background =
      "linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9))";
  });

  // Initialize volume
  audioPlayer.volume = 0.5;
  volumeControl.value = 50;
}

// Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    updateSlidePosition();
  }

  // Expose function for chatbot to control carousel
  window.moveToChatbotSlide = (index) => {
    moveToSlide(index);
  };

  nextBtn.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
  });
});

// 3D Tilt Effect
document.addEventListener("DOMContentLoaded", () => {
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
});
