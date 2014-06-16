var Marionette = require('marionette');
var region = Marionette.Region.extend({
    el: '#dialog',

    onShow: function (view) {
        var self = this,
            modal = this.$el.modal('show');

        this.listenTo(view, 'dialog:close', this.closeDialog);

        modal.one('hidden.bs.modal', function () {
            self.stopListening();
            self.close();
        });
    },

    closeDialog: function () {
        this.$el.modal('hide');
    }
});

module.exports = region;