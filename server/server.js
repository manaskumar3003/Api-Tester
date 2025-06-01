
const express= require('express');
const apiroutes = require('./routes/apiroutes');

const app = express();
const port = 5000;

// Middleware to parse JSON and URL-encoded data
const cors = require('cors');
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api',apiroutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
