var parameters = {
  target : "#myFunction",
  data : [{
    fn : 'sin(x)',
    color : 'red',
  }],
  grid : true,
  yAxis : {domain : [-1, 1]},
  xAxis : {domain : [0, 2*Math.PI]},
}

function plot() {
  var color = document.querySelector("#color").value;
  var xMin = document.querySelector('#xMin').value;
  var xMax = document.querySelector('#xMax').value;
  var yMin = document.querySelector('#yMin').value;
  var yMax = document.querySelector('#yMax').value;
  var func = document.querySelector('#function').value;
  
  parameters['data'][0]['color'] = color;
  parameters['data'][0]['fn'] = func;
  parameters['yAxis']['domain'] = [yMin, yMax];
  parameters['xAxis']['domain'] = [xMin, xMax];
  
  functionPlot(parameters);
}

plot();
document.querySelector('#plotBtn').addEventListener('click', function() {
  plot();
})