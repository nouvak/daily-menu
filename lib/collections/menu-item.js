MenuItems = new Mongo.Collection("menu_items");

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