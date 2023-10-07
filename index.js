var express = require("express");
var app = express();
var pool = require('./query');

// Menampilkan data seluruh list film
app.get('/film',(req, res) => {
    pool.query('SELECT * FROM film', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows)
    })
})

// Menampilkan data film sesuai ID tertentu
app.get("/film/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const film = await pool.query("SELECT * FROM film WHERE film_id = $1", [id]);
        res.json(film.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// Menampilkan data list category
app.get('/category', async(req, res) => {
    pool.query('SELECT * FROM category', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows)
    })
})

// Menampilkan data film sesuai kategori tertentu
app.get('/categoryfilm', async (req, res) => {
    pool.query('SELECT film_id, title, name FROM film INNER JOIN category ON film.film_id = category.category_id', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows)
    })
})


app.get('/actor', (req, res) => {
    pool.query('SELECT * FROM actor', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows)
    })
})






// Menjalankan app pada port 3000
app.listen(3000)