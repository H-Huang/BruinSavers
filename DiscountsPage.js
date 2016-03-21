Discounts = new Mongo.Collection('discounts');

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
