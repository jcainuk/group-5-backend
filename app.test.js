const { app, db } = require("./app");
const seed = require("./db/seeds/seed.js");
const userData = require("./db/data/test-data/users");
const User = require("./models/usersModel");
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

// Users: /api/users/
describe("/api/users", () => {
  describe("GET /", () => {
    test("200: responds with an array of all users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /", () => {
    test("201: adds a new user to the database", async () => {
      const newUser = {
        username: "Billy",
        avatar_URL: "https://example.com/avatar.jpg",
        achievements: { gold: 0, silver: 0, bronze: 0 }
      };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.user.username).toEqual(newUser.username);
      expect(response.body.user.avatar_URL).toEqual(newUser.avatar_URL);
      expect(response.body.user.achievements).toEqual(newUser.achievements);
    });

    test("400: returns an error if username is missing", async () => {
      const response = await request(app).post("/api/users").send({});

      expect(response.statusCode).toBe(422);
      expect(response.body.msg).toBe("username required");
    });
  });
});

// Places
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
