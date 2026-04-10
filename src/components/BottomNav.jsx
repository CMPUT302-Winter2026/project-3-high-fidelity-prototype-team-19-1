import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
          <path d="M3 10.5L12 3l9 7.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 10v9h14v-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
        </svg>
        <span>Categories</span>
      </NavLink>

      <NavLink to="/saved" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
          <path d="M12 17l-5 3 1-6-4-4 6-.5L12 4l2 5.5 6 .5-4 4 1 6z" strokeWidth="2"/>
        </svg>
        <span>Saved</span>
      </NavLink>
    </nav>
  )
}