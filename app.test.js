const { app, db } = require("./app");
const seed = require("./db/seeds/seed.js");
const userData = require("./db/data/test-data/users");
const User = require("./models/usersModel");
const Place = require("./models/placesModel");
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

// Users: /api/users/:id
describe("/api/users/:id", () => {
  describe("GET /:id", () => {
    test("200: responds with the correct user object", async () => {
      const [
        user1,
        user2,
        user3,
        user4,
        user5
      ] = require("./db/data/test-data/users");

      const user1Id = new mongoose.Types.ObjectId();
      const user2Id = new mongoose.Types.ObjectId();
      const user3Id = new mongoose.Types.ObjectId();
      const user4Id = new mongoose.Types.ObjectId();
      const user5Id = new mongoose.Types.ObjectId();

      user1._id = user1Id;
      user2._id = user2Id;
      user3._id = user3Id;
      user4._id = user4Id;
      user5._id = user5Id;

      await User.insertMany([user1, user2, user3, user4, user5]);

      const response = await request(app).get(`/api/users/${user1Id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toEqual(user1Id.toString());
      expect(response.body.username).toEqual(user1.username);
      expect(response.body.avatar_URL).toEqual(user1.avatar_URL);
      expect(response.body.achievements).toEqual(user1.achievements);
    });
  });
  describe("DELETE /:id", () => {
    test("204: deletes the user and returns no content", async () => {
      const [
        user1,
        user2,
        user3,
        user4,
        user5
      ] = require("./db/data/test-data/users");

      const user1Id = new mongoose.Types.ObjectId();
      const user2Id = new mongoose.Types.ObjectId();
      const user3Id = new mongoose.Types.ObjectId();
      const user4Id = new mongoose.Types.ObjectId();
      const user5Id = new mongoose.Types.ObjectId();

      user1._id = user1Id;
      user2._id = user2Id;
      user3._id = user3Id;
      user4._id = user4Id;
      user5._id = user5Id;

      await User.insertMany([user1, user2, user3, user4, user5]);

      const response = await request(app).delete(`/api/users/${user1Id}`);

      expect(response.status).toBe(204);

      const deletedUser = await User.findById(user1Id);
      expect(deletedUser).toBeNull();
    });

    test("404: returns not found if the user does not exist", async () => {
      const nonExistentUserId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(
        `/api/users/${nonExistentUserId}`
      );

      expect(response.status).toBe(404);
      expect(response.body.msg).toBe("User not found");
    });
  });
  describe("PATCH /:id", () => {
    test("200: updates the user's properties and returns the updated user", async () => {
      const [
        user1,
        user2,
        user3,
        user4,
        user5
      ] = require("./db/data/test-data/users");

      const user1Id = new mongoose.Types.ObjectId();
      const user2Id = new mongoose.Types.ObjectId();
      const user3Id = new mongoose.Types.ObjectId();
      const user4Id = new mongoose.Types.ObjectId();
      const user5Id = new mongoose.Types.ObjectId();

      user1._id = user1Id;
      user2._id = user2Id;
      user3._id = user3Id;
      user4._id = user4Id;
      user5._id = user5Id;

      await User.insertMany([user1, user2, user3, user4, user5]);

      const updates = {
        avatar_URL: "https://example.com/updated-avatar.jpg",
        achievements: { gold: 1, silver: 2, bronze: 3 }
      };

      const response = await request(app)
        .patch(`/api/users/${user1Id}`)
        .send(updates);

      expect(response.status).toBe(200);

      expect(response.body._id).toEqual(user1Id.toString());
      expect(response.body.avatar_URL).toEqual(updates.avatar_URL);

      expect(response.body.achievements.gold).toEqual(
        user1.achievements.gold + updates.achievements.gold
      );
      expect(response.body.achievements.silver).toEqual(
        user1.achievements.silver + updates.achievements.silver
      );
      expect(response.body.achievements.bronze).toEqual(
        user1.achievements.bronze + updates.achievements.bronze
      );

      const updatedUser = await User.findById(user1Id);
      expect(updatedUser.avatar_URL).toEqual(updates.avatar_URL);

      expect(updatedUser.achievements.gold).toEqual(
        user1.achievements.gold + updates.achievements.gold
      );
      expect(updatedUser.achievements.silver).toEqual(
        user1.achievements.silver + updates.achievements.silver
      );
      expect(updatedUser.achievements.bronze).toEqual(
        user1.achievements.bronze + updates.achievements.bronze
      );
    });

    test("404: returns not found if the user does not exist", async () => {
      const nonExistentUserId = new mongoose.Types.ObjectId();

      const updates = {
        avatar_URL: "https://example.com/updated-avatar.jpg",
        achievements: { gold: 1, silver: 2, bronze: 3 }
      };

      const response = await request(app)
        .patch(`/api/users/${nonExistentUserId}`)
        .send(updates);

      expect(response.status).toBe(404);
      expect(response.body.msg).toBe("User not found");
    });
  });
});

// Username: /api/users/username/:username
describe("GET /api/users/username/:username", () => {
  test("200: responds with the correct user object when searching with username", async () => {
    const testUser = {
      username: "MrSmith",
      avatar_URL: "https://example.com/avatar.jpg",
      achievements: { gold: 0, silver: 0, bronze: 0 }
    };

    await User.create(testUser);

    const response = await request(app).get(
      `/api/users/username/${testUser.username}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual(testUser.username);
    expect(response.body.avatar_URL).toEqual(testUser.avatar_URL);
    expect(response.body.achievements).toEqual(testUser.achievements);
  });
});

// Places
describe("/api/places", () => {
  describe("GET /", () => {
    test("200: responds with an array of all place", async () => {
      const response = await request(app).get("/api/places");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

describe(" GET api/places/nearest", () => {
  test.only("should return places in order of distance", () => {
    return request(app).get('/api/places/nearest').expect(200).then(({body}) => {
      console.log(body)
    })
  })
})

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
      imgURL: "test"
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

// guesses
describe("POST /api/places/:id/guesses", () => {
  it("should add a new guess to the place", async () => {
    const testPlaceId = new mongoose.Types.ObjectId();

    const testGuess = {
      username: "TestUser",
      avatarURL: "https://example.com/avatar.jpg",
      guessCoordinates: [53.479489, -3.24621]
    };

    const placeData = {
      _id: testPlaceId,
      placeName: "Test Place",
      coordinates: [40.479489, -3.245115],
      creator: "Test Creator",
      imgURL: "https://example.com/test-place.jpg",
      guesses: [],
      votes: 0
    };
    await Place.create(placeData);

    const response = await request(app)
      .post(`/api/places/${testPlaceId}/guesses`)
      .send(testGuess);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Guess added successfully");
    expect(response.body.place.guesses).toHaveLength(1);

    const addedGuess = response.body.place.guesses[0];
    expect(addedGuess.username).toBe(testGuess.username);
    expect(addedGuess.avatarURL).toBe(testGuess.avatarURL);
  });

  it("should return 404 for an invalid place ID", async () => {
    const invalidPlaceId = "invalid-id";
    const testGuess = {
      username: "TestUser",
      avatarURL: "https://example.com/avatar.jpg",
      guessCoordinates: [53.479489, -3.24621]
    };

    const response = await request(app)
      .post(`/api/places/${invalidPlaceId}/guesses`)
      .send(testGuess);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Invalid place ID");
  });
});
