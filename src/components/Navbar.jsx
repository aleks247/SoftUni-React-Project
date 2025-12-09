import { NavLink } from "react-router";

export default function Navbar() {
    
  return (
    <>
       <NavLink to={'/'}>Home</NavLink>
       <NavLink to={'/catalog'}>Catalog</NavLink>
       <NavLink to={'/create'}>Create</NavLink>
       <NavLink to={'/login'}>Login</NavLink>
       <NavLink to={'/register'}>Register</NavLink>
    </>
  );
}