import Url from "../models/Url.js";
import { generateCode } from "../utils/generateCode.js";

export const shortenPost=async(req,res)=>{
    const {longUrl}=req.body;
    if(!longUrl) 
        return res.status(400).json({message:'Long url is required'});
    try {
        let url=await Url.findOne({longUrl});
        if(url) return res.json({shortUrl:`${process.env.BASE_URL}/${url.shortCode}`});

        let shortCode;
        let exists=true;
        while(exists){
            shortCode=generateCode();
            exists=await Url.findOne({shortCode});
        }
        url= Url.create({longUrl,shortCode});
        console.log("BASE_URL from env:", process.env.BASE_URL);
        res.json({shortUrl:`${process.env.BASE_URL}/${shortCode}`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

// get short code
export const getShortCode=async(req,res)=>{
    try {
        const url=await Url.findOne({shortCode:req.params.shortCode});
        if(!url) return res.status(404).json({error:"short code not found"});

        res.redirect(url.longUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
}
