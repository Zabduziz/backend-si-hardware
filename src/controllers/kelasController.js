const { kelasModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const fs = require('fs')
const csv = require('csv-parser')

const addKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const namaKelas = req.body.namaKelas
    if (!namaKelas) { return res.status(400).json({ message: "please input kelas name!" }) }
    try {
        const checkKelasName = await kelasModel.findOne({
            where: { namaKelas: namaKelas }
        })
        if (checkKelasName) {return res.status(400).json({ message: "Kelas name already exists" }) }
        const newKelas = await kelasModel.create({
            idKelas: await generateId(kelasModel, 'idKelas', 'KLS'),
            namaKelas: namaKelas
        })
        res.status(200).json({
            message: "Successfully created kelas!",
            data: newKelas
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const deleteKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const idKelas = req.params.idKelas
    if (!idKelas) { return res.status(400).json({ message: "please input id kelas!" }) }
    try {
        const deleteDosen = await kelasModel.destroy({
            where: { idKelas: idKelas }
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

const getAllKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    try {
        const allKelas = await kelasModel.findAll()
        res.status(200).json({
            message: "Successfully get All Dosen",
            data: allKelas
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

// VIBE CODED IT
const addBulk = async (req, res) => {
    // 1. Authorization check
    const idRole = req.user.idRole;
    if (idRole !== 'ADM') {
        // Hapus file yang terupload jika otorisasi gagal
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(403).json({ message: "You are not authorized" });
    }

    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    try {
        const dataToInsert = [];
        const errors = [];
        let totalProcessed = 0;
        let currentIdNumber = 0;

        // 2. Get the last ID from the database once
        const lastRecord = await kelasModel.findOne({
            order: [['idKelas', 'DESC']]
        });

        if (lastRecord) {
            const lastId = lastRecord.idKelas;
            currentIdNumber = parseInt(lastId.replace('KLS', ''), 10);
        }

        const stream = fs.createReadStream(req.file.path).pipe(csv());

        // 3. Process CSV Data
        await new Promise((resolve, reject) => {
            stream
                .on('data', (data) => {
                    totalProcessed++;
                    const rowNumber = totalProcessed; // Nomor baris di CSV (termasuk header)

                    // Cek namaKelas: ini solusi untuk error "null value"
                    const namaKelas = data.namaKelas ? data.namaKelas.trim() : null;

                    if (!namaKelas || namaKelas.length === 0) {
                        // Jika namaKelas NULL/Kosong, masukkan ke list error
                        errors.push({
                            line: rowNumber + 1, // +1 karena totalProcessed tidak menghitung header
                            name: namaKelas || 'N/A',
                            message: "Nama kelas tidak boleh kosong (Not-null constraint).",
                            error: "Missing required column value"
                        });
                        return; // Skip this record
                    }

                    currentIdNumber++; // Increment ID only for valid records
                    const formattedNumber = String(currentIdNumber).padStart(5, '0');
                    const uniqueId = `KLS${formattedNumber}`;

                    dataToInsert.push({
                        idKelas: uniqueId,
                        namaKelas: namaKelas
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
            const createdRecords = await kelasModel.bulkCreate(dataToInsert, {
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
    addKelas,
    deleteKelas,
    getAllKelas,
    addBulk
}