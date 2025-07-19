// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Light/Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');

    // Save preference to localStorage
    const isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
});

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode'))) {
    document.documentElement.classList.add('dark');
}

// Quiz Modal
const quizButton = document.getElementById('quiz-button');
const quizModal = document.getElementById('quiz-modal');
const closeQuiz = document.getElementById('close-quiz');
const nextQuestion = document.getElementById('next-question');
const restartQuiz = document.getElementById('restart-quiz');
const quizQuestions = document.querySelectorAll('.quiz-question');
const quizResults = document.getElementById('quiz-results');
const quizScore = document.getElementById('quiz-score');

quizButton.addEventListener('click', function () {
    quizModal.classList.remove('hidden');
    resetQuiz();
});

closeQuiz.addEventListener('click', function () {
    quizModal.classList.add('hidden');
});

nextQuestion.addEventListener('click', function () {
    let currentQuestion = 0;

    // Find current visible question
    for (let i = 0; i < quizQuestions.length; i++) {
        if (!quizQuestions[i].classList.contains('hidden')) {
            currentQuestion = i;
            break;
        }
    }

    // Hide current question
    quizQuestions[currentQuestion].classList.add('hidden');

    // Show next question or results
    if (currentQuestion < quizQuestions.length - 1) {
        quizQuestions[currentQuestion + 1].classList.remove('hidden');
    } else {
        showResults();
    }
});

restartQuiz.addEventListener('click', resetQuiz);

function resetQuiz() {
    quizQuestions.forEach(q => q.classList.add('hidden'));
    quizResults.classList.add('hidden');
    quizQuestions[0].classList.remove('hidden');
    nextQuestion.style.display = 'block';
}

function showResults() {
    let score = 0;

    // Check answers (simplified for demo)
    // In a real app, you would check the actual selected answers
    score = Math.floor(Math.random() * 4); // Random score between 0-3 for demo

    quizScore.textContent = score;
    nextQuestion.style.display = 'none';
    quizResults.classList.remove('hidden');
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    messageError.classList.add('hidden');

    // Validate name
    if (nameInput.value.trim() === '') {
        nameError.classList.remove('hidden');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.classList.remove('hidden');
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.classList.remove('hidden');
        isValid = false;
    }

    if (isValid) {
        // In a real app, you would submit the form data
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    }
});

// FAQ Accordion
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');

        content.classList.toggle('hidden');
        icon.classList.toggle('transform');
        icon.classList.toggle('rotate-180');
    });
});

// Badge Hover Animation
const badges = document.querySelectorAll('.badge-hover');
badges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.classList.add('scale-110');
    });

    badge.addEventListener('mouseleave', function () {
        this.classList.remove('scale-110');
    });
});

// Countdown Timer
function updateCountdown() {
    // Set the target date (30 days from now for demo)
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + 30);

    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call