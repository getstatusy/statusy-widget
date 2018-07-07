var currentData = {};

function embedStylesheet() {
  var link = $("<link />",{
    rel: "stylesheet",
    type: "text/css",
    href: "../src/widget.css"
  });

  $('head').append(link);
}

function initializeWidget() {
  var widget = $('#statusy');
  widget.append('<div id="statusy-widget"><h3 class="statusy-widget-h3">Current Status: Good</h3></div>');
}

function expandHandler() {
  console.log('doing expand');
  var smallWidget = $('#statusy-widget');
  var container = $('#statusy');
  if(smallWidget.is(":visible")) {
    smallWidget.hide();
    container.append('<div id="statusy-widget-expanded"><p>This is it expanded!</p></div>');
    document.getElementById('statusy-widget-expanded').accordion();
  } else {
    smallWidget.show();
    document.getElementById('statusy-widget-expanded').remove();
  }
}

function fetchData() {
  
}

$(document).ready(function() {
  embedStylesheet();
  initializeWidget();
  $('#statusy').click(function() {
    expandHandler();
  });
});
