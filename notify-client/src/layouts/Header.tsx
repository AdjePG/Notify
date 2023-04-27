import React from 'react'
import logo from '../assets/images/Notify-logo.png'
import logoDM from '../assets/images/Notify-logo-DM.png'

export default function Header() {
  return (
    <div className='Header'>
      if (true) {
        <img className="logo" src={logo}/>
      } else {
        <img className="logo" src={logoDM}/>
      }
      <nav className="items">
          <ul>
              <li className="item" /*(click)="NewNote()"*/>Añadir nota</li>
              <li className="item" /*(click)="Categories()"*/>Categorías</li>
          </ul>
      </nav>
    </div>
  )
}
