const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    work: {type: String, required: true},
    done: {type: Boolean, default: false}
}) // tao cau truc

const Work = mongoose.model("Work", workSchema); // dung de su dụng các phương thức
// trong model se chua cac document
module.exports = Work;