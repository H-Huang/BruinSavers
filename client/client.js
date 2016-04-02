Template.discounts.helpers({
  'discount': function(){
      return Discounts.find({}, {sort: {createdAt: -1}});
  }
});

Template.discountItem.helpers({
  'starCount': function(){
    return this.starred.length;
  }
});

Template.savedDiscounts.helpers({
  'discount': function(){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    return Discounts.find( {starred: email}, {sort: {createdAt: -1}} );
  }
});

Template.addDiscount.events({
  'click .submit-form': function(event){
    event.preventDefault();
    var discountName = $('[name=discountName]').val();
    var discountDescription = $('[name=discountDescription]').val();
    var discountCategory = $('[name=category]').val();
    Meteor.call('addNewDiscount', discountName, discountDescription, discountCategory);
    $('#myModal').modal('toggle');
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
  'submit .modal-body form': function(event){
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
            document.getElementById("error_message").innerHTML = error.reason + ". Please try again.";
        } else {
            Router.go("home");
        }
      });

  }
});

Template.savedDiscountsItem.events({
  "click .delete-discount": function(event, template){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Save this discount?");
    Meteor.call("deleteSavedDiscount", documentId, confirm);
  }
});
