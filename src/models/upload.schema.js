const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema(
    {
        user: {
            type: {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                role: {
                    type: String // TODO enum
                },
                department: {
                    type: String // TODO enum
                }
            }
        },
        name:{
            type: String
        },
        file: {
            type: Buffer
        },
        sensorData: {
            type: [Object]
        }
    },
    { timestamps: true }
);

const Upload = mongoose.model('upload', uploadSchema);

module.exports = Upload;