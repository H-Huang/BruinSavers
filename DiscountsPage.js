Discounts = new Mongo.Collection('discounts');

/*yogi-ben admin code, for info: https://github.com/yogiben/meteor-admin*/
AdminConfig = {
  collections: {
    Discounts: {}
  }
};
/*
Schemas = {};
Schemas.Discounts = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  createdAt: {
    type: Date,
    label: 'Date',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  starred: {
    type: Array

  }
});

Discounts.attachSchema(Schemas.Discounts)*/
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
