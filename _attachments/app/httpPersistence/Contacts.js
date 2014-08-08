app.factory('Contacts', function ($resource) {
    var couchDbParams = { id: "@_id", rev: "@_rev" };
    function CouchDbAction(extend) {
        this.method = 'GET';
        this.params = couchDbParams;

        var originalObject;
        this.transformRequest = function (contact) {
            originalObject = contact;
            return JSON.stringify({ name: contact.name, type: 'contact' });
        };
        this.transformResponse = function (response) {
            var responseObject = JSON.parse(response);
            originalObject._id = responseObject.id;
            originalObject._rev = responseObject.rev;
        };
        angular.extend(this, extend);
    }

    var methods = {
        post: new CouchDbAction({ method: 'POST', params: {}, url: '../..' }),
        put: new CouchDbAction({ method: 'PUT' }),
        'delete': { method: 'DELETE' },
        get: { method: 'GET', url: '../../:id' },
        query: {
            method: 'GET', isArray: false, url: '_view/contact?limit=20&group=true&startkey=[":name"]&endkey=[":name\ufff0"]', transformResponse: function (response) {
                var responseObject = JSON.parse(response);
                var previousContact = null;
                var values = _.chain(responseObject.rows).map(function (row) {
                    return row.value;
                }).uniq(function (item) {
                    return item._id;
                }).each(function (contact) {
                    contact.previousContact = previousContact;
                    if (previousContact) {
                        previousContact.nextContact = contact;
                    }
                    previousContact = contact;
                }).value();

                return { rows: values };
            }
        }
    }
    return $resource('../../:id?rev=:rev', null, methods);
});