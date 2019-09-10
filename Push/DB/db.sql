create table Sitios
(
    id int identity(1,1) primary key,
    nombre varchar(50)
)

create table Personas
(
    id int primary key identity(1,1),
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    idSitio int not null

    constraint fk_personas_sitio foreign key (idSitio) references sitios(id)
)

create table Push_Token
(
    idPersona int not null,
	id int not null primary key,
    token varchar(max) not null

    constraint fk_Personas_Push_Token foreign key(idPersona) references Personas(id)
)

create table Mensajes
(
    id int identity(1,1) primary key,
    title varchar(100),
    body varchar(200),
    idSitio int not null

    constraint fk_sitios_sitio foreign key (idSitio) references sitios(id)
)

create table Mensajes_Personas
(
    idPersona int not null,
    idMensaje int not null

    constraint pk_Mensajes_Personas primary key (idPersona, idMensaje),
    constraint fk_MensajesPersonas_Mensajes foreign key(idMensaje) references Mensajes (id),
    constraint fk_MensajesPersonas_Personas foreign key (idPersona) references Personas (id)
)
