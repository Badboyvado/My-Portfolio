document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // console.log(target);
  });
});

window.addEventListener("scroll", () => {
  const navBar = document.querySelector(".navbar");
  if (window.scrollY > 30) {
    navBar.style.boxShadow = "0 6px 15px";
  } else {
    navBar.style.boxShadow = "0 3px 5px";
  }
  //   console.log(navBar);
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links"); //i dont put a with the .nav-links

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (screenY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      link.style.fontWeight = "bold";
    }
  });
  console.log(sections);
  console.log(navLinks);
});

const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

console.log(observer);

document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "Opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

document.querySelectorAll(".skill-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translate(20px)";
  item.style.transition = "Opacityy 0.6 ease, transform 0.6s ease";
  observer.observe(item);
});

// DONT FORGET CONTACT FORM HANDLING (OPTIONAL)
const handleContactSubmit = (e) => {
  e.preventDefault();
  console.log("Form Submitted");
  // Add form submission logic here
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
};

// ADDING CLICK
document
  .querySelectorAll(".btn, .project-link, .contact-card")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const span = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      span.style.width = span.style.height = size + "px";
      span.style.left = x + "px";
      span.style.top = y + "px";
      span.classList.add("span");

      this.appendChild(span);

      setTimeout(() => span.remove(), 600);
    });
  });

const animateCounters = () => {
  const stats = document.querySelectorAll(".stat h3");
  stats.forEach((stat) => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = Math.ceil(target / 30);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + "+";
        clearInterval(counter);
      } else {
        stat.textContent = current;
      }
    }, 30);
  });
};

// ABOUT SECTION
const aboutSection = document.querySelector(".about");
let counterAnimated = false;

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterAnimated) {
        animateCounters();
        counterAnimated = true;
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}
console.log(aboutSection);

// console meassge
