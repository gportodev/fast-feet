
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipients', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rua: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    complemento: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cidade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CEP: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('recipients'),
};
