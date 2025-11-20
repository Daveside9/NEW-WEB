function switchTab(tabName) {
  // Hide all tab content
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  
  // Remove active class from all tab buttons
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab and mark button as active
  document.getElementById(tabName).style.display = 'block';
  event.target.classList.add('active');
}