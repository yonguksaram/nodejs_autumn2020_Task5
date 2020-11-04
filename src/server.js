const { PORT } = require('./common/config');
const app = require('./app');
const { connectionToDB }= require('./data/data')

connectionToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
})

