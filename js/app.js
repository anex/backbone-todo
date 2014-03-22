(function function_name (argument) {

    //Creo modelo
    var Datos = Backbone.Model.extend({
        initialize: function(){
            console.info("Nuevo Modelo de: Datos");

            //Trigger cuando se modifica atributo
            this.on("change:profesion", function(){
                console.log("Modificado profesion");
            });

            // Evento a la escuha del error
            this.on("error", function(model, error){
                console.log(error);
            });
        },
        defaults:{
            nombre: 'Ninguno',
            edad: 0,
            lenguajes: [],
            profesion: '', 
            telefono: []
        },
        //funcion agrega elementos a lista
        addtelf: function(new_telf){
            //Obtiene lista
            var array_telf = this.get('telefono');

            //Añade nuevo elemento
            array_telf.push(new_telf);

            //Actualiza la variable 
            this.set({telefono:array_telf});
        },
        //Funcion para validacion
        validate: function(attrs){
            if(attrs.profesion == 'Vago'){
                return "Vago no es una profesion!";
            }else{
                console.log(attributes);
            }    
        }    
    });

    //Instancio modelo
    var myDatos = new Datos({
        nombre:'Pepe',
        edad:60,
        lenguajes: ['Español'],
        profesion: 'Estudiante',
        telefono: ['5555555']
    });

    //Añado atributos al modelo
    myDatos.set({direccion:'S/C'});

    myDatos.addtelf('77777');

    myDatos.set({profesion: "Vago"});

    myView = Backbone.View.extend({
        initialize: function(){
            alert(myDatos.get("nombre"));
        }
    });

    var myview = new myView({ 
        el: $("#all"); 
        render: function(){
            var tag = '<h3>' + this.model.get('nombre') + '</h3>';
            $($this.el).html(tag);
        }
    });

    myview.render();
    $($all).html(myview.el);

})();
