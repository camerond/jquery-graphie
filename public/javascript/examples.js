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
    labels_x: {
      family: "Georgia, serif",
      weight: "normal",
      color: "#004165",
      size: 20,
      x: 5,
      y: 20
    }
  });
  $("#labels_x_bottom").graphie({
    padding: {
      bottom: 20
    },
    labels_x: {
      x: 5,
      y: -14
    }
  });
  $("#labels_x_top").graphie({
    padding: {
      top: 20
    },
    labels_x: {
      x: 5,
      y: 35
    }
  });
  $("#column").graphie({
    type: 'column'
  });
});