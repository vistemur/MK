const player1 = {
	name: "Scorpion",
	hp: 50,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: [],
	attack: function() {
		console.log(this.name + " Fight...");
	}
}

const player2 = {
	name: "SUB-ZERO",
	hp: 80,
	img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
	weapon: [],
	attack: function() {
		console.log(this.name + " Fight...");
	}
}


function createPlayer(playerName, character) {

	function getDivWithClass(className) {
		const $div = document.createElement("div");
		$div.classList.add(className);
		return $div;
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

	const $rootDiv = document.querySelector(".arenas");
	const $playerDiv = getDivWithClass(playerName);
	const $progressBar = getProgressBar(character.name, character.hp);
	const $character = getCharacterDiv(character);

	$playerDiv.appendChild($progressBar);
	$playerDiv.appendChild($character);
	$rootDiv.appendChild($playerDiv);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
