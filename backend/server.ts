import express, { Request, Response, NextFunction } from "express"
import mysql from "mysql"
const app = express()
const port = process.env.PORT || 8080 // Porta na qual o servidor irá escutar

const db1Connection = mysql.createConnection({
  host: "db1", // Nome do serviço do contêiner MySQL
  port: 3306,
  user: "root",
  password: "root",
  database: "database1",
})

db1Connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados db1:", err)
  } else {
    console.log("Conectado ao banco de dados db1")
  }
})

const db2Connection = mysql.createConnection({
  host: "db2", // Nome do serviço do contêiner MySQL
  port: 3306,
  user: "root",
  password: "root",
  database: "database2",
})

db2Connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados db2:", err)
  } else {
    console.log("Conectado ao banco de dados db2")
  }
})

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-headers', '*');
  res.set('access-control-allow-methods', '*');
  next();
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors);

app.get("/db1", (req, res) => {

  db1Connection.query("SELECT * FROM names", (error, results) => {

    try {

      if (error) {
        throw error
      }
      
      res.send({
        results,
      })
      
    }
    catch(e) {
      res.send({
        results: e
      })
    }

  })

 
})

app.get("/db2", (req, res) => {

  db2Connection.query("SELECT * FROM names", (error, results) => {

    try {

      if (error) {
        throw error
      }
      
      res.send({
        results,
      })
      
    }
    catch(e) {
      res.send({
        results: e
      })
    }

  })

 
})

// Rota para adicionar um novo nome ao database1 (db1)
app.post("/db1", (req, res) => {
  const { name } = req.body; // Supondo que o nome seja fornecido no corpo da solicitação

  // Execute uma consulta SQL de inserção
  const sql = "INSERT INTO names (name) VALUES (?)";

  db1Connection.query(sql, [name], (error, results) => {
    try {
      if (error) {
        throw error;
      }

      res.send({
        message: "Nome adicionado com sucesso ao database1",
      });
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
});

// Rota para adicionar um novo nome ao database1 (db1)
app.post("/db2", (req, res) => {
  const { name } = req.body; // Supondo que o nome seja fornecido no corpo da solicitação

  // Execute uma consulta SQL de inserção
  const sql = "INSERT INTO names (name) VALUES (?)";

  db2Connection.query(sql, [name], (error, results) => {
    try {
      if (error) {
        throw error;
      }

      res.send({
        message: "Nome adicionado com sucesso ao database2",
      });
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
});

// Rota para excluir um nome do database1 (db1)
app.delete("/db1/:id", (req, res) => {
  const id = req.params.id; // Suponha que o ID a ser excluído seja passado como parâmetro na URL

  // Execute uma consulta SQL de exclusão
  const sql = "DELETE FROM names WHERE id = ?";

  db1Connection.query(sql, [id], (error, results) => {
    try {
      if (error) {
        throw error;
      }

      if (results.affectedRows === 0) {
        res.send({
          message: "Nenhum registro foi excluído. Verifique o ID.",
        });
      } else {
        res.send({
          message: `Registro com o ID ${id} foi excluído do database1.`,
        });
      }
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
});

// Rota para excluir um nome do database1 (db1)
app.delete("/db2/:id", (req, res) => {
  const id = req.params.id; // Suponha que o ID a ser excluído seja passado como parâmetro na URL

  // Execute uma consulta SQL de exclusão
  const sql = "DELETE FROM names WHERE id = ?";

  db2Connection.query(sql, [id], (error, results) => {
    try {
      if (error) {
        throw error;
      }

      if (results.affectedRows === 0) {
        res.send({
          message: "Nenhum registro foi excluído. Verifique o ID.",
        });
      } else {
        res.send({
          message: `Registro com o ID ${id} foi excluído do database2.`,
        });
      }
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
});




// Inicie o servidor
app.listen(port, () => {
  console.log(`Backend's running on http://localhost:${port}`)
})
