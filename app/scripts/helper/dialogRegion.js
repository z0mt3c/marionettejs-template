define(['backbone'], function (Backbone) {
    var region = Backbone.Marionette.Region.extend({
        el: '#dialog',

        onShow: function (view) {
            var self = this,
                modal = this.$el.modal('show');

            this.listenTo(view, "dialog:close", this.closeDialog);

            modal.one("hidden.bs.modal", function() {
                self.stopListening();
                self.close();
            });
        },

        closeDialog: function () {
            this.$el.modal('hide');
        }
    });

    return region;
});