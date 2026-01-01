import { useSearchParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { FilterProperties } from "../utils/FilterProperties";
import PropertiesMap from "../components/PropertiesMap";
import SearchBar from "../components/SearchBar";

export default function MapPage() {
  const [searchParams] = useSearchParams();

  const results = FilterProperties(
    propertiesData.properties,
    searchParams
  );

  return (
    <div className="container-fluid p-0">
      <div className="p-3">
        <SearchBar />
      </div>

      <PropertiesMap properties={results} />
    </div>
  );
}
