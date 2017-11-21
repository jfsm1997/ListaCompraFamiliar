'use strict';

module.exports = function(Listafamiliar) {
    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        
        context.args.data.CoordinadorId = context.req.accessToken.userId;
        next();
    });
};
