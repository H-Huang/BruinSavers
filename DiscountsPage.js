Discounts = new Mongo.Collection('discounts');

//http://www.ongraph.com/blog/meteor-add-autoform-and-autoform-fileupload
/*this code needs to be defined with the schema!!!*/
var fileStore = new FS.Store.FileSystem("fileStore");

Images = new FS.Collection('files', {
  stores: [fileStore]
});

Images.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function(userId) {
    return true;
  },
  remove: function () {
      return true;
  },
});

/*=========*/

/*yogi-ben admin code, for info: https://github.com/yogiben/meteor-admin*/
AdminConfig = {
  collections: {
    Discounts: {
      tableColumns: [
       { label: 'Name', name: 'name' },
       { label: 'Created At', name: 'createdAt' },
      ]
    }
  }
};

Schemas = {};
Schemas.Discounts = new SimpleSchema({
  picture: {
     type: String,
     label: "Picture",
     optional: true,
     autoform: {
          afFieldInput: {
              type: 'fileUpload',
              collection: 'Images',
              label: 'Choose file'
              /*
              onAfterInsert: function(err, fileObj) {
                  //https://coderwall.com/p/o9np9q/get-unique-values-from-a-collection-in-meteor
                  var myArray = Discounts.find().fetch();
                  console.log(hi.size());
          }*/
        }
     }
  },
  name: {
    type: String,
    label: "Name of discount",
    max: 60
  },
  description: {
    type: String,
    label: 'Description',
    max: 300
  },
  category: {
    type: String,
    label: 'Category',
  },
  createdAt: {
    type: Date,
    label: 'Date'
  },
  starred: {
    type: [String],
    label: 'People who starred this',
    optional: true
  }

});

Discounts.after.update(function (userId, doc, fieldNames, modifier, options) {
  //http://stackoverflow.com/questions/26281323/retrieve-all-elements-in-an-array-in-mongodb MY MIND IS BLOWN OMG!!!
  var myArray = Discounts.find().fetch();
  var pictures = _.chain(myArray).pluck('picture').flatten().uniq().value();
  //https://github.com/yogiben/meteor-autoform-file/issues/6
  //var removeImages = Images.find( { _id: { $nin: pictures } } );
  Images.remove({ _id: { $nin: pictures } } );
  //console.log(removeImages);
}, {fetchPrevious: true});

Discounts.attachSchema(Schemas.Discounts);

Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home',
    //subscriptions: changed to waitOn: due to loading template
    waitOn: function(){
      Meteor.subscribe('discounts');
      Meteor.subscribe('files');
    }
});


Router.route('/register');
Router.route('/login');
Router.route('/contact');

//savedDiscounts template in discountspage.html
Router.route('/saveddiscounts', {
  name: 'savedDiscounts',
  waitOn: function(){
    Meteor.subscribe('discounts');
    Meteor.subscribe('files');
  }
});
