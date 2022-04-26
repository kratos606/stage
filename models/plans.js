const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');

const planSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    version: {
        type:Number,
        default:0,
        required: true
    },
    code_RLP:{
        type:String,
        required: true,
        unique: true,
        validate:{
            validator:function(value){
                return /^R[0-9]{3}$/.test(value);
            },
            message:"code_RLP must be like 'R***' ex: R123"
        }
    },
    ordre_jour:{
        type:Number,
        required: true,
        min:[1,"order_jour must be greater or equal to 1"],
        max:[12,"order_jour must be less or equal to 12"]
    },
    ordre_lecture_paquet: {
        type:Number,
        required: true,
        unique: true
    },
    tournée_debut: {
        type:String,
        minLength:[9, 'tournée_debut must be exactly 9 characters'],
        maxlength:[9, 'tournée_debut must be exactly 9 characters'],
        unique: true,
        validate:{
            validator:function(value){
                return !isNaN(value)
            },
            message:"tournée_debut must be a number like 080300180"
        },
        required: true
    },
    tournée_fin: {
        type:String,
        minLength:[9, 'tournée_fin must be exactly 9 characters'],
        maxlength:[9, 'tournée_fin must be exactly 9 characters'],
        unique: true,
        validate:[{
            validator:function(value){
                return !isNaN(value)
            },
            message:"tournée_debut must be a number like 080300180"
        },{
            validator:function(value){
                return value > this.tournée_debut;
            },
            message:"tournée_fin must be greater than tournée_debut"
        },{
            isAsync:true,
            validator:async function(value){
                let Plan = mongoose.model('Plan',planSchema);
                let condition = await Plan.find({ _id: {$ne: this._id}})
                    .where({$or:[{tournée_debut:{$lte:this.tournée_debut},tournée_fin:{$gte:this.tournée_debut}},
                        {tournée_debut:{$lte:value},tournée_fin:{$gte:value}},
                        {tournée_debut:{$gte:this.tournée_debut},tournée_fin:{$lte:value}}
                        ]})
                    .count() === 0;
                return condition;
            },
            message:"interlaced intervals"
        }
        ],
        required: true
    }
})

// auto-increment the id field

autoIncrement.initialize(mongoose.connection);
planSchema.plugin(autoIncrement.plugin, { model: 'Plan', startAt: 1 , incrementBy: 1});

// validate the unique fields

planSchema.plugin(uniqueValidator,{ message: '{PATH} already exists .' });

module.exports = mongoose.model('Plan',planSchema);