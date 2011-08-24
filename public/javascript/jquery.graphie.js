/*

jQuery Graphie Plugin
version 0.2.4a

Copyright (c) 2011 Cameron Daigle, http://camerondaigle.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function($) {

  var opts;

  $.fn.graphie = function(options) {
    var defaults = {
      type: 'line',
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      path: {
        bgcolor: '#5ad0ea',
        smoothing: 'auto',
        stroke: '#5ad0ea',
        stroke_width: 0,
        column_width: 'auto'
      },
      labels_x: {
        x: 5,
        y: 5,
        color: '#000',
        family: 'Helvetica, arial, sans-serif',
        weight: 'bold',
        size: 12,
        align: "left",
        display: "endpoints"
      }
    };
    return this.each(function() {
      opts = $.extend(true, defaults, options);
      var graph = initGraph($(this));
      var data = parseData($(this));
      drawPath(graph, data.points);
      attachXLabels(graph, data.labels_x);
    });

  };

  function initGraph($el) {
    $el.addClass('graphie');
    opts.graph = {
      width: $el.width(),
      height: $el.height() - opts.padding.top - opts.padding.bottom
    };
    $el.children().hide();
    return Raphael($el.attr('id'), $el.width(), $el.height());
  }

  function parseData($el) {
    var data = {
      points: [],
      labels_x: []
    };
    var parsers = {
      'dl': function() {
        $el.find("dt").each(function() {
          data.labels_x.push($(this).text());
        });
        $el.find('dd').each(function() {
          data.points.push(parseInt($(this).text(), 10));
        });
        return data;
      },
      'ul': function() {
        $el.find('li').each(function() {
          data.points.push(parseInt($(this).text(), 10));
        });
        return data;
      }
    };
    parsers.ol = parsers.ul;
    return parsers[$el[0].tagName.toLowerCase()]();
  };

  function drawPath(graph, points) {
    var origin_y = opts.graph.height + opts.padding.top,
        coords = 'M0 ' + origin_y,
        path = graph.path(coords).attr({stroke: opts.path.stroke, "stroke-width": opts.path.stroke_width, fill: opts.path.bgcolor}),
        scale = getYScale(points),
        w = opts.graph.width,
        x, y, interval;
    var types = {
      'line': function() {
        interval = w / (points.length - 1);
        opts.path.smoothing === 'auto' ? opts.path.smoothing = interval / 2 : false;
        if (!opts.path.bgcolor) {
          coords = 'M0 ' + (origin_y - (scale * points[0]));
        }
        for(var i = 0, j = points.length; i < j; i++) {
          x = i * interval;
          y = (origin_y - (scale * points[i]));
          coords += ' S' + (x - opts.path.smoothing) + ' ' + y + ' ' + x + ' ' + y;
        }
        if (opts.path.bgcolor) {
          coords += ' L' + w + ' ' + origin_y;
        }
        return coords;
      },
      'column': function() {
        if (opts.path.column_width === 'auto') {
          interval = (w - points.length - 1) / points.length;
        } else {
          interval = +opts.path.column_width;
        }
        interval = interval > 1 ? Math.floor(interval) : 1;
        coords += ' L';
        x = 0;
        for(var i = 0, j = points.length; i < j; i++) {
          y = Math.floor(origin_y - (scale * points[i]));
          coords += x + ' ' + y + ' ' + (x + interval) + ' ' + y + ' ' + (x + interval) + ' ' + origin_y + ' ' + (x + interval + 1) + ' ' + origin_y + ' ';
          x = x + interval + 1;
        }
        return coords;
      }
    };
    coords = path.attr({path: types[opts.type]()});
    opts.graph.interval = interval;
    return coords;
  }

  function attachXLabels(graph, labels) {
    var lx = opts.labels_x,
        y = opts.graph.height + opts.padding.top - lx.y - lx.size / 2,
        text_attrs = {
          font: lx.weight + ' ' + lx.size + 'px ' + lx.family,
          fill: lx.color
        };
    if (opts.labels_x.display === "endpoints") {
      text_attrs["text-anchor"] = "start";
      graph.text(lx.x, y, labels[0]).attr(text_attrs);
      graph.text(opts.graph.width - lx.x, y, labels[labels.length-1]).attr(text_attrs).attr({ 'text-anchor': 'end' });
    } else if (opts.labels_x.display === "all") {
      switch (opts.labels_x.align) {
        case "left":
          text_attrs["text-anchor"] = "start";
          break;
        case "right":
          text_attrs["text-anchor"] = "end";
          lx.x += opts.graph.interval;
          break;
        case "center":
          text_attrs["text-anchor"] = "middle";
          lx.x += opts.graph.interval / 2;
          break;
      };
      for (var i=0, max=labels.length; i<=max; i++) {
        graph.text(lx.x + i * opts.graph.interval + i, y, labels[i]).attr(text_attrs);
      }
    }
  }

  function getYScale(points) {
    return opts.graph.height / Math.max.apply(Math, points);
  }

})(jQuery);