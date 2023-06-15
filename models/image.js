module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    description:{
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
    userEmail: {
      type: DataTypes.STRING,
    },
  });

  return Image;
};
