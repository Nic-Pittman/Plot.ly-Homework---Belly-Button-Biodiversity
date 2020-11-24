// Use D3 to create an event handler
d3.selectAll("#selDataset").on("change", plotFunks);
// create dropdown functions (funks) for bar and bubble
function plotFunks() {
  var valueDrop = d3.select("#selDataset").node().value;
  demoFunk(valueDrop);
  demoPanel(valueDrop);
  bubbleChart(valueDrop);
  gaugeChart(valueDrop);
}

function demoPanel(valueDrop) {

  var filterResults = data.metadata.filter(value => value.id == valueDrop);
  // d3 select the panel-body class in html - this breaks w.out the "." class definer 
  var appendResults = d3.select(".panel-body");
  // clear section
  appendResults.html("");
  // append results to the panel-body div in html - list item ("li") gives them bullets
  appendResults.append("li").text(`id: ${filterResults[0].id}`);
  appendResults.append("li").text(`ethnicity: ${filterResults[0].ethnicity}`);
  appendResults.append("li").text(`gender: ${filterResults[0].gender}`);
  appendResults.append("li").text(`age: ${filterResults[0].age}`);
  appendResults.append("li").text(`location: ${filterResults[0].location}`);
  appendResults.append("li").text(`bbtype: ${filterResults[0].bbtype}`);
  appendResults.append("li").text(`wfreq: ${filterResults[0].wfreq}`);
}

// bar chart start ----------------------------------------------------------------------
function demoFunk(valueDrop) {
  // map and slice the ID, value and labels
  // otu_ids 
  var filterBar = data.samples.filter(value => value.id == valueDrop);
  var otuId = filterBar.map(v => v.otu_ids);
  otuId = idSelect(otuId[0].slice(0, 10));
  //sample_values 
  var otuCount = filterBar.map(v => v.sample_values);
  otuCount = otuCount[0].slice(0, 10);
  //otu_labels 
  var otuLabel = filterBar.map(v => v.otu_labels);
  var names = labelSelect(otuLabel[0]).slice(0, 10);

  // Create the bar trace - orienttion "h" to align bars left
  var trace = {
    x: otuCount,
    y: otuId,
    text: names,
    type: "bar",
    orientation: "h"
  };

  // reverse the bar layout to adjust yaxis values top to bottom
  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };

  // Create the data array for our plot
  var traceData = [trace];

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", traceData, layout);
}
// End Bar -------------------------------------------------------------------------------

//bubble chart start ---------------------------------------------------------------------
function bubbleChart(valueDrop) {
  // map and slice the ID, value and labels
  // otu_ids 
  var filterBubble = data.samples.filter(value => value.id == valueDrop);
  var otuId = filterBubble.map(v => v.otu_ids);
  otuId = otuId[0];
  //sample_values
  var otuCount = filterBubble.map(v => v.sample_values);
  otuCount = otuCount[0];
  //otu_labels 
  var otuLabel = filterBubble.map(v => v.otu_labels);
  otuLabel = labelSelect(otuLabel[0]);

  // Create the bubble Trace
  var trace2 = {
    x: otuId,
    y: otuCount,
    text: otuLabel,
    mode: "markers",
    marker: {
      color: otuId,
      size: otuCount,
      colorscale: 'RdBu' // https://plotly.com/javascript/colorscales/
    },
  };

  // bubble layout with xtitle
  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  // Create the data array for our plot
  var traceData2 = [trace2];

  // Plot the bubblechart 
  Plotly.newPlot("bubble", traceData2, layout);
}
// End Bubble ----------------------------------------------------------------------------

function labelSelect(name) {
  var bacteriaList = [];
  for (var i = 0; i < name.length; i++) {
    var stringName = name[i].toString();
    var splitValue = stringName.split(";");
    if (splitValue.length > 1) {
      bacteriaList.push(splitValue[splitValue.length - 1]);
    } else {
      bacteriaList.push(splitValue[0]);
    }
  }
  return bacteriaList;
}

function idSelect(name) {
  var otuList = [];
  for (var i = 0; i < name.length; i++) {
    otuList.push(`OTU ${name[i]}`);
  }
  return otuList;
}


//init function 
function init() {
  d3.json("samples.json").then(sample => {
    data = sample;
    var selectValues = sample.names;

    var selectOpt = d3.select("#selDataset");

    selectValues.forEach(value => {
      selectOpt
        .append("option")
        .text(value)
        .attr("value", function () {
          return value;
        });
    });
  });
}


// Gauge Attempt from https://plotly.com/javascript/gauge-charts/

function gaugeChart(valueDrop) {
  var filterResults = data.metadata.filter(value => value.id == valueDrop);
  var washFreq = filterResults[0].wfreq;

  var grossData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      type: "indicator",
      mode: "gauge+number",
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week" },
      gauge: {
        axis: { range: [0, 9], tickwidth: 1, tickcolor: "black", tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
        // bar: { color: "black" },
        borderwidth: 2,
        bordercolor: "black",
        steps: [
          { range: [0, 1], color: "f5f5dc" },
          { range: [1, 2], color: "#ffebcd" },
          { range: [2, 3], color: "#ffe4c4" },
          { range: [3, 4], color: "#f5deb3" },
          { range: [4, 5], color: "#deb887" },
          { range: [5, 6], color: "#d2b48c" },
          { range: [6, 7], color: "#9acd32" },
          { range: [7, 8], color: "#6b8e23" },
          { range: [8, 9], color: "#5D673E" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
        }
      }
    }
  ];

  var layout = { width: 480, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', grossData, layout);
};

init();
