import express from 'express'
import profile from '../models/profileModel.js'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const editProfile = async (req, res) => {
    try{
        const response = await profile.edit(req.body)
        res.status(200).json(response)
    } catch (err){
        res.status(404).json({error: err.message})
    }
}

export const deleteAccount = async (req, res) => {
    try{
        const response = await profile.delete(req.body)
        res.status(200).json(response)
    } catch (err){
        res.status(404).json({error: err.message})
    }
}

export const imageUpload = async (req, res) => {
    try{
        const result = cloudinary.v2.uploader.upload_stream(
            {folder: 'profile_images'},
            async (err, result)=>{
                if (err){
                    console.log(err)
                    res.status(500).json({error: 'Cloudinary upload failed'})
                }

                const imgURL = result.secure_url
                const response = await profile.upload({...req.body, imgURL})

                res.status(200).json({message: 'Image Uploaded Successfully', imgURL})
            }
        ).end(req.file.buffer)

    } catch (err){
        res.status(404).json({error: err.message})
    }
}