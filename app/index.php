<!DOCTYPE html>
<html lang="en" ng-app="MTW-App">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App | MTW</title>
  <script defer src="app.js"></script>
  <script src="Libraries/p5.js"></script>
  <script src="Libraries/p5.dom.js"></script>
  <link rel="stylesheet" type="text/css" href="styles/myClasses.css">
  <link rel="stylesheet" type="text/css" href="styles/styles.css">
  <link rel="stylesheet" type="text/css" href="styles/colors.css">
  <!-- ANGULAR -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.min.js"></script>
  <script src="./angular/controller.js"></script> 

</head>
<body>
  <header>  
    <nav class="flex-row">
      <div class="logo" onclick="openView('inicio')"><h1>MTW</h1></div>
      <div onclick="openView('inicio')"><h3>Home</h3></div>
      <div onclick="openView('dataPlayer')"><h3>Data Player</h3></div>
      <div onclick="openView('risk')"><h3>Risk Management</h3></div>
      <a href="/myTradingWeb-2/login/"><h3>Cerrar Sesión</h3></a>
    </nav>
  </header>

  <main>

    <!-- INICIO -->
    <div id="inicio" class="page">
      <?php include './views/inicio.php';?>  
    </div>

    <!-- RISK MANAGEMENT -->
    <div ng-controller="risk-controller" id="risk" class="page" style="display:none">
      <?php include './views/risk.php';?>  
    </div>

    <!-- DATA PLAYER -->
    <div id="dataPlayer" class="page" style="display:none">
      <?php include './views/dataPlayer.php';?>  
    </div>

  </main>

  
</body>
</html>

