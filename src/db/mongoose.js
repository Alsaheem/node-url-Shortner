const mongoose = require(`mongoose`);
const validator = require(`validator`);

const DbUrl = "mongodb://127.0.0.1:27017/url-shortner-api";

mongoose.connect(DbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
