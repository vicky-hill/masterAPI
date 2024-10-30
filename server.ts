import express from 'express'
const port = 4000

const app = express();

app.get('/', (req, res) => {
    res.send('typescript');
})

app.listen(port, () => console.log('running '));

export default app;