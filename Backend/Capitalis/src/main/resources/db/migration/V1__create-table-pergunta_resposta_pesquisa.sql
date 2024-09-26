create table pesquisa
(

    id            bigint       not null auto_increment,
    id_criador          bigint not null,
    titulo          varchar(100) not null,
    descricao          varchar(100) not null,

    primary key (id)

);
create table pergunta
(

    id_pergunta            bigint       not null auto_increment,
    enunciado          varchar(100) not null,
    tipo_de_resposta          int not null,

    primary key (id_pergunta)

);
create table resposta_geral
(

    id_resposta            bigint       not null auto_increment,
    id_usuario            bigint       not null ,

    primary key (id_resposta)
);