import "../App.css";
import { useTheme } from "../ThemeContext";
import GlareHover from '../ReactBits/GlareHover';

export default function Cards({ properties }) {
  const { theme } = useTheme();

  return (
    <div className="container">
      <div className="row g-4">
        {properties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <div style={{ height: '600px', position: 'relative' }} className="m-2 d-flex justify-content-center align-items-center card h-100">
                <GlareHover
                    
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                </GlareHover>
                <img
                    src={property.picture}
                    className="card-img-top"
                    alt={property.type}
                />
                <div className="card-body">
                <h5 className="card-title">
                  £{property.price.toLocaleString()}
                </h5>

                <p className="card-text">
                  {property.bedrooms} bedroom {property.type}
                </p>

                <p className="text-muted small">
                  {property.location}
                </p>

                <a href={property.url} className="btn btn-primary btn-sm">
                  View Property
                </a>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardsX(){
    const { theme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";

    return(
        <>
            <div style={{ position: 'relative' }} className="m-2 d-flex justify-content-center align-items-center">
                <GlareHover
                    
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                </GlareHover>
            </div>


        </>
    )

}