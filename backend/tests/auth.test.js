const request = require("supertest");
const app = require("../index");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Review = require("../models/review.model");

describe("Registration", () => {
      

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "test@example.com",
        password: "testpassword",
        role: 2,
        username: "testuser",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });

  it("should return an error if fields are missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "test@example.com",
        role: 2,
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "all fields are required");
  });

  it("should return an error if email or username already exists", async () => {
    await User.create({
      email: "existing@example.com",
      password: "existingpassword",
      role: 2,
      username: "existinguser",
    });

    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "existing@example.com",
        password: "testpassword",
        role: 2,
        username: "testuser",
      });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: /all fields are required/i });
});
});

describe("Login", () => {
    beforeEach(async () => {
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: await bcrypt.hash("testpassword", 10), 
      });
    });
    
    it("should successfully log in with valid credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          usernameOrEmail: "testuser",
          password: "testpassword",
        });
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("username", "testuser");
    });
  
    it("should return an error with invalid credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          usernameOrEmail: "testuser",
          password: "invalidpassword",
        });
  
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid username/email or password");
    });
  
  
    it("should return an error if password is not provided", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          usernameOrEmail: "testuser",
        });
  
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Password is required");
    });
    describe("Add Review Endpoint", () => {
        beforeEach(async () => {
          await Review.deleteMany({});
        });
      
        it("should add a new review", async () => {
          const reviewData = {
            feedback: "This is a great product!",
          };
      
          const response = await request(app)
            .post("/review/addReview")
            .send(reviewData);
      
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("review");
      
          const addedReview = await Review.findById(response.body.review._id);
          expect(addedReview).toBeTruthy();
          expect(addedReview.feedback).toEqual(reviewData.feedback);
        });
      });
      
      describe("Get Reviews Endpoint", () => {
        beforeEach(async () => {
          await Review.create([
            { feedback: "Good product" },
            { feedback: "Excellent service" },
          ]);
        });
      
        it("should get all reviews", async () => {
          const response = await request(app).get("/review/getReviews");
      
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("reviews");
          expect(Array.isArray(response.body.reviews)).toBe(true);
      
          const allReviews = await Review.find({});
          expect(response.body.reviews.length).toBe(allReviews.length);
      
          response.body.reviews.forEach((review, index) => {
            expect(review.feedback).toEqual(allReviews[index].feedback);
          });
        });
      
        it("should remove a review", async () => {
          const newReview = await Review.create({ feedback: "Test Review" });
      
          const response = await request(app).delete(`/review/removeReview/${newReview._id}`);
      
          expect(response.status).toBe(200);
          expect(response.text).toBe("review deleted successfully");
      
          const deletedReview = await Review.findById(newReview._id);
          expect(deletedReview).toBeNull();
        });
      
        describe("Add Review Endpoint", () => {
          beforeEach(async () => {
            await Review.deleteMany({});
          });
        
          it("should add a new review", async () => {
            const reviewData = {
              feedback: "This is a great product!",
            };
            const response = await request(app)
              .post("/review/addReview")
              .send(reviewData);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("review");
            const addedReview = await Review.findById(response.body.review._id);
            expect(addedReview).toBeTruthy();
            expect(addedReview.feedback).toEqual(reviewData.feedback);
          });
          it("should return an error if review is empty", async () => {
            const reviewData = {
              feedback: "", 
            };
            const response = await request(app)
              .post("/review/addReview")
              .send(reviewData);
        
            expect(response.status).toBe(400);
            expect(response.body.error).toHaveProperty("message", "Review cannot be empty");
          });
        });
        
      });
      
  });
  