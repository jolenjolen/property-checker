import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Home() {
  return (
    <>
      <SearchBar />
      <Cards properties={propertiesData.properties} />
    </>
  );
}
