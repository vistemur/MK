const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
	playerNumber: 1,
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: [],
	attack: function() {
		console.log(this.name + " Fight...");
	}
}

const player2 = {
	playerNumber: 2,
	name: "SUB-ZERO",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
	weapon: [],
	attack: function() {
		console.log(this.name + " Fight...");
	}
}

function createElement(tag, className) {
	const $element = document.createElement(tag);
	if (className)
		$element.classList.add(className);
	return $element;
}

function createPlayer(player) {

	function getDivWithClass(className) {
		return createElement("div", className);
	}

	function getProgressBar(name, life) {
		const $progressBar = getDivWithClass("progressbar");
		const $life = getDivWithClass("life");
		const $name = getDivWithClass("name");
		
		$life.style.width = String(life) +'%';
		$name.innerText = name;
		
		$progressBar.appendChild($life);
		$progressBar.appendChild($name);
		return $progressBar;
	}

	function getCharacterDiv(character) {
		const $characterDiv = getDivWithClass("character");
		const $img = document.createElement("img");
		
		$img.src = character.img;
		$characterDiv.appendChild($img);
		return $characterDiv;
	}

	const $playerDiv = getDivWithClass("player" + player.playerNumber);
	const $progressBar = getProgressBar(player.name, player.hp);
	const $character = getCharacterDiv(player);

	$playerDiv.appendChild($progressBar);
	$playerDiv.appendChild($character);
	return $playerDiv;
}

function random(from, to) {
	let pluser = 1;
	let multiplier = 100;

	if (to) {
		if (to < from) {
			const replacer = from;
			from = to;
			to = replacer;
		}
		pluser = from;
		multiplier = to - from;
	} else if (from) {
		multiplier = from;
	}
	return Math.floor(Math.random() * multiplier) + pluser;
}

function testRandom() {

	function singleTest(arg1, arg2) {
		console.log("random(" + arg1 + ", " + arg2 + ") = " + random(arg1, arg2));
	}

	singleTest(1, 20);
	singleTest(20);
	singleTest(-100, 100);
	singleTest(100, -100);
	singleTest(-50, -40);
	singleTest(-40, -50);
	singleTest(100);
	singleTest(10, 1);
	singleTest();
}

function getGameEndTitle(text) {
	const $winTitle = createElement("div", "winTitle");
	$winTitle.innerText = text;
	
	return $winTitle;
}

function getWinTitle(player) {
	return getGameEndTitle(player.name + " wins");
}

function applyVictory(player) {
	$arenas.appendChild(getWinTitle(player));
	$randomButton.disabled = true;
}

function applyDraw() {
	$arenas.appendChild(getGameEndTitle("draw"));
	$randomButton.disabled = true;
}

function checkPlayersHP(player1, player2) {
	if (player1.hp == 0)
		if (player2.hp == 0)
			applyDraw();
		else
			applyVictory(player2);
	else if (player2.hp == 0)
		applyVictory(player1);
}


function changeHP(player) {
	const $playerLife = document.querySelector(".player" + player.playerNumber + " .life");

	player.hp -= random(1, 20);
	if (player.hp <= 0) {
		player.hp = 0;
	}
	$playerLife.style.width = player.hp + '%';
}

function fight(player1, player2) {
	changeHP(player1);
	changeHP(player2);
	checkPlayersHP(player1, player2);
}

$randomButton.addEventListener("click", function() {
	fight(player1, player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
