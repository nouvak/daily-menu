MenuItems = new Mongo.Collection("menu_items");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("menu_items", function () {
        return MenuItems.find();
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("menu_items");

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
            Meteor.call("addMenuItem", text)

            // Clear form
            event.target.text.value = "";
        }
    });

    Template.menu_item.events({
        "click .delete": function () {
            Meteor.call("deleteMenuItem", this._id)
        }
    });

    Accounts.ui.config({
        //passwordSignupFields: "USERNAME_ONLY"
    });
}

Meteor.methods({
    addMenuItem: function (text) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        MenuItems.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    deleteMenuItem: function (taskId) {
        var task = MenuItems.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }
        MenuItems.remove(taskId);
    }
});