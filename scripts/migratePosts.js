import { connectMySQL, connectMongoDB } from "../config/db.js";
import Post from "../models/Post.js";
import fs from "fs/promises";

const migrateFromJSON = async (jsonFilePath) => {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    const posts = JSON.parse(data);

    await Post.insertMany(posts);
    console.log(`${posts.length} posts migrated from JSON to MongoDB`);
  } catch (error) {
    console.error("Error migrating from JSON:", error.message);
  }
};

const migrateFromMySQL = async () => {
  const mysqlConnection = await connectMySQL();

  try {
    const [rows] = await mysqlConnection.execute(`
      SELECT p.post_title AS title, p.post_content AS content, 
             GROUP_CONCAT(t.name) AS categories
      FROM wp_posts p
      LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
      LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      LEFT JOIN wp_terms t ON tt.term_id = t.term_id
      WHERE p.post_status = 'publish' AND p.post_type = 'post'
      GROUP BY p.ID;
    `);

    const posts = rows.map((row) => ({
      title: row.title,
      content: row.content,
      categories: row.categories ? row.categories.split(",") : [],
    }));

    await Post.insertMany(posts);
    console.log(`${posts.length} posts migrated from MySQL to MongoDB`);
  } catch (error) {
    console.error("Error migrating from MySQL:", error.message);
  } finally {
    await mysqlConnection.end();
  }
};

// Run Migration
const runMigration = async () => {
  await connectMongoDB();
  await migrateFromMySQL();
};

runMigration();
