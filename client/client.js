Template.discounts.helpers({
  'discountHousing': function(){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    return Discounts.find({},{sort: {createdAt: -1}} );
  },

  'discountFoodDrink': function(){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    return Discounts.find( {category: "FoodDrink"}, {sort: {createdAt: -1}} );
  },

  'discountEvents': function(){

  },

  'discountTechnology': function(){

  }
});

Template.discountItem.helpers({
  'starCount': function(){
    return this.starred.length;
  },

  /*'discountImage': function(){
    var pictureId = this.picture;
    console.log(pictureId);
    var picture = Images.findOne( {_id: pictureId} );
  }*/
});

Template.savedDiscounts.helpers({
  'discountHousing': function(){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    return Discounts.find( {starred: email}, {sort: {createdAt: -1}} );
  },

  'discountFoodDrink': function(){

  },

  'discountEvents': function(){

  },

  'discountTechnology': function(){

  }
});

Template.discountItem.events({
  /*
  'click .delete-discount': function(event){
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this discount?");
    Meteor.call('removeDiscount', documentId, confirm);
  },*/

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
            document.getElementById("register_error_message").innerHTML = error.reason + ". Please try again.";
        } else {
            Router.go("home"); // Redirect user if registration succeeds
        }
      }
    );
  },

  'click .message a': function(event){
    event.preventDefault();
    Router.go("login");
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
            document.getElementById("login_error_message").innerHTML = error.reason + ". Please try again.";
        } else {
            Router.go("home");
        }
      });
  },

  'click .message a': function(event){
    event.preventDefault();
    Router.go("register");
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

Template.images.helpers({
  'images': function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});

Template.imageItem.rendered = function() {
  $('.carousel').slick({
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true
  });
}
