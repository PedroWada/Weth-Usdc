const request = require("supertest");
const app = require("./server");
const QuoteModel = require("./models/QuoteModel");  

jest.mock("./models/QuoteModel");

describe("POST /register", () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it("should return 201 on successful creation", async () => {
    // Mock successful response
    QuoteModel.create.mockResolvedValue({
      priceWeth: "0.075",
      priceUsdc: "120.50",
      date: new Date(),
    });

    const response = await request(app) //Calling the function
      .post("/register")
      .send({ priceWeth: "0.075", priceUsdc: "120.50" });

    expect(response.status).toBe(201);
    
    expect(QuoteModel.create).toHaveBeenCalledWith({
      priceWeth: "0.075",
      priceUsdc: "120.50",
    });
  });

  it("should return 400 on error", async () => {
    // Mock error response
    QuoteModel.create.mockRejectedValue(new Error("Database error"));

    const response = await request(app) //Calling the function
      .post("/register")
      .send({ priceWeth: "0.075", priceUsdc: "120.50" });

    expect(response.status).toBe(400);
    expect(QuoteModel.create).toHaveBeenCalledWith({
      priceWeth: "0.075",
      priceUsdc: "120.50",
    });
  });
});



describe("GET /getPrices", () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it("should return 200 and a list of prices when QuoteModel.find resolves", async () => {
      // Mock successful response
      const mockPrices = [
        { priceWeth: "0.075", priceUsdc: "120.50", date: "2024-01-01" },
        { priceWeth: "0.080", priceUsdc: "125.00", date: "2024-01-02" },
      ];
      QuoteModel.find.mockResolvedValue(mockPrices);
  
      const response = await request(app).get("/getPrices"); //Calling the function
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrices);
    });
  
    it("should return 500 when there is an Error", async () => {
      // Mock error response
      QuoteModel.find.mockRejectedValue(new Error("Database error"));
  
      const response = await request(app).get("/getPrices"); //Calling the function
  
      expect(response.status).toBe(500);
    });
  });