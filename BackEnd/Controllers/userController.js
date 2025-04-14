const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: "Missing fields"});
    }

    const nameExists = await userModel.findOne({name});
    const emailExist = await userModel.findOne({email});

    if(nameExists){
        return res.status(400).json({ message: "Name already exist"});
    }
    if(emailExist){
        return res.status(400).json({ message: "Email already exist"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashPassword});

    newUser.save();
    res.status(200).json({ message: "Resgister successfully!", newUser});
}

exports.loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await userModel.findOne({ name });
        if(!user){
            return res.status(400).json({ message: "User doesn't exist"});
        }
        const checkPW = await bcrypt.compare(password, user.password);
        if(!checkPW){
            return res.status(401).json({message: "Password failed"});
        }
        const token = jwt.sign( // tạo token
            { id: user._id, username: user.username }, // dữ liệu muốn mã hóa
            process.env.JWT_SECRET, // ký token
            { expiresIn: '1h' } // thời hạn
          );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict', // tránh dùng 'strict' nếu có frontend khác domain/port
            secure: false, // Đổi thành true nếu deploy HTTPS
            maxAge: 3600000,
        });
        res.json({ message: 'Login successful' });
    } catch (err){
        res.status(500).json({ message: "Server failed!" });
    }
}
