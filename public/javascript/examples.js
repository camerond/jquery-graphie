$(function() {

  $("#smoothing").graphie({
    path: {
      smoothing: 10
    }
  });
  $("#line_styles").graphie({
    path: {
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
  $("#column_all-labels").graphie({
    type: 'column',
    padding: {
      bottom: 20,
      top: 15
    },
    labels_x: {
      x: 0,
      y: -15,
      display: "all",
      align: "center"
    },
    labels_y: {
      display: "relative",
      size: 10
    }
  });
});