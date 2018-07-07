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
  widget.append('<div id="statusy-widget"><p class="statusy-widget-closed-text-small">Current Status</p><p class="statusy-widget-closed-text-large">' + currentData.statuspage.overall_status + '</p></div>');
}

function expandHandler() {
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
