document.addEventListener('DOMContentLoaded', function() {
  const diceTypeSelect = document.getElementById('diceType');
  const diceCountInput = document.getElementById('diceCount');
  const rollButton = document.getElementById('rollButton');
  const resultsDiv = document.getElementById('results');
  const totalDiv = document.getElementById('total');
  const themeButton = document.getElementById('themeButton');
  const themeModal = document.getElementById('themeModal');
  const closeModal = document.getElementById('closeModal');
  const themeOptions = document.querySelectorAll('.theme-option');

  rollButton.addEventListener('click', rollDice);
  themeButton.addEventListener('click', openThemeModal);
  closeModal.addEventListener('click', closeThemeModal);
  themeModal.addEventListener('click', function(e) {
    if (e.target === themeModal) {
      closeThemeModal();
    }
  });

  // Add click listeners to theme options
  themeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const selectedTheme = this.dataset.theme;
      changeTheme(selectedTheme);
      closeThemeModal();
    });
  });

  // Load saved theme
  loadTheme();

  // Allow rolling with Enter key
  diceCountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      rollDice();
    }
  });

  function rollDice() {
    const diceType = parseInt(diceTypeSelect.value);
    const diceCount = parseInt(diceCountInput.value);

    // Validate input
    if (diceCount < 1){
      diceCount = 1; 
      alert("Minimum number of dice is 1");
      return;
    } else if (diceCount > 100){
      diceCount = 100;
      alert("Maximum number of dice is 100");
      return;
    }

    // Clear previous results
    resultsDiv.innerHTML = '';
    totalDiv.classList.remove('show');

    const rolls = [];
    let total = 0;

    // Roll the dice
    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll);
      total += roll;
    }

    // Display individual results
    rolls.forEach((roll, index) => {
      const diceElement = document.createElement('span');
      diceElement.className = 'dice-result';
      diceElement.textContent = roll;

      // Add animation delay for visual effect
      setTimeout(() => {
        resultsDiv.appendChild(diceElement);
      }, index * 100);
    });

    // Display total after all dice are shown
    setTimeout(() => {
      if (diceCount > 1) {
        totalDiv.textContent = `Total: ${total}`;
        totalDiv.classList.add('show');
      }
    }, diceCount * 100);
  }

  function openThemeModal() {
    themeModal.classList.add('show');
    updateActiveTheme();
  }

  function closeThemeModal() {
    themeModal.classList.remove('show');
  }

  function changeTheme(selectedTheme) {
    // Remove all theme classes
    document.body.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-sunset', 'theme-dark', 'theme-light');

    // Add the selected theme class
    document.body.classList.add(`theme-${selectedTheme}`);

    // Save theme preference
    localStorage.setItem('diceRollerTheme', selectedTheme);

    // Update active state in modal
    updateActiveTheme();
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('diceRollerTheme') || 'purple';
    document.body.classList.add(`theme-${savedTheme}`);
  }

  function updateActiveTheme() {
    const currentTheme = getCurrentTheme();
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === currentTheme) {
        option.classList.add('active');
      }
    });
  }

  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('diceRollerTheme') || 'purple';
    return savedTheme;
  }

});