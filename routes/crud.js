var mysql = require('mysql');
const util = require('util');
const auth = require('./auth');

let __DATA__SCHEMA__ = 'techlympic';

let API = {
    search: {
        sekolah: (src, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select * from sekolah where lcase(namasekolah) REGEXP LCASE(?) or lcase(kodsekolah) REGEXP LCASE(?)
                `;
                con.query(sqlstr, [src, src], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log(result);
                        con.end();

                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error search sekolah: ', err);
            }
        },
        peserta: (src, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select a.*, b.namasekolah 
                from
                (select * from peserta where lcase(nama) REGEXP LCASE(?) or lcase(kp) REGEXP LCASE(?)) a
                left join sekolah b using(kodsekolah)
                `;
                con.query(sqlstr, [src, src], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log(result);
                        con.end();

                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error search peserta: ', err);
            }
        },
        kumpulan: (src, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select a.*, b.namasekolah 
                from
                (select * from kumpulan where lcase(nama_kumpulan) REGEXP LCASE(?)) a
                left join sekolah b using(kodsekolah)
                `;
                con.query(sqlstr, [src, src], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log(result);
                        con.end();

                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error search kumpulan: ', err);
            }
        }
    }
}

module.exports = API;