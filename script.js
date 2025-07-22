document.addEventListener("DOMContentLoaded", () => {
  const scriptButtons = document.querySelectorAll(".script-btn")
  const navButtons = document.querySelectorAll(".nav-btn")
  const scenes = document.querySelectorAll(".scene")
  const viralNav = document.getElementById("viral-nav")
  const bridgemindNav = document.getElementById("bridgemind-nav")

  // Script switching functionality
  scriptButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isViral = this.id === "viral-btn"

      // Remove active class from all script buttons
      scriptButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Hide all scenes
      scenes.forEach((scene) => scene.classList.remove("active"))

      // Show/hide appropriate navigation
      if (isViral) {
        viralNav.style.display = "flex"
        bridgemindNav.style.display = "none"
        // Show first viral scene
        document.getElementById("act1").classList.add("active")
        // Activate first viral nav button
        navButtons.forEach((btn) => btn.classList.remove("active"))
        document.getElementById("act1-btn").classList.add("active")
      } else {
        viralNav.style.display = "none"
        bridgemindNav.style.display = "flex"
        // Show first bridgemind scene
        document.getElementById("scene1").classList.add("active")
        // Activate first bridgemind nav button
        navButtons.forEach((btn) => btn.classList.remove("active"))
        document.getElementById("scene1-btn").classList.add("active")
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  })

  // Scene navigation functionality (updated to handle both scripts)
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.id.replace("-btn", "")

      // Remove active class from all nav buttons and scenes
      navButtons.forEach((btn) => btn.classList.remove("active"))
      scenes.forEach((scene) => scene.classList.remove("active"))

      // Add active class to clicked button and corresponding scene
      this.classList.add("active")
      const targetScene = document.getElementById(targetId)
      if (targetScene) {
        targetScene.classList.add("active")
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  })

  // Add animation to dialogue items when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all dialogue items
  const dialogueItems = document.querySelectorAll(".dialogue-item")
  dialogueItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Add click effect to dialogue items
  dialogueItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(1.02)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)
    })
  })

  // Add typing effect to final dialogue
  function typeWriter(element, text, speed = 50) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }
    type()
  }

  // Apply typing effect to group dialogue when Act 2 is active
  const act2Button = document.getElementById("act2-btn")
  act2Button.addEventListener("click", () => {
    setTimeout(() => {
      const groupDialogue = document.querySelector(".dialogue-item.group .dialogue")
      if (groupDialogue) {
        const originalText = groupDialogue.textContent
        typeWriter(groupDialogue, originalText, 100)
      }
    }, 1500)
  })

  // Add hover effects to cast members
  const castMembers = document.querySelectorAll(".cast-member")
  castMembers.forEach((member) => {
    member.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    member.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    const activeButton = document.querySelector(".nav-btn.active")
    const buttons = Array.from(navButtons)
    const currentIndex = buttons.indexOf(activeButton)

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      buttons[currentIndex - 1].click()
    } else if (e.key === "ArrowRight" && currentIndex < buttons.length - 1) {
      buttons[currentIndex + 1].click()
    }
  })

  // Add progress indicator
  function createProgressIndicator() {
    const progressContainer = document.createElement("div")
    progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 1000;
        `

    const progressBar = document.createElement("div")
    progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
            width: 0%;
            transition: width 0.3s ease;
        `

    progressContainer.appendChild(progressBar)
    document.body.appendChild(progressContainer)

    window.addEventListener("scroll", () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      progressBar.style.width = scrolled + "%"
    })
  }

  createProgressIndicator()

  // Add social media notification effects
  function createNotificationEffect() {
    const notifications = [
      "📱 New follower!",
      "❤️ Post liked!",
      "🔄 Content shared!",
      "💬 New comment!",
      "🚀 Going viral!",
    ]

    function showNotification() {
      const notification = document.createElement("div")
      notification.textContent = notifications[Math.floor(Math.random() * notifications.length)]
      notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 600;
                z-index: 1001;
                animation: slideIn 0.5s ease-out;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `

      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.animation = "slideOut 0.5s ease-in"
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 500)
      }, 3000)
    }

    // Show notifications periodically when on Act 2
    setInterval(() => {
      const activeScene = document.querySelector(".scene.active")
      if (activeScene && activeScene.id === "act2") {
        showNotification()
      }
    }, 8000)
  }

  // Add CSS for notification animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  createNotificationEffect()

  // Add engagement counter effect
  function createEngagementCounter() {
    const counter = document.createElement("div")
    counter.id = "engagement-counter"
    counter.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1001;
            display: none;
        `
    counter.innerHTML = `
            <div>👀 Views: <span id="views">0</span></div>
            <div>❤️ Likes: <span id="likes">0</span></div>
            <div>🔄 Shares: <span id="shares">0</span></div>
        `
    document.body.appendChild(counter)

    let views = 0,
      likes = 0,
      shares = 0

    function updateCounter() {
      const activeScene = document.querySelector(".scene.active")
      if (activeScene && activeScene.id === "act2") {
        counter.style.display = "block"
        views += Math.floor(Math.random() * 100) + 50
        likes += Math.floor(Math.random() * 20) + 10
        shares += Math.floor(Math.random() * 5) + 1

        document.getElementById("views").textContent = views.toLocaleString()
        document.getElementById("likes").textContent = likes.toLocaleString()
        document.getElementById("shares").textContent = shares.toLocaleString()
      } else {
        counter.style.display = "none"
      }
    }

    setInterval(updateCounter, 2000)
  }

  createEngagementCounter()

  // Add role-switching animation for BridgeMind Scene 2
  const scene2Button = document.getElementById("scene2-btn")
  if (scene2Button) {
    scene2Button.addEventListener("click", () => {
      setTimeout(() => {
        const roleChanges = document.querySelectorAll(".role-change")
        roleChanges.forEach((role, index) => {
          setTimeout(() => {
            role.style.animation = "roleSwitch 1s ease-in-out"
          }, index * 200)
        })
      }, 500)
    })
  }

  // Add teamwork effect for BridgeMind final dialogue
  const bridgemindGroupDialogue = document.querySelector(".bridgemind-scene .dialogue-item.group .dialogue")
  if (bridgemindGroupDialogue) {
    scene2Button?.addEventListener("click", () => {
      setTimeout(() => {
        const originalText = bridgemindGroupDialogue.textContent
        typeWriter(bridgemindGroupDialogue, originalText, 120)
      }, 2000)
    })
  }

  // Add CSS for role switch animation
  const additionalStyle = document.createElement("style")
  additionalStyle.textContent += `
        @keyframes roleSwitch {
            0% {
                transform: scale(1);
                background: rgba(39, 174, 96, 0.1);
            }
            50% {
                transform: scale(1.1);
                background: rgba(39, 174, 96, 0.3);
            }
            100% {
                transform: scale(1);
                background: rgba(39, 174, 96, 0.1);
            }
        }
    `
  document.head.appendChild(additionalStyle)
})
