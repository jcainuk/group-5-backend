const { app, db } = require("./app");
const seed = require("./db/seeds/seed.js");
const userData = require("./db/data/test-data/users");
const placesData = require("./db/data/test-data/places");

const { mongoose, startDbConnection } = require("./connection");
const request = require("supertest");
beforeEach(() => {
  return startDbConnection().then(() => {
    return seed({ userData, placesData });
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

describe("/DELETE PlaceById", () => {
  test("it should delete a place by its ID", () => {
    return request(app)
      .delete("/api/places/650afa0f0d52aa2187210c6a")
      .expect(200)
      .then(({ body }) => {
        expect(body.place.acknowledged).toBe(true);
        console.log(body);
      });
  });
});
