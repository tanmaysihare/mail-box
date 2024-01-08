import React from 'react'
import './css/SidebarOption.css';

function SidebarOptions({Icon,title,number,isActive}) {
  return (
    <div className={`sidebarOptions ${isActive && `sidebarOption--active`}`}>
      <Icon />
      <h4>{title}</h4>
      <p>{number}</p>

    </div>
  )
}

export default SidebarOptions
