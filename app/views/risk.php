<h1 class="title">RISK MANAGEMENT</h1>

<div class="inputs-container main-risk flex-row">

  <div class="lots-calculator flex-column">

    <div>
      <label>Balance:</label>
      <input id='capital' size="10" placeholder="999" type="number" ng-model="nuevoCapital.capital">
    </div>

    <div>
      <label>Stop Loss for 0.01:</label>
      <input id='sc' size="10" placeholder="999" type="number">
    </div>

    <div>
      <label>%/Operation:</label>
      <input id='perc' size="10" placeholder="999" type="number"> 
    </div>

    <div class="button-div">
      <button class="primary-button" id='showLot' ng-click="agregarCapital()">Show Lot Size</button>
    </div>


    <div class ="result">
      <div class="lots-result"><p id='lots'>Lots:</p></div>
    </div>

  </div>

  <div class="history-balance">

    <div class="h-table flex-row">
      <div id="date-column">
        Date:


      </div>

      <div id="balance-column">
        Balance:
        <div ng-repeat="capital in capitales">
        {{capital.capital}}
        </div>

      </div>
      
    </div >

    


  </div>



</div>

