import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const rawQuery = searchParams.get("location")?.toLowerCase() || "";

    /* ================= EXPLICIT FILTERS ================= */
    const typeParam = searchParams.get("type");
    const bedroomsParam = searchParams.get("bedrooms");
    const postcodeParam = searchParams.get("postcode");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const dateFromParam = searchParams.get("dateFrom");
    const dateToParam = searchParams.get("dateTo");

    let minPrice = minPriceParam ? Number(minPriceParam) : null;
    let maxPrice = maxPriceParam ? Number(maxPriceParam) : null;
    let bedrooms = bedroomsParam ? Number(bedroomsParam) : null;
    let inferredType = typeParam;

    /* ================= SMART FREE TEXT PARSING ================= */

    // Bedrooms: "3 bed", "3 bedroom", "3 bedrooms"
    const bedroomMatch = rawQuery.match(/(\d+)\s*(bed|bedroom|bedrooms)/);
    if (!bedrooms && bedroomMatch) {
      bedrooms = Number(bedroomMatch[1]);
    }

    // Property types
    const TYPE_KEYWORDS = [
      "flat",
      "apartment",
      "house",
      "bungalow",
      "detached",
      "semi-detached",
      "terraced"
    ];

    if (!inferredType) {
      const foundType = TYPE_KEYWORDS.find(t =>
        rawQuery.includes(t)
      );
      if (foundType) {
        inferredType =
          foundType === "apartment" ? "Flat" :
          foundType.charAt(0).toUpperCase() + foundType.slice(1);
      }
    }

    // Price: under / below
    const underMatch = rawQuery.match(/(under|below)\s*£?(\d+[kK]?)/);
    if (!maxPrice && underMatch) {
      maxPrice = Number(underMatch[2].replace("k", "000"));
    }

    // Price: above / over
    const overMatch = rawQuery.match(/(over|above)\s*£?(\d+[kK]?)/);
    if (!minPrice && overMatch) {
      minPrice = Number(overMatch[2].replace("k", "000"));
    }

    // Price: between X and Y
    const betweenMatch = rawQuery.match(
      /between\s*£?(\d+[kK]?)\s*and\s*£?(\d+[kK]?)/
    );
    if (!minPrice && !maxPrice && betweenMatch) {
      minPrice = Number(betweenMatch[1].replace("k", "000"));
      maxPrice = Number(betweenMatch[2].replace("k", "000"));
    }

    // Location inference (city names)
    const LOCATION_WORDS = rawQuery
      .replace(/(bed|bedroom|flat|house|under|over|above|below|\d+)/g, "")
      .split(/\s+/)
      .filter(w => w.length > 2);

    /* ================= FILTER PROPERTIES ================= */

    const filtered = propertiesData.properties.filter(p => {
      /* PRICE */
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;

      /* TYPE */
      if (inferredType && p.type !== inferredType) return false;

      /* BEDROOMS */
      if (bedrooms !== null) {
        if (bedrooms >= 5 && p.bedrooms < 5) return false;
        if (bedrooms < 5 && p.bedrooms !== bedrooms) return false;
      }

      /* POSTCODE */
      if (postcodeParam) {
        const propertyPostcode = p.location.split(" ").slice(-1)[0].toUpperCase();
        if (!propertyPostcode.startsWith(postcodeParam.toUpperCase())) {
          return false;
        }
      }

      /* DATE */
      if (dateFromParam || dateToParam) {
        const propertyDate = new Date(
          `${p.added.month} ${p.added.day}, ${p.added.year}`
        );

        if (dateFromParam && propertyDate < new Date(dateFromParam)) return false;
        if (dateToParam && propertyDate > new Date(dateToParam)) return false;
      }

      /* LOCATION WORD MATCH */
      if (LOCATION_WORDS.length > 0) {
        const locationText = p.location.toLowerCase();
        const locationMatch = LOCATION_WORDS.some(word =>
          locationText.includes(word)
        );
        if (!locationMatch) return false;
      }

      return true;
    });

    setResults(filtered);
  }, [searchParams]);

  return (
    <div className="container py-4 d-flex flex-column align-items-center">
      <div style={{ maxWidth: "450px" }}>
        <SearchBar />
      </div>

      <div>
        <h4 className="mt-5">
          Search Results ({results.length})
        </h4>
        <hr />
        <Cards properties={results} />
      </div>
    </div>
  );
}
