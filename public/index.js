const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    console.log("connected", socket.id);
})

socket.on("gameState", (data) => {
    // Update your UI based on the initial game state
    updateUI(data);
});

socket.on("updatedTestArray", (data) => {
    console.log("Updated test array:", data);
    // Handle the updated array as needed
    // For example, you might want to update your UI or perform other actions
});

let choosingSpot = false;

var player1 = {
    name: "player1", 
    health: 100,
    role: false
};

var player2 = { 
    name: "player2",
    health: 100,
    role: false
};

var allCards = [];

var card = {
    name: "",
    attack: 0,
    health: 0,
    img: "",
    rank: 1,
    desc: "null",
    currentHealth: null
};

var tinyKnight = Object.assign({}, card, {
    name: "Tiny Knight",
    attack: 1,
    health: 2,
    img: "card-images/lilknight.jpg",
    rank: 1,
    desc: 'null',
    currentHealth: 2
});

var superNinja = Object.assign({}, card, {
    name: "Super Ninja",
    attack: 2,
    health: 1,
    img: "card-images/4_WEAPON_NINJA.png",
    rank: 0,
    desc: "null",
    currentHealth: 1
});

var demonEyeball = Object.assign({}, card, {
    name: "Demon Eyeball",
    attack: 0,
    health: 3,
    img: "card-images/eyeball.jpg",
    rank: 0,
    desc: "null",
    currentHealth: 3
});

var sword = Object.assign({}, card, {
    name: "Sword",
    img: "card-images/REALSWORD1.png",
    rank: 0,
    desc: "Equip to any character: Increase its attack by 1."
})

AddToAllCards(tinyKnight);
AddToAllCards(superNinja);
AddToAllCards(demonEyeball);
AddToAllCards(sword);

var player1Deck = [];
console.log(player1Deck);

// CARD OPTION BUTTONS
const buttons = document.querySelectorAll('.btn');


function handleButtonClick(event) {
    const button = event.currentTarget;
    const randomCard = JSON.parse(button.getAttribute('data-random-card'));
    player1Deck.push(randomCard);

    updatePlayerDeck();
    updateDeckCount();
    resetButtonCards();

    // Remove the click event listener to prevent multiple selections
    button.removeEventListener('click', handleButtonClick);

    // Update the card-desc-text with the chosen card's desc
const cardIndex = parseInt(button.getAttribute('data-card-index'));
const cardDescText = document.getElementById(`card-desc-text${cardIndex + 1}`);

// Clear the previous description before updating
cardDescText.innerHTML = "";

// Create a new paragraph element for the card description
const descParagraph = document.createElement('p');
descParagraph.textContent = randomCard.desc;

// Append the description to the respective card's card-desc-text
cardDescText.appendChild(descParagraph);

// Display the card sprite in the card-information-onclick element
const cardInformationOnClick = document.getElementById('card-information-onclick');
cardInformationOnClick.innerHTML = ""; // Clear previous content

// Create an image element for the card sprite
const cardSpriteImage = document.createElement('img');
cardSpriteImage.src = randomCard.img;
cardSpriteImage.alt = randomCard.name; // Set alt text for accessibility

// Append the image element to the card-information-onclick element
cardInformationOnClick.appendChild(cardSpriteImage);

}




// Define a dictionary to keep track of card counts
const cardCounts = {};


function updatePlayerDeck() {
    const deckList = document.getElementById('player-deck');
    const cardCounts = {};
  
    // Clear the list and update the count for each card in the player's deck
    deckList.innerHTML = "";
    player1Deck.forEach((card) => {
      const cardKey = card.rank + " " + card.name;
  
      // Update the count or initialize it to 1
      cardCounts[cardKey] = (cardCounts[cardKey] || 0) + 1;
    });
  
    // Create list items for each unique card
    for (const cardKey in cardCounts) {
      const count = cardCounts[cardKey];
      const listItem = document.createElement('li');
      listItem.textContent = `${cardKey} x${count}`;
      deckList.appendChild(listItem);
    }
  }
  
  









socket.on("activateAcceptBtn", (data) => {

console.log("activateAcceptBtn works");
   document.getElementById('acceptLobby').style.display = 'block';
});

function handleChoosePlayerBtnClick(event) {
    if(event.currentTarget.id == "player1-btn") {
        player1.role = true;
        console.log("You are player 1", player1.role);
        console.log("player1 btn pressed");
        socket.emit("choosePlayer", { player: "player1" });
        socket.emit("updateLobby", { player: "player1" });
        
    } else if(event.currentTarget.id == "player2-btn") {
        player2.role = true;
        console.log("You are player 2", player2.role);
        console.log("player2 btn pressed");
        socket.emit("choosePlayer", { player: "player2" });
        socket.emit("updateLobby", { player: "player2" });
        
    }

    if(lobby.length === 1){
        document.getElementById('acceptLobby').style.display = 'block';
        socket.emit("activateAcceptBtn", {});
    }

    document.getElementById('player1-btn').style.display = 'none';
    document.getElementById('player2-btn').style.display = 'none';
    

}


// ...





buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

function AddToAllCards(card) {
    allCards.push(card);
}

// Assign random cards to buttons on startup
var assignedCards = [];

buttons.forEach((button, index) => {
    assignRandomCard(button, index);
    // Add event listener only once
    button.addEventListener('click', function() {
        handleClick(button);
    });
});
function assignRandomCard(button, index) {
    var randomCard = getRandomCardUnique();
    var cardIndex = index + 1;

    button.setAttribute("data-card-index", index);
    button.setAttribute("data-random-card", JSON.stringify(randomCard));

    // Update the card name elements with the chosen card's name
    var cardNameElement = document.getElementById(`card-name-${cardIndex}`);
    cardNameElement.textContent = randomCard.name;

    // Update the card text elements with the chosen card's attack and health values
    var cardTextElement = document.getElementById(`card-text-${cardIndex}`);
    cardTextElement.textContent = `RANK: ${randomCard.rank}, ATK: ${randomCard.attack}, HP: ${randomCard.health}`;

    // Update the card-desc-text with the chosen card's desc
    const cardDescText = document.getElementById(`card-desc-text${cardIndex}`);
    
    // Clear previous description
    cardDescText.innerHTML = "";

    // Create a new paragraph element for the card description
    const descParagraph = document.createElement('p');
    descParagraph.textContent = randomCard.desc;

    // Append the description to the respective card's card-desc-text
    cardDescText.appendChild(descParagraph);

    // Create an image element and set its source
    var cardImg = new Image();
    cardImg.src = randomCard.img;

    // Append the image element to the button
    button.innerHTML = "";
    button.appendChild(cardImg);

    // Store the assigned card in the assignedCards array
    assignedCards.push(randomCard);
}

function getRandomCard() {
    var randomIndex = Math.floor(Math.random() * allCards.length);
    return allCards[randomIndex];
}

function getRandomCardUnique() {
    if (assignedCards.length === buttons.length) {
        assignedCards = [];
    }

    var randomCard = getRandomCard();
    while (assignedCards.includes(randomCard)) {
        randomCard = getRandomCard();
    }

    assignedCards.push(randomCard);
    return randomCard;
}

function updateDeckCount() {
    const deckCountElement = document.getElementById('deck-text');
    deckCountElement.textContent = "Deck: " + player1Deck.length + " / 40";

    if (player1Deck.length === 40 && lobby.includes("player1") && lobby.includes("player2")) {
        // Show the game container with player spots
        const gameContainer = document.getElementById('game-container');
        gameContainer.style.display = 'flex';

        // Update the display property of card-information-onclick and card-desc-text-onclick
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.style.display = 'block';

        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.style.display = 'block';
    }
}
// ...

// ...

// ...

function resetButtonCards() {
    assignedCards = [];

    // Check if the deck size reaches 20
    if (player1Deck.length >= 20 && lobby.length === 2) {
        // Hide the button container
        const buttonContainer = document.getElementById('button-container');
        buttonContainer.style.display = 'none';

        // Populate the main player hand with 7 randomly chosen cards
        populateMainPlayerHand();
    }

    // Reassign random cards to buttons after the deck is full
    buttons.forEach((button, index) => {
        assignRandomCard(button, index);
    });
}


function populateMainPlayerHand() {
    const mainPlayerHandSlots = document.querySelectorAll('.main-player-hand-slots');

    for (let i = 0; i < 5; i++) {
        if (player1Deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * player1Deck.length);
            const randomCard = player1Deck.splice(randomIndex, 1)[0];
            console.log(randomCard);
            const slot = mainPlayerHandSlots[i];

            // Update style to make the slot visible
            slot.style.display = 'block';

            // Clear previous content
            slot.innerHTML = '';

            // Create an image element for the card
            const cardImage = document.createElement('img');
            cardImage.src = randomCard.img;
            cardImage.alt = randomCard.name;

            // Add the image to the slot
            slot.appendChild(cardImage);

            // Create or find the existing cost box
            let costBox = slot.querySelector('.card-cost-box');

            // If cost box doesn't exist, create it
            if (!costBox) {
                costBox = document.createElement('div');
                costBox.className = 'card-cost-box'; // Change id to class
                costBox.style.position = 'absolute';
                costBox.style.top = '5px';
                costBox.style.left = '5px';
                costBox.style.width = '20px';
                costBox.style.height = '20px';
                costBox.style.backgroundColor = 'rgb(42, 204, 245)';
                costBox.style.color = 'black';
                costBox.style.display = 'flex';
                costBox.style.justifyContent = 'center';
                costBox.style.alignItems = 'center';
                costBox.style.zIndex = '1';

                // Add the cost box to the slot
                slot.appendChild(costBox);
            }

            // Update the content of the cost box
            costBox.innerText = randomCard.rank;

            // Set the data attribute for the card
            slot.setAttribute('data-random-card', JSON.stringify(randomCard));
        }
    }
    updateMainDeckSize();
}

  
function handleButtonClick(event) {
    const button = event.currentTarget;
    const randomCard = JSON.parse(button.getAttribute('data-random-card'));
    player1Deck.push(randomCard);

    updatePlayerDeck();
    updateDeckCount();
    resetButtonCards();
}

// Opponent hand slots functionality
const opponentHandSlots = document.querySelectorAll('.opponent-hand-slots');
opponentHandSlots.forEach((slot) => {
    slot.addEventListener('click', handleOpponentSlotClick);
})

function handleOpponentSlotClick(event) {

    const slot = event.currentTarget;

    console.log("opponent hand works");

}

// Add event listeners to main-player-hand-slots elements
const mainPlayerHandSlots = document.querySelectorAll('.main-player-hand-slots');
mainPlayerHandSlots.forEach((slot) => {
    slot.addEventListener('click', handleSlotClick);
});




let summonButton = null;
let selectedCard = null;
let waitingForSummon = false;

let mainboard1Occupied = false;
let mainboard2Occupied = false;
let mainboard3Occupied = false;
let mainboard4Occupied = false;
let mainboard5Occupied = false;
let mainboard6Occupied = false;
let mainboard7Occupied = false;
let mainboard8Occupied = false;
let mainboard9Occupied = false;
let mainboard10Occupied = false;

let slotIDForRemoval = null;

let slot = null;

function handleSlotClick(event) {
    
    slot = event.currentTarget;

    if (!waitingForSummon && selectingReplacingCards == false) {
        
        id = slot.id;
        slotIDForRemoval = id;
        selectedCard = JSON.parse(slot.getAttribute('data-random-card'));
        console.log("Selected card: ", selectedCard);
        

        // Display the card sprite in the card-information-onclick element
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.innerHTML = "";
        
        const cardSpriteImage = document.createElement('img');
        cardSpriteImage.src = selectedCard.img;
        cardSpriteImage.alt = selectedCard.name;
        cardInformationOnClick.appendChild(cardSpriteImage);

        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.innerHTML = "";

        const descParagraph = document.createElement('p');
        descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
        cardDescTextOnClick.appendChild(descParagraph);

        // Create the SUMMON button
        if (!summonButton) {
            summonButton = document.createElement('button');
            summonButton.textContent = "SUMMON";
            summonButton.addEventListener('click', () => handleSummonButtonClick(slot));
            document.body.appendChild(summonButton);
        }

        // Set the button's position to the mouse cursor position
        summonButton.style.position = "fixed";
        summonButton.style.left = event.clientX + "px";
        summonButton.style.top = event.clientY + "px";
    }
    if (selectingReplacingCards == true) {
        
        const willReplaceValue = slot.getAttribute('willReplace') === 'true' ? 'false' : 'true';
        console.log(willReplaceValue);
        
        selectedCard = JSON.parse(slot.getAttribute('data-random-card'));

        if(willReplaceValue == 'true'){
        selectedCardsToReplace.push(JSON.parse(slot.getAttribute('data-random-card')));
        selectedSlotsToReplace.push(slot);
        console.log("Selected cards to replace: ", selectedCardsToReplace);
        console.log("Selected slots to replace: ", selectedSlotsToReplace);
        }

        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.innerHTML = "";

        const descParagraph = document.createElement('p');
        console.log("Selected card: ", selectedCard);
        descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
        cardDescTextOnClick.appendChild(descParagraph);

        // Add highlight effect to the selected slot
        slot.classList.add('selected-card-highlight');

        
        slot.setAttribute('willReplace', willReplaceValue);

        // Remove 'selected-card-highlight' class if willReplace is true
        if (willReplaceValue === 'false') {
            slot.classList.remove('selected-card-highlight');
            selectedCardsToReplace.pop(JSON.parse(slot.getAttribute('data-random-card')));
            selectedSlotsToReplace.pop(slot);
            console.log("SELECTED CARDS AFTER REMOVAL", selectedCardsToReplace);
            console.log("SELECTED SLOTS AFTER REMOVAL", selectedSlotsToReplace);
        }

        console.log(willReplaceValue);
    }
}

let cardInPlay = null;

let playPhase = false;

let postPhase = false;

let yesEnterPostPhase = document.getElementById('yesConfirmPostPhase');
let noEnterPostPhase = document.getElementById('noConfirmPostPhase');

yesEnterPostPhase.addEventListener('click', () => {
    
    phase = document.getElementById('mainPhase');
    midText = document.getElementById('turn-system');
    console.log("yes clicked");

    postPhase = true;
    attackPhase = false;
    attackTargeting = false;

    console.log("postPhase: ", postPhase, "playPhase: ", playPhase, "attackPhase: ", attackPhase, "attackTargeting: ", attackTargeting);

    menu = document.getElementById('confirmAttackMenu');
    menu.style.display = 'none';
    yesEnterPostPhase.style.display = 'none';
    noEnterPostPhase.style.display = 'none';

    
    phase.textContent = "POST PHASE";
    phase.style.backgroundColor = 'grey';

    midText.style.display = 'none';

})
noEnterPostPhase.addEventListener('click', () => {
    console.log("no clicked");
})

let usedFirst0Summon = false;

function handleSummonButtonClick(slot) {

    if(attackPhase == true){
        menu = document.getElementById('confirmAttackMenu');
        yes = document.getElementById('yesConfirmPostPhase');
        no = document.getElementById('noConfirmPostPhase');

        menu.textContent = "COMMIT TO POST PHASE? (You won't be able to attack.)";
        menu.style.display = 'block';
        yes.style.display = 'block';
        no.style.display = 'block';
    }

    

    if (totalCardsInPlay >= selectedCard.rank) {
        console.log(selectedCard, totalCardsInPlay);
        
        if (selectedCard.rank === 0) {
            if (usedFirst0Summon === false) {
                console.log("Good to summon 0 cost");
    
                console.log(totalCardsInPlay, selectedCard.rank);
    
                choosingSpot = true;
    
                console.log("choosingSpot: " + choosingSpot);
                console.log(selectedCard);
    
                if (selectedCard && slot) {
                    // Add logic to handle the summon button click
                    console.log('SUMMON button clicked for card:', selectedCard);
    
                    // Assign the entire selectedCard object to the data-card-inplay attribute
                    cardInPlay = JSON.stringify(selectedCard);
                    console.log("cardInPlay: " + cardInPlay);
    
                    // Remove the SUMMON button
                    if (summonButton) {
                        document.body.removeChild(summonButton);
                        summonButton = null;
                    }
                }
            } else {
                console.log("Already used 0 cost summon this turn.");

                midText = document.getElementById('turn-system');

                
                midText.textContent = "ALREADY USED 0 COST SUMMON";
                midText.style.opacity = '1';
                midText.style.display = 'block';

                // Start the fade-out effect after 3 seconds
                setTimeout(function () {
            
                // Use a transition for a smooth fade-out effect
                midText.style.transition = 'opacity 2s'; // Adjust the duration as needed

                // Set the opacity to 0 to trigger the fade-out
                midText.style.opacity = '0';
}, 3000); // Wait for 3 seconds before starting the fade-out effect



                if (summonButton) {
                    document.body.removeChild(summonButton);
                    summonButton = null;
                }
            }
        } else if (selectedCard.rank >= 1) {
            paySummonCost(selectedCard);

            if (summonButton) {
                document.body.removeChild(summonButton);
                summonButton = null;
            }
        }
    } else {
        console.log("not enough cards in play");
    
        // Assuming you have a reference to the element already
        var turnSystemElement = document.getElementById('turn-system');
    
        turnSystemElement.style.display = 'block';
    
        // Change the text content of the <p> element
        turnSystemElement.textContent = "NOT ENOUGH CARDS IN PLAY";
    
        // Start the fade-out effect by setting opacity to 0
        turnSystemElement.style.opacity = '0';
    
        // Use setTimeout to wait for the fade-out effect to finish
        setTimeout(function () {
            // Now that the element is invisible, set display to 'none'
            turnSystemElement.style.display = 'none';
        }, 5000); // The duration here should match the CSS transition duration
    }
}
    

            



const choosePlayerBtns = document.querySelectorAll('.choosePlayerBtn');

choosePlayerBtns.forEach((btn) => {
    btn.addEventListener('click', handleChoosePlayerBtnClick);
})

let lobby = [];



// Client-side logic
socket.on('playerAssigned', ({ player }) => {
    console.log(`You are assigned as ${player}`);
});

socket.on('playersUpdated', ({ player }) => {

    console.log('Players updated:', { player });

    // Update your UI to reflect the current player choices
});

socket.on('updateLobby', ({ player }) => {
    lobby.push(player);
    console.log("Lobby: " + lobby);
});

socket.on('summonCharacter', ({ card }) => {
    console.log('Character summoned:', { card });
    // Add logic to handle the character being summoned
})

socket.on('cardPlayMain1', ({ select, chosenCard }) => {
    console.log('Main player played on slot 1 of their POV = Enemy slot 10 for YOUR POV:', { select, chosenCard });
    // Add logic to handle the card being played
})

socket.on('enemySummonCharacter', ({ sender, select, chosenCard }) => {
    if (select == "mainboard-1") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy10");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-10");
                

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }


            }
            
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy10");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-10");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
        
    }
    if(select == "mainboard-2") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy9");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-9");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy9");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-9");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-3") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy8");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-8");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy8");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-8");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-4") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy7");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-7");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy7");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-7");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-5") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy6");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-6");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy6");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-6");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-6") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy5");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-5");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy5");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-5");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-7") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy4");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-4");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy4");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-4");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-8") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy3");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-3");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy3");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-3");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-9") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy2");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-2");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy2");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-2");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-10") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy1");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-1");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy1");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-1");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
});


let playerSelected = false;
let btnPressed = false;

// ...

let selectedPlayers = new Set();

// Add a listener to update btnPressed for all users
socket.on("btnStateChanged", function(data) {
    btnPressed = data.btnPressed;
    if (btnPressed == true) {
        document.getElementById('acceptLobby').style.display = 'block';
    }
});



// Declare board spots globally
const boardSpots = document.querySelectorAll('.board-spot');

const acceptBtn = document.getElementById('acceptLobby');

// Accept lobby button
acceptBtn.addEventListener('click', handleAcceptLobbyBtnClick);
    


// Add click event listeners to board spots
boardSpots.forEach((spot) => {
    spot.addEventListener('click', handleBoardSpotClick);
});

function handleAcceptLobbyBtnClick(event) {
    document.getElementById('button-container').style.display = 'none';
    // Show the game container with player spots
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'flex';

    // Update the display property of card-information-onclick and card-desc-text-onclick
    const cardInformationOnClick = document.getElementById('card-information-onclick');
    cardInformationOnClick.style.display = 'block';

    const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
    cardDescTextOnClick.style.display = 'block';
    
    const result = coinFlipFirstAction();
    let firstPlayer;
    if (result === 'Heads') {
        firstPlayer = 'Player1';
        console.log("Player 1 goes first!")

        updateCenterText("Player 1 goes first!")


    } else {
        firstPlayer = 'Player2';
        console.log("Player 2 goes first!")

        updateCenterText("Player 2 goes first!")
    }

    populateMainPlayerHand();
    replaceStarterHand();


    
    console.log("Accept works");
}

function coinFlipFirstAction() {
    
    const randomResult = Math.floor(Math.random() * 2);

    // Return 'Heads' for 0 and 'Tails' for 1
    return (randomResult === 0) ? 'Heads' : 'Tails';
}

let attackTargeting = false;
let attackPhase = false;

let atkMenu = document.getElementById("confirmAttackMenu");
let atkMenuYes = document.getElementById("yesConfirmAttack");
let atkMenuNo = document.getElementById("noConfirmAttack");
let phase = document.getElementById("mainPhase");

atkMenuYes.addEventListener('click', function() {
    console.log("Yes pressed");

    playPhase = false;
    attackPhase = true;
    console.log("attackPhase: ", attackPhase, "playPhase: ", playPhase);

    atkMenu.style.display = "none";
    atkMenuYes.style.display = "none";
    atkMenuNo.style.display = "none";
    phase.textContent = "ATTACK PHASE";
    phase.style.backgroundColor = "red";

    attackTargeting = true;

    centerText = document.getElementById("turn-system");
    centerText.style.display = "block";
    centerText.textContent = "SELECT ATTACK TARGET";

        console.log("Attack button works AFTER MENU CONFIRMATION", "ATTACK TARGET MODE : ", attackTargeting);

        if (attackButton) {
        document.body.removeChild(attackButton);
        attackButton = null;
        }


});

atkMenuNo.addEventListener('click', function() {
    console.log("No pressed");

    atkMenu.style.display = "none";
    atkMenuYes.style.display = "none";
    atkMenuNo.style.display = "none";
})

// Attack button
function handleAttackButtonClick(slot) {
    if(playPhase == true) {

        atkMenu.style.display = "block";
        atkMenuYes.style.display = "block";
        atkMenuNo.style.display = "block";

        document.body.removeChild(attackButton);
        
    }else{

        attackTargeting = true;

        console.log("Attack button works", "ATTACK TARGET MODE : ", attackTargeting);

        if (attackButton) {
        document.body.removeChild(attackButton);
        attackButton = null;
        }
    }
    console.log("ATTACK TARGET MODE : ", attackTargeting);
    
}
function handleConfirmAttackButtonClick(event) {
    console.log("Confirm attack button works");

    console.log("data-card-inplay attribute:", enemyTargetCard);

    enemyCard = JSON.parse(enemyTargetCard);

    console.log("enemyCard: ", enemyCard);

    console.log(chosenCard);
    console.log(enemyCard.chealth, chosenCard.attack);

    hPUpdate = battleCalculation(enemyCard.currentHealth, chosenCard.attack);
    console.log("hPUpdate: ", hPUpdate);

    console.log("enemyCard health1: ", enemyCard.health);
    console.log("enemyCard currentHP: ", enemyCard.currentHealth);
    enemyCard.currentHealth = hPUpdate;
    console.log("enemyCard health2: ", enemyCard.currentHealth);

    updateHPATKUI(enemyCard, enemyTarget);

    enemyTargetCard = JSON.stringify(enemyCard); // Update enemyTargetCard after modifying enemyCard
    console.log("enemyTargetCard after update: ", enemyTargetCard);

    enemyTarget.setAttribute("data-card-inplay", enemyTargetCard);

    if(hPUpdate <= 0) {
        // Assuming cardImage is the img element
        const cardImage = enemyTarget.querySelector('img');
        const cardHealthBox = enemyTarget.querySelector('#card-health-box');
        const cardAttackBox = enemyTarget.querySelector('#card-attack-box');
        if (cardImage && cardHealthBox && cardAttackBox) {
            cardImage.parentNode.removeChild(cardImage);
            cardHealthBox.style.display = 'none';
            cardAttackBox.style.display = 'none';
        }
        cardSendGraveyard(enemyCard);
    }

    if (confirmAttackButton) {
        document.body.removeChild(confirmAttackButton);
        confirmAttackButton = null;
    }
    document.body.removeChild(confirmAttackButton);
}




let attackButton = null;
let confirmAttackButton = null;

// attack targeting logic
let mainPlayerCard = null;
let enemyTargetCard = null;
let enemyTarget = null;

let clickedSlot = null;

let atkBtnRemove = false;

let totalCardsInPlay = 0;

let cardInSlot = null;

// Function to handle the click on the board spot
function handleBoardSpotClick(event) {

    cardInSlot = event.currentTarget.getAttribute('data-card-inplay');
    cardInSlot2 = event.currentTarget.getAttribute('data-random-card');
    console.log("cardInSlot: " + cardInSlot);
    console.log(choosingSpot, event.currentTarget, choosingSummonCost, chooseSlot, cardInSlot);

    if (choosingSpot == false && event.currentTarget != null && attackTargeting == false && chooseSlot == false && choosingSummonCost == false) {
        console.log(choosingSpot, event.currentTarget, choosingSummonCost, chooseSlot, cardInSlot);
        const slot = event.currentTarget;
        clickedSlot = slot;
        console.log("clickedSlot: ", clickedSlot);
        id = slot.id;
        console.log("Selected slot: ", slot);
        console.log("Selected slot id: ", id);
        console.log(slot.getAttribute('data-card-inplay'));
        selectedCard = JSON.parse(slot.getAttribute('data-card-inplay'));
        
        console.log("Selected card: ", selectedCard);

        // Display the card sprite in the card-information-onclick element
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.innerHTML = "";
        
        const cardSpriteImage = document.createElement('img');
        cardSpriteImage.src = selectedCard.img;
        cardSpriteImage.alt = selectedCard.name;
        cardInformationOnClick.appendChild(cardSpriteImage);

        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.innerHTML = "";

        const descParagraph = document.createElement('p');
        descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
        cardDescTextOnClick.appendChild(descParagraph);

        if(event.currentTarget.getAttribute('data-card-inplay') != null && chooseSlot == false && choosingSummonCost == false) {

            console.log(attackButton);
           if (!attackButton) {
            attackButton = document.createElement('button');
            attackButton.textContent = "ATTACK";
            attackButton.addEventListener('click', () => handleAttackButtonClick(slot));
            document.body.appendChild(attackButton);
            }
            attackButton.style.position = "fixed";
            attackButton.style.left = event.clientX + "px";
            attackButton.style.top = event.clientY + "px"; 
            
            }
            atkBtnRemove = true;
        
        

    }
    //regular summoning
    if (choosingSpot && event.currentTarget && !choosingSummonCost && !chooseSlot && (cardInSlot === "null" || cardInSlot === null)) {
        
        const assignCard = JSON.parse(cardInPlay)
        console.log("assignCard: ", assignCard);

        event.currentTarget.setAttribute("data-card-inplay", JSON.stringify(assignCard));

        // Create an image element for the selected card
        const cardImage = document.createElement('img');
        cardImage.src = assignCard.img;
        cardImage.alt = assignCard.name;

        cardImage.style.width = '100%';
        cardImage.style.height = '100%';
        cardImage.style.objectFit = 'cover';

        const clickedBoardSpot = event.currentTarget;
        console.log("Clicked Board Spot:", clickedBoardSpot.id);
        chosenBoardSpot = clickedBoardSpot;
        chosenBoardSpot.appendChild(cardImage);


        const parentElement = document.querySelector(".main-player-hand");
        parentID = parentElement.id;

        console.log(slotIDForRemoval);

        // Assuming slotIDForRemoval is the ID of the element you want to remove
        const elementToRemove = document.getElementById(slotIDForRemoval);

        // Check if the element to be removed exists before attempting to remove it
        if (elementToRemove && parentElement) {
        // Remove the element
            parentElement.removeChild(elementToRemove);
        }



        choosingSpot = false;
        if(assignCard.rank == 0){
            usedFirst0Summon = true;
            console.log("usedFirst0Summon set to false: " + usedFirst0Summon);
        }
        totalCardsInPlay++;
        console.log("totalCardsInPlay: " + totalCardsInPlay);
        console.log("choosingSpot: " + choosingSpot);

    // Update card-health-box and card-attack-box with the summoned card's values
        const cardHealthBox = chosenBoardSpot.querySelector("#card-health-box");
        const cardAttackBox = chosenBoardSpot.querySelector("#card-attack-box");
        console.log(cardHealthBox);
        console.log(cardAttackBox);

        if (cardHealthBox && cardAttackBox) {
            cardHealthBox.style.display = "block";
            cardAttackBox.style.display = "block";
            cardHealthBox.textContent = assignCard.health;
            cardAttackBox.textContent = assignCard.attack;
}



        socket.emit("playerMove", chosenBoardSpot.id);

        socket.emit('summonCharacter', { card: selectedCard });

        if(chosenBoardSpot.id == ("mainboard-1")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain1", { select, chosenCard })
            mainboard1Occupied = true;
            console.log("mainboard1Occupied: " + mainboard1Occupied);
            
            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
            
        }
        if(chosenBoardSpot.id == ("mainboard-2")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain2", { select, chosenCard })
            mainboard2Occupied = true;
            console.log("mainboard2Occupied: " + mainboard2Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
            
        }
        if(chosenBoardSpot.id == ("mainboard-3")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain3", { select, chosenCard })
            mainboard3Occupied = true;
            console.log("mainboard3Occupied: " + mainboard3Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-4")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain4", { select, chosenCard })
            mainboard4Occupied = true;
            console.log("mainboard4Occupied: " + mainboard4Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-5")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain5", { select, chosenCard })
            mainboard5Occupied = true;
            console.log("mainboard5Occupied: " + mainboard5Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-6")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain6", { select, chosenCard })
            mainboard6Occupied = true;
            console.log("mainboard6Occupied: " + mainboard6Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-7")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain7", { select, chosenCard })
            mainboard7Occupied = true;
            console.log("mainboard7Occupied: " + mainboard7Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-8")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain8", { select, chosenCard })
            mainboard8Occupied = true;
            console.log("mainboard8Occupied: " + mainboard8Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-9")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain9", { select, chosenCard })
            mainboard9Occupied = true;
            console.log("mainboard9Occupied: " + mainboard9Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-10")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain10", { select, chosenCard })
            mainboard7Occupied = true;
            console.log("mainboard10Occupied: " + mainboard10Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
    }
    if (chooseSlot == true && event.currentTarget != null && choosingSummonCost == false) {
        console.log(slotIDForRemoval);
        slotRemove = document.getElementById(slotIDForRemoval);
        parent = document.querySelector(".main-player-hand");

        parent.removeChild(slotRemove);


        taken = event.currentTarget.getAttribute('data-card-inplay');
        
        if(taken == null || taken == "null"){
            // Set the data-card-inplay attribute to the selected card
        
            
            console.log("Card about to be summoned: ", assignCard);
        
            // Assuming selectedCard is an object with properties like img, name, etc.
            const selectedCardData = JSON.stringify(assignCard);
        
            // Assign selectedCard to the data-card-inplay attribute
            event.currentTarget.setAttribute("data-card-inplay", selectedCardData);
        
            // Create an image element for the selected card
            const cardImage = document.createElement('img');
            cardImage.src = assignCard.img;
            cardImage.alt = assignCard.name;
        
            cardImage.style.width = '100%';
            cardImage.style.height = '100%';
            cardImage.style.objectFit = 'cover';
        
            const clickedBoardSpot = event.currentTarget;
            console.log("Clicked Board Spot:", clickedBoardSpot.id);
            chosenBoardSpot = clickedBoardSpot;
            chosenBoardSpot.appendChild(cardImage);

            const cardHealthBox = chosenBoardSpot.querySelector('#card-health-box');
            const cardAttackBox = chosenBoardSpot.querySelector('#card-attack-box');
            console.log(cardHealthBox, cardAttackBox);

            cardHealthBox.style.display = "block";
            cardAttackBox.style.display = "block";
            console.log(cardHealthBox, cardAttackBox);

            cardHealthBox.textContent = assignCard.health;
            cardAttackBox.textContent = assignCard.attack;

            chooseSlot = false;
            totalCardsInPlay++;
            console.log("totalCardsInPlay: " + totalCardsInPlay);
            console.log(slot);

            var turnSystemElement = document.getElementById("turn-system");

            // Change the text content of the <p> element
            turnSystemElement.textContent = "Select action";


        }else{
            console.log("Slot taken");
        }
            
    
    }
    // attack targeting
    if(attackTargeting == true && chosenBoardSpot != null){

        enemyTarget = event.currentTarget;

        enemyTargetCard = enemyTarget.getAttribute("data-card-inplay");

        let mainPlayerCard = chosenCard;

        console.log("mainPlayerCard: ", mainPlayerCard);
        console.log("boardspot: ", enemyTarget);
        console.log("data-card-inplay attribute:", enemyTargetCard);

        attackTargeting = false;

        console.log("attackTargeting: " + attackTargeting);

        if (!confirmAttackButton) {
            confirmAttackButton = document.createElement('button');
            confirmAttackButton.textContent = 'Confirm Attack';
            confirmAttackButton.addEventListener('click', handleConfirmAttackButtonClick);
            document.body.appendChild(confirmAttackButton);  

            confirmAttackButton.style.position = "fixed";
            confirmAttackButton.style.left = event.clientX + "px";
            confirmAttackButton.style.top = event.clientY + "px";
        }
        
    }
    // choosing summon cost after summon button click if card requires sacrifice(s)
    if (choosingSummonCost == true && event.currentTarget != null) {
        console.log("COST THAT MUST BE PAID IS :", price);

        target = event.currentTarget.getAttribute("data-card-inplay");

        console.log("card target", target);

        
        if (target != null) {
            targetCard = JSON.parse(target);
            console.log("targetCard: ", targetCard);
        
            console.log(target);
        
            // Remove the data-card-inplay attribute from the current target
            event.currentTarget.removeAttribute("data-card-inplay");
        
            // Get the updated value of the target attribute after removal
            target = event.currentTarget.getAttribute("data-card-inplay");
            console.log("AFTER REMOVAL: ", target);
        
            // Now, target will be null or undefined, representing an empty board slot
            cardSendGraveyard(targetCard);
            paid++;
            console.log("paid: ", paid);
            updateSelectCardToPaySummonCost();
            
            
            
        
            // Remove the img element from the chosen board spot
            const imgElement = event.currentTarget.querySelector('img');
            const cardHealthBox = event.currentTarget.querySelector('#card-health-box');
            const cardAttackBox = event.currentTarget.querySelector('#card-attack-box');

            if (imgElement && cardHealthBox && cardAttackBox) {
                event.currentTarget.removeChild(imgElement);
                cardHealthBox.style.display = "none";
                cardAttackBox.style.display = "none";
            }
            //check if payment is complete, if it is will activate click to summon
            paymentComplete();
            

            
        }
        
    }
    

        
}

let chooseSlot = false;
function paymentComplete(){
    if(paid >= price){
        chooseSlot = true;
        console.log("payment complete, choosing spot to summon now: " + chooseSlot);
        choosingSummonCost = false;
        totalCardsInPlay = totalCardsInPlay - paid;
        console.log("total cards in play: " + totalCardsInPlay);
        price = 0;
        paid = 0;

        var turnSystemElement = document.getElementById("turn-system");

        // Change the text content of the <p> element
        turnSystemElement.textContent = "SELECT BOARD SPOT TO SUMMON CARD";

    }
}








function updateMainDeckSize() {
    const mainDeckElement = document.getElementById('main-player-deck');
    const deckSize = player1Deck.length;
    const maxDeckSize = 40; // Assuming a maximum deck size of 40

    // Update the text content with the current and maximum deck size
    mainDeckElement.textContent = `MAIN DECK ${deckSize}/${maxDeckSize}`;
    console.log(`Main deck size: ${deckSize}/${maxDeckSize}`);
}

function battleCalculation(targetHP, damage) {
    finalHP = targetHP - damage;

    console.log("finalHP: " + finalHP);
    return finalHP;
}

function updateHPATKUI(card, boardSpot) {

    console.log(card);
    console.log(boardSpot);
    
    const healthUI = boardSpot.querySelector('#card-health-box');
    console.log(healthUI);

    console.log("card health: ", card.currentHealth);
    hp = card.currentHealth;
    healthUI.textContent = hp;
    healthUI.style.display = 'block';

    

}

let mainPlayerGraveyard = [];

function cardSendGraveyard(card){

    mainPlayerGraveyard.push(card);
    console.log("mainPlayerGraveyard: ", mainPlayerGraveyard);
    updateMainPlayerGraveyardNumber();
    openSlot = findAvailableGraveyardSlot();
    console.log("openSlot: ", openSlot);
    assignGraveyardSlot(card, openSlot);
    
}

let graveyardDiv = document.getElementById('main-player-graveyard');

function updateMainPlayerGraveyardNumber(){
    if (graveyardDiv) {
        graveyardDiv.textContent = `graveyard (${mainPlayerGraveyard.length})`;
    }
}

graveyardDiv.addEventListener('click', function(){
    toggleGraveyardMenu();
})
function findAvailableGraveyardSlot(){
    for (let i = 1; i <= 40; i++) {
        if ($('#graveyard-ui-menu-card-' + i).attr('data-card') === '') {
            return i;
        }
    }
    return null;
}
function assignGraveyardSlot(card, slot) {
    let selectSlot = $('#graveyard-ui-menu-card-' + slot);
    
    // Convert the card object to a JSON-formatted string
    let cardString = JSON.stringify(card);

    // Assign the JSON-formatted string to the data-card attribute
    selectSlot.attr('data-card', cardString);

    let img = card.img;

    // Append an image element with the card image and add styling
    selectSlot.html('<img src="' + img + '" alt="Card image" style="max-width: 100%; max-height: 100%;">');
}

function toggleGraveyardMenu(){
    const graveyardMenu = document.getElementById('graveyard-ui-menu');
    if (graveyardMenu.style.display === 'none') {
        graveyardMenu.style.display = 'block';
    }
    var exitButton = document.getElementById('graveyard-ui-menu-close');

    if (exitButton) {
        exitButton.addEventListener('click', function () {
            // Add your exit button click logic here
            console.log('EXIT button clicked!');
            graveyardMenu.style.display = 'none';


        });
    }
}
var listItems = document.querySelectorAll('.graveyard-ui-menu-card');

// Iterate over each list item and attach an event listener
listItems.forEach(function (item) {
    item.addEventListener('click', function () {
                // Do something when the list item is clicked
                console.log('List item clicked:', item.id);
                testCard = JSON.parse(item.getAttribute('data-card'));
                console.log(testCard);

                const cardInformationOnClick = document.getElementById('card-information-onclick');
                cardInformationOnClick.innerHTML = "";
        
                const cardSpriteImage = document.createElement('img');
                cardSpriteImage.src = testCard.img;
                cardSpriteImage.alt = testCard.name;
                cardInformationOnClick.appendChild(cardSpriteImage);

                // Update the card-desc-text-onclick with the chosen card's desc
                const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
                cardDescTextOnClick.innerHTML = "";

                const descParagraph = document.createElement('p');
                descParagraph.textContent = "RANK: " + testCard.rank + " ATK: " + testCard.attack + " HP: " + testCard.health + " " + testCard.desc;
                cardDescTextOnClick.appendChild(descParagraph);

    });
});

let choosingSummonCost = false;
let price = 0;
let pricePaid = false;
let paid = 0;

function paySummonCost(card){
    console.log("paySummonCost works");
    console.log(card);

    choosingSpot = false;

    price = card.rank;
    
    console.log("price: ", price);

    // Access the <p> element by its id
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = "SELECT CARDS TO PAY SUMMON COST: " + paid + "/" + price; 
    
    choosingSummonCost = true;
    assignCard = card;
    console.log("assignCard: ", assignCard);
}
function updateSelectCardToPaySummonCost(){
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = "SELECT CARDS TO PAY SUMMON COST: " + paid + "/" + price;
}

let mainHand = [];

// Assuming you have a loop where you generate the slots
for (let i = 1; i <= 7; i++) {
    const slotId = `player-hand-${i}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
        mainHand.push(slotElement);
    }
}
console.log("mainHand: ", mainHand);


function drawCard() {
    // Check if there are cards left in the deck
    if (player1Deck.length === 0) {
        console.log("No cards left in the deck.");
        return null; // or handle accordingly based on your use case
    }

    // Get a random index to select a card from the deck
    const randomIndex = Math.floor(Math.random() * player1Deck.length);

    console.log("Deck BEFORE card removed", player1Deck);

    // Remove the selected card from the deck
    const drawnCard = player1Deck.splice(randomIndex, 1)[0];

    console.log("Drew a card:", drawnCard);
    console.log("Deck: ", player1Deck);
    console.log("mainHand: ", mainHand);

    const emptySlot = findFirstEmptySlot();

    if (emptySlot) {
        emptySlot.setAttribute("data-random-card", JSON.stringify(drawnCard));
        console.log("emptySlot: ", emptySlot);
        emptySlot.style.display = "block";
        emptySlot.innerHTML = "";

        const cardImage = document.createElement('img');
        cardImage.src = drawnCard.img;
        cardImage.alt = drawnCard.name;

        cardImage.style.width = '100%';
        cardImage.style.height = '100%';
        cardImage.style.objectFit = 'cover';

        // Append the card image to the emptySlot
        emptySlot.appendChild(cardImage);

        let costBox = emptySlot.querySelector('#card-cost-box');

            // If cost box doesn't exist, create it
            if (!costBox) {
                costBox = document.createElement('div');
                costBox.className = 'card-cost-box'; // Change id to class
                costBox.style.position = 'absolute';
                costBox.style.top = '5px';
                costBox.style.left = '5px';
                costBox.style.width = '20px';
                costBox.style.height = '20px';
                costBox.style.backgroundColor = 'rgb(42, 204, 245)';
                costBox.style.color = 'black';
                costBox.style.display = 'flex';
                costBox.style.justifyContent = 'center';
                costBox.style.alignItems = 'center';
                costBox.style.zIndex = '1';

                // Add the cost box to the slot
                emptySlot.appendChild(costBox);
            }

            // Update the content of the cost box
            costBox.innerText = drawnCard.rank;

            
    }
    updateMainDeckSize();
    return drawnCard;
}


function updateCenterText(string){
    // Access the <p> element by its id
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = string; 
}

let starterHand = [];
let starterSlots = [];
let selectedCardsToReplace = [];
let selectedSlotsToReplace = [];

let selectingReplacingCards = false;

function replaceStarterHand() {
    console.log("replaceStarterHand works");
    console.log(mainPlayerHandSlots);

    for (let i = 0; i < mainPlayerHandSlots.length; i++) {
        const currentSlot = mainPlayerHandSlots[i];
        console.log(currentSlot);

        const dataCard = JSON.parse(currentSlot.getAttribute('data-random-card'));
        const parent = currentSlot.id;
        console.log(parent);
        console.log(dataCard);

        if (dataCard) {
            console.log("has card");
            starterHand.push(dataCard);
            starterSlots.push(parent);

            
            
            console.log(parent);
        } else {
            console.log("no card");
        }
    }

    console.log("starterHand: ", starterHand);
    console.log("starterSlots: ", starterSlots);

    selectingReplacingCards = true;
}
//DONE button for reshuffle starter hand cards
document.getElementById('replace-hand-done').addEventListener('click', function () {
    console.log("DONE button clicked");
    selectingReplacingCards = false;
    console.log("selectingReplacingCards: ", selectingReplacingCards);
    addReplacementToDeck();
  
    console.log(selectedSlotsToReplace);
    
  
    // Iterate through the array and remove the "selected-card-highlight" div from each hand slot
    selectedSlotsToReplace.forEach(slot => {
      slot.classList.remove('selected-card-highlight');
    });

    drawCard();

    playPhase = true;
    console.log("playPhase: ", playPhase);

    play = document.getElementById('mainPhase');
    play.style.display = 'block';

    turn = document.getElementById('turn-system');
    turn.style.display = 'none';

    endTurn = document.getElementById('endTurn');
    endTurn.style.display = 'block';


});

let endTurnButton = document.getElementById('endTurn');
let isEnemyTurn = false;

endTurnButton.addEventListener('click', function () {
    console.log("END TURN button clicked");

    isEnemyTurn = true;

    endTurnButton.textContent = '';
    endTurnButton.style.backgroundColor = 'rgb(43, 36, 36)';
    endTurnButton.style.opacity = 0;

    // Set new background properties with a slower animation duration (e.g., 10s)
    endTurnButton.style.background = "rgba(0, 0, 0, 0.1) url('effects/magic-stars.gif') center center no-repeat";
    endTurnButton.style.backgroundSize = "cover";
    endTurnButton.style.animation = "slowBackground 10s infinite linear"; // Adjust the duration as needed

    // Trigger reflow before transitioning to ensure the fade-in effect
    endTurnButton.offsetWidth;

    // Fade in the button by setting opacity to 1 with a longer duration (e.g., 1.5s)
    endTurnButton.style.transition = "opacity 1.5s";
    endTurnButton.style.opacity = 1;

    changePhase = document.getElementById('mainPhase');

    changePhase.textContent = 'ENEMY TURN';
    changePhase.style.backgroundColor = '#662c2c';
});








    


function addReplacementToDeck() {
    console.log("addReplacementToDeck works");
    console.log(selectedCardsToReplace);

    for (let i = 0; i < selectedCardsToReplace.length; i++) {
        const card = selectedCardsToReplace[i];
        console.log(card);
        player1Deck.push(card);
    }

    console.log(player1Deck);
    updateMainDeckSize();

    for (let i = 0; i < selectedSlotsToReplace.length; i++) {
        const slotId = selectedSlotsToReplace[i];
        console.log(slotId);

        // Assuming each image is directly a child of the slot
        const slot = document.getElementById(slotId);
        console.log(slot);

        if (slot) {
            // Remove all child elements (including the image)
            while (slot.firstChild) {
                slot.removeChild(slot.firstChild);
            }

            // Remove the card-cost-box element
            const cardCostBox = slot.querySelector(".card-cost-box");
            if (cardCostBox) {
                slot.removeChild(cardCostBox);
            }

            console.log(`Cleared content for slot ${slotId}`);
        } else {
            console.log(`No slot found for id ${slotId}`);
        }
    }
    drawReplacementHand();
}
function drawReplacementHand() {
    console.log("drawReplacementHand works");
    console.log(player1Deck);
    console.log(selectedSlotsToReplace);

    for (let i = 0; i < selectedSlotsToReplace.length; i++) {
        console.log(selectedSlotsToReplace[i]);

        const slot = selectedSlotsToReplace[i];

        // Check if the slot exists and there are cards in the deck
        if (slot && player1Deck.length > 0) {
            // Pop a random card from the deck
            const randomIndex = Math.floor(Math.random() * player1Deck.length);
            const rCard = player1Deck.splice(randomIndex, 1)[0];
            console.log(player1Deck);
            updateMainDeckSize();

            // Do something with the random card, e.g., update the slot content
            if (rCard) {
                // Clear previous content
                slot.innerHTML = '';

                // Create an image element for the card
                const cardImage = document.createElement('img');
                cardImage.src = rCard.img;
                cardImage.alt = rCard.name;

                // Add the image to the slot
                slot.appendChild(cardImage);

                // Create or find the existing cost box
                let costBox = slot.querySelector('.card-cost-box');

                // If cost box doesn't exist, create it
                if (!costBox) {
                    costBox = document.createElement('div');
                    costBox.className = 'card-cost-box'; // Change id to class
                    costBox.style.position = 'absolute';
                    costBox.style.top = '5px';
                    costBox.style.left = '5px';
                    costBox.style.width = '20px';
                    costBox.style.height = '20px';
                    costBox.style.backgroundColor = 'rgb(42, 204, 245)';
                    costBox.style.color = 'black';
                    costBox.style.display = 'flex';
                    costBox.style.justifyContent = 'center';
                    costBox.style.alignItems = 'center';
                    costBox.style.zIndex = '1';

                    // Add the cost box to the slot
                    slot.appendChild(costBox);
                }

                // Update the content of the cost box
                costBox.innerText = rCard.rank;

                // Set the data attribute for the card
                slot.setAttribute('data-random-card', JSON.stringify(rCard));
            }
        }
    }
    
    t = document.querySelector('.starter-hand-text');
    b = document.querySelector('#replace-hand-done');
    t.style.display = 'none';
    b.style.display = 'none';
}
function findFirstEmptySlot() {
    for (let i = 0; i < mainHand.length; i++) {
        const slot = mainHand[i];
        const cardInPlayElement = slot.getAttribute('data-random-card');
        

        if (!cardInPlayElement) {
            // If the slot doesn't have a data-card-inplay element, return the slot
            return slot;
        }
    }

    // If all slots have a data-card-inplay element, return null or handle accordingly
    return null;
}


















    
    
    


