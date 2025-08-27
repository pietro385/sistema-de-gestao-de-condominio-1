
CREATE DATABASE IF NOT EXISTS gestao_condominio
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE gestao_condominio;


CREATE TABLE bloco (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(100) NOT NULL UNIQUE,
  qtd_apartamentos INT NOT NULL
) ENGINE=InnoDB;


CREATE TABLE apartamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bloco_id INT NOT NULL,
  numero VARCHAR(10) NOT NULL,
  qtd_vagas INT DEFAULT 0,
  UNIQUE KEY uq_apartamento (bloco_id, numero),
  FOREIGN KEY (bloco_id) REFERENCES bloco(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE morador (
  cpf CHAR(14) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  apartamento_id INT NOT NULL,
  tipo_responsavel ENUM('Sim','Não') DEFAULT 'Não',
  possui_veiculo ENUM('Sim','Não') DEFAULT 'Não',
  vagas_garagem INT DEFAULT 0,
  FOREIGN KEY (apartamento_id) REFERENCES apartamento(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE referencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mes TINYINT NOT NULL CHECK(mes BETWEEN 1 AND 12),
  ano SMALLINT NOT NULL,
  UNIQUE KEY uq_ref (mes, ano)
) ENGINE=InnoDB;


CREATE TABLE pagamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apartamento_id INT NOT NULL,
  referencia_id INT NOT NULL,
  data_pagamento DATE NOT NULL,
  FOREIGN KEY (apartamento_id) REFERENCES apartamento(id) ON DELETE CASCADE,
  FOREIGN KEY (referencia_id) REFERENCES referencia(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE tipo_manutencao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;


CREATE TABLE manutencao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_id INT NOT NULL,
  data DATE NOT NULL,
  local VARCHAR(150) NOT NULL,
  FOREIGN KEY (tipo_id) REFERENCES tipo_manutencao(id) ON DELETE CASCADE
) ENGINE=InnoDB;


INSERT INTO bloco (descricao, qtd_apartamentos)
VALUES 
  ('Bloco A', 30),
  ('Bloco B', 25);

INSERT INTO apartamento (bloco_id, numero, qtd_vagas)
VALUES
  (1, '101', 2),
  (1, '102', 1),
  (2, '201', 2),
  (2, '202', 1);

INSERT INTO morador (cpf, nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem)
VALUES
  ('001.592.453-01', 'João da Silva', '47 99999-0001', 1, 'Sim', 'Sim', 1),
  ('022.672.123-44', 'Maria Santos', '47 99999-0002', 3, 'Não', 'Não', 0);

INSERT INTO referencia (mes, ano)
VALUES
  (1, 2025), (2, 2025), (3, 2025), (4, 2025);

INSERT INTO pagamento (apartamento_id, referencia_id, data_pagamento)
VALUES
  (1, 1, '2025-01-05'),
  (3, 2, '2025-02-08');

INSERT INTO tipo_manutencao (descricao)
VALUES
  ('Pintura'),
  ('Hidráulica'),
  ('Elétrica');

INSERT INTO manutencao (tipo_id, data, local)
VALUES
  (1, '2025-03-15', 'Hall de Entrada'),
  (2, '2025-04-02', 'Torre B, andar 3');
