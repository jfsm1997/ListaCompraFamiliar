'use strict';

module.exports = function (Usuario) {
    //mitad falta comprobar y el array
    Usuario.prototype.aceptarSolicitud = function (context, callback) {
        var listaFamiliarid;
        var usuarioSolicitante = this;

        Usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);
            listaFamiliarid = usuarioAutenticado.listaFamiliarId;

            usuarioSolicitante.listaFamiliarId = listaFamiliarid;
            usuarioSolicitante.save(function (err) {

            });
            usuarioSolicitante.Solicitud.remove(listaFamiliarid,
                    function (err) {

                    });
            Usuario.find({where: {listaFamilarId: listaFamiliarid}}, function (err, UsuariosLista) {
                callback(err, UsuariosLista);
            });

        });








    };

};
 