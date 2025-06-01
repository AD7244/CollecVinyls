import * as SQLite from "expo-sqlite";
import { NewVinyl, Vinyl } from "../type/Vinyl";

// Ouvre la base de données de manière asynchrone
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("vinyls.db");
  return db;
};

// Fonction pour initialiser la base de données
export const initDB = async () => {
  try {
    const db = await openDatabase();
    //PRAGMA : Cette commande est utilisée pour activer le mode WAL (Write-Ahead Logging), qui améliore les performances des transactions dans SQLite.
    await db.execAsync(`
      PRAGMA journal_mode = WAL;	
      CREATE TABLE IF NOT EXISTS vinyls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artist TEXT NOT NULL,
        title TEXT NOT NULL,
        releaseYear INTEGER,
        addedDate TEXT NOT NULL,
        coverPath TEXT,
        status TEXT CHECK(status IN ('wish', 'got')) NOT NULL
      );
      
    `);
    // DELETE FROM vinyls;
    console.log("✅ Base de données initialisée avec succès.");
  } catch (error) {
    console.log(
      "❌ Erreur lors de l'initialisation de la base de données : ",
      error
    );
  }
};

export const getVinyls = async () => {
  try {
    const db = await openDatabase();
    const allVinyls = await db.getAllAsync<Vinyl>("SELECT * FROM vinyls");

    return allVinyls;
  } catch (error) {
    console.log("❌ Erreur dans la fonction getVinyls ", error);
  }
};

export const getWishedVinyls = async () => {
  try {
    const db = await openDatabase();
    const wishedVinyls = await db.getAllAsync<Vinyl>(
      "SELECT * FROM vinyls WHERE status = 'wish'"
    );

    return wishedVinyls;
  } catch (error) {
    console.log("❌ Erreur dans la fonction getVinyls ", error);
  }
};

export const getCollectedVinyls = async () => {
  try {
    const db = await openDatabase();
    const collectedVinyls = await db.getAllAsync<Vinyl>(
      "SELECT * FROM vinyls WHERE status = 'got'"
    );

    return collectedVinyls;
  } catch (error) {
    console.log("❌ Erreur dans la fonction getVinyls ", error);
  }
};

export const addVinyl = async (vinyl: NewVinyl) => {
  try {
    const db = await openDatabase();
    await db.runAsync(
      "INSERT INTO vinyls (artist, title, releaseYear, addedDate, coverPath, status) VALUES (?, ?, ?, ?, ?, ?)",

      vinyl.artist,
      vinyl.title,
      vinyl.releaseYear ? vinyl.releaseYear : "",
      vinyl.addedDate,
      vinyl.coverPath ? vinyl.coverPath : "",
      vinyl.status
    );
  } catch (error) {
    console.log("❌ Erreur dans la fonction addVinyl ", error);
  }
};

export const updateVinyl = async (vinyl: Vinyl) => {
  try {
    const db = await openDatabase();
    await db.runAsync(
      `UPDATE vinyls SET artist = ?, title = ?, releaseYear = ?, addedDate = ?, coverPath = ?, status = ? WHERE id = ?`,
      vinyl.artist,
      vinyl.title,
      vinyl.releaseYear ? vinyl.releaseYear : "",
      vinyl.addedDate,
      vinyl.coverPath ? vinyl.coverPath : "",
      vinyl.status,
      vinyl.id
    );
  } catch (error) {
    console.log("❌ Erreur dans la fonction updateVinyl ", error);
  }
};

export const deleteVinyl = async (vinyl: Vinyl) => {
  try {
    const db = await openDatabase();
    await db.runAsync(`DELETE FROM vinyls WHERE id = ${vinyl.id}`);
  } catch (error) {
    console.log("❌ Erreur dans la fonction deleteVinyl ", error);
  }
};

export default openDatabase;
