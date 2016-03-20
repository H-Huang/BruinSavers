Template.discounts.helpers({
  'discount': function(){
      return Discounts.find({}, {sort: {createdAt: -1}});
  }
});

Template.savedDiscounts.helpers({
  'discount': function(){
    return SavedDiscounts.find({}, {sort: {createdAt: -1}});
  }
});

Template.addDiscount.events({
  'submit form': function(event){
    event.preventDefault();
    var discountName = $('[name=discountName]').val();
    Meteor.call('addNewDiscount', discountName);
    $('[name=discountName]').val('')
  }
});

Template.discountItem.events({
  'click .delete-discount': function(event){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this discount?");
    Meteor.call('removeDiscount', documentId, confirm);
  },

  //saves the discount, passes method to server.js
  'click .save-discount': function(event){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Save this discount?");
    Meteor.call('saveDiscount', documentId, confirm);
  }
});

Template.register.events({
  'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var name = $('[name=name]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        name: name,
        password: password
      }, function(error){
        if(error){
            console.log(error.reason); // Output error if registration fails
        } else {
            Router.go("home"); // Redirect user if registration succeeds
        }
      }
    );
  }
});

Template.navigation.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.login.events({
  'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Meteor.loginWithPassword(email, password, function(error){
        if(error){
            console.log(error.reason);
        } else {
            Router.go("home");
        }
      });

  }
});
