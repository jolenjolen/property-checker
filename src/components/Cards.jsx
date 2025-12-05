import "../App.css";
import { useTheme } from "../ThemeContext";
import GlareHover from '../ReactBits/GlareHover'
import Carousel from '../ReactBits/Carousel'
export default function Cards(){
    const { theme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";

    return(
        <>
            <div style={{ height: '600px', position: 'relative' }} className="m-2 d-flex justify-content-center align-items-center">
                <GlareHover
                    
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                
                <div style={{ height: '600px', position: 'relative' }}>
                <Carousel
                    baseWidth={300}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                />
                </div>
                </GlareHover>
            </div>


        </>
    )

}