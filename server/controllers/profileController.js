import express from 'express'
import profile from '../models/profileModel.js'

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