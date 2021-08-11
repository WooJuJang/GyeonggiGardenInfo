

const authUtil={
    checkToken:async(req,res,next)=>{
        var token=req.headers.token;
        if(!token)
            return 'No Token'
        next();
    }
}

export default authUtil