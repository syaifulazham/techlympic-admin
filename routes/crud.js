var mysql = require('mysql');
const util = require('util');
const auth = require('./auth');

let __DATA__SCHEMA__ = 'techlympic';

let API = {
    util:{
        program: (targetGroup, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select * from program where target_group = ?
                `;
                con.query(sqlstr, [targetGroup], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.end();
                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error executing program: ', err);
            }
        },
        allprogram: (fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select * from program
                `;
                con.query(sqlstr, [targetGroup], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.end();
                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error executing program: ', err);
            }
        },
    },
    stats:{
        penyertaan: (prog_name, target_group, fn) =>{
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                select b.negeri, a.* from 
                (SELECT  kodsekolah, jantina, YEAR(tarikh_lahir) yob, 
                ? pertandingan, ? peringkat, COUNT(*) total FROM peserta 
                WHERE program REGEXP ? 
                GROUP BY kodsekolah, jantina, yob, pertandingan, peringkat) a
                left join sekolah b using(kodsekolah)
                `;
                con.query(sqlstr, [prog_name, target_group, prog_name], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.end();
                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error executing program: ', err);
            }
        }
    },
    repo:{
        tugasan: (negeri, pertandingan, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                sqlstr = `
                SELECT a.groupid, ifnull(b.negeri,'') negeri, ifnull(a.kodsekolah,'') kodsekolah, ifnull(b.namasekolah,'') namasekolah, a.nama_kumpulan, a.program, a.pembimbing,
                ifnull(c.tajuk,'') tajuk, ifnull(c.obj_file,'') obj_file, ifnull(c.updatedate,'') tarikh_serahan
                FROM kumpulan a 
                LEFT JOIN sekolah b USING(kodsekolah)
                LEFT JOIN kumpulan_uploads c USING(groupid)
                WHERE b.negeri = ? and a.program = ?
                order by b.negeri, a.kodsekolah, a.groupid;
                `;
                con.query(sqlstr,[negeri, pertandingan], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.end();
                        fn(result);
                    }
                });
            } catch (err) {
                console.log('Error fetching kumpulan: ', err);
            }
        },
    },
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
        },
    }
}

module.exports = API;