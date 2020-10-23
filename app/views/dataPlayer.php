<h1 class="title">DATA PLAYER</h1>

<main class="main-dataplayer flex-row">  
      <section class="columnA"> 

        <div class="inputs-columnA">
            <h3>Pair </h3>
  
          From:<select id="PairFrom">
            <option value = "EUR">EUR</option>
            <option>AUD</option>
            <option>CAD</option>
            <option>CHF</option>
            <option>JPY</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>NZD</option>
            <option>USD</option>
          </select>

          To:<select id="PairTo">
            <option>USD</option>
            <option>AUD</option>
            <option>CAD</option>
            <option>CHF</option>
            <option>JPY</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>NZD</option>
            <option>USD</option>
          </select><br><br>


          <h3>Time Frame</h3>
          
          
          <select id="timeFrame" value="&interval=60min">
            <option value="&interval=60min">60 min</option>
            <option value="&interval=1min"> 1 min</option>
            <option value="&interval=5min"> 5 min</option>
            <option value="&interval=15min">15 min</option>
            <option value="&interval=30min">30 min</option>
            <option value="Daily">Daily</option>

          </select><br><br>


          <div><h3>Data Size</h3>
            <p>Full Data Size  <input type="checkbox" id ="fullData"></p> <br>
          </div>
          
          <button class="primary-button" id='askData'>Go!</button><br><br>
        </div>
      </section> 

      <section class = "columnB">

        <div id="tittle-counter">
          <div class="pair-counter">
            <h2 class = "subtittle_DataPlayer" id="tittlePair">EURUSD</h2>
          </div>  
  
          <div id="timer">
            <p>Counter: <span id="counterHtml">Loading...</span> Candlesticks</p>
          </div> 
        </div>


        <div class="flex-row screenNslide">
          <div id="screenContainer">
  
            <!-- CANDLE -->
            <div id="velaUp"></div>
            <div id="velaDown"></div>
            <div id="spikeUp"></div>
            <div id="spikeDown"></div>
  
            
          </div>
  
          <!-- SLIDER HEIGHT -->

          <div class="sliderHeight-container">
            <input type="range" min="0" max="50" value="50" id="candleHeight">
          </div>

        </div>

        

        <div id="sliders-buttons">

          <div id="sliderMain-container"></div>
  
          <div class="sliders flex-row">
            <div class="speed-slider slider">
              <h3 class = "SpeedParameter">Speed:</h3> 
              <span id="SpeedValue"></span>

              <input type="range" min="50" max="500" value="200" id="speed">
            </div>
            

            <div class="easing-slider slider">
              <h3 class = "easineddParameter">Easiness:</h3> 
              <span id="easinessValue"></span>

              <input type="range" min="-50" max="500" value="0" id="easiness">
            </div>

            <div id="buttons">
              <button  class="" id='play'>Play</button>
              <button  class="" id='stop'>Stop</button> 
            </div>

          </div>
          

          <div id="info-data" class="flex-row">

            <div class="info">
              <strong>open: </strong><p id="openP"></p>
            </div>
            <div class="info">
              <strong>close: </strong><p id="closeP"></p>
            </div>
            <div class="info">
              <strong>low: </strong><p id="lowP"></p>
            </div>
            <div class="info">
              <strong>high: </strong><p id="highP"></p>
            </div>
            <div class="info">
              <strong>date: </strong><p id="dateP"></p>
            </div>
          
          </div>
          
  
          

        </div>

      </section>

      <section class="columnC flex-row">
        <button class="primarybutton">Save Session</button class="primarybutton">
        <button>Open Session</button>
      </section>

</main>