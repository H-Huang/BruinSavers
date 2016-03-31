Discounts = new Mongo.Collection('discounts');

/*yogi-ben admin code, for info: https://github.com/yogiben/meteor-admin*/
AdminConfig = {
  collections: {
    Discounts: {
      tableColumns: [
       { label: 'Name', name: 'name' },
       { label: 'Created At', name: 'createdAt' }
      ]
    }
  }
};

Schemas = {};
Schemas.Discounts = new SimpleSchema({
  name: {
    type: String,
    label: 'Name of discount',
    max: 60
  },
  createdAt: {
    type: Date,
    label: 'Date',
  },
  starred: {
    type: [String],
    label: 'People who starred this',
    optional: true
  }
});

Discounts.attachSchema(Schemas.Discounts);
/*=================*/

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
    }
});


Router.route('/register');
Router.route('/login');

//savedDiscounts template in discountspage.html
Router.route('/saveddiscounts', {
  name: 'savedDiscounts',
  waitOn: function(){
    Meteor.subscribe('discounts');
  }
});
