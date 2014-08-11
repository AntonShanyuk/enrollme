app.factory('Contacts', function ($resource) {
    function CouchDbAction(extend) {
        this.method = 'GET';
        this.params = { id: "@_id", rev: "@_rev" };

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
        get: { method: 'GET', url: encodeURI('../../:id'), params: { v: function () { return new Date().getTime() } } },
        query: {
            method: 'GET', params: { v: function () { return new Date().getTime() } }, isArray: false, url: encodeURI('_view/contact?limit=20&group=true&startkey=[":name"]&endkey=[":name\ufff0"]'), transformResponse: function (response) {
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
    return $resource(encodeURI('../../:id?rev=:rev'), null, methods);
});