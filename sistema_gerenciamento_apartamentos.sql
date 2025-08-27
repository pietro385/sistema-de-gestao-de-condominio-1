create database sistema_gerenciamento_apartamentos;
use sistema_gerenciamento_apartamentos;

CREATE TABLE blocos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade_apartamentos INT NOT NULL
);

CREATE TABLE apartamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bloco INT NOT NULL,
    numero VARCHAR(10) NOT NULL,
    vagas INT DEFAULT 0,
    area DECIMAL(6,2) NOT NULL,
    FOREIGN KEY (id_bloco) REFERENCES blocos(id)
);

CREATE TABLE manutencoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    custo DECIMAL(10,2) NOT NULL
);


CREATE TABLE moradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    id_apartamento INT NOT NULL,
    FOREIGN KEY (id_apartamento) REFERENCES apartamentos(id)
);

CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_morador INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATE NOT NULL,
    descricao TEXT,
    FOREIGN KEY (id_morador) REFERENCES moradores(id)
);

select*from blocos;
