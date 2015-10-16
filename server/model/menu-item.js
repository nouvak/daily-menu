Meteor.publish("menu_items", function () {
    return MenuItems.find();
});
