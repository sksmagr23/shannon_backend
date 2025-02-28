import User from '../model/user.model.js';
import oauth2Client from '../utils/googleConfig.js';
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config();

const GoogleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        console.log(code);
        const Userdata = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(Userdata.tokens);
        const UserRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${Userdata.tokens.access_token}`);
        const { name, email, picture } = UserRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, image: picture });
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Success', user, token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { GoogleLogin };