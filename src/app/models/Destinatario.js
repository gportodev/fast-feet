import Sequelize, { Model } from 'sequelize';

class Destinatario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        CEP: Sequelize.STRING,

      },
      {
        sequelize,
      },
    );
  }
}

export default Destinatario;
