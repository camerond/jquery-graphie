$(function() {

  $("#normal").graphie();

  $("#options").graphie({
    path: {
      bgcolor: "#31363b",
      smoothing: 10
    },
    labels_x: {
      color: "#ffd800",
      x: 20,
      y: 20,
      size: 20,
      weight: "normal"
    }
  });

  $("#teeny").graphie();

  $("#columns").graphie({
    type: "column",
    path: {
      bgcolor: "#fff"
    }
  });

  $("#line").graphie({
    path: {
      bgcolor: false,
      stroke_width: 1,
      stroke: "#000",
      smoothing: 0
    }
  });

});