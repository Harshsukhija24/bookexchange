class User {
  constructor({ id, name, email, password, mobileNumber, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.mobileNumber = mobileNumber;
    this.role = role;
  }
}

module.exports = User;
