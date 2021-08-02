import mongoose from 'mongoose';

const UserInfoSchema= new mongoose.Schema({
    id:String,
    password:String,
    area:String,
    city:String,
    fertilizer:[String],
    fixture_install:Boolean,
    garden_latitude:Number,
    garden_longitude:Number,
    garden_name:String,
    garden_type:Number,   
    moisture:Number,
    nutrition:Number,
    plastic:Boolean,
    user_use_location:String,
    watering:[String],
    weed:[String],
    weed_quantity:Number,
    

})
var UserInfo=mongoose.model('UserInfo',UserInfoSchema);
export default UserInfo;