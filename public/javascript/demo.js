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

  $('#sparklines').graphie({
    type: 'sparkline',
    line: {
      bgcolor: "#fff"
    }
  });

});