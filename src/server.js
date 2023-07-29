const express = require("express");
const { tutorRouter } = require('./routes/rotas')

const main = () => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use(tutorRouter);

    app.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });

};

main();