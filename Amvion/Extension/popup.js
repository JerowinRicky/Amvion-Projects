// Get the button element
const changeColorButton = document.getElementById('changeColor');

// Add a click event listener to the button
changeColorButton.addEventListener('click', async () => {
  // Use the Chrome scripting API to execute a script in the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeBackgroundColor
  });
});

// Function to change the background color
function changeBackgroundColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}