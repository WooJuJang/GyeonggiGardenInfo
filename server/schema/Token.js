import mongoose from 'mongoose';

const TokenSchema=new mongoose.Schema({
    id:String,
    token:String,
});

var token=mongoose.model('Token',TokenSchema,'Token');
export default token;