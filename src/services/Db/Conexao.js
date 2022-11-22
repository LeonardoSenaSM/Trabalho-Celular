import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('./Filme.db')

export default db
