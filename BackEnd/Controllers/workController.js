const workModel = require('../Models/workModel');

exports.addWork = async (req, res) => {
    const { work, done} = req.body;
    const userId = req.user.id;
    const newWork = new workModel({work, done, user: userId});
    await newWork.save();
    res.status(201).json({message: 'Work added successful!', newWork});
}

exports.getWork = async (req, res) => {
    const userId = req.user.id;
    const works = await workModel.find({ user: userId });
    res.status(200).json({message: 'Get all works successful!', works});
}

exports.deleteWork = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user.id;

    const del = await workModel.findOneAndDelete({_id: id, user: userId});
    res.status(200).json(del);
}

exports.changeWork = async (req, res) => {
    const {id} = req.params;
    const {work, done} = req.body;
    const userId = req.user.id;
    const kq = await workModel.findOneAndUpdate({_id: id, user: userId}, {work, done}, {new: true});
    res.status(200).json(kq);
}