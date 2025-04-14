const jwt = require('jsonwebtoken');

function verifyUser (req, res, next) {
    const token = req.cookies.token; // lay token tu cookie
    if(!token) {
        res.status(401).json({ message: "Failed login"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // giải mã token bằng khóa
        req.user = decode; // lưu thông tin giải mã được vào req, để route khác sử dụng
        next(); // tiếp tục đến controller
    } catch (err){
        return res.status(403).json({ message: "Token is not true or missing!"});
    }
}

module.exports = verifyUser;