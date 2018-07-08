var currentData = {};
var statuspage = '';
var statuspage_url = '';

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
    widgetExpanded.append(
      '<div style="text-align:center"><p class="statusy-widget-open-text-small">Current Status</p><p class="statusy-widget-open-text-large">' + currentData.statuspage.overall_status + '</p></div>'
    )
    for (service in currentData.statuspage.services) {
      var s = currentData.statuspage.services[service];
      widgetExpanded.append('<p class="statusy-widget-status-paragraph">' + s.description + '</p><p class="statusy-widget-status-blip" style="color:' + s.status_obj.color + '; border-color:' + s.status_obj.color + '">' + s.status + '</p>');
    }
    widgetExpanded.append(
      '<p class="statusy-widget-status-paragraph">Open Incidents: ' + currentData.statuspage.incidents.length + '</p>'
    );
    widgetExpanded.append(
      '<div class="statusy-widget-footer"><a class="statusy-widget-statuspage-link" href="' + statuspage_url + '">Visit Status Page</a> \
      <div class="statusy-widget-footer-linkback"> \
            <span> \
              Powered by \
              <a href="https://statusy.co">Statusy</a> \
            </span> \
          </div> \
          </div>'
    );
  } else {
    smallWidget.show();
    document.getElementById('statusy-widget-expanded').remove();
  }
}

function fetchData() {
  $.ajax({
    url: 'https://app.statusy.co/api/v1/public/statuspage/' + statuspage,
    success: function(data) {
      currentData = data;
      initializeWidget();
  }});
}

function statusy(config) {
  statuspage = config.statuspage;
  statuspage_url = config.statuspage_url;

  embedStylesheet();
  fetchData();

  $('#statusy').click(function() {
    expandHandler();
  });
};
