document.addEventListener('DOMContentLoaded', function() {
  const diceTypeSelect = document.getElementById('diceType');
  const diceCountInput = document.getElementById('diceCount');
  const rollButton = document.getElementById('rollButton');
  const resultsDiv = document.getElementById('results');
  const totalDiv = document.getElementById('total');

  rollButton.addEventListener('click', rollDice);

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
    if (diceCount < 1 || diceCount > 10) {
      alert('Please enter a number of dice between 1 and 10.');
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

  // Initialize with a welcome message
  resultsDiv.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.7); font-style: italic;">Click "Roll Dice!" to get started</div>';
});