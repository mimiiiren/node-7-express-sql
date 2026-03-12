// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
// importing our Node modules
import express from "express"; // the framework that lets us build a web server
import pg from "pg" // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js" // importing our database connection string

// connect to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: config.databaseUrl, // this contains credentials to access the database. Keep this private!!! 
  ssl: true // use SSL encryption when connecting to the database
})

const app = express(); // creating an instance of the express module

app.use(express.json()); // This server will receive and respond in JSON format

const port = 3000; // Setting which port to listen to to receive requests

//defining our port, then turning on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// ---------------------------------
// Helper Functions
// ---------------------------------
// get data from database
 
// 1. getAllAnimals()
async function getAllAnimals() {
    // db is database, query the sql code in string
    const result = await db.query("SELECT * FROM animals;");
    // result is an object with rows as property
    // row is an array of objects!
    return result.rows;
}
// 2. getOneAnimalByName(name)
async function getOneAnimalByName(name) {
    // db.query takes 2 parameters:
    // 1. string that holds SQL command
    // 2. array that holds values for the placeholders (starting at $1, $2)
    // $1 is first item in name array, $2 is 2nd item in name array. no zero index
    const result = await db.query("SELECT * FROM animals WHERE name = $1", [name,
    ]);
        // return only first item in array
    return result.rows[0];
};
// 3. getOneAnimalById(id)
async function getOneAnimalById(id) {
    const result = await db.query("SELECT * FROM animals WHERE id = $1", [id]);
    return result.rows[0];
}
// 4. getNewestAnimal()
async function getNewestAnimal() {
    const result = await db.query("SELECT * FROM animals ORDER BY id LIMIT 1")
    return result.rows[0];
}
// 5. 🌟 BONUS CHALLENGE — getAllMammals()
async function getAllMammals() {
    const result = await db.query("SELECT * FROM animals WHERE category = $1", ['mammal']);
    return result.rows;
}

// 6. 🌟 BONUS CHALLENGE — getAnimalsByCategory(category)
async function getAnimalsByCategory(category) {
    const result = await db.query("SELECT * FROM animals WHERE category = $1", [category]);
    return result.rows;
}

// 7. deleteOneAnimal(id)
async function deleteOneAnimal(id) {
    const result = await db.query("DELETE FROM animals WHERE id = $1", [id]);
    return result.rows[0];
}
// 8. addOneAnimal(name, category, can_fly, lives_in)
async function addOneAnimal(name, category, can_fly, lives_in) {
    // wait for database query to resolve
    await db.query("INSERT INTO animals (name, category, can_fly, lives_in) VALUES ($1, $2, $3, $4)",
        [name, category, can_fly, lives_in],
    );
}
// 9. updateOneAnimalName(id, newName)
async function updateOneAnimalName(id, newName) {
    await db.query("UPDATE animals SET name = $1 WHERE id = $2",
        [newName, id],
    );
}
// 10. updateOneAnimalCategory(id, newCategory)
async function updateOneAnimalCategory(id, newCategory) {
    await db.query("UPDATE animals SET category = $1 WHERE id = $2",
        [newCategory, id],
    );
}

// 11. 🌟 BONUS CHALLENGE — addManyAnimals(animals)
async function addManyAnimals(animals) {
    // loop through each animal object of animals array
    for (const animal of animals) {
        // extract each column from single animal object in animals array
        const { name, category, can_fly, lives_in } = animal;
        // pg library sends this SQL to PostgreSQL
        await db.query("INSERT INTO animals (name, category, can_fly, lives_in) VALUES ($1, $2, $3, $4)",
        [name, category, can_fly, lives_in],);
    }
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-animals
app.get("/get-all-animals", async (req, res) => {
    const animals = await getAllAnimals();
    res.json(animals);
});
// 2. GET /get-one-animal-by-name/:name
app.get("/get-one-animal-by-name/:name", async (req, res) => {
    const name = req.params.name;
    const animal = await getOneAnimalByName(name);
    res.json(animal);
})
// 3. GET /get-one-animal-by-id/:id
app.get("/get-one-animal-by-id/:id", async (req, res) => {
    const id = req.params.id;
    const animal = await getOneAnimalById(id);
    res.json(animal);
})
// 4. GET /get-newest-animal
app.get("/get-newest-animal", async (req, res) => {
    const animal = await getNewestAnimal();
    res.json(animal);
})
// 5. 🌟 BONUS CHALLENGE — GET /get-all-mammals
app.get("/get-all-mammals", async (req, res) => {
    const animal = await getAllMammals();
    res.json(animal);
})

// 6. 🌟 BONUS CHALLENGE — GET /get-animals-by-category/:category
app.get("/get-animals-by-category/:category", async (req, res) => {
    const category = req.params.category;
    const animal = await getAnimalsByCategory(category);
    res.json(animal);
}) 

// 7. POST /delete-one-animal/:id
app.post("/delete-one-animal/:id", async (req, res) => {
const id = req.params.id;
// grab only selected index animal object and store as js object
const animal = await getOneAnimalById(id);
// delete selected index animal object
await deleteOneAnimal(id);
res.send(`Success! ${animal.name} was deleted!`)
}) 
// 8. POST /add-one-animal
app.post("/add-one-animal", async (req, res) => {
    // all rows in database being sent to server as request body
    const { name, category, can_fly, lives_in } = req.body;
    await addOneAnimal(name, category, can_fly, lives_in);
    // tell user post request was succesful
    res.send(`Success! ${req.body.name} was added!`)
})
// 9. POST /update-one-animal-name
app.post("/update-one-animal-name", async (req, res) => {
    const { id, newName } = req.body;
    await updateOneAnimalName(id, newName);
    res.send("Success, the animal's name was changed!");
})
// 10. POST /update-one-animal-category
app.post("/update-one-animal-category", async (req, res) => {
    const { id, newCategory } = req.body;
    await updateOneAnimalCategory(id, newCategory);
    res.send("Success, animal category was changed!")
})
// 11. 🌟 BONUS CHALLENGE — POST /add-many-animals
app.post("/add-many-animals", async (req, res) => {
    // extract animals array from request body
    const { animals } = req.body;
    // pass array to helper function
    await addManyAnimals(animals);
    res.send("Success! The animals were added!")
})