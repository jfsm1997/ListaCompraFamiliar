'use strict';

module.exports = function(Listafamiliar) {
    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        
        context.args.data.CoordinadorId = context.req.accessToken.userId;
        next();
    });
    Listafamiliar.afterRemote('create', function (context, Listafamiliar, next) {
        //añade el id de la lista al usuario
       var Usuario = Listafamiliar.app.models.Usuario;
        Usuario.findById(context.req.accessToken.userId,function(err,usuario){ 
        
       usuario.listaFamiliarId= Listafamiliar.id;
       usuario.save(function (err){
        next();
       });
        });
        
    });
    
};
