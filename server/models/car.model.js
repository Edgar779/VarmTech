
module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
      userId: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING

      },
      color: {
        type: Sequelize.STRING

       }
    
    });
  
    return Car;
  };

