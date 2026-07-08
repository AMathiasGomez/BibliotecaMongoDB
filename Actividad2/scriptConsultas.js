
var conexion = new Mongo("mongodb+srv://gomezmathiasxd_db_user:2vIrpVr4eqewfTes@cluster0.nakpjjq.mongodb.net/");
var db = conexion.getDB("Base de Datos");

print("Conexion Exitosa");
print("Se está ejecutando un script");

// POBLAMIENTO DE LA BASE DE DATOS

print("== Poblando la base de datos ==");

db.autores.insertMany([
  {
    _id: "autor_001",
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombiana",
    fecha_nacimiento: 1927,
    generos: ["Realismo mágico", "Novela"],
  },
  {
    _id: "autor_002",
    nombre: "Isabel Allende",
    nacionalidad: "Chilena",
    fecha_nacimiento: 1942,
    generos: ["Realismo mágico", "Ficción histórica"],
  },
  {
    _id: "autor_003",
    nombre: "George Orwell",
    nacionalidad: "Británica",
    fecha_nacimiento: 1903,
    generos: ["Distopía", "Ensayo político"],
  },
]);

db.libros.insertMany([
  {
    _id: "libro_001",
    titulo: "Cien años de soledad",
    autor_id: "autor_001",
    "año_publicado": 1967,
    copies_total: 4,
    copias_disponibles: 2,
    generos: "Realismo mágico",
  },
  {
    _id: "libro_002",
    titulo: "El amor en los tiempos del cólera",
    autor_id: "autor_001",
    "año_publicado": 1985,
    copies_total: 3,
    copias_disponibles: 3,
    generos: "Novela",
  },
  {
    _id: "libro_003",
    titulo: "La casa de los espíritus",
    autor_id: "autor_002",
    "año_publicado": 1982,
    copies_total: 2,
    copias_disponibles: 1,
    generos: "Ficción histórica",
  },
  {
    _id: "libro_004",
    titulo: "1984",
    autor_id: "autor_003",
    "año_publicado": 1949,
    copies_total: 5,
    copias_disponibles: 4,
    generos: "Distopía",
  },
]);

db.usuarios.insertMany([
  {
    _id: "usuario_001",
    usuario_id: "M-1001",
    nombre: "Alan Ramirez",
    email: "alan.ramirez@correo.com",
    password: "hash_simulado_123",
    rol: "miembro",
    perfil: {
      telefono: "3001234567",
      direccion: "Calle 10 #5-20, Bogotá",
    },
    historial_contacto: [],
  },
  {
    _id: "usuario_002",
    usuario_id: "M-1002",
    nombre: "Camila Torres",
    email: "camila.torres@correo.com",
    password: "hash_simulado_456",
    rol: "miembro",
    perfil: {
      telefono: "3009876543",
      direccion: "Cra 45 #12-34, Medellín",
    },
    historial_contacto: [],
  },
  {
    _id: "usuario_003",
    usuario_id: "M-1003",
    nombre: "Juan Pérez",
    email: "juan.perez@correo.com",
    password: "hash_simulado_789",
    rol: "miembro",
    perfil: {
      telefono: "3005551234",
      direccion: "Av. Siempre Viva 742, Cali",
    },
    historial_contacto: [],
  },
]);

db.prestamos.insertMany([
  {
    _id: "prestamo_001",
    libro_id: "libro_001",
    usuario_id: "usuario_001",
    prestamo_fecha: "2026-06-01",
    fecha_limite: "2026-06-15",
    devolucion_fecha: null,
    estado: "activo",
  },
  {
    _id: "prestamo_002",
    libro_id: "libro_003",
    usuario_id: "usuario_002",
    prestamo_fecha: "2026-05-20",
    fecha_limite: "2026-06-03",
    devolucion_fecha: "2026-06-01",
    estado: "devuelto",
  },
  {
    _id: "prestamo_003",
    libro_id: "libro_004",
    usuario_id: "usuario_003",
    prestamo_fecha: "2026-06-10",
    fecha_limite: "2026-06-24",
    devolucion_fecha: null,
    estado: "activo",
  },
]);

print("------");

// 1) FIND básico: traer todos los libros
print("== find: todos los libros ==");

db.libros.find({}).forEach(printjson);
print("------");

// 2) FIND con $gt: libros publicados DESPUÉS de 1960
print("== find con $gt: libros publicados después de 1960 ==");

db.libros.find({ "año_publicado": { $gt: 1960 } }).forEach(printjson);
print("------");

// 3) FIND con $lt: libros con copias disponibles MENORES a 10
print("== find con $lt: libros con menos de 10 copias disponibles ==");

db.libros.find({ copias_disponibles: { $lt: 10 } }).forEach(printjson);
print("------");

// 4) FIND con $in: libros cuyo género esté en una lista dada
print("== find con $in: libros de género Novela o Distopía ==");

db.libros.find({ generos: { $in: ["Novela", "Distopía"] } }).forEach(printjson);
print("------");

// 5) UPDATE con $set: actualizar el perfil de un usuario
print("== update con $set: actualizar perfil de usuario ==");

db.usuarios.updateOne({ email: "alan.ramirez@correo.com" },{$set: {"perfil.telefono": "3100000000","perfil.direccion": "Calle 100 #20-30, Bogotá",},});
db.usuarios.find({ email: "alan.ramirez@correo.com" }).forEach(printjson);
print("------");

// 6) UPDATE con $push: agregar un elemento a un arreglo embebido
print("== update con $push: agregar historial de contacto ==");

db.usuarios.updateOne({ email: "alan.ramirez@correo.com" },{$push: {historial_contacto: {tipo: "actualizacion_perfil",fecha: new Date(),nota: "Actualización de teléfono y dirección",},},});
db.usuarios.find({ email: "alan.ramirez@correo.com" }).forEach(printjson);
print("------");

// 7) UPDATE con $pull: eliminar un elemento de un arreglo embebido
print("== update con $pull: quitar historial de tipo actualizacion_perfil ==");

db.usuarios.updateOne({ email: "alan.ramirez@correo.com" },{ $pull: { historial_contacto: { tipo: "actualizacion_perfil" } } });
db.usuarios.find({ email: "alan.ramirez@correo.com" }).forEach(printjson);
print("------");

// 8) UPDATE básico: marcar un préstamo como devuelto
print("== update básico: marcar préstamo como devuelto ==");

db.prestamos.updateOne({ _id: "prestamo_003" },{ $set: { estado: "devuelto", devolucion_fecha: "2026-06-20" } });
db.prestamos.find({ _id: "prestamo_003" }).forEach(printjson);
print("------");

// 9) DELETE: eliminar un préstamo ya devuelto
print("== delete: eliminar un préstamo devuelto ==");
db.prestamos.deleteOne({ _id: "prestamo_002" });
print("Préstamos restantes:");
db.prestamos.find({}).forEach(printjson);
print("------");

// 10) FIND (login): buscar usuario por email
print("== find (login): buscar usuario por email ==");
var loginEmail = "camila.torres@correo.com";
var usuarioLogueado = db.usuarios.findOne({ email: loginEmail });
if (!usuarioLogueado) {
  print("Login fallido: no existe un usuario con el email " + loginEmail);
} else {
  printjson(usuarioLogueado);
}
print("------");