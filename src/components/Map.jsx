import { useSearchParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { filterProperties } from "../utils/filterProperties";
import PropertiesMap from "../components/PropertiesMap";

export default function MapPage() {
  const [searchParams] = useSearchParams();

  const results = filterProperties(
    propertiesData.properties,
    searchParams
  );

  return <PropertiesMap properties={results} />;
}
