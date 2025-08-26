
const searchForm = document.getElementById('searchForm');
const destInput = document.getElementById('destination');
const dateInput = document.getElementById('date');
const budgetInput = document.getElementById('budget');
const destError = document.getElementById('destError');
const dateError = document.getElementById('dateError');
const budgetError = document.getElementById('budgetError');
const searchMsg = document.getElementById('searchMsg');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const yearSpan = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const contactMsgOut = document.getElementById('contactMsgOut');


yearSpan && (yearSpan.textContent = new Date().getFullYear());


mobileMenuBtn && mobileMenuBtn.addEventListener('click', () => {
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = '';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.gap = '8px';
  }
});


document.addEventListener('click', (e) => {
  if (window.innerWidth > 720) return;
  if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.style.display = '';
  }
});


const root = document.documentElement;
const savedTheme = localStorage.getItem('exploreTheme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}
themeToggle && themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('exploreTheme', current);
});


function clearErrors(){
  destError.textContent = '';
  dateError.textContent = '';
  budgetError.textContent = '';
  searchMsg.textContent = '';
}

function isFutureOrToday(dateStr){
  if (!dateStr) return false;
  const selected = new Date(dateStr);

  selected.setHours(0,0,0,0);
  const today = new Date(); today.setHours(0,0,0,0);
  return selected >= today;
}

searchForm && searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  let ok = true;
  const dest = destInput.value.trim();
  const date = dateInput.value;
  const budget = budgetInput.value;

  if (!dest) { destError.textContent = 'Please enter a destination.'; ok = false; }
  if (!date || !isFutureOrToday(date)) { dateError.textContent = 'Please select today or a future date.'; ok = false; }
  if (budget === '' || isNaN(budget) || Number(budget) < 0) { budgetError.textContent = 'Please enter a valid positive budget.'; ok = false; }

  if (!ok) return;

 
  searchMsg.textContent = `Searching packages for ${dest} on ${date} within $${budget}... (demo only)`;
 
  setTimeout(()=> {
    searchMsg.textContent = `No backend connected — this is a frontend demo. Try different values or click Book Now.`;
  }, 2200);
});


contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactMsgOut.textContent = '';
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();

  if(!name || !email || !msg) {
    contactMsgOut.textContent = 'Please complete all fields.';
    contactMsgOut.classList.add('muted');
    return;
  }

  contactMsgOut.textContent = 'Thank you! Your message has been noted (demo).';
  contactMsgOut.classList.remove('muted');
  contactForm.reset();
});


window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = '';
  }
});

scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navMenu.style.display = '';
  }
});
