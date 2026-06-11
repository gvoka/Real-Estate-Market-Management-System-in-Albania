const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/pronat', (req, res) => {
    const sql = `
        SELECT 
            p.idPronat,
            p.Tipi,
            p.Siperfaqja,
            p.Cmimi,
            p.idZona,
            z.Emri AS Zona,
            z.Qyteti AS Qyteti
        FROM Pronat p
        JOIN Zonat z ON p.idZona = z.idZona
    `;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/shto-prone', (req, res) => {
    const { Tipi, Siperfaqja, Cmimi, idZona } = req.body;

    const sql = `
        INSERT INTO Pronat
        (Tipi, Siperfaqja, Cmimi, idZona)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [Tipi, Siperfaqja, Cmimi, idZona], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({
                message: 'Prona u shtua me sukses'
            });
        }
    });
});

app.get('/pronat', (req, res) => {

    const sql = `
        SELECT
            Pronat.*,
            Zonat.Emri AS Zona,
            Zonat.Qyteti
        FROM Pronat
        JOIN Zonat
        ON Pronat.idZona = Zonat.idZona
    `;

    db.query(sql, (err, result) => {

        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }

    });

});


app.get('/admin-stats', (req, res) => {

    const stats = {};

    db.query(
        'SELECT COUNT(*) AS totalPronat FROM Pronat',
        (err, pronaResult) => {

            if (err) {
                return res.status(500).send(err);
            }

            stats.totalPronat = pronaResult[0].totalPronat;

            db.query(
                'SELECT COUNT(*) AS totalPerdorues FROM Perdoruesit',
                (err, userResult) => {

                    if (err) {
                        return res.status(500).send(err);
                    }

                    stats.totalPerdorues = userResult[0].totalPerdorues;

                    db.query(
                        'SELECT COUNT(*) AS totalTransaksione FROM Transaksionet',
                        (err, transResult) => {

                            if (err) {
                                return res.status(500).send(err);
                            }

                            stats.totalTransaksione =
                                transResult[0].totalTransaksione;

                            db.query(
                                'SELECT SUM(Cmimi) AS totalRevenue FROM Pronat',
                                (err, revenueResult) => {

                                    if (err) {
                                        return res.status(500).send(err);
                                    }

                                    stats.totalRevenue =
                                        revenueResult[0].totalRevenue;

                                    res.send(stats);

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});

app.get('/admin-stats', (req, res) => {

    const stats = {};

    db.query(
        'SELECT COUNT(*) AS totalPronat FROM Pronat',
        (err, pronaResult) => {

            if (err) {
                return res.status(500).send(err);
            }

            stats.totalPronat =
                pronaResult[0].totalPronat;

            db.query(
                'SELECT COUNT(*) AS totalPerdorues FROM Perdoruesit',
                (err, userResult) => {

                    if (err) {
                        return res.status(500).send(err);
                    }

                    stats.totalPerdorues =
                        userResult[0].totalPerdorues;

                    db.query(
                        'SELECT COUNT(*) AS totalTransaksione FROM Transaksionet',
                        (err, transResult) => {

                            if (err) {
                                return res.status(500).send(err);
                            }

                            stats.totalTransaksione =
                                transResult[0].totalTransaksione;

                            db.query(
                                'SELECT SUM(Cmimi) AS totalRevenue FROM Pronat',
                                (err, revenueResult) => {

                                    if (err) {
                                        return res.status(500).send(err);
                                    }

                                    stats.totalRevenue =
                                        revenueResult[0].totalRevenue;

                                    res.send(stats);

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});

app.get('/audit-data', (req, res) => {
    const sql = `
        SELECT 
            h.idHistorikCmimi,
            h.Datat,
            h.Cmimet,
            p.Tipi,
            p.Siperfaqja,
            z.Emri AS Zona,
            z.Qyteti
        FROM HistorikCmimi h
        JOIN Pronat p ON h.idPronat = p.idPronat
        JOIN Zonat z ON p.idZona = z.idZona
    `;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/perdoruesit', (req, res) => {
    const sql = `
        SELECT 
            p.idPerdoruesit,
            p.Emer,
            p.Mbiemer,
            p.Email,
            r.EmriRolit
        FROM Perdoruesit p
        JOIN Rolet r ON p.idRolet = r.idRolet
    `;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete('/perdoruesit/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM Perdoruesit WHERE idPerdoruesit = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: 'Perdoruesi u fshi me sukses' });
        }
    });
});

app.post('/signup', (req, res) => {
    const { Emer, Mbiemer, Email, Fjalekalimi, idRolet } = req.body;

    const sql = `
        INSERT INTO Perdoruesit
        (Emer, Mbiemer, Email, Fjalekalimi, Data_e_regjistrimit, idRolet)
        VALUES (?, ?, ?, ?, CURDATE(), ?)
    `;

    db.query(sql, [Emer, Mbiemer, Email, Fjalekalimi, idRolet], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({
                message: 'Perdoruesi u regjistrua me sukses',
                user: {
                    idPerdoruesit: result.insertId,
                    Emer: Emer,
                    Mbiemer: Mbiemer,
                    Email: Email,
                    idRolet: Number(idRolet)
                }
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { Email, Fjalekalimi } = req.body;

    const sql = `
        SELECT * FROM Perdoruesit
        WHERE Email = ? AND Fjalekalimi = ?
    `;

    db.query(sql, [Email, Fjalekalimi], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.send({
                message: 'Login i suksesshem',
                user: result[0]
            });
        } else {
            res.status(401).send({
                message: 'Email ose fjalekalim i gabuar'
            });
        }
    });
});

app.listen(5000, () => {
    console.log('Serveri po punon ne portin 5000');
});