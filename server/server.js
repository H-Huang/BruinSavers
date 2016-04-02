//security code - removed autopublish
Meteor.publish('discounts', function(){
  return Discounts.find()
});

Meteor.methods({
  'addNewDiscount': function(discountName, discountDescription, discountCategory){
    var currentUser = Meteor.userId();
    check(discountName, String);
    var data = {
      name: discountName,
      description: discountDescription,
      category: discountCategory,
      expired: false,
      createdAt: new Date(),
      starred: []
    }
    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Discounts.insert(data);
  },

  'removeDiscount': function(documentId, confirm){
    if(confirm){
      Discounts.remove({_id: documentId});
    }
  },

  'saveDiscount': function(documentId, confirm){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    //put the userId into array
    Discounts.update(
      {_id: documentId, starred: {$ne: email} },
      { $push: { starred: email } }
    );
  },

  'deleteSavedDiscount': function(documentId, confirm){
    var userId = Meteor.userId();
    var email = Meteor.users.findOne({_id: userId}).emails[0].address;
    Discounts.update(
      {_id: documentId },
      { $pull: { starred: email } }
    );
  }
});
