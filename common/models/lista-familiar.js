'use strict';

module.exports = function (Listafamiliar) {
    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {

        context.args.data.CoordinadorId = context.req.accessToken.userId;
        next();
    });
    Listafamiliar.afterRemote('create', function (context, listafamiliar, next) {
        //añade el id de la lista al usuario
        var Usuario = Listafamiliar.app.models.Usuario;
        Usuario.findById(context.req.accessToken.userId, function (err, usuario) {

            usuario.listaFamiliarId = listafamiliar.id;
            usuario.save(function (err) {
                next();
            });
        });

    });
    Listafamiliar.prototype.solicitar = function (context, callback) {
        var solicitud;
        var id =this.id;
        var usuario=context.req.accessToken.userId;
        this.Solicitud.add(usuario, function(err) {
                solicitud={
                    listaFamiliarId:id,
                    usuarioId:usuario
                    
                }
                        callback(null, solicitud);

});
    };


};
