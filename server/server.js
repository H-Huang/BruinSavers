Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);

//security code - removed autopublish
Meteor.publish('discounts', function(){
  return Discounts.find()
});

Meteor.methods({
  'addNewDiscount': function(discountName){
    var currentUser = Meteor.userId();
    check(discountName, String);
    var data = {
      name: discountName,
      expired: false,
      createdAt: new Date(),
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

});
