import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
/*Hashing password*/
UserInfoSchema.pre('save',function(next){
    const user=this;
    const saltFactor=10;
    bcrypt.genSalt(saltFactor,(err,salt)=>{
        if(err) return next(err);
    bcrypt.hash(user.password,salt,(err,hash)=>{
        if(err) return next(err);
        user.password=hash;
        next();
        });
    });
});

var userinfo=mongoose.model('UserInfo',UserInfoSchema,'UserInfo');
export default userinfo;