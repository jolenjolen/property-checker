import "../App.css";
import { useTheme } from "../ThemeContext";
import GlareHover from '../ReactBits/GlareHover'
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
                    <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }} className={`text-${inverseTheme}`}>
                    Hover Me
                    </h2>
                </GlareHover>
            </div>


        </>
    )

}