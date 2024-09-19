import { Router } from 'express';

const router = Router();

// Array para almacenar los usuarios
let usuarios = [];

// --------LISTADO--------------------------------------------//
router.get('/list', async (req, res) => {
    try {
        res.render('usuarios/list', { usuarios });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --------AÑADIR--------------------------------------------//
router.get('/add', (req, res) => {
    res.render('usuarios/add');
});

router.post('/add', (req, res) => {
    try {
        const { Nombre, Apellido, DNI, Correo, Telefono, Rol } = req.body;
        const nuevoUsuario = {
            id_usuario: usuarios.length + 1, // Generar un ID incremental
            Nombre,
            Apellido,
            DNI,
            Correo,
            Telefono,
            Rol
        };
        usuarios.push(nuevoUsuario); // Añadir el nuevo usuario al array
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --------ACTUALIZAR--------------------------------------------//
router.get('/edit/:id', (req, res) => {
    try {
        const usuario = usuarios.find(u => u.id_usuario == req.params.id);
        res.render('usuarios/edit', { usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', (req, res) => {
    try {
        const { Nombre, Apellido, DNI, Correo, Telefono, Rol } = req.body;
        const usuario = usuarios.find(u => u.id_usuario == req.params.id);
        if (usuario) {
            usuario.Nombre = Nombre;
            usuario.Apellido = Apellido;
            usuario.DNI = DNI;
            usuario.Correo = Correo;
            usuario.Telefono = Telefono;
            usuario.Rol = Rol;
        }
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --------ELIMINAR--------------------------------------------//
router.get('/delete/:id', (req, res) => {
    try {
        usuarios = usuarios.filter(u => u.id_usuario != req.params.id);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
