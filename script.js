// Navbar toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Auto load course details page
  if (document.body.contains(document.getElementById("course-name"))) {
    loadCourseDetails();
  }
});

// Load courses dynamically
async function loadCourses() {
  try {
    const response = await fetch("course.json"); // ✅ FIXED
    const courses = await response.json();
    const container = document.querySelector(".course-container");

    container.innerHTML = "";

    courses.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <h3>${course.name}</h3>
        <p>Teacher: ${course.teacher}</p>
        <p>Credits: ${course.credits}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = `course-details.html?id=${course.id}`;
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Course load error:", error);
  }
}

// Load course details
courses.forEach(course => {
  const card = document.createElement("div");
  card.className = "course-card";

  card.innerHTML = `
    <i class="${course.icon}"></i>
    <h3>${course.name}</h3>
    <p>Teacher: ${course.teacher}</p>
    <p>Credits: ${course.credits}</p>
  `;

  card.addEventListener("click", () => {
    window.location.href = `course-details.html?id=${course.id}`;
  });

  container.appendChild(card);
});


// Demo Authentication
function loginUser() {
  alert("Login successful (Demo)");
  window.location.href = "index.html";
}

function registerUser() {
  alert("Registration successful (Demo)");
  window.location.href = "login.html";
}
