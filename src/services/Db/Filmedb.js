import db from "./Conexao.js";


db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE filmes ( id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, nomeDoFilme VARCHAR (100), ano VARCHAR (64), createdAt DATETIME DEFAULT (CURRENT_TIMESTAMP) );"
  );
});

export const create = async (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log("Objeto dentro do create",obj)
          db.transaction(async (tx) => {
            tx.executeSql(
              "INSERT INTO filmes (nomeDoFilme, ano) values (?, ?);",
              [obj.nomeDoFilme,obj.ano],

              (_, { rowsAffected, insertId }) => {
                console.log("Rows Affected",rowsAffected, " e ID inserido: ", insertId)
                if (rowsAffected > 0) resolve(insertId);
                else reject("Error inserting obj: " + JSON.stringify(obj));
              },
              (_, error) => {
                console.log(error)
                reject(error)}
            );
          })
    });

  };

  export const allFilmes = () => {
    const usersList = []
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM filmes;",
          [],

          (_, { rows }) => {
            for (let i = 0; i < rows._array.length; i++) {
              console.log("filme dentro do array:",rows._array[i])
              usersList.push({id: rows._array[i].id, nomeDoFilme: rows._array[i].nomeDoFilme, ano: rows._array[i].ano })
            }

            resolve(usersList)
          },
          (_, error) => reject(error)
        );
      });
    });
  };

  export const limpaListaDeFilmes=()=>{

return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM filmes;",
          [],
          (_, { rowsAffected }) => {
            console.log("remove result",rowsAffected)

            if (rowsAffected>0) resolve(rowsAffected);
            reject("usuario removido")
          },
          (_, error) => reject(error)
        );
      });
    });  }
