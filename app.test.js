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

describe("/POST place", () => {
  test("201: posts place to database", () => {
    const body = {
      placeName: "A test place",
      coordinates: [55.8374, -3.9876],
      creator: "TestUser",
      imgURL: "test",
      guesses: ["testGuess"],
    };
    return request(app)
      
      .post("/api/places")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining({
          placeName: expect.any(String),
          coordinates: expect.any(Array),
          creator: expect.any(String),
          imgURL: expect.any(String),
          guesses: expect.any(Array),
        }))
        expect(Object.keys(body).length).toBe(9)
      });
  });
});
