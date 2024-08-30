USE MASTER IF EXISTS(
SELECT * FROM SYS.databases WHERE NAME = 'uniaoVoluntaria')
Drop database uniaoVoluntaria
GO
CREATE DATABASE uniaoVoluntaria
GO
USE uniaoVoluntaria

CREATE TABLE Usuario
(
  id            INT                 IDENTITY,
  nome          VARCHAR(100)        NOT NULL,
  email         VARCHAR(100)UNIQUE  NOT NULL,
  senha         VARCHAR(100)        NOT NULL,
  cpf_cnpj			CHAR(14)UNIQUE      NULL,
  website       VARCHAR(100)            NULL,
  telefone		VARCHAR(20)			NOT NULL,
  dataNasc		DATE				    NULL,
  dataCadastro  DATE                NOT NULL,
  fotoPerfil    VARBINARY(MAX)			NULL,
  nivelAcesso   VARCHAR(20)         NOT NULL, -- VOLUNTARIO, ONG e ADM
  statusUsuario VARCHAR(20)         NOT NULL, --Ativo ou INATIVO
  
  PRIMARY KEY(id)
)

CREATE TABLE Evento
(
 id					INT						IDENTITY,
 nome				VARCHAR(100)			NOT NULL,
 dataEvento			DATE					NOT NULL,
 vagas				INT         			NOT NULL,
 horaInicio         CHAR(5)                 NULL,
 infos				VARCHAR(400)			NOT NULL,
 cep				CHAR(8)					NOT NULL,
 numero				VARCHAR(10)				NULL,
 id_usuario			INT						NOT NULL,
 statusEvento       VARCHAR(20)             NOT NULL,

 PRIMARY KEY(id),
 FOREIGN KEY(id_usuario) REFERENCES Usuario(id)
)

CREATE TABLE Candidatura
(
  id					INT                 IDENTITY,
  dataCadastro			DATE				NOT NULL,
  dataAdmissao			DATE					NULL,
  id_usuario			INT					NOT NULL,
  id_evento				INT					NOT NULL,
  statusCadastro        VARCHAR(100)        NOT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY (id_evento) REFERENCES Evento(id),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
)


CREATE TABLE Habilidade
(
 id				  INT			IDENTITY,
 descricao		  VARCHAR(400)	NOT NULL,
 nome		      VARCHAR(100)	NOT NULL,
 id_usuario       INT			NOT NULL,
 statusHabilidade VARCHAR(100)  NOT NULL, 

 PRIMARY KEY (id),
 FOREIGN KEY(id_usuario) REFERENCES Usuario(id)
)

CREATE TABLE Mensagem
(
	id	            INT			  IDENTITY,
	dataMensagem    SMALLDATETIME NOT NULL,
	emissorMensagem VARCHAR(100)  NOT NULL,
	email 	        VARCHAR(100)  NOT NULL,
	telefone	    VARCHAR(20)       NULL,
	texto 	        VARCHAR(400)  NOT NULL,
	id_usuario      INT				  NULL,
	statusMensagem  VARCHAR(10)   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY(id_usuario) REFERENCES Usuario(id)
)

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Guilherme Barbosa', 'barbosa@email.com.br', 'MTIzNA==', '12345678901', '11930943384','18/04/2006',  'ADM', NULL, GETDATE(), 'ATIVO')

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Fabricio Seabra', 'seabra@email.com.br', 'MTIzNA==', '99988877766', '11912222006','30/10/2006',  'ADM', NULL, GETDATE(), 'ATIVO')

INSERT INTO Usuario(nome, email, senha, cpf_cnpj, website, telefone, dataCadastro, fotoPerfil, nivelAcesso, statusUsuario)
VALUES ('Luta Contra O Cancer E Apoio A Familia', 'alcaf@ong.com', 'MTIzNA==', '18131769000104', 'alcaf.com.br', '1141620521', GETDATE(), NULL, 'ONG','ATIVO')

INSERT INTO Usuario(nome, email, senha, cpf_cnpj, website, telefone, dataCadastro, fotoPerfil, nivelAcesso, statusUsuario)
VALUES ('Fundação Jari', 'vsgagliano@grupoorsa.com.br', 'MTIzNA==', '74502550000145', 'fundacaojari.com.br', '1121757513', GETDATE(), NULL, 'ONG','ATIVO')

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Plinio Silva', 'plinio123@email.com.br', 'MTIzNA==', '12345678901', '11910932256','01/01/2000',  'USER', NULL, GETDATE(), 'ATIVO')

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Renan Silva', 'silvarenan@email.com', 'MTIzNA==', '12345678908', '11910939074','23/10/2005',  'USER', NULL, GETDATE(), 'ATIVO')

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Samuel Rodrigues', 'samuca@email.com', 'MTIzNA==', '12345678109', '11910935643','26/04/2002',  'USER', NULL, GETDATE(), 'ATIVO')

INSERT  INTO Usuario (nome, email, senha, cpf_cnpj, telefone, dataNasc, nivelAcesso, fotoPerfil, dataCadastro, statusUsuario)
VALUES ('Ueverton Silva', 'uevertonexiste@email.com.br', 'MTIzNA==', '12346578990', '11910932274','30/08/2010',  'USER', NULL, GETDATE(), 'ATIVO')



INSERT Mensagem (dataMensagem, emissorMensagem, email, telefone, texto, statusMensagem, id_usuario) 
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@email.com', '(11) 98765-4123', 'Mensagem de teste', 'ATIVO', 1)

INSERT Mensagem (dataMensagem, emissorMensagem, email, telefone, texto, statusMensagem, id_usuario) 
VALUES (GETDATE(), 'Thomaz de Aquino', 'aquino2006@email.com', '(11) 98765-6653', 'Espero que esteja bem! Só queria dizer que estou pensando em você e que aprecio muito nossa amizade. A vida pode ser agitada, mas saber que você está por perto faz tudo parecer mais leve. Vamos marcar um café em breve para atualizar as novidades? Fique bem e até logo!
Com carinho,', 'ATIVO', 1)



INSERT INTO Evento(nome, dataEvento, vagas, horaInicio, infos, cep, numero, statusEvento, id_usuario)
VALUES ('coleta', '2024-07-30','100','09:47','Compareça a este local para ajuda na coleta de lixo',04357218,1000,'ATIVO',3)

INSERT INTO Evento(nome, dataEvento, vagas, horaInicio, infos, cep, numero, statusEvento, id_usuario)
VALUES ('doação', '2024-10-12','100','14:00','Trabalho voluntário de doação de roupa para crianças carentes',03249168,3392,'ATIVO',4)



INSERT INTO Candidatura(dataCadastro,dataAdmissao, id_usuario, id_evento, statusCadastro)
VALUES (GETDATE(), '', 6, 2, 'PENDENTE')

INSERT INTO Candidatura(dataCadastro,dataAdmissao, id_usuario, id_evento, statusCadastro)
VALUES (GETDATE(), '', 5, 1, 'PENDENTE')



INSERT INTO Habilidade(descricao, nome, statusHabilidade, id_usuario)
VALUES ('teste de software', 'Teste', 'ATIVO', 3)

INSERT INTO Habilidade(descricao, nome, statusHabilidade, id_usuario)
VALUES ('Sou formado em ciencia de dados pela USP', 'Computação', 'ATIVO', 7)

SELECT * FROM  Usuario
SELECT * FROM  Mensagem
SELECT * FROM  Evento
SELECT * FROM  Habilidade
SELECT * FROM  Candidatura


UPDATE Usuario
SET email = 'fulaninho@email.com'
WHERE id = 11

DELETE FROM Usuario WHERE id = 2