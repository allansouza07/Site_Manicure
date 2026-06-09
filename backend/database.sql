drop database db_massoterapia;

create database db_massoterapia;

use db_massoterapia;

create table if not exists db_clientes (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    telefone varchar(20),
    senha varchar(100) not null
);

create table if not exists db_agendamentos (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    telefone varchar(20),
    servico varchar(100) not null,
    data_agendamento date not null,
    horario time not null,
    unique key horario_unico (data_agendamento, horario)
);