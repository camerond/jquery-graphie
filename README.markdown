# graphie

a cute little graphing library with an adorably minimal amount of functionality.

visit [http://jquery-graphie.heroku.com]() for examples.

## Using graphie

- include [Raphael](http://raphaeljs.com/) and [the plugin](https://github.com/camerond/jquery-graphie/blob/master/public/javascript/jquery.graphie.js).
- call `$.graphie()` on any `<dl>`, `<ul>` or `<ol>` that contains numeric values.
- Graphie will add a class of 'graphie' on any object that it draws within, allowing you to set dimensions & background color of that object in CSS.

## Options

  $item.graphie({
    type: 'line',           // can be either 'line' or 'sparkline'
    line: {
      bgcolor: '#5ad0ea',   // background color of line/sparklines. Background color for the graph area is set in CSS.
      smoothing: 0,         // if autosmooth is off, set an arbitrary line smoothing value here, or leave at 0 fo straight lines.
      autosmooth: true      // automatically smooths the graph line based on point interval.
    },
    labels: {
      x: 5,                 // label distance from sides
      y: 5,                 // label distance from bottom
      color: '#000',        // these
      family: 'Helvetica',  // are
      weight: 'bold',       // obvious
      size: 12              // right?
    }
  });
