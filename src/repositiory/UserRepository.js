const models = require("../../models/index");

class UserRepository {
  constructor() {
    this.model = models.Users;
  }

  async checkUsesExistWithEmail(email) {
    const user = await this.model.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  async createUser(data) {
    return this.model.create(data);
  }
}

module.exports = new UserRepository();
