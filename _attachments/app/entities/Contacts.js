app.factory('Contacts', function (CouchEntity) {
    return new CouchEntity({
        type: 'contact',
        props: ['name'],
        indexes: {
            byName: function (name) {
                return stringFormat('_view/contact?startkey="{0}"&endkey="{0}\ufff0"', name);
            }
        }
    });

    function stringFormat(input) {
        var args = Array.prototype.slice.call(arguments, 1);
        return input.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
});