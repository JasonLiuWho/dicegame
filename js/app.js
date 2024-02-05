/**
 * Rules
 * 
 * 7 or 11 on first roll wins
 * snake eyes (2) is a lose
 * if not 7 or 11 on first roll and not snake eyes
 * roll until match (point) 
 * 7 after first roll lose
 * 
 * SET win to false
 * 
 * SET gamePlay to true
 * 
 * SET rolls to 0
 * 
 * while gamePlay
 * SET total
 * rolls++
 * 
 * if total is equal to 2 
 * SET gamePlay to false
 * 
 * ELSE IF (total is equal to 7 or total is equal to 11) AND rolls is equal to 1
 *      SET win to true
 *      SET gamePlay to !win
 * 
 * ELSE IF  (total is not equal to 7 or total is not equal to 11) AND rolls is euqal to 1 
 *      THEN SET point to total
 * ELSE IF point is equal to total AND rolls > 1
 *      THEN SET win to true
 *      SET gamePlay !win
 * ELSE IF (total is equal to 7 AND rolls is greater than 1)
 *      Set gamePlay to false
 * 
 * 
 */

class Game {

    constructor() {
        this.dieDisplay1 = document.getElementById("dieDisplay1");
        this.dieDisplay2 = document.getElementById("dieDisplay2");
        this.rollTotalDisplay = document.getElementById("rollTotalDisplay");
        this.message = document.getElementById("message");
        this.rollBtn = document.getElementById("rollBtn");
        this.rollCountDisplay = document.getElementById("rollCountDisplay");
        this.pointDisplay = document.getElementById("pointDisplay");

        this.winDisplay = document.getElementById("winDisplay");
        this.loseDisplay = document.getElementById("lossDisplay");

        this.winStreakDisplay = document.getElementById("winStreakDisplay");
        this.loseStreakDisplay = document.getElementById("loseStreakDisplay");

        this.gameSettings = {
            gamePlay: false,
            rolls: 0,
            point: 0,
            totalWins: 0,
            totalLosses: 0,
            winStreak: 0,
            loseStreak: 0,
            lastResult: "",
            win: false
        }
    }

    init() {
        this.resetGame()
        const settings = this.gameSettings
        console.log(settings);
        this.message.innerText = "Let's start the game!";
        this.rollCountDisplay.innerText = settings.rolls;
        this.dieDisplay1.innerText = "";
        this.dieDisplay2.innerText = "";
        this.pointDisplay.innerText = "";
        this.rollTotalDisplay.innerText = "";

        this.toggleRollBtn(this.gameSettings.gamePlay)

        this.rollBtn.addEventListener("click", this.rollDice) 

    }

    rollDice() {
        action.gameSettings.rolls++
        action.craps(action.gameSettings.rolls)
    }

    resetGame() { 
        this.rollBtn.removeEventListener("click", this.rollDice)


        if(this.message.classList.contains("red") || this.message.classList.add("green")) {
            this.message.classList.remove("green")
            this.message.classList.remove("red")
            this.message.classList.add("black")
        }

        let color 
        if (color == "green" || color == "red") {
            this.message.classList.contains(color)
        }
        return this.gameSettings = {
            gamePlay: true,
            rolls: 0,
            point: 0,
            totalWins: this.gameSettings.totalWins,
            totalLosses: this.gameSettings.totalLosses,
            winStreak: this.gameSettings.winStreak,
            loseStreak: this.gameSettings.loseStreak,
            lastResult: this.gameSettings.lastResult,
            win: false
        }
    };

    toggleRollBtn(gamePlay) {
        if (gamePlay) {
            this.rollBtn.removeAttribute("disabled");
        } else {
            this.rollBtn.setAttribute("disabled", "");
        }
    };

    checkWin(total, rolls) {
        let result
        if (total == 2) {
            this.gameSettings.gamePlay = false
        } else if ((total == 7 || total == 11) && rolls == 1) {
            this.gameSettings.win = !this.gameSettings.win
            this.gameSettings.gamePlay = !this.gameSettings.gamePlay
        } else if ((total != 7 || total != 11) && rolls == 1) {
            this.gameSettings.point = total 
            this.message.innerText = `Your point is ${this.gameSettings.point}. Let's see if you can hit it.`
            this.pointDisplay.innerText = this.gameSettings.point
        } else if (total == 7 && rolls > 1) {
            this.gameSettings.gamePlay = false
        }else if (total == this.gameSettings.point && rolls > 1) {
            this.gameSettings.win = !this.gameSettings.win
            this.gameSettings.gamePlay = false
        } else {
            this.message.innerText = "roll again"
        };

        this.gameSettings.win ? this.gameSettings.gamePlay = false : null;

        if (this.gameSettings.win) {
            this.message.innerText = "You Win!"
            this.message.classList.add("green");
            result = "win";
            this.gameSettings.lastResult = result
            this.gameSettings.totalWins++
            this.winDisplay.innerText = this.gameSettings.totalWins
            this.updateStreak(result);
            this.toggleRollBtn(this.gameSettings.gamePlay)
            // this.rollBtn.removeEventListener("click", this.rollDice)
        } else if (this.gameSettings.win == false && this.gameSettings.gamePlay == false) {
            this.message.innerText = "You loser!"
            this.message.classList.add ("red");            
            result = "lose";
            this.gameSettings.lastResult = result
            this.gameSettings.totalLosses++
            this.loseDisplay.innerText = this.gameSettings.totalLosses
            this.updateStreak(result);
            this.toggleRollBtn(this.gameSettings.gamePlay)
            // this.rollBtn.removeEventListener("click", this.rollDice)
        }
    };

    updateStreak(result) {
        if (result === "win") {
            this.gameSettings.loseStreak = 0;
            this.gameSettings.winStreak++;
        } else {
            this.gameSettings.winStreak = 0;
            this.gameSettings.loseStreak++
        }
        this.winStreakDisplay.innerText = this.gameSettings.winStreak;
        this.loseStreakDisplay.innerText = this.gameSettings.loseStreak;
    }

    craps(rolls) {
        this.dieDisplay1.innerText = Math.ceil(Math.random() * 6);
        this.dieDisplay2.innerText = Math.ceil(Math.random() * 6);

        let total;
        total = parseInt(this.dieDisplay1.innerText) + parseInt(this.dieDisplay2.innerText);
        this.rollTotalDisplay.innerText = total;
        this.rollCountDisplay.innerText = rolls;

        this.checkWin(total, rolls);
    };
};

const gameStartBtn = document.getElementById("gameStartBtn");
const action = new Game();

gameStartBtn.addEventListener("click", ()=> {
    action.init();
});