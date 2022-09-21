const Upload = require('./../models/upload.schema');
const csv = require('csvtojson');
const fs = require('fs');
const { encrypt, decrypt } = require('./../utilities/utils');

const convertCsvToJson = async (req, res) => {
    try {
        // Reading uploaded file as buffer
        const buffer = fs.readFileSync(req.file.path);
        let uploadObj;

        // Converting CSV file to JSON
        await csv()
            .fromFile(req.file.path)
            .then(async (jsonObj) => {
                uploadObj = new Upload({
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

        const dataObj = {
            sensorData: uploadObj
        };
        const encryptedData = encrypt(dataObj);

        res.status(200).json({
            message: 'Sensor data uploaded successfully',
            data: encryptedData
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { convertCsvToJson };