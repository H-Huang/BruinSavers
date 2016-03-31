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
  }
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
  name: {
    type: String,
    label: "Name of discount",
    max: 60
  },
  createdAt: {
    type: Date,
    label: 'Date'
  },
  picture: {
     type: String,
     label: 'Picture',
     optional: true,
     autoform: {
          afFieldInput: {
               type: 'fileUpload',
               collection: 'Images',
               label: 'Choose file'
          }
     }
  },
  starred: {
    type: [String],
    label: 'People who starred this',
    optional: true
  }

});

Discounts.attachSchema(Schemas.Discounts)

Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
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

//savedDiscounts template in discountspage.html
Router.route('/saveddiscounts', {
  name: 'savedDiscounts',
  waitOn: function(){
    Meteor.subscribe('discounts');
    Meteor.subscribe('files');
  }
});
