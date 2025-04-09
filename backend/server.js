const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Permite leer JSON en el body

// Crear una conexión con pool para mejor rendimiento
const pool = mysql.createPool({
  host: 'localhost',
  user: 'Markel',
  password: 'Markel123',
  database: 'ver_historial',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de conexión con pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
  } else {
    console.log('✅ Conexión a la base de datos exitosa');
    connection.release();
  }
});

// 🔹 Endpoint de prueba
app.get('/api/test', (req, res) => {
  console.log('📥 Petición recibida en /api/test');
  res.json({ message: 'El servidor está funcionando correctamente' });
});

// 🔹 Obtener todas las conversaciones
app.get('/api/conversations', (req, res) => {
  pool.query('SELECT * FROM conversations', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener conversaciones:', err.message);
      return res.status(500).json({ message: 'Error al obtener las conversaciones', error: err.message });
    }
    res.json(results);
  });
});

// 🔹 Insertar una nueva conversación
app.post('/api/conversations', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  const query = 'INSERT INTO conversations (titulo) VALUES (?)';

  pool.query(query, [titulo], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar la conversación:', err.message);
      return res.status(500).json({ message: 'Error al agregar la conversación', error: err.message });
    }
    res.status(201).json({ id: result.insertId, titulo });
  });
});

// 🔹 Eliminar una conversación
app.delete('/api/conversations/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const query = 'DELETE FROM conversations WHERE id = ?';

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar conversación:', err.message);
      return res.status(500).json({ message: 'Error al eliminar la conversación', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Conversación no encontrada' });
    }

    res.status(204).send();
  });
});

// 🔹 Insertar un mensaje en una conversación
app.post('/api/conversations/:id/messages', (req, res) => {
  const { id } = req.params;
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ message: 'Sender y content son obligatorios' });
  }

  const query = 'INSERT INTO messages (conversation_id, sender, content) VALUES (?, ?, ?)';

  pool.query(query, [id, sender, content], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar mensaje:', err.message);
      return res.status(500).json({ message: 'Error al agregar el mensaje', error: err.message });
    }

    res.status(201).json({ id: result.insertId, sender, content });
  });
});

// 🔹 Obtener todos los mensajes de una conversación
app.get('/api/conversations/:id/messages', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM messages WHERE conversation_id = ? ORDER BY fecha ASC';

  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener mensajes:', err.message);
      return res.status(500).json({ message: 'Error al obtener los mensajes', error: err.message });
    }

    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
});
