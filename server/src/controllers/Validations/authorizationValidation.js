const { Client } = require("../../db");
const { Authorizations } = require("../../db");



const AuthorizationValidation = async (client) => {
  const clientSearched = await Client.findOne({where: { name : client}})
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id
  
  console.log ("en AutorizationValidation el client id es" + clientId )
  
  return Authorization(clientId)
  ;
};
const Authorization= async (clientID) =>{
    const clientSearched2 = await Authorizations.findOne({where: { ClientId : clientID}})
    console.log ("en Autorization el cliente autorizado es = " + clientSearched2 )
    if (!clientSearched2) return false;
   else return true

}

module.exports = AuthorizationValidation;