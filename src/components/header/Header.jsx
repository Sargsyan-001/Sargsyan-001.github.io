import "./header.css"
import React from 'react'
import { NavMenu } from '../navigation/NavMenu'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <header>
      <div className='logo-box'>
        <h1 className='logo-text'><Link className='logo-link' to="/">BRASLETE</Link></h1>
      </div>
      <nav className='hdr-nav'>
        <div className='hdr-right-box'>
          <div className='hdr-search-box'>
            <div className='hdr-search'><SearchIcon style={{ cursor: "pointer" }} /> <p>Search</p></div>
          </div>
          <div className='hdr-navigate-box'>
            {/* menu */}
            {NavMenu.map(({ id, name, path, menu, icon }) => {
              return menu && (
                <div className='hdr-list' key={id}>
                  <div className='hdr-li'><Link className='nav-links' key={id} to={path}><div className='hdr-list-icons'>{icon}</div>{name}</Link></div>
                </div>
              )
            })}
          </div>
          <div className='change-language-box'>
            <select className='lang-select'>
              <option value="EN">RU</option>
              <option value="RU">EN</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  )
}
