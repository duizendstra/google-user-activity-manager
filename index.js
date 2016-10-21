var google = require("googleapis");

function googleUserActivityManager(mainSpecs) {
    "use strict";
    var auth;
    var service = google.admin('reports_v1');

    function get(specs) {
        var userKey = specs.userKey;
        var date = specs.date;
        var parameters = specs.parameters;
        var maxResults = specs.maxResults || 100;
        return new Promise(function (resolve, reject) {
            service.userUsageReport.get({
                auth: auth,
                userKey: userKey,
                date: date,
                maxResults: maxResults,
                parameters: parameters
            }, function (err, response) {
                if (err) {
                    reject("The API returned an error: " + err);
                    return;
                }
                var usageReports = response;
                if (!response.nextPageToken) {
                    // TODO add next page
                    resolve(usageReports);
                    return;
                }
                get(response.nextPageToken);
            });
        });
    }
    auth = mainSpecs.auth;

    return {
        getActivity: get
    };
}

module.exports = googleUserActivityManager;
