import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Cards properties={propertiesData.properties} />
    </>
  );
}
