Meteor.subscribe("menu_items");

Template.menu_item.events({
    "click .delete": function () {
        Meteor.call("deleteMenuItem", this._id)
    }
});