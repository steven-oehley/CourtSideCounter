// Get elements from the HTML DOM
const homeScore = document.getElementById("home-score");
const awayScore = document.getElementById("away-score");
const gameTable = document.querySelector(".game-table");

// Get buttons for score increments and other game functionalities
const homePlusOne = document.getElementById("home-plus-one");
const homePlusTwo = document.getElementById("home-plus-two");
const homePlusThree = document.getElementById("home-plus-three");
const awayPlusOne = document.getElementById("away-plus-one");
const awayPlusTwo = document.getElementById("away-plus-two");
const awayPlusThree = document.getElementById("away-plus-three");
const resetBtn = document.querySelector(".reset");
const saveBtn = document.querySelector(".save");

// Function to determine the winner based on scores and display corresponding message
const checkWinning = () => {
  const homeScoreNum = parseInt(homeScore.innerHTML);
  const awayScoreNum = parseInt(awayScore.innerHTML);
  let winningEl = document.getElementById("winning");
  let emoji = "";
  let message = "";

  // Determine the message and emoji based on the score comparison
  if (homeScoreNum > awayScoreNum) {
    emoji = "👈";
    message = "Home team are in the lead 🥳";
  } else if (homeScoreNum < awayScoreNum) {
    emoji = "👉";
    message = "Away team are in the lead 🎉";
  } else {
    emoji = "🤞";
    message = "The teams are at a draw";
  }

  // Update the winning message with the determined emoji and message
  winningEl.innerHTML = `<div>
  <p class="emoji">${emoji}</p>
  <p class="message">${message}</p>
  </div>`;
};

// Event listeners for score increment buttons
homePlusOne.addEventListener("click", () => {
  homeScore.innerHTML = parseInt(homeScore.innerHTML) + 1;
  checkWinning();
});
// (Repeat for other score increment buttons)

// Function to reset scores and winning message
const resetScores = () => {
  homeScore.innerHTML = 0;
  awayScore.innerHTML = 0;
  document.getElementById("winning").innerHTML = "Good luck to both teams!";
};

// Event listener for double-click on the reset button to trigger score reset
resetBtn.addEventListener("dblclick", () => resetScores());

// Event listener for double-click on the save button to save game history
saveBtn.addEventListener("dblclick", () => {
  // Display the hidden game history table
  gameTable.classList.remove("hidden-table");

  // Create table rows and cells for game history
  const row = document.createElement("tr");
  const homeScoreValue = document.createElement("td");
  const awayScoreValue = document.createElement("td");
  const dateTime = document.createElement("td");
  const message = document.createElement("td");
  const currentDate = new Date();

  // Populate table cells with relevant data
  homeScoreValue.innerHTML = homeScore.innerHTML;
  awayScoreValue.innerHTML = awayScore.innerHTML;
  dateTime.innerHTML =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " @ " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes();

  message.innerHTML =
    parseInt(homeScore.innerHTML) > parseInt(awayScore.innerHTML)
      ? "Home Team Won! 🥳"
      : parseInt(homeScore.innerHTML) < parseInt(awayScore.innerHTML)
      ? "Away team won! 🎉"
      : "Game was a draw";

  // Append cells to the row and add the row to the game history table
  row.appendChild(homeScoreValue);
  row.appendChild(awayScoreValue);
  row.appendChild(dateTime);
  row.appendChild(message);
  document.querySelector(".table").appendChild(row);

  // Reset scores after saving game history
  resetScores();
});
