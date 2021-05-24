function openView(idView) {
  var x = document.getElementsByClassName("page");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }

  document.getElementById(idView).style.display = "block";
}


//DATA PLAYER
  //CALL PRICES

  ////INTRADAY
  let url = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=";
  let url2= "&to_symbol=";
  let urlInterval= "&interval=60min";
  let apiKey="&apikey=GLIC8LSNPTUPX8TM";
  let sizeData="&outputsize=compact";

  ////DAILY
  let dailyUrl = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=GLIC8LSNPTUPX8TM";


//TO STORE DATA
let rows, prices;

//ANIMATE
let counter;
let counterHtml;
let interval;
let closes =[];
let preloadedCloses = [];
let closeMapped;

//CONTROLS
let buttonPlay;
let buttonStop;
let sliderMain;

let x = 80;

//INPUTS
let inputPairFrom, inputPairTo;
let from, to, submit;

let timeFrame;

let sliderHeight;

function setup() {

	noCanvas();
	console.log("isWorking");

	//LOT SIZE
	submitLot = select('#showLot');
	submitLot.mousePressed(lots);

	inputCap = select('#capital'); 
	inputCs = select('#sc')
	inputPer = select('#perc');
	lotSize = select('#lots');

	// inputPer.changed(lots);
	// inputCs.changed(lots);
	// inputCap.changed(lots);
	

	//COUNTER
	counterHtml = select("#counterHtml");

	//CONTROLS
	buttonPlay = select("#play");
	buttonPlay.mousePressed(play);

	buttonStop = select("#stop");
	buttonStop.mousePressed(stop);

	

	//INPUTS
	inputPairFrom = select("#PairFrom");
	inputPairTo = select("#PairTo");

	inputPairTo.changed(NewPair);

	submit = select("#askData");
	submit.mousePressed(NewPair);

	timeFrame = select("#timeFrame");

	//SLIDER SPEED
	SpeedValue = select("#SpeedValue");
  sliderSpeed = select("#speed");
  
  //SLIDER EASING
	easinessValue = select("#easinessValue");
	sliderEasiness = select("#easiness");

	//SLIDER HEIGHT
	sliderHeight = select("#candleHeight");

	//CALL PRICES
	askPrice();
}

//ACCESING DATA 
function askPrice() {
	
	
	//DATA SIZE
	if (fullData.checked) {
		sizeData ="&outputsize=full";
		// console.log("checked!");
	} else {
		sizeData ="&outputsize=compact";
	}
	

	//LINK
	if (timeFrame.value() == "Daily") {

    urlF = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + inputPairFrom.value() + "&to_symbol=" + inputPairTo.value() + apiKey + sizeData;
    
    console.log(urlF);

	} else {

		//LINK
		urlF = url + inputPairFrom.value() + url2 + inputPairTo.value() + timeFrame.value() + sizeData + apiKey;
	}

	//console.log(urlF);
	// WHAT'S THIS? FETCH THE DATA
	loadJSON(urlF, gotData);
}

function gotData(data) {

	old = JSON.stringify(data).split(' ').join('_');
	data = JSON.parse(old);

	//SPLIT STRING
	let splitString = split(timeFrame.value(), '=');

	let intraDayString = "Time_Series_FX_("+splitString[1]+")";

	let DailyString = "Time_Series_FX_(Daily)" ;

	

	if (timeFrame.value() == "Daily") {

		//TOTAL ROWS
		rows = Object.keys(data[DailyString]); 

		//PRICES
		prices = Object.values(data[DailyString]);
		
	} else {

		//TOTAL ROWS
		rows = Object.keys(data[intraDayString]);

		//PRICES
		prices = Object.values(data[intraDayString]);
	}
	// console.log(splitString[1]);

	//console.log(rows);
	loading();
	


	//DE UN SOLO CHINGADAZO PONER TODOS LOS CLOSES EN UN ARRAY
	for (let i = 0; i < rows.length; i++) {
		preloadedCloses.push(prices[i]["4._close"]);
	}

	// console.log(preloadedCloses);

}

function loading() {
	if (rows) {
	   counter = (rows.length)-1;
	   counterHtml.html(counter);
	}
   
		//MAIN SLIDER 
		x = (rows.length)-1;

		if (sliderMain) {
			sliderMain.remove();
		}

		sliderMain = createSlider(0,x,x);
		sliderMain.parent("#sliderMain-container");
		sliderMain.style("width", "100%");
		sliderMain.id("sliderMain");

		//SPEED SLIDER
    SpeedValue.html(sliderSpeed.value());
    
    easinessValue.html(sliderEasiness.value());
}

function draw() {
	background(250);
	if (!prices) {
		// console.log("loading");
	} else {
		slidering();
		textSize(20);
		fill(37);


		

		
	

		// console.log(prices);
		vela();

		//ALMACENAR LOS DATOS EN EL ARRAY PARA DIBUJAR EL SPIKE
		if (interval) {
			closes.push(prices[counter]["4._close"]);
			//  console.log(min(closes));
		} 

		
	}	
}

function keyPressed() {
	if (keyCode === 32) {
	  play();
	} 
}

function NewPair() {
	if (!interval) {
	buttonPlay.html("Play");
	}
	prices=false;
	closes = [];
	preloadedCloses = [];
	tittlePair = select("#tittlePair");
	tittlePair.html(inputPairFrom.value().toUpperCase()+inputPairTo.value().toUpperCase());


	
	
	
	askPrice();

	

}
function slidering() {
	if (mouseIsPressed) {

	counter = sliderMain.value();
	} else {
	
	sliderMain.value(counter);
	counterHtml.html(counter);
	}

	let SpeedValueMapped = map(sliderSpeed.value(), 50, 500, 100, 1);

	

	SpeedValue.html(SpeedValueMapped.toFixed(0));
}

//CONTROLS 
function timer() {
	counterHtml.html(counter);
	counter--;
	if (counter == 0) {
		clearInterval(interval);
		buttonPlay.html("Again");
		interval = false;
	}		
} 

function play() {
	if (!interval) {
		interval = setInterval(timer, sliderSpeed.value());
		buttonPlay.html("Pause");

	} else {
		clearInterval(interval);
		interval = false;
		buttonPlay.html("Play");

		counter = sliderMain.value();
	}

	if (counter == 0) {
		clearInterval(interval);
		buttonPlay.html("Play");
		counter = (rows.length)-1;
		counterHtml.html(counter);

		sliderMain.value(counter);
		interval = false;
		closes = [];
	}		
}

function stop () {
	clearInterval(interval);
	buttonPlay.html("Play");
	counter = (rows.length)-1;
	counterHtml.html(counter);

	 sliderMain.value(counter);
	interval = false;
	closes = [];
}

function vela() {
  push();
      //ACCESING PRICES
      open = prices[counter]["1._open"];
      high = prices[counter]["2._high"];
      low = prices[counter]["3._low"];
      close = prices[counter]["4._close"];
      upSpike = max(closes);
      downSpike = min(closes);

      //DOM ELEMENTS
      document.getElementById("openP").innerHTML = open;
      document.getElementById("closeP").innerHTML = close;
      document.getElementById("lowP").innerHTML = low;
      document.getElementById("highP").innerHTML = high;
			document.getElementById("dateP").innerHTML = rows[counter];
			

			


      //MAPPING
      // translate(width/2, height/2);
      // openMapped = map(open, max(preloadedCloses), min(preloadedCloses), -200, 200);
      // highMapped = map(high, max(preloadedCloses), min(preloadedCloses), -200, 200);
      // lowMapped = map(low, max(preloadedCloses), min(preloadedCloses), -200, 200);
      // closeMapped = map(close, max(preloadedCloses), min(preloadedCloses), -200, 200);
      // upSpikeMapped = map(upSpike, max(preloadedCloses), min(preloadedCloses), -200, 200);
      // downSpikeMapped = map(downSpike, max(preloadedCloses), min(preloadedCloses), -200, 200);

      //MAPPING
      candleUp = map(close, max(preloadedCloses), prices[99]["4._close"], sliderHeight.value(), 0);
      // console.log(candleUp);
      candleDown = map(close, min(preloadedCloses), prices[99]["4._close"], sliderHeight.value(), 0);

      upSpikeMapped = map(upSpike, max(preloadedCloses), prices[99]["4._close"], sliderHeight.value(), 0);
      downSpikeMapped = map(downSpike, min(preloadedCloses), prices[99]["4._close"], sliderHeight.value(), 0);


      //DRAW CANDLE
      if (close < prices[99]["4._close"]) {
        document.getElementById("velaUp").style.height = "0%";
      } else {
        
        document.getElementById("velaUp").style.height = candleUp + "%";
      }
      
       document.getElementById("velaDown").style.height = candleDown + "%";

      if (close > prices[99]["4._close"]) {
        document.getElementById("velaDown").style.height = "0%";
      } else {
        
        document.getElementById("velaDown").style.height = candleUp + "%";
      }
      
       document.getElementById("velaDown").style.height = candleDown + "%";

      //DRAW SPIKE
      document.getElementById("spikeUp").style.height = upSpikeMapped + "%";
      document.getElementById("spikeDown").style.height = downSpikeMapped + "%";

      // console.log(downSpikeMapped);
      //INSERT EASING

      let Defaulteasiness = Number(speed.value)
      
      document.getElementById("velaUp").style.transition = Number(speed.value) + sliderEasiness.value()+"ms"; // returns 123+1+"ms";
      document.getElementById("velaDown").style.transition = Number(speed.value) + sliderEasiness.value()+"ms";

      document.getElementById("spikeUp").style.transition = Number(speed.value) + sliderEasiness.value()+"ms";
      document.getElementById("spikeDown").style.transition = Number(speed.value) + sliderEasiness.value()+"ms";

      // console.log(sliderEasiness.value());
      // console.log("default: " + Defaulteasiness);
    
      //DRAWING SPIKE
      // strokeWeight(2);
  
      // stroke(80);
      // line(0, downSpikeMapped, 0, upSpikeMapped);
      
      //DRAWING CANDLE
      // if (closeMapped < 0) {
      //     fill (0,155,0);
      // } else {
      //     fill(0,0,253)
      // }
      // quad(-35, 0, 35, 0, 35, closeMapped, -35, closeMapped);
      // pop();
	}
	


	//RISK MANAGE

//LOT SIZE
let inputCap, inputCs, inputPer, lotSize, submitLot, totalLots;




function lots(capital,cs,perc) {
	capital =inputCap.value();
	cs      =inputCs.value();
	perc    =(inputPer.value())*.01;

	totalLots=(((capital*perc)/cs)*.01).toFixed(2);

	
	lotSize.html('Lots = '+totalLots);

	//HISTORY REGISTER
	let dateColumn = select("#date-column");
	let newDate = createElement('div', month()+"/"+day()+"/"+year());
	newDate.parent(dateColumn);


}
  