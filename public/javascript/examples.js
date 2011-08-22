$(function() {

  $("#smoothing").graphie({
    line: {
      smoothing: 10
    }
  });
  $("#line_styles").graphie({
    line: {
      bgcolor: "#ff2222",
      stroke: "#ff9999",
      stroke_width: "3"
    }
  });
  $("#labels_x").graphie({
    line: {
      bgcolor: "#444"
    },
    labels_x: {
      color: "#fff",
      family: "Georgia, serif",
      weight: "normal",
      size: 20,
      x: 5,
      y: 20
    }
  });
  $("#column").graphie({
    type: 'column'
  });
});