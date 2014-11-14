/* ************************************

Next, a TodoList collection is used to group our models. The collection uses the LocalStorage adapter
to override Backbone’s default sync() operation with one that will persist our Todo records to HTML5 Local Storage.
Through local storage, they’re saved between page requests.

************************************ */


  // js/collections/todos.js

  var app = app || {};

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Todo,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    // Change this for databse code!!!!!!
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished.
    completed: function() {
      return this.filter(function( todo ) { // filter is an underscore method - returns an array of values that pass a true test (predicate)
        return todo.get('completed');
      });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply( this, this.completed() ); // without is an underscore method - returns a copy of the array with all instances of the values (second argument) removed
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function( todo ) {
      return todo.get('order');
    }
  });

  // Create our global collection of **Todos**.
  app.Todos = new TodoList();

/* ********************************

The collection’s completed() and remaining() methods return an array of finished and unfinished todos, respectively.

A nextOrder() method implements a sequence generator while a comparator() sorts items by their insertion order.

Note: this.filter, this.without and this.last are Underscore methods that are mixed in to Backbone.Collection so that the reader knows how to find out more about them.

******************************** */
