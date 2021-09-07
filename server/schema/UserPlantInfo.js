import mongoose from 'mongoose';

const UserPlantInfoSchema=new mongoose.Schema({
    key:String,
    user_crops:String,
    plant_date:[String],
    harvest_date:[String],
    remove_date:[String],

})

var userplantinfo=mongoose.model('UserPlantInfo',UserPlantInfoSchema,'UserPlantInfo')
export default userplantinfo