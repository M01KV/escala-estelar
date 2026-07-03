import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/comparador", label: "Comparador" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand">
          <span className="header__brand-mark" aria-hidden="true" />
          <span>
            Escala<strong>Estelar</strong>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Navegação principal">
          <ul>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "header__link header__link--active" : "header__link"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
