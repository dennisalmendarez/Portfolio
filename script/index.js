const cards = document.querySelectorAll('.card');
  const contentSections = document.querySelectorAll('.content-section');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  // current centered card index
  let centerIndex = 0;

  // Function to update card positions and styles
  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('left', 'center', 'right', 'hidden-left', 'hidden-right');
      card.setAttribute('tabindex', '-1');
    });

    // Calculate positions for each card relative to centerIndex
    cards.forEach((card, i) => {
      if(i === centerIndex) {
        card.classList.add('center');
        card.setAttribute('tabindex', '0');
      } else if (i === centerIndex - 1) {
        card.classList.add('left');
      } else if (i === centerIndex + 1) {
        card.classList.add('right');
      } else if (i < centerIndex - 1) {
        card.classList.add('hidden-left');
      } else if (i > centerIndex + 1) {
        card.classList.add('hidden-right');
      }
    });

    // Show content for center card only
    contentSections.forEach((section, i) => {
      if(i === centerIndex) {
        section.classList.add('active');
        section.focus();
      } else {
        section.classList.remove('active');
      }
    });
  }

  // Initialize carousel positions
  updateCarousel();

  // Click handlers for cards to activate on click
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      centerIndex = i;
      updateCarousel();
    });
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        centerIndex = i;
        updateCarousel();
      }
    });
  });

  // Arrow button handlers
  leftArrow.addEventListener('click', () => {
    centerIndex--;
    if(centerIndex < 0) centerIndex = cards.length -1;
    updateCarousel();
  });
  rightArrow.addEventListener('click', () => {
    centerIndex++;
    if(centerIndex >= cards.length) centerIndex = 0;
    updateCarousel();
  });