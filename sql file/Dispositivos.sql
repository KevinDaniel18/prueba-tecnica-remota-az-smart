-- Crear base de datos si aun no existe
CREATE DATABASE GPS_DB;
GO

USE GPS_DB;
GO

-- Crear tabla de Dispositivos
CREATE TABLE Dispositivos (
    id INT PRIMARY KEY,
    nombre NVARCHAR(100),
    estado NVARCHAR(50) -- 'activo' o 'inactivo'
);
GO

-- Insertar datos
INSERT INTO Dispositivos (id, nombre, estado) VALUES
(1, 'GPS Tracker 1', 'activo'),
(2, 'GPS Tracker 2', 'inactivo'),
(3, 'GPS Tracker 3', 'activo');
GO

-- Consultar dispostivos activos
SELECT * FROM Dispositivos
WHERE estado = 'activo'
ORDER BY nombre;
GO

-- Procedimiento para actualizar estado
CREATE PROCEDURE ActualizarEstadoDispositivo
    @Id INT,
    @NuevoEstado NVARCHAR(50)
AS
BEGIN
    UPDATE Dispositivos
    SET estado = @NuevoEstado
    WHERE id = @Id;
END;
GO

-- Actualizar el dispostivo inactivo a activo
EXEC ActualizarEstadoDispositivo @Id = 2, @NuevoEstado = 'activo';
GO

-- Ver los cambios
SELECT * FROM Dispositivos;
GO

/*
Como hacer un backup y restauracion parcial

Backup:

BACKUP DATABASE Nombre_de_la_db
TO DISK = 'C:\Backups\Nombre_de_la_db.bak';

Restauracion parcial:

-Exportar la tabla Dispostivos a un archivo .csv
-Crear una tabla vacia en otra base
-Importar los datos con BULK INSERT
*/