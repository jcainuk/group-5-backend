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

describe("add a new user", () => {
  test("POST 201: add a new user to the database", () => {
    return request(app)
      .post("/api/users/")
      .send({
        username: "Billy"
      })
      .expect(201)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toEqual("user created successfully");
      });
  });
});

describe("/GET places", () => {
  test("it should return all places", () => {
    return request(app)
      .get("/api/places")
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

describe("/POST place", () => {
  test("201: posts place to database", () => {
    const body = {
      placeName: "A test place",
      coordinates: [55.8374, -3.9876],
      creator: "TestUser",
      imgURL: "test",
      guesses: ["testGuess"]
    };
    return request(app)
      .post("/api/places")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            placeName: expect.any(String),
            coordinates: expect.any(Array),
            creator: expect.any(String),
            imgURL: expect.any(String),
            guesses: expect.any(Array)
          })
        );
        expect(Object.keys(body).length).toBe(9);
      });
  });
});

describe("/GET places", () => {
  test("it should return all places", () => {
    return request(app)
      .get("/api/places")
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

describe("/POST place", () => {
  test("201: posts place to database", () => {
    const body = {
      placeName: "A test place",
      coordinates: [55.8374, -3.9876],
      creator: "TestUser",
      imgURL: "test",
      guesses: ["testGuess"]
    };
    return request(app)
      .post("/api/places")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            placeName: expect.any(String),
            coordinates: expect.any(Array),
            creator: expect.any(String),
            imgURL: expect.any(String),
            guesses: expect.any(Array)
          })
        );
        expect(Object.keys(body).length).toBe(9);
      });
  });
});

describe("/GET places", () => {
  test("it should return all places", () => {
    return request(app)
      .get("/api/places")
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

describe("/POST place", () => {
  test("201: posts place to database", () => {
    const body = {
      placeName: "A test place",
      coordinates: [55.8374, -3.9876],
      creator: "TestUser",
      imgURL: "test",
      guesses: ["testGuess"]
    };
    return request(app)
      .post("/api/places")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            placeName: expect.any(String),
            coordinates: expect.any(Array),
            creator: expect.any(String),
            imgURL: expect.any(String),
            guesses: expect.any(Array)
          })
        );
        expect(Object.keys(body).length).toBe(9);
      });
  });
});
