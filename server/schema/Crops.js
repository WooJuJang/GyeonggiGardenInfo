import mongoose from 'mongoose';

const SpringSchema=new mongoose.Schema({
    crops:String,
    belong:String,
    interval:Number,
    fixture:Boolean,
    water:Number,
    plant:Number,
    explain:String,
    harvest:String,
    harvestable_crops:Boolean,
    image:String,
});
const SummerSchema=new mongoose.Schema({
    crops:String,
    belong:String,
    interval:Number,
    fixture:Boolean,
    water:Number,
    plant:Number,
    explain:String,
    harvest:String,
    harvestable_crops:Boolean,
    image:String,
})
const FallSchema=new mongoose.Schema({
    crops:String,
    belong:String,
    interval:Number,
    fixture:Boolean,
    water:Number,
    plant:Number,
    explain:String,
    harvest:String,
    harvestable_crops:Boolean,
    image:String,
})

export var spring=mongoose.model('Spring',SpringSchema,'Spring');
export var summer=mongoose.model('Summer',SummerSchema,'Summer');
export var fall=mongoose.model('Fall',FallSchema,'Fall');
