$(function() {

  $('#normal').graphie();

  $('#options').graphie({
    line: {
      bgcolor: "#31363b",
      smoothing: 5,
      autosmooth: false
    },
    labels: {
      color: '#ffd800',
      x: 20,
      y: 20,
      size: 20,
      weight: 'normal'
    }
  });

  $('#teeny').graphie();

  $('#columns').graphie({
    type: 'column',
    line: {
      bgcolor: "#fff"
    }
  });

  $("#line").graphie({
    line: {
      bgcolor: false,
      stroke_width: 1,
      stroke: '#000'
    }
  });

});