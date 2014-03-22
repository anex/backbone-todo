/*

[Server]:[Data] -> [Client]:[ [Models]->[Views]->[DOM] ]

- Models: Provides the data for views
- Views: Builds the HTML

*/

//Declare Model
var TodoItem = Backbone.Model.extend({
});

//Instance Model
var todoItem = new TodoItem(
    { description: 'Algo', status:'incomplete', id:1 }
);

//Declaro View
var TodoView = Backbone.View.extend({
    //function render for make changes
    render: function(){
        var html = '<h3>' + this.model.get('description') + '</h3>';
        $(this.el).html(html);
    }
});

//To create view instance
var todoView = new TodoView({ model: todoItem });

//Route
var AppRouter = Backbone.Router.extend({ 
    routes: { 
        //"*actions": "defaultRoute",  // matches http://example.com/#anything-here 
        "search/:query": "defaultRoute",  // matches http://example.com/#anything-here 
        "aphu/:query": "aphu" // matches http://example.com/#anything-here 
    }   
}); 

// Initiate the router 
var app_router = new AppRouter; 
    
app_router.on('route:defaultRoute',  function(actions) { 
    alert(actions); 
}); 

app_router.on('route:aphu',  function(actions) { 
    alert("Ass"); 
}); 

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();

//Call render function
todoView.render();
$('#all').html(todoView.el);
console.log(todoView.el);

/*
Get attr
todoItem.get('description');

Set attr
todoItem.set({ status:'complete' });

Sync to the server
todoItem.save();

$.getJSON('/todo', function(data){
}

var todoItem = Backbone.Collection.extend({
  model: TodoItem,
  url: ""
});
*/

