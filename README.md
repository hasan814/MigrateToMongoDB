# Data Migration Script

This project is a **data migration script** designed to transfer WordPress post data (title, content, and categories) from a **MySQL database** or a **JSON file** to a **MongoDB database**. The script ensures that the data is properly structured according to a specified schema.

---

## Features

- Migrate WordPress post data (title, content, and categories) from MySQL or JSON to MongoDB.
- MongoDB schema enforcement for structured storage.
- Includes error handling and logging for robust operations.
- Easy to configure using environment variables.

---

## Technologies Used

- **Node.js**: Runtime environment for the script.
- **MySQL**: Source database for WordPress data.
- **MongoDB**: Target database for storing the migrated data.
- **Mongoose**: ODM for MongoDB.
- **mysql2**: MySQL database connection and querying.
- **dotenv**: Manage environment variables.
- **fs**: Handle JSON file operations.

---

## Folder Structure

```
data-migration/
├── config/
│   ├── db.js          # Database connection configurations
├── models/
│   ├── Post.js        # MongoDB schema for posts
├── scripts/
│   ├── migratePosts.js # Main script for migrating data
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Node.js dependencies
└── README.md          # Project documentation
```

---

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed.
- Access to a **MySQL database** with WordPress data or a JSON file containing the posts.
- Access to a **MongoDB database** (local or cloud, e.g., MongoDB Atlas).

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/data-migration.git
cd data-migration
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=wordpress_db

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/wordpress_migration
```

#### 4. Run the Script

- To migrate from **MySQL**:
  ```bash
  npm start
  ```

- To migrate from **JSON** (uncomment the relevant section in the `migratePosts.js` script):
  ```bash
  npm start
  ```

---

## Usage

### MySQL to MongoDB Migration
- The script connects to a MySQL database, queries WordPress posts and their categories, and transforms them into the MongoDB schema.

### JSON to MongoDB Migration
- The script reads posts from a JSON file, validates the data, and inserts them into MongoDB.

---

## MongoDB Schema

The data is stored in MongoDB using the following schema:

```javascript
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  categories: [{ type: String }], // Array of categories
  createdAt: { type: Date, default: Date.now },
});
```

---

## Example Output

- **MySQL Migration**:
  ```
  Connected to MySQL
  Connected to MongoDB
  100 posts migrated from MySQL to MongoDB
  ```

- **JSON Migration**:
  ```
  Connected to MongoDB
  100 posts migrated from JSON to MongoDB
  ```

---

## Dependencies

- **mysql2**: For MySQL database connectivity.
- **mongoose**: ODM for MongoDB.
- **dotenv**: Manage environment variables.
- **fs**: For file system operations.

Install dependencies using:
```bash
npm install mysql2 mongoose dotenv fs
```

---

## Future Enhancements

- Add support for other databases like PostgreSQL.
- Implement logging using a dedicated library like `winston`.
- Add unit tests for the migration script.
- Enhance the schema validation for MongoDB.

---

## License

This project is licensed under the MIT License.

