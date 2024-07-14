document.addEventListener("DOMContentLoaded", () => {
    // Select the game board element where the cards will be displayed
    const grid = document.querySelector("#game-board");

    // Select the start button element
    const startButton = document.getElementById("start-game");

    // Select the display element for the number of tries
    const numberOfTriesDisplay = document.getElementById("number-of-tries");

    // Select the display element for the number of matched pairs
    const numberOfMatchedDisplay = document.getElementById("Matched");

    // Select the display element for the timer
    const timerDisplay = document.getElementById("timer");

    // Select the display element for the number of pairs
    const numberOfPairsDisplay = document.getElementById("numberOfPairs");

    //array to store the cards
    const cardArray = [
        { name: "card1", img: "images/Sd_card_1010160.png" },
        { name: "card1", img: "images/Sd_card_1010160.png" },
        { name: "card2", img: "images/Sd_card_1011140.png" },
        { name: "card2", img: "images/Sd_card_1011140.png" },
        { name: "card3", img: "images/Sd_card_1012720.png" },
        { name: "card3", img: "images/Sd_card_1012720.png" },
        { name: "card4", img: "images/Sd_card_1014080.png" },
        { name: "card4", img: "images/Sd_card_1014080.png" },
        { name: "card5", img: "images/Sd_card_1015290.png" },
        { name: "card5", img: "images/Sd_card_1015290.png" },
        { name: "card6", img: "images/Sd_card_1015740.png" },
        { name: "card6", img: "images/Sd_card_1015740.png" },
        { name: "card7", img: "images/Sd_card_1015890.png" },
        { name: "card7", img: "images/Sd_card_1015890.png" },
        { name: "card8", img: "images/Sd_card_1015900.png" },
        { name: "card8", img: "images/Sd_card_1015900.png" },
        { name: "card9", img: "images/Sd_card_1016090.png" },
        { name: "card9", img: "images/Sd_card_1016090.png" },
        { name: "card10", img: "images/Sd_card_1016110.png" },
        { name: "card10", img: "images/Sd_card_1016110.png" },
        { name: "card11", img: "images/Sd_card_1017180.png" },
        { name: "card11", img: "images/Sd_card_1017180.png" },
        { name: "card12", img: "images/Sd_card_1018250.png" },
        { name: "card12", img: "images/Sd_card_1018250.png" },
        { name: "card13", img: "images/Sd_card_1019340.png" },
        { name: "card13", img: "images/Sd_card_1019340.png" },
        { name: "card14", img: "images/Sd_card_1019820.png" },
        { name: "card14", img: "images/Sd_card_1019820.png" },
        { name: "card15", img: "images/Sd_card_1019910.png" },
        { name: "card15", img: "images/Sd_card_1019910.png" },
        { name: "card16", img: "images/Sd_card_1019970.png" },
        { name: "card16", img: "images/Sd_card_1019970.png" },
        { name: "card17", img: "images/Sd_card_1020730.png" },
        { name: "card17", img: "images/Sd_card_1020730.png" },
        { name: "card18", img: "images/Sd_card_1021120.png" },
        { name: "card18", img: "images/Sd_card_1021120.png" },
        { name: "card19", img: "images/Sd_card_1022780.png" },
        { name: "card19", img: "images/Sd_card_1022780.png" },
        { name: "card20", img: "images/Sd_card_4019410.png" },
        { name: "card20", img: "images/Sd_card_4019410.png" },
        // ... (rest of the card array)
    ];

    //number of pairs
    const numberOfPairs = cardArray.length / 2;
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let numberOfTries = 0;
    let matched = 0;
    let time = 0;
    let timerInterval;

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        // Shuffle the card array to randomize card positions
        shuffle(cardArray);

        // Clear the game board
        grid.innerHTML = "";

        // Reset the game state variables
        cardsWon = [];
        numberOfTries = 0;
        matched = 0;
        time = 0;

        // Update the displayed number of tries and matched pairs
        updateNumberOfTries();
        updateNumberOfMatched();

        // Start the game timer
        startTimer();

        // Update the displayed number of pairs
        numberOfPairsDisplay.textContent = numberOfPairs;

        // Create the card elements and add them to the game board
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "images/card icon.png"); // Set the card back image
            card.setAttribute("data-id", i); // Set a data attribute with the card's ID
            card.addEventListener("click", flipCard); // Add a click event listener to flip the card
            grid.appendChild(card); // Append the card to the game board
        }
    }


    function flipCard() {
        let cardId = this.getAttribute("data-id"); // Get the ID of the clicked card
        if (!cardsChosenId.includes(cardId)) {
            // Ensure the card hasn't been chosen already
            cardsChosen.push(cardArray[cardId].name); // Add the card's name to the chosen cards array
            cardsChosenId.push(cardId); // Add the card's ID to the chosen cards ID array
            this.setAttribute("src", cardArray[cardId].img); // Flip the card by setting its image source to the card image

            // Introduce a slight delay (300ms) before checking for a match. This delay serves two purposes:
            // a) It gives the player a moment to see both cards they've flipped.
            // b) It makes the game feel more natural and less abrupt.
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 300); // Delay the check for match
            }
        }
    }


    function checkForMatch() {
        const cards = document.querySelectorAll("#game-board img"); // Select all card elements
        const firstCardId = cardsChosenId[0]; // Get the ID of the first chosen card
        const secondCardId = cardsChosenId[1]; // Get the ID of the second chosen card

        // Check if the two chosen cards match and are not the same card
        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = "hidden"; // Hide the first card
            cards[secondCardId].style.visibility = "hidden"; // Hide the second card
            cards[firstCardId].removeEventListener("click", flipCard); // Remove click event listener from the first card
            cards[secondCardId].removeEventListener("click", flipCard); // Remove click event listener from the second card
            matched++; // Increment the matched counter
            cardsWon.push(cardsChosen); // Add the matched pair to the cardsWon array
        } else {
            cards[firstCardId].setAttribute("src", "images/card icon.png"); // Flip the first card back over
            cards[secondCardId].setAttribute("src", "images/card icon.png"); // Flip the second card back over
            numberOfTries++; // Increment the number of tries
        }

        // Reset the chosen cards arrays
        cardsChosen = [];
        cardsChosenId = [];

        updateNumberOfTries(); // Update the display for the number of tries
        updateNumberOfMatched(); // Update the display for the number of matched pairs

        // Check if all pairs have been found
        if (cardsWon.length === cardArray.length / 2) {
            stopTimer(); // Stop the timer
            alert("Congratulations! You found them all!"); // Congratulate the player
        }
    }

    function updateNumberOfTries() {
        numberOfTriesDisplay.textContent = numberOfTries; // Update the number of tries display
    }

    function updateNumberOfMatched() {
        numberOfMatchedDisplay.textContent = matched; // Update the number of matched pairs display
    }

    function startTimer() {
        stopTimer(); // Clear any existing timer
        time = 0; // Reset the timer
        updateTimer(); // Update the timer display
        timerInterval = setInterval(() => {
            time++; // Increment the timer
            updateTimer(); // Update the timer display
        }, 1000); // Set the interval to update every second
    }

    function stopTimer() {
        clearInterval(timerInterval); // Clear the timer interval
    }

    function updateTimer() {
        timerDisplay.textContent = `Time: ${time}s`; // Update the timer display with the current time
    }

    // Add an event listener to the start button to create the game board when clicked
    startButton.addEventListener("click", createBoard);

});