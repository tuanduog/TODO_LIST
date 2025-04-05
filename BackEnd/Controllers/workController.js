const workModel = require('../Models/workModel');

exports.addWork = async (req, res) => {
    const { work, done} = req.body;
    const newWork = new workModel({work, done});
    await newWork.save();
    res.status(201).json({message: 'Work added successful!', newWork});
}

exports.getWork = async (req, res) => {
    const works = await workModel.find();
    res.status(200).json({message: 'Get all works successful!', works});
}

exports.deleteWork = async (req, res) => {
    const { id } = req.params; 
    const del = await workModel.findByIdAndDelete(id);
    res.status(200).json(del);
}

exports.changeWork = async (req, res) => {
    const {id} = req.params;
    const {work, done} = req.body;
    const kq = await workModel.findByIdAndUpdate(id, {work, done}, {new : true});
    res.status(200).json(kq);
}