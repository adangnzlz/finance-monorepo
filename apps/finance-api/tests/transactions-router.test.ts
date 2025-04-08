import request from "supertest";
import { server, app } from "../src/index"; // Import the Express app
import { getUserByEmail } from "../src/services/users.service";

jest.mock("../src/services/users.service", () => ({
  getUserByEmail: jest.fn(),
}));

const routerUrl = `${process.env.API_VERSION}/transactions`;

describe("Transactions API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all transactions when no filters are applied", async () => {
    const res = await request(app).get(routerUrl);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Should return an array
  });


  it("should create a transaction when data is valid", async () => {
    (getUserByEmail as jest.Mock).mockReturnValue(true);

    const res = await request(app).post(routerUrl).send({
      senderemail: "alice@example.com",
      receiveremail: "bob@example.com",
      amount: 100,
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Transaction created successfully");
  });

  it("should fail if senderemail is invalid", async () => {
    const res = await request(app).post(routerUrl).send({
      senderemail: "invalidemail",
      receiveremail: "bob@example.com",
      amount: 100,
    });

    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toContain("Invalid sender email");
  });
  // ✅ Test POST `/transactions` (Sender and receiver emails must be different)
  it("should fail if sender and receiver emails are the same", async () => {
    const res = await request(app).post(routerUrl).send({
      senderemail: "alice@example.com",
      receiveremail: "alice@example.com",
      amount: 100,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Emails should be different");
  });

  it("should fail if sender does not exist", async () => {
    (getUserByEmail as jest.Mock).mockImplementation((email) => undefined);

    const res = await request(app).post(routerUrl).send({
      senderemail: "unknown@example.com",
      receiveremail: "bob@example.com",
      amount: 100,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Sender email not exists");
  });

  it("should fail if receiver does not exist", async () => {
    (getUserByEmail as jest.Mock).mockImplementation(
      (email) => email !== "unknown@example.com"
    );

    const res = await request(app).post(routerUrl).send({
      senderemail: "alice@example.com",
      receiveremail: "unknown@example.com",
      amount: 100,
    });

    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toEqual(
      expect.stringContaining("Receiver email not exists")
    );
  });

  it("should fail if amount is zero or negative", async () => {
    const res = await request(app).post(routerUrl).send({
      senderemail: "alice@example.com",
      receiveremail: "bob@example.com",
      amount: -10,
    });

    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toEqual(
      expect.stringContaining("Positive amount required")
    );
  });
  afterAll(() => {
    server.close(); // Close the Express server after all tests
  });
});
