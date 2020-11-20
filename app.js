export default (express, bodyParser, fs, CORS, User) => {
    const app = express();
    
    app
    .use((r, res, next) => r.res.set(CORS) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/login/', (req, res) => res.send('eliasgoss'))
    .get('/user', async r => r.res.json(await User.find()))
    .get('/user/:login', async r => {
        const { login } = r.params;
        r.res.json(await User.find({ login }));
    })    
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .all('/*', r => r.res.send('Работает!'));
   
   
    return app;

}