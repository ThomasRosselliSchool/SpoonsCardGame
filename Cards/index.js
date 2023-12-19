//Shuffle Cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        //generate random index
        const j = Math.floor(Math.random() * (i + 1));
  
        //swap elements
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//A deck of cards
const playingCards = new Array(
    "Spades/2", "Diamonds/2", "Clubs/2", "Hearts/2",
    "Spades/3", "Diamonds/3", "Clubs/3", "Hearts/3",
    "Spades/4", "Diamonds/4", "Clubs/4", "Hearts/4",
    "Spades/5", "Diamonds/5", "Clubs/5", "Hearts/5",
    "Spades/6", "Diamonds/6", "Clubs/6", "Hearts/6",
    "Spades/7", "Diamonds/7", "Clubs/7", "Hearts/7",
    "Spades/8", "Diamonds/8", "Clubs/8", "Hearts/8",
    "Spades/9", "Diamonds/9", "Clubs/9", "Hearts/9",
    "Spades/10", "Diamonds/10", "Clubs/10", "Hearts/10",
    "Spades/J", "Diamonds/J", "Clubs/J", "Hearts/j",
    "Spades/Q", "Diamonds/Q", "Clubs/Q", "Hearts/q",
    "Spades/K", "Diamonds/K", "Clubs/K", "Hearts/K",
    "Spades/A", "Diamonds/A", "Clubs/A", "Hearts/A"
);

class Player {
    constructor(stockCard, hand, playerTag) {
        this.stockCard = stockCard
        this.hand = hand;
        this.suitPref = chooseSuit(this.hand);
        this.playerTag = playerTag;
    }

    swap(cardIndex) {
        let temp = this.stockCard;
        this.stockCard = this.hand[cardIndex];
        this.hand[cardIndex] = temp;
    }

    checkForWin() {
        let s1 = this.hand[0].split("/")[1];
        let s2 = this.hand[1].split("/")[1];
        let s3 = this.hand[2].split("/")[1];
        let s4 = this.hand[3].split("/")[1];
        
        if (s1 == s2 && s3 == s4 && s2 == s3) {
            console.log("WINNER " + this.hand)
            return true;
        }
        return false;
    }
}
//Deal cards
var deck = shuffle(playingCards);
var preCards = [];
var postCards = [];
var p1 = []; //player
var p2 = [];
var p3 = [];
var p4 = [];
for (let i = 0; i < 4; i++) {
    p1.push(deck.shift());
    p2.push(deck.shift());
    p3.push(deck.shift());
    p4.push(deck.shift());
}
var pr1 = new Player(deck.shift(), p1, "p1");
var pr2 = new Player(deck.shift(), p2, "p2");
var pr3 = new Player(deck.shift(), p3, "p3");
var pr4 = new Player(deck.shift(), p4, "p4");


//Listen for gamestart and updating cards
window.addEventListener('keydown', keyCheck);
let started = false;
function keyCheck(event) {
    let k = event.key;
    if (!started && k == 'Enter') {
        started = true;
        document.getElementById("card0").src = getCardString(pr1.stockCard);
        document.getElementById("card1").src = getCardString(pr1.hand[0]);
        document.getElementById("card2").src = getCardString(pr1.hand[1]);
        document.getElementById("card3").src = getCardString(pr1.hand[2]);
        document.getElementById("card4").src = getCardString(pr1.hand[3]);
    }
    else if (!started) {
        return;
    }
    else if (k == 'a') {
        let temp = document.getElementById("card0").src;
        document.getElementById("card0").src = document.getElementById("card1").src;
        document.getElementById("card1").src = temp;

        pr1.swap(0);
    } 
    else if (k == 's') {
        let temp = document.getElementById("card0").src;
        document.getElementById("card0").src = document.getElementById("card2").src;
        document.getElementById("card2").src = temp;
        
        pr1.swap(1)
    }
    else if (k == 'd') {
        let temp = document.getElementById("card0").src;
        document.getElementById("card0").src = document.getElementById("card3").src;
        document.getElementById("card3").src = temp;

        pr1.swap(2)
    }
    else if (k == 'f') {
        let temp = document.getElementById("card0").src;
        document.getElementById("card0").src = document.getElementById("card4").src;
        document.getElementById("card4").src = temp;
        
        pr1.swap(3)
    }
    else if (k == ' ') {
        preCards.push(pr1.stockCard);
        if (deck.length != 0) {
            pr1.stockCard = deck.shift();
        }
        else {
            pr1.stockCard = postCards.shift();
        }
        document.getElementById("card0").src = getCardString(pr1.stockCard);
        computerPlay();
    }

    //check for win
    if (started) {
        pr1.checkForWin();
        pr2.checkForWin(); 
        pr3.checkForWin();
        pr4.checkForWin();
    }
};

//Choose the suit the computer should go for
    //based on max count of suits it has
function chooseSuit(hand) {
    //get suits together
    let suit1 = hand[0].split("/")[0];
    let suit2 = hand[1].split("/")[0];
    let suit3 = hand[2].split("/")[0];
    let suit4 = hand[3].split("/")[0];
    let arr = [suit1, suit2, suit3, suit4];

    //Spade Diamond Club Heart
    //calculate sizes
    let arrSizes = [0, 0, 0, 0];
    for (let i = 0 ; i < arr.length; i++) {
        if (arr[i] == "Spades") {
            arrSizes[0]++;
        }
        else if (arr[i] == "Diamonds") {
            arrSizes[1]++;
        }
        else if (arr[i] == "Clubs") {
            arrSizes[2]++;
        }
        else if (arr[i] == "Hearts") {
            arrSizes[3]++;
        }
    }
    let t = 0;
    let temp = 0;
    for (let j = 0; j < 4; j++) {
        if (arrSizes[j] > t) {
            t = arrSizes[j];
            temp = j;
        }
    }
    
    //0 = spade, 1 = diamond, 2 = club, 3 = heart
    if (temp == 0) {
        return "Spades";
    }
    else if (temp == 1) {
        return "Diamonds";
    }
    else if (temp == 2) {
        return "Clubs";
    }
    else {
        return "Hearts";
    }
}

function getCardString(cardName) {
    let names = cardName.split("/");
    return "./playing-cards/" + names[0] + "/" + names[1] + ".png";
}

function computerPlay() {
    //move cards
    postCards.push(pr4.stockCard);
    pr4.stockCard = pr3.stockCard;
    pr3.stockCard = pr2.stockCard;
    pr2.stockCard = preCards.shift();

    let b2 = false;
    let b3 = false;
    let b4 = false;
    for (let i = 0; i < 4; i++) {
        if (!b2 && (pr2.hand[i].split("/")[0] != pr2.suitPref)) {
            let temp = pr2.hand[i];
            pr2.hand[i] = pr2.stockCard;
            pr2.stockCard = temp;
            b2 = true;
        }
        if (!b3 && (pr3.hand[i].split("/")[0] != pr3.suitPref)) {
            let temp = pr3.hand[i];
            pr3.hand[i] = pr3.stockCard;
            pr3.stockCard = temp;
            b3 = true;
        }
        if (!b4 && (pr4.hand[i].split("/")[0] != pr4.suitPref)) {
            let temp = pr4.hand[i];
            pr4.hand[i] = pr4.stockCard;
            pr4.stockCard = temp;
            b4 = true;
        }
    }
}