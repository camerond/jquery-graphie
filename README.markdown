# Graphie

A cute little graphing library with an adorably minimal amount of functionality.

Visit [http://jquery-graphie.heroku.com]() for examples.

## Using graphie

- Include [Raphael](http://raphaeljs.com/) and [the plugin](https://github.com/camerond/jquery-graphie/blob/master/public/javascript/jquery.graphie.js).
- Call `$.graphie()` on any `<dl>`, `<ul>` or `<ol>` that contains numeric values.
- Graphie will add a class of 'graphie' on any object that it draws within, allowing you to set dimensions & background color of that object in CSS.

## Options (defaults shown)

  $item.graphie({
    type: 'line',             // can be either 'line' or 'column'
    line: {
      bgcolor: '#5ad0ea',     // Background color of line/columns. Background color for the graph area is set in CSS.
      smoothing: 'auto',      // You can set an arbitrary line smoothing value here (number without 'px'). Change to 0 for straight lines.
      column_width: 'auto'    // You can set an arbitrary width here (number without 'px').
    },
    labels: {
      x: 5,                   // Label distance from sides
      y: 5,                   // Label distance from bottom
      color: '#000',          // These
      family: 'Helvetica',    // are
      weight: 'bold',         // obvious,
      size: 12                // right?
    }
  });
