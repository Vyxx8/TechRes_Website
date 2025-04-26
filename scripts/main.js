document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");

  if (!form) {
    console.error("❌ Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      service: document.getElementById("service").value,
      issue: document.getElementById("issue").value,
      extraIssue: document.getElementById("extraIssue").value || "N/A",
      date: new Date(document.getElementById("date").value).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      notes: document.getElementById("notes").value || "N/A",
      price: document.getElementById("priceEstimate").textContent.replace("$", "")
    };

    console.log("Sending with params:", templateParams);

    emailjs.send("service_878a2lc", "template_on2huzm", templateParams, "L41mscJDBt8AusYyY")
  .then(function () {
    const toast = document.getElementById("success-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);

    form.reset();
    document.getElementById("priceEstimate").textContent = "$0";
  }, function (error) {
    const errorToast = document.getElementById("error-toast");
    errorToast.classList.add("show");
    setTimeout(() => errorToast.classList.remove("show"), 3000);

    console.error("❌ EmailJS Error:", error);
  });
  });
});

// Generate a pseudo order number like TR-20250423-839
function generateOrderNumber() {
  const now = new Date();
  const datePart = now.toISOString().split("T")[0].replace(/-/g, '');
  const randomPart = Math.floor(100 + Math.random() * 900); // Random 3-digitz
  return `TR-${datePart}-${randomPart}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const emojiContainer = document.getElementById("emojiContainer");
  const emojis = ["🔧", "🛠️", "⚙️"];
  const count = 10;

  for (let i = 0; i < count; i++) {
    const emoji = document.createElement("span");
    emoji.className = "floating-emoji";
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const top = Math.random() * 90;
    const left = Math.random() * 90;

    const distanceX = (Math.random() * 600 - 300);
    const distanceY = (Math.random() * 600 - 300);

    const duration = 12 + Math.random() * 8;
    const delay = Math.random() * 5;
    const size = 1.4 + Math.random() * 1.2;

    emoji.style.top = `${top}%`;
    emoji.style.left = `${left}%`;
    emoji.style.fontSize = `${size}rem`;
    emoji.style.animationDuration = `${duration}s`;
    emoji.style.animationDelay = `${delay}s`;

    emoji.style.setProperty('--x', `${distanceX}px`);
    emoji.style.setProperty('--y', `${distanceY}px`);

    emojiContainer.appendChild(emoji);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const glow = document.getElementById("cursor-glow");

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
});

document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const extra = btn.nextElementSibling;
    const isOpen = extra.classList.contains('show');

    document.querySelectorAll('.extra-info').forEach(info => info.classList.remove('show'));
    document.querySelectorAll('.expand-btn').forEach(b => {
      b.innerHTML = 'See Details <span class="arrow">▼</span>';
      b.classList.remove('rotate');
    });

    if (!isOpen) {
      extra.classList.add('show');
      btn.innerHTML = 'Hide Details <span class="arrow">▼</span>';
      btn.classList.add('rotate');
    }
  });
});

document.querySelectorAll('.toggle-btn').forEach((btn, i) => {
  const wrapper = btn.closest('.collapsible');
  wrapper.style.setProperty('--i', i);
});


let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  testimonialIndex = index;
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showTestimonial(i);
  });
});

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 10000);

showTestimonial(testimonialIndex);

const templateParams = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value, // This is crucial
  message: document.getElementById("message").value,
};

// Auto-hide header on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.classList.add('hide-header');
    header.classList.remove('show-header');
  } else {
    // Scrolling up
    header.classList.add('show-header');
    header.classList.remove('hide-header');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
