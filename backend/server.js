const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_massoterapia"
});

db.connect((erro) => {

    if (erro) {

        console.log("erro ao conectar no banco");
        console.log(erro);

    } else {

        console.log("banco conectado com sucesso");

    }

});

/* ===========================
   cadastro
=========================== */

app.post("/cadastro", (req, res) => {

    const {
        nome,
        email,
        telefone,
        senha
    } = req.body;

    const sql = `
        insert into db_clientes
        (nome,email,telefone,senha)
        values (?,?,?,?)
    `;

    db.query(
        sql,
        [nome, email, telefone, senha],
        (erro) => {

            if (erro) {

                return res.json({
                    sucesso: false,
                    mensagem: "erro ao cadastrar"
                });

            }

            res.json({
                sucesso: true,
                mensagem: "cadastro realizado"
            });

        }
    );

});

/* ===========================
   login
=========================== */

app.post("/login", (req, res) => {

    const {
        email,
        senha
    } = req.body;

    const sql = `
        select *
        from db_clientes
        where email = ?
        and senha = ?
    `;

    db.query(
        sql,
        [email, senha],
        (erro, resultado) => {

            if (erro) {

                return res.json({
                    sucesso: false
                });

            }

            if (resultado.length > 0) {

                res.json({
                    sucesso: true,
                    usuario: resultado[0]
                });

            } else {

                res.json({
                    sucesso: false,
                    mensagem: "login invalido"
                });

            }

        }
    );

});

/* ===========================
   agendar
=========================== */

app.post("/agendar", (req, res) => {

    const {
        nome,
        email,
        telefone,
        servico,
        data_agendamento,
        horario
    } = req.body;

    const sql = `
        insert into db_agendamentos
        (
            nome,
            email,
            telefone,
            servico,
            data_agendamento,
            horario
        )
        values (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            nome,
            email,
            telefone,
            servico,
            data_agendamento,
            horario
        ],
        (erro) => {

            if (erro) {

                return res.json({
                    sucesso: false,
                    mensagem: "horario ocupado"
                });

            }

            res.json({
                sucesso: true,
                mensagem: "agendamento realizado"
            });

        }
    );

});

/* ===========================
   horarios ocupados
=========================== */

app.get("/horarios/:data", (req, res) => {

    const data = req.params.data;

    const sql = `
        select horario
        from db_agendamentos
        where data_agendamento = ?
    `;

    db.query(
        sql,
        [data],
        (erro, resultado) => {

            if (erro) {

                return res.json([]);

            }

            res.json(resultado);

        }
    );

});

/* ===========================
   listar agendamentos
=========================== */

app.get("/agendamentos", (req, res) => {

    const sql = `
        select *
        from db_agendamentos
        order by data_agendamento, horario
    `;

    db.query(sql, (erro, resultado) => {

        if (erro) {

            return res.json([]);

        }

        res.json(resultado);

    });

});

app.listen(3000, () => {

    console.log("servidor rodando");
    console.log("http://localhost:3000");

});