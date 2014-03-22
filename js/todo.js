$(function(){
    var todo = Backbone.Model.extend({
      defaults: function(){ 
          content:'empty'
      },
    });
    
    var todos = Backbone.Collection.extend({
      model: todo,
    });

    var taskView = Backbone.View.extend({
      tagName: 'div id="task"',
    
      events: {
        'click span.remove': 'unrender',
      },
    
      initialize: function () {
        _.bindAll(this, 'render', 'unrender', 'remove');

        this.model.bind('change', this.render);
        this.model.bind('remove', this.remove);
      },

      render: function () {
        $(this.el).append("<span>"+this.model.get('content')+"</span><span class='remove'></span>");
        return this;
      },

      unrender: function(el){
        $(this.el).remove();
      },

      remove: function(){
        this.model.destroy();
      },
    });
    

    var allView = Backbone.View.extend({
      el: $('#all'),
    
      events: {
        //'click button#crear': "add",
        'keypress #new-todo': "add",
      },
    
      initialize: function () {
        _.bindAll(this, 'render', 'add', 'appendTask');

        this.input = this.$("#new-todo"),

        this.collection = new todos();
        this.collection.bind('add', this.appendTask);

        this.counter=0;
        this.render();    
      },
    
      render: function () {
          var self = this;
          //$(this.el).append("<button id='crear'>Crear</button>");
          //

          _(this.collection.models).each(function(task) {
              self.appendTask(task);
          }, this);

      },

      add: function(e) {
        if (e.keyCode != 13) return;
        this.counter++;
        var task = new todo();
        task.set({content:this.input.val(), n:this.counter});
        //Add task to collection, update view with event ('add', this.append)
        this.collection.add(task);
      },

      appendTask: function(task){
        var taskview = new taskView({
         model: task
        });
        $('#list').show();
        $('#list').append(taskview.render().el)
        this.input.val('');
      },

    });

    var main = new allView(); 
});
