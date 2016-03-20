Discounts = new Mongo.Collection('discounts');
SavedDiscounts = new Mongo.Collection('SavedDiscounts');

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
Router.route('/savedDiscounts');
