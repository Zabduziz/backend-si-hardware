const { dosenModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const fs = require('fs')
const csv = require('csv-parser')
//TODO: add dosen bulk

const addDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const namaDosen = req.body.namaDosen
    if (!namaDosen) { return res.status(400).json({ message: "please input dosen name!" }) }
    try {
        const checkDosenName = await dosenModel.findOne({
            where: { namaDosen: namaDosen }
        })
        if (checkDosenName) {return res.status(400).json({ message: "Dosen name already exists" }) }
        const newDosen = await dosenModel.create({
            idDosen: await generateId(dosenModel, 'idDosen', 'DSN'),
            namaDosen: namaDosen
        })
        res.status(200).json({
            message: "Successfully created dosen",
            data: newDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const deleteDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const idDosen = req.params.idDosen
    if (!idDosen) { return res.status(400).json({ message: "please input id dosen!" }) }
    try {
        const deleteDosen = await dosenModel.destroy({
            where: { idDosen: idDosen }
        })
        res.status(200).json({
            message: "Successfully deleted dosen!",
            data: deleteDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getAllDosen = async (req, res) => {
    try {
        const allDosen = await dosenModel.findAll()
        res.status(200).json({
            message: "Successfully get All Dosen",
            data: allDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const addBulkDosen = async (req, res) => {
    // 1. Authorization check
    const idRole = req.user.idRole
    if (idRole !== 'ADM') {
        // Hapus file yang terupload jika otorisasi gagal
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path)
        }
        return res.status(403).json({ message: "You are not authorized" })
    }

    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "No file uploaded." })
    }

    try {
        const dataToInsert = [];
        const errors = [];
        let totalProcessed = 0;
        let currentIdNumber = 0;

        // 2. Get the last ID from the database once
        const lastRecord = await dosenModel.findOne({
            order: [['idDosen', 'DESC']]
        });

        if (lastRecord) {
            const lastId = lastRecord.idDosen;
            currentIdNumber = parseInt(lastId.replace('DSN', ''), 10);
        }

        const stream = fs.createReadStream(req.file.path).pipe(csv());

        // 3. Process CSV Data
        await new Promise((resolve, reject) => {
            stream
                .on('data', (data) => {
                    totalProcessed++;
                    const rowNumber = totalProcessed; // Nomor baris di CSV (termasuk header)

                    // Cek namaDosen: ini solusi untuk error "null value"
                    const namaDosen = data.namaDosen ? data.namaDosen.trim() : null;

                    if (!namaDosen || namaDosen.length === 0) {
                        // Jika namaDosen NULL/Kosong, masukkan ke list error
                        errors.push({
                            line: rowNumber + 1, // +1 karena totalProcessed tidak menghitung header
                            name: namaDosen || 'N/A',
                            message: "Nama kelas tidak boleh kosong (Not-null constraint).",
                            error: "Missing required column value"
                        });
                        return; // Skip this record
                    }

                    currentIdNumber++; // Increment ID only for valid records
                    const formattedNumber = String(currentIdNumber).padStart(5, '0');
                    const uniqueId = `DSN${formattedNumber}`;

                    dataToInsert.push({
                        idDosen: uniqueId,
                        namaDosen: namaDosen
                        // Tambahkan kolom lain di sini jika ada
                    });
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (e) => {
                    reject(new Error(`Error reading CSV stream: ${e.message}`));
                });
        });

        // 4. Bulk Insert (only for valid data)
        let successCount = 0;
        let failCount = errors.length; // Mulai dari error validasi data

        if (dataToInsert.length > 0) {
            // Karena kita menggunakan bulkCreate dengan ignoreDuplicates: true,
            // kita anggap semua yang dimasukkan berhasil. Duplikat akan di-skip
            // tanpa error, tapi tidak akan ada notifikasi baris mana yang di-skip
            // kecuali kita menggunakan Transaction, tapi bulkCreate lebih cepat.
            const createdRecords = await dosenModel.bulkCreate(dataToInsert, {
                ignoreDuplicates: true
            });
            successCount = createdRecords.length;
        }

         // 5. Clean up uploaded file
        fs.unlinkSync(req.file.path);

        // 6. Send structured response matching FE expectations
        const responseData = {
            message: "Import data selesai diproses.",
            total: totalProcessed,
            ok: successCount,
            fail: failCount,
            errors: errors, // FE akan menggunakan ini untuk menampilkan detail error
            // skipped: totalProcessed - successCount - failCount // Perlu logika lebih jika ingin menghitung duplikat yang di-skip
        };

        // Jika semua gagal karena validasi, kirim status 400
        if (successCount === 0 && totalProcessed > 0) {
            return res.status(400).json(responseData);
        }

        res.status(200).json(responseData);

    } catch (e) {
        console.error('Error during CSV processing or bulkCreate:', e.message);

        // Ensure file is deleted on any main try-catch error
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        // Kirim response error standard
        res.status(500).json({ message: `Internal server error: ${e.message}`, error: e.message });
    }
}

module.exports = {
    addDosen,
    deleteDosen,
    getAllDosen,
    addBulkDosen
}