// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add click event listeners to navigation links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Character card interactions
  const characterCards = document.querySelectorAll(".character-card")

  characterCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove highlight from all cards
      characterCards.forEach((c) => c.classList.remove("highlighted"))

      // Add highlight to clicked card
      this.classList.add("highlighted")

      // Remove highlight after animation
      setTimeout(() => {
        this.classList.remove("highlighted")
      }, 2000)
    })
  })

  // Scroll animations
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

  // Observe all character cards and overview cards
  const animatedElements = document.querySelectorAll(".character-card, .overview-card, .props-card, .tips-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Add active state to navigation based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 500)
  }

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")

    if (hero) {
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    }
  })

  // Add click-to-copy functionality for character dialogues
  const dialogues = document.querySelectorAll(".dialogue p")

  dialogues.forEach((dialogue) => {
    dialogue.addEventListener("click", function () {
      const text = this.textContent
      navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const originalText = this.textContent
        this.textContent = "Copied to clipboard!"
        this.style.color = "#2ed573"

        setTimeout(() => {
          this.textContent = originalText
          this.style.color = ""
        }, 1500)
      })
    })
  })
})

// Add CSS for active navigation state
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: #667eea;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .dialogue p {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .dialogue p:hover {
        opacity: 0.8;
        transform: scale(1.02);
    }
`

document.head.appendChild(style)
