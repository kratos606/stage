import React from 'react'

function LayoutWithSidebar(props) {
  return (
    <>
        <props.sidebar />
        <props.Outlet/>
    </>
  )
}

export default LayoutWithSidebar