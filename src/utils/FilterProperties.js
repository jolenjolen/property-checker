export function FilterProperties(properties, searchParams) {
  const textQuery = searchParams.get("location");
  const type = searchParams.get("type");
  const bedroomsParam = searchParams.get("bedrooms");
  const postcodeParam = searchParams.get("postcode");

  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : null;

  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : null;

  const dateFrom = searchParams.get("dateFrom")
    ? new Date(searchParams.get("dateFrom"))
    : null;

  const dateTo = searchParams.get("dateTo")
    ? new Date(searchParams.get("dateTo"))
    : null;

  const tokens = textQuery
    ? textQuery.toLowerCase().split(/\s+/)
    : [];

  return properties.filter((p) => {
    if (minPrice !== null && p.price < minPrice) return false;
    if (maxPrice !== null && p.price > maxPrice) return false;

    if (type && p.type.toLowerCase() !== type.toLowerCase())
      return false;

    if (bedroomsParam !== null) {
      const b = Number(bedroomsParam);
      if (b === 5 && p.bedrooms < 5) return false;
      if (b !== 5 && p.bedrooms !== b) return false;
    }

    if (postcodeParam) {
      const pc = p.location.split(" ").slice(-1)[0].toUpperCase();
      if (!pc.startsWith(postcodeParam.toUpperCase())) return false;
    }

    if (dateFrom || dateTo) {
      const d = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
      if (dateFrom && d < dateFrom) return false;
      if (dateTo && d > dateTo) return false;
    }

    if (tokens.length) {
      const text = `
        ${p.location}
        ${p.description}
        ${p.type}
        ${p.tenure}
        ${p.bedrooms} bedroom
      `.toLowerCase();

      if (!tokens.every(t => text.includes(t))) return false;
    }

    return true;
  });
}
