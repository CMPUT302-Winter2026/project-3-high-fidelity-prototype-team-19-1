import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span>⌂</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span>◫</span>
        <span>Categories</span>
      </NavLink>
      <NavLink to="/saved" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span>★</span>
        <span>Saved</span>
      </NavLink>
    </nav>
  )
}
