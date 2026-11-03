document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNav");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarContent");

    // Sticky Navbar Effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }

    // Toggle Scroll-to-top button visibility
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }

    // Trigger reveal animations
    revealOnScroll();

    // Trigger Animated Counters
    checkCounters();

    // Active Link Highlighting
    highlightActiveNavLink();
  };

  window.addEventListener("scroll", handleScroll);


    // Mobile Menu Collapse on Link Click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

    // Scroll To Top Action
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

    // Reveal Animations on Scroll
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 120;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

    // Animated Counters
  const counters = document.querySelectorAll(".counter-value");
  let countersAnimated = false;

  function checkCounters() {
    const counterSection = document.querySelector(".counter-section");
    if (!counterSection) return;

    const position = counterSection.getBoundingClientRect();

    if (position.top < window.innerHeight && !countersAnimated) {
      countersAnimated = true;
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000; // milliseconds
        const increment = target / (duration / 16); // 60 FPS

        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
      });
    }
  }

    // Active Navigation Highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".navbar-nav a[href*=" + sectionId + "]")
          ?.classList.add("active");
      } else {
        document
          .querySelector(".navbar-nav a[href*=" + sectionId + "]")
          ?.classList.remove("active");
      }
    });
  }

    // Bootstrap Form Validation
  const contactForm = document.getElementById("contactForm");
  const formSuccessMessage = document.getElementById("formSuccessMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");
      } else {
        // Show success state
        contactForm.classList.remove("was-validated");
        contactForm.reset();
        formSuccessMessage.classList.remove("d-none");

        setTimeout(() => {
          formSuccessMessage.classList.add("d-none");
        }, 5000);
      }
    });
  }

  // Initial call on load
  revealOnScroll();
});