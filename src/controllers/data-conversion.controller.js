const Upload = require('./../models/upload.schema');
const User = require('./../models/user.schema');
const csv = require('csvtojson');
const request = require('request');
const sharp = require('sharp');
const fs = require('fs');
const { encrypt, decrypt } = require('./../utilities/utils');

const convertCsvToJson = async (req, res) => {
    try {
        const buffer = fs.readFileSync(req.file.path);
        csv()
            .fromFile(req.file.path)
            .then(async (jsonObj) => {
                const uploadObj = new Upload({
                    user: {
                        id: req.user.userId,
                        name: req.user.name,
                        role: req.user.role,
                        department: req.user.department
                    },
                    name: req.file.originalname,
                    file: buffer,
                    sensorData: jsonObj
                })
                await uploadObj.save();
            });

        // Deleting uploaded file from server
        fs.unlinkSync(req.file.path);
        // fs.unlink(req.file.path, (error) => {
        //     if (error) {
        //         throw error;
        //     }
        //     console.log('file was deleted');
        // });

        res.status(200).json({
            message: 'Converted to JSON & stored successfully!'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { convertCsvToJson };