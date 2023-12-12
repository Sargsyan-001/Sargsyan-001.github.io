import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { NavMenu } from './NavMenu';

function Navigation() {
  return (
    <Routes>
      {NavMenu.map(({ id, element, path }) => {
        return <Route key={id} path={path} element={element} />
      })}
    </Routes>
  );
};

export default Navigation;