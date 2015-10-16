// This code only runs on the client
Template.body.helpers({
    menu_items: function () {
        return MenuItems.find({}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    "submit .new-menu-item": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var text = event.target.text.value;

        // Insert a task into the collection
        Meteor.call("addMenuItem", text);

        // Clear form
        event.target.text.value = "";
    },
    "click #new-restaurant": function (event) {
        event.preventDefault();

        $('#restaurantModal').modal('show');
    }
});

Accounts.ui.config({
    //passwordSignupFields: "USERNAME_ONLY"
});
