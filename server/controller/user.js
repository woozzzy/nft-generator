import mongoose from "mongoose"
import userModel from "../models/userModel.js"
import { ethers } from "ethers"
import checksum from 'eth-checksum'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const getUser = async (req, res) => {
    try {
        const id = req.user._id

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No config with id: ${id}`)

        const user = await userModel.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }

}

export const signup = async (req, res) => {
    try {
        const { address } = req.body
        const checksumAddress = checksum.encode(address)
        const nonce = Math.floor(Math.random() * 1000000)

        let user = await userModel.exists({ address: checksumAddress })
        if (!user) {
            console.log("made new user");
            const newUser = new userModel({
                joined: new Date().toISOString(),
                role: 'user',
                address: checksumAddress,
                nonce,
            })
            await newUser.save()
        }
        user = await userModel.findOne({ address: checksumAddress })

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: "User signup failed", error: error })
    }
}

export const login = async (req, res) => {
    try {
        const { address, signature } = req.body
        const checksumAddress = checksum.encode(address)
        const user = await userModel.findOne({ address: checksumAddress })

        if (user) {
            const msg = `Nonce: ${user.nonce}`
            const ethAddress = ethers.utils.verifyMessage(msg, signature)

            if (ethAddress.toLowerCase() === user.address.toLowerCase()) {
                const newNonce = Math.floor(Math.random() * 1000000)
                const newUser = await userModel.findOneAndUpdate(
                    { address: checksumAddress },
                    { nonce: newNonce }
                )

                const token = jwt.sign(
                    user.toJSON(),
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
                const data = {
                    ...newUser.toJSON(),
                    token
                }
                res.status(200).json(data)
            }
        } else {
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Authentication failed, invalid login", error: error.message })
    }
}

