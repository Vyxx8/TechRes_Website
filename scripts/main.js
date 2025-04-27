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
    };

    console.log("Sending with params:", templateParams);

    emailjs.send("service_878a2lc", "template_on2huzm", templateParams, "L41mscJDBt8AusYyY")
  .then(function () {
    const toast = document.getElementById("success-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);

    form.reset();
  }, function (error) {
    const errorToast = document.getElementById("error-toast");
    errorToast.classList.add("show");
    setTimeout(() => errorToast.classList.remove("show"), 3000);

    console.error("❌ EmailJS Error:", error);
  });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const glow = document.getElementById("cursor-glow");

  var mouseX = 0;
  var mouseY = 0;
  var glowX = 0;
  var glowY = 0;

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
  email: document.getElementById("email").value,
  message: document.getElementById("message").value,
};

const header = document.querySelector('.site-header');