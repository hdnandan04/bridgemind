document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn")
  const scenes = document.querySelectorAll(".scene")

  // Navigation functionality
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.id.replace("-btn", "")

      // Remove active class from all buttons and scenes
      navButtons.forEach((btn) => btn.classList.remove("active"))
      scenes.forEach((scene) => scene.classList.remove("active"))

      // Add active class to clicked button and corresponding scene
      this.classList.add("active")
      document.getElementById(targetId).classList.add("active")

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

  // Apply typing effect to group dialogue when scene 2 is active
  const scene2Button = document.getElementById("scene2-btn")
  scene2Button.addEventListener("click", () => {
    setTimeout(() => {
      const groupDialogue = document.querySelector(".dialogue-item.group .dialogue")
      if (groupDialogue) {
        const originalText = groupDialogue.textContent
        typeWriter(groupDialogue, originalText, 80)
      }
    }, 1000)
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
            background: linear-gradient(90deg, #667eea, #764ba2);
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
})
