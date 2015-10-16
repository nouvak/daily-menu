Template.restaurantModal.events({
    'click #save': function(e) {
        e.preventDefault();

        /*var animal = {
            name: $('#animalName').val()
        }

        Meteor.call('addAnimal', animal, function(error, result) {
            if (error) {
                alert(error);
            }
        });*/

        Modal.hide('animalsModal');
    }
});