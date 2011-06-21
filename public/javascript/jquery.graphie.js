/*

jQuery Graphie Plugin
version 0.1

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
      line: {
        bgcolor: '#5ad0ea',
        smoothing: 0,
        autosmooth: true
      },
      labels: {
        x: 5,
        y: 5,
        color: '#000',
        family: 'Helvetica, arial, sans-serif',
        weight: 'bold',
        size: 12
      }
    };
    return this.each(function() {
      opts = $.extend(true, defaults, options);
      var graph = initGraph($(this));
      var data = parseData($(this));
      drawLine(graph, data.points);
      attachLabels(graph, data.labels);
    });

  };

  function initGraph($el) {
    $el.addClass('graphie');
    opts.w = $el.width();
    opts.h = $el.height();
    $el.children().hide();
    return Raphael($el.attr('id'), opts.w, opts.h);
  }

  function parseData($el) {
    var data = {
      points: [],
      labels: []
    };
    var parsers = {
      'dl': function() {
        data.labels.push($el.find('dt:first').text());
        data.labels.push($el.find('dt:last').text());
        $el.find('dd').each(function() {
          data.points.push(parseInt($(this).text(), 10));
        });
        return data;
      }
    };
    return parsers[$el[0].tagName.toLowerCase()]();
  };

  function drawLine(graph, points) {
    var line = graph.path('M0,0').attr({stroke: 'none', fill: opts.line.bgcolor});
    var interval = opts.w / (points.length - 1);
    var coords = 'M0,' + opts.h;
    var x, y;
    if(opts.line.autosmooth) {
      opts.line.smoothing = interval / 2;
    }
    for(var i = 0; i < points.length; i++) {
      x = interval * i;
      y = (opts.h - (getYScale(points) * points[i]));
      coords += ',S' + (x - opts.line.smoothing) + ',' + y + ' ' + x + ',' + y;
    }
    coords += ',L' + opts.w + ',' + opts.h;
    line.attr({path: coords});
  }

  function attachLabels(graph, labels) {
    var text_attrs = {
      font: opts.labels.weight + ' ' + opts.labels.size + 'px ' + opts.labels.family,
      fill: opts.labels.color,
      'text-anchor': 'start'
    };
    graph.text(opts.labels.x, opts.h - opts.labels.y - opts.labels.size / 2, labels[0]).attr(text_attrs);
    var right_caption = graph.text(opts.w - opts.labels.x, opts.h - opts.labels.y - opts.labels.size / 2, labels.pop()).attr(text_attrs);
    right_caption.attr({ 'text-anchor': 'end' });
  }

  function getYScale(points) {
    return opts.h / Math.max.apply(Math, points);
  }

})(jQuery);