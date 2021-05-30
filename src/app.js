const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);


const port = 3333;
app.listen(port, () => console.log(`server listenning on port ${port}`))