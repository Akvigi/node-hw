const app = require('./app');
const mongoose = require('mongoose');
const { LOGIN, PORT } = process.env;

mongoose
  .connect(LOGIN)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Server running. Use our API on port: 3000');
    }),
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
