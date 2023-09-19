const { app, db } = require("./app");
const seed = require("./db/seeds/seed.js");
const userData = require("./db/data/dev-data/users");

const { mongoose, startDbConnection } = require("./connection");

const request = require("supertest");

beforeEach(() => {
  return startDbConnection().then(() => {
    return seed({ userData });
  });
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("/GET users", () => {
  test("it should return all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });
});
