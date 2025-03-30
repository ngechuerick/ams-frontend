import { NavLink } from 'react-router-dom';

function NavLinkItem({ linkTo, children }) {
  return (
    <li className="hover:bg-form-strokedark">
      <NavLink
        to={linkTo}
        className={({ isActive }) =>
          `flex items-center space-x-6 rounded-sm px-5.5 py-2 ${
            isActive ? 'bg-form-strokedark' : 'bg-transparent'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavLinkItem;
