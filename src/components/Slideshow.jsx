import "../App.css";
import { useTheme } from "../ThemeContext";
import Carousel from '../ReactBits/Carousel';
export default function Cards(){
    const { theme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";

    return(
        <>
            <div style={{ height: '600px', position: 'relative' }}>
                <Carousel
                    baseWidth={100%}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                />
            </div>
        </>
    )

}