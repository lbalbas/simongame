var simonBtns = document.querySelectorAll('.simon');
var counter = document.getElementById('turnCounter');
var strictBtn = document.getElementById('hard');
var resetBtn = document.getElementById('reset');
const colors = ['blue','red','yellow','purple','green','orange']; //Colors
var moveArray = []; //Array with the random moves generated by the algorithm
var turnC = 1; //Turn Counter
var playerC = 0; //Count of the player's move
var strict = false; //Strict mode switch
var i = 0, howManyTimes = turnC; //For the ""loop"" that iterates each random move
var wait = setTimeout(function(){    // A timeout so the starting animation doesn't get interrupted, then add the
	simonBtns.forEach(function(btns){    //Event Listeners and remove the initial animation class.
		btns.addEventListener('click', play);
		btns.classList.remove('bounceInLeft');
		btns.classList.remove('bounceInRight')
	});
}, 1100); 
strictBtn.addEventListener('click', strictMode); //Self-explanatory.
resetBtn.addEventListener('click', reset); //See above.

function play(e){
	let audio = document.querySelector(`audio[data-key="${this.id}"]`)
	e.preventDefault;
	this.classList.remove('rubberBand');
  	void this.offsetWidth;
 	this.classList.add('rubberBand');
  	audio.currentTime = 0;
  	audio.play();
  	if(this.id == colors[moveArray[playerC]]){
  		playerC++;
  		if(playerC == turnC){
  			turnC++;
			if(turnC < 20)
  				counter.innerHTML = turnC;
			
  			simonSays(turnC, true);
  		}
  	}
  	else{
  		alert('Wrong move mate');
  		if(strict == true)
  			reset();
  		else
  			simonSays(turnC, false);
  	}
}

function pcPlay(button){
	let audio = document.querySelector(`audio[data-key="${button.id}"]`)
	button.classList.remove('rubberBand');
	void button.offsetWidth;
	button.classList.add('rubberBand');
	audio.currentTime = 0;
    audio.play();
}

function looperino() {
	console.log('loop works');
	pcPlay(simonBtns[moveArray[i]]);
    i++;
    if( i < howManyTimes ){
        setTimeout( looperino, 1000 );
    }
};

function simonSays(n , next){
	playerC = 0;
	if(n > 20){
		alert('Congratulations, you won!!!');
		reset();
	}
	else if(next == true){
		if(turnC > 1){
			alert('Next Round');
		}
		for(let x = moveArray.length; x < n; x++){
			console.log(moveArray);
			moveArray.push(Math.floor(Math.random() * (6 - 0) + 0));
		}
		simonSays(turnC, false);
	}
	else{
		howManyTimes = turnC;
		i = 0;
		looperino();
	}
}

function strictMode(e){
	if(strict == false){
		strict = true;
		e.target.classList.remove('is-warning');
		e.target.classList.add('is-danger');
		e.target.classList.add('is-focused');
		alert('Brace yourself!');
		reset();
	}
	else{
		strict = false;
		e.target.classList.remove('is-danger');
		e.target.classList.remove('is-focused');
		e.target.classList.add('is-warning');
		alert('Too hard for you I guess...');
		reset();
	}
}

function reset(){
	turnC = 1;
	playerC = 0;
	i = 0;
	moveArray = [];
	counter.innerHTML = turnC;
	simonSays(turnC, true);
}
setTimeout(simonSays(turnC, true), 2000);
