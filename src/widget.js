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
  widget.append('<div id="statusy-widget"><h3 class="statusy-widget-h3">Current Status: ' + currentData.statuspage.overall_status + '</h3></div>');
}

function expandHandler() {
  console.log('doing expand');
  var smallWidget = $('#statusy-widget');
  var container = $('#statusy');
  if(smallWidget.is(":visible")) {
    smallWidget.hide();
    container.append('<div id="statusy-widget-expanded"></div>');
    var widgetExpanded = $('#statusy-widget-expanded');
    for (service in currentData.statuspage.services) {
      var s = currentData.statuspage.services[service];
      widgetExpanded.append('<p>' + s.description + ' : ' + s.status);
    }
  } else {
    smallWidget.show();
    document.getElementById('statusy-widget-expanded').remove();
  }
}

function fetchData() {
  $.ajax({
    url: 'https://app.statusy.co/api/v1/public/statuspage/statusy',
    success: function(data) {
      currentData = data;
      initializeWidget();
  }});

}

$(document).ready(function() {
  embedStylesheet();
  fetchData();
  $('#statusy').click(function() {
    expandHandler();
  });
});
