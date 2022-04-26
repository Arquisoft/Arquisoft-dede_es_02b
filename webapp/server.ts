import express, { Application } from 'express';
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express()
const port: string = process.env.PORT || '3000';


    // Exprees will serve up production assets
    app.use(express.static('build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });


app.listen(port, (): void => {
    console.log('Webapp started on port ' + port);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});