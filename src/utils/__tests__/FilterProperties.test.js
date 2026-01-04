import { FilterProperties } from "../FilterProperties";

const mockProperties = [
  {
    id: "1",
    price: 300000,
    type: "Flat",
    bedrooms: 3,
    tenure: "Leasehold",
    location: "Brighton BN1",
    description: "Modern flat near the sea",
    added: { day: 10, month: "January", year: 2023 }
  },
  {
    id: "2",
    price: 550000,
    type: "House",
    bedrooms: 4,
    tenure: "Freehold",
    location: "London SW1",
    description: "Spacious family house",
    added: { day: 5, month: "March", year: 2022 }
  },
  {
    id: "3",
    price: 800000,
    type: "House",
    bedrooms: 5,
    tenure: "Freehold",
    location: "Leeds LS1",
    description: "Large detached house",
    added: { day: 20, month: "June", year: 2021 }
  }
];

const makeParams = (obj) =>
  new URLSearchParams(obj);

describe("FilterProperties", () => {

  test("filters by maximum price", () => {
    const params = makeParams({ maxPrice: "400000" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  test("filters by property type", () => {
    const params = makeParams({ type: "House" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(2);
  });

  test("filters by exact bedroom count", () => {
    const params = makeParams({ bedrooms: "3" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(1);
    expect(result[0].bedrooms).toBe(3);
  });

  test("5+ bedrooms returns properties with 5 or more", () => {
    const params = makeParams({ bedrooms: "5" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(1);
    expect(result[0].bedrooms).toBeGreaterThanOrEqual(5);
  });

  test("filters by postcode prefix", () => {
    const params = makeParams({ postcode: "BN" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(1);
    expect(result[0].location).toContain("BN");
  });

  test("filters by date range", () => {
    const params = makeParams({
      dateFrom: "2022-01-01",
      dateTo: "2023-12-31"
    });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(2);
  });

  test("supports free-text search across fields", () => {
    const params = makeParams({ location: "3 bedroom flat brighton" });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(1);
    expect(result[0].location).toContain("Brighton");
  });

  test("combines multiple filters correctly", () => {
    const params = makeParams({
      type: "House",
      minPrice: "500000",
      location: "freehold"
    });
    const result = FilterProperties(mockProperties, params);
    expect(result).toHaveLength(2);
  });

});