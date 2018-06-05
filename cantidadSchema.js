var mongoose = require("./mongooseConnection");
var Schema = mongoose.Schema;

var cantidadSchema = new Schema({
    cantidad: {
        type: Number,
        required: true,
        min: [1, 'La cantidad mínima por entrada es 1.'],
        max: [100, 'La cantidad máxima por entrada son 100.']
    },
    fecha: {
        type: Date,
        required: true
    }
},{
    collection:'Cantidad',
    timestamp: { createdAt: 'createdDate' }
});

var CantidadSchema = mongoose.model("CantidadSchema", cantidadSchema);
module.exports.Cantidad = CantidadSchema;