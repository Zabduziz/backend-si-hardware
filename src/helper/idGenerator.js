const { userModel, barangModel, dataLabModel } = require('../models');

const generateId = async (model, idField, prefix) => {
    const lastRecord = await model.findOne({
        order: [[idField, 'DESC']]
    });

    let nextIdNumber = 1;
    if (lastRecord) {
        const lastId = lastRecord[idField];
        const lastNumber = parseInt(lastId.replace(prefix, ''), 10);
        nextIdNumber = lastNumber + 1;
    }
    const formattedNumber = String(nextIdNumber).padStart(5, '0');
    return `${prefix}${formattedNumber}`;
};

module.exports = {
    generateId
};