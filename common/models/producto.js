'use strict';

module.exports = function (Producto) {

    Producto.limpiarLista = function (context, callback) {

        var usuario = Producto.app.models.Usuario;
        var idlista;
        usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);
            idlista = usuarioAutenticado.listaFamiliarId;
            Producto.updateAll({listaFamilarId: idlista}, {comprar: 0}, function (err, info) {
                Producto.find({where: {listaFamilarId: idlista}}, function (err, Lista) {
                    callback(err, Lista);
                });
            });
        });
    };
    Producto.prototype.comprarProducto = function (context, callback) {
        var usuario = Producto.app.models.Usuario;
        var idlista;
        var idproducto=this.id;
        usuario.findById(context.req.accessToken.userId, function (err, usuarioAutenticado) {
            
            if (err)callback(err);
            idlista = usuarioAutenticado.listaFamiliarId;
            
            Producto.findOne({where:{and:[{listaFamilarId: idlista},{id:idproducto}]}}, function (err, Producto) {
              Producto.comprar=0;
              Producto.save(function (err){
                  Producto.find({where: {listaFamilarId: idlista}}, function (err, Lista) {
                    callback(err, Lista);
                });
              });
              

            });
            
            
         });
    };

};
