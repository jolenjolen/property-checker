import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";

  return (
    <footer className={`mt-5 py-4 bg-${theme} text-${inverseTheme} border-top`}>
      <div className="container text-center small">

        <p className="mb-1 fw-semibold">
          Property Checker
        </p>

        <p className="mb-2 text-secondary">
          Find properties to buy or rent across the UK
        </p>

        <div className="d-flex justify-content-center gap-3 mb-2">
          <a href="/buy" className={`text-${inverseTheme} text-decoration-none`}>
            Buy
          </a>
          <a href="/rent" className={`text-${inverseTheme} text-decoration-none`}>
            Rent
          </a>
          <a href="/search" className={`text-${inverseTheme} text-decoration-none`}>
            Search
          </a>
        </div>

        <p className="mb-0 text-secondary">
          © {new Date().getFullYear()} Property Checker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
