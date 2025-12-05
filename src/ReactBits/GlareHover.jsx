import "./GlareHover.css";
import { useTheme } from "../ThemeContext";

const GlareHover = ({
  width = "300px",
  height = "500px",
  background,
  borderColor = "#ddd",
  children,
  glareColor,
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "shadow-sm rounded-2",
  style = {}
}) => {

  // ✅ theme MUST be inside the component
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "#333" : "#fff";
  const mainTheme = theme === "light" ? "#fff" : "#333";

  // Apply theme defaults AFTER reading theme
  background = background || mainTheme;
  glareColor = glareColor || inverseTheme;

  // Convert hex → rgba with opacity
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;

  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  // CSS variables
  const vars = {
    "--gh-width": width,
    "--gh-height": height,
    "--gh-bg": background,
    "--gh-br": borderRadius,
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": rgba,
    "--gh-border": borderColor
  };

  return (
    <div
      className={`glare-hover ${playOnce ? "glare-hover--play-once" : ""} ${className}`}
      style={{ ...vars, ...style }}
    >
      {children}
    </div>
  );
};

export default GlareHover;
