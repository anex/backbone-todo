(function($){
    //Forzar a que no de errores le sync
     Backbone.sync = function(method,  model,  success,  error){ 
        success();
     }

    //Modelo
    var Item = Backbone.Model.extend({
      defaults: {
        part1: 'hello',
        part2: 'world'
      }
    });

    var list = Backbone.Collection.extend({
      model: Item,
      url: ""
    });

    //Segunda Vista
    var ItemView = Backbone.View.extend({
      tagName: 'li',

      events: {
        'click span.swap': 'swap',
        'click span.delete': 'remove',
      },
    
      initialize: function(){
        _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
      },
    
      render: function(){
        $(this.el).html('<span>'+this.model.get('part1')+" "+this.model.get('part2')+'</span>&nbsp; &nbsp;<span class="swap">[swap]</span> <span class="delete">[delete]</span>');
        return this;
      },

      unrender: function() {
        $(this.el).remove();
      },
    
      swap: function(){
        var swapped = {
            part1: this.model.get('part2'), 
            part2: this.model.get('part1'), 
        };
        this.model.set(swapped)
      },

      remove: function(){
        this.model.destroy();
      }
    });
    
    //Vista Principal
    var MyView = Backbone.View.extend({
      el: $('#all'),
    
      events: {
        'click button#add': 'addItem'
      },    
        
      initialize: function () {
        _.bindAll(this, 'render', 'addItem', 'appendItem');  

        this.collection = new list();
        this.collection.bind('add', this.appendItem);

        this.counter = 0;
        this.render();
      },
    
      render: function () {
          var self = this;

          $(this.el).append("<button id='add'>Add list item</button>");
          $(this.el).append("<ul></ul>");

          _(this.collection.models).each(function(item){
            self.appendItem(item);    
          }, this);
      },

        addItem: function(){
            this.counter++;

            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter
            });
            this.collection.add(item);
        }, 

        appendItem: function(item){
            var itemview = new ItemView({
                model: item
            });
                
            $('ul', this.el).append(itemview.render().el);
        }    
    });

    var myview = new MyView();
    console.log(this.model);
})(jQuery);
