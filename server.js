const app = require('./app');
const mongoose = require('mongoose');
const { login } = process.env;

mongoose
  .connect(login)
  .then(() =>
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    }),
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
