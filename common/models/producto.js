'use strict';

module.exports = function(Producto) {

    Producto.limpiarLista = function(context, callback) {
    var array;
    var usuario=Producto.app.models.Usuario;
    var idlista;
     usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            if (err)callback(err);
            idlista=usuarioAutenticado.listaFamiliarId;
            Producto.updateAll({comprar: 0}, function(err, info) {
                Producto.find({where: {listaFamilarId: idlista}}, function (err, Lista) {
                callback(err, Lista);
            });
    
});
           
        });
   
};

};
