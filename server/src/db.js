require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_RENDER } = process.env;

const AdministratorModel = require("./models/Administrator");
const ClientModel = require("./models/Client");
const ProductModel = require("./models/Product");
const PurchaseModel = require("./models/Purchase");
const CollaboratorModel = require("./models/Collaborator");
const UserModel = require("./models/User");
const AuthorizationsModel = require("./models/Authorizations");

const sequelize = new Sequelize(DB_RENDER, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

AdministratorModel(sequelize);
ClientModel(sequelize);
ProductModel(sequelize);
PurchaseModel(sequelize);
CollaboratorModel(sequelize);
UserModel(sequelize);
AuthorizationsModel(sequelize);

const {
  Administrator,
  Client,
  Product,
  Purchase,
  Collaborator,
  User,
  Authorizations
} = sequelize.models;


Administrator.belongsTo(Client);
Product.belongsTo(Client);
Collaborator.belongsTo(Client);



Client.hasOne(Authorizations);
User.hasOne(Purchase);
Client.hasOne(Purchase);



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
