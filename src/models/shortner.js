const mongoose = require(`mongoose`);
const validator = require(`validator`);

function generator(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const shortnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`please input a valid url to continue`);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);


//beforesaving to the database
shortnerSchema.pre("save", async function (next) {
  const shortner = this;
  console.log(`just before saving`);
  if (shortner.url) {
    shortner.name = await generator(6);
  }
  next();
});

const Shortner = mongoose.model("Shortner", shortnerSchema);

module.exports = Shortner;
