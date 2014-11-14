// Todo Router
  // ----------

  var Workspace = Backbone.Router.extend({
    routes:{
      '*filter': 'setFilter'
    },

    setFilter: function( param ) {
      // Set the current filter to be used
      if (param) {
        param = param.trim();
      }
      app.TodoFilter = param || '';

      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items
      app.Todos.trigger('filter');
    }
  });

  app.TodoRouter = new Workspace();
  Backbone.history.start();

/*
Our router uses a *splat to set up a default route which passes the string after ‘#/’ in the URL to setFilter() which sets app.TodoFilter to that string.

As we can see in the line app.Todos.trigger('filter'), once the filter has been set, we simply trigger ‘filter’ on our Todos collection to toggle which items are visible and which are hidden. Recall that our AppView’s filterAll() method is bound to the collection’s filter event and that any event on the collection will cause the AppView to re-render.

Finally, we create an instance of our router and call Backbone.history.start() to route the initial URL during page load.
*/
