const homeButton = document.querySelector('.home-button');
const homeScreen = document.getElementById('homeScreen');
const plantsScreen = document.getElementById('plantsScreen');
const workshopsScreen = document.getElementById('workshopsScreen');
const membersScreen = document.getElementById('membersScreen');
const contactScreen = document.getElementById('contactScreen');
const boxPlants = document.getElementById('boxPlants');
const boxWorkshops = document.getElementById('boxWorkshops');
const boxMembers = document.getElementById('boxMembers');
const boxContact = document.getElementById('boxContact');

function resetScreens() {
  homeScreen.classList.remove('home-slide-left');
  plantsScreen.classList.remove('slide-in-left');
  workshopsScreen.classList.remove('slide-in-left');
  membersScreen.classList.remove('slide-in-left');
  contactScreen.classList.remove('slide-in-left');
  const allCards = document.querySelectorAll('.card, .card-plant, .member-card');
  allCards.forEach(card => {card.classList.remove('show');});
}

document.addEventListener('DOMContentLoaded', () => {
  const allCards = document.querySelectorAll('.card, .card-plant, .member-card');
  allCards.forEach(card => {card.classList.add('fade-in-bottom');});

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) 
      {
        entry.target.classList.add('show');
      } 
      else
       {
        entry.target.classList.remove('show');
       }});
  }, 
  {
    threshold: 0.1
  });
  allCards.forEach(card => {observer.observe(card);});});


if (boxPlants) {
  boxPlants.addEventListener('click', () => {
    resetScreens();
    homeScreen.classList.add('home-slide-left');
    plantsScreen.classList.add('slide-in-left');
  });
}
if (boxWorkshops) {
  boxWorkshops.addEventListener('click', () => {
    resetScreens();
    homeScreen.classList.add('home-slide-left');
    workshopsScreen.classList.add('slide-in-left');
  });
}
if (boxMembers) {
  boxMembers.addEventListener('click', () => {
    resetScreens();
    homeScreen.classList.add('home-slide-left');
    membersScreen.classList.add('slide-in-left');
  });
}
if (boxContact) {
  boxContact.addEventListener('click', () => {
    resetScreens();
    homeScreen.classList.add('home-slide-left');
    contactScreen.classList.add('slide-in-left');
  });
}

if (homeButton) {homeButton.addEventListener('click', () => {resetScreens();});
}

//for members api
document.addEventListener('DOMContentLoaded', () => {fetchRandomUsers(4);});

async function fetchRandomUsers(count) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    renderMembers(data.results);
  } catch (error) {
    console.error('Error fetching random users', error);
  }
}
function renderMembers(users) {
  const membersList = document.getElementById('membersList');
  if (!membersList) 
  {
    return;
  }
  membersList.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="${user.picture.large}" alt="Photo of ${user.name.first}">
      <div class="member-info">
        <h3>${user.name.first} ${user.name.last}</h3>
      </div>
    `;

    membersList.appendChild(card);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {button.addEventListener('click', () => {resetScreens();});});
});


document.addEventListener('DOMContentLoaded', () => {
  const workshopCarousel = document.getElementById('workshopCarousel');
  const workshopPrevBtn = document.getElementById('workshopPrevBtn');
  const workshopNextBtn = document.getElementById('workshopNextBtn');

  if (workshopCarousel && workshopPrevBtn && workshopNextBtn) {
    const workshopCard = workshopCarousel.querySelector('.card');
    const cardStyle = window.getComputedStyle(workshopCard);
    const cardWidth = workshopCard.offsetWidth + parseInt(cardStyle.marginRight);
    const maxScrollLeft = workshopCarousel.scrollWidth - workshopCarousel.clientWidth;

    workshopPrevBtn.addEventListener('click', () => {workshopCarousel.scrollBy({ top: 0, left: -cardWidth, behavior: 'smooth' });});

    workshopNextBtn.addEventListener('click', () => {workshopCarousel.scrollBy({ top: 0, left: cardWidth, behavior: 'smooth' });});

    workshopCarousel.addEventListener('scroll', () => {
      if (workshopCarousel.scrollLeft <= 0)
      {
        workshopPrevBtn.disabled = true;
      } 
      else 
      {
        workshopPrevBtn.disabled = false;
      }
      if (workshopCarousel.scrollLeft >= maxScrollLeft - 5) 
      {
        workshopNextBtn.disabled = true;
      } 
      else 
      {
        workshopNextBtn.disabled = false;
      }
    });
    workshopCarousel.dispatchEvent(new Event('scroll'));
  }
});
