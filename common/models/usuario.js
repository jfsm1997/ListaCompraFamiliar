'use strict';

module.exports = function (Usuario) {

    Usuario.prototype.aceptarSolicitud = function (context, callback) {
        var listaFamiliarid;
        var usuarioSolicitante = this;
        usuarioSolicitante.Solicitud(function(err,usuarioSo){
           
            if(usuarioSo.length!=0){
                Usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            
            if (err)callback(err);
            
             listaFamiliarid = usuarioAutenticado.listaFamiliarId;
 
                usuarioSolicitante.listaFamiliarId = listaFamiliarid;
                usuarioSolicitante.save(function (err) {
                    Usuario.find({where: {listaFamilarId: listaFamiliarid}}, function (err, UsuariosLista) {
                    callback(err, UsuariosLista);
                });

                });
                usuarioSolicitante.Solicitud.remove(listaFamiliarid,
                        function (err) {

                        });
                
            });
            }else{
                callback(err,"este usuario no tiene solicitudes");
            }
        });
       

        
       
    };
    Usuario.prototype.rechazarSolicitud = function (context, callback) {
        var listaFamiliarid;
        var usuarioSolicitante = this;
        
         usuarioSolicitante.Solicitud(function(err,usuarioSo){
           
            if(usuarioSo.length!=0){
        Usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);
            listaFamiliarid = usuarioAutenticado.listaFamiliarId;
            usuarioSolicitante.Solicitud.remove(listaFamiliarid,
                    function (err) {

                    });
            Usuario.find({where: {listaFamilarId: listaFamiliarid}}, function (err, UsuariosLista) {
                callback(err, UsuariosLista);
            });

        });
        }else{
                callback(err,"este usuario no tiene solicitudes");
            }
        });
    };



};
 