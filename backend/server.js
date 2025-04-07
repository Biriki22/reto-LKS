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
  user: 'root',
  password: 'reto123',
  database: 'ver_historial',
  waitForConnections: true,
  connectionLimit: 10,  // Limita el número de conexiones activas
  queueLimit: 0
});

// Test de conexión con pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
  } else {
    console.log('✅ Conexión a la base de datos exitosa');
    connection.release(); // Liberar la conexión de prueba
  }
});

// 🔹 Endpoint de prueba para ver si Express está activo
app.get('/api/test', (req, res) => {
  console.log('📥 Petición recibida en /api/test');
  res.json({ message: 'El servidor está funcionando correctamente' });
});

// 🔹 Obtener todas las conversaciones
app.get('/api/conversations', (req, res) => {
  console.log('📥 Petición GET en /api/conversations');

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener la conexión:', err.message);
      return res.status(500).json({ message: 'Error al obtener la conexión a la base de datos', error: err.message });
    }

    connection.query('SELECT * FROM conversations', (err, results) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('❌ Error al obtener conversaciones:', err.message);
        return res.status(500).json({ message: 'Error al obtener las conversaciones', error: err.message });
      }

      console.log('✅ Conversaciones obtenidas:', results.length);
      res.json(results);
    });
  });
});

// 🔹 Insertar una nueva conversación
app.post('/api/conversations', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  const query = 'INSERT INTO conversations (titulo) VALUES (?)';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener la conexión:', err.message);
      return res.status(500).json({ message: 'Error al obtener la conexión a la base de datos', error: err.message });
    }

    connection.query(query, [titulo], (err, result) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('❌ Error al insertar la conversación:', err.message);
        return res.status(500).json({ message: 'Error al agregar la conversación', error: err.message });
      }

      console.log('✅ Conversación insertada con ID:', result.insertId);
      res.status(201).json({ id: result.insertId, titulo });
    });
  });
});

// 🔹 Eliminar una conversación por ID
app.delete('/api/conversations/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const query = 'DELETE FROM conversations WHERE id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener la conexión:', err.message);
      return res.status(500).json({ message: 'Error al obtener la conexión a la base de datos', error: err.message });
    }

    connection.query(query, [id], (err, result) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('❌ Error al eliminar conversación:', err.message);
        return res.status(500).json({ message: 'Error al eliminar la conversación', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Conversación no encontrada' });
      }

      console.log(`✅ Conversación con ID ${id} eliminada`);
      res.status(204).send();
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
});
