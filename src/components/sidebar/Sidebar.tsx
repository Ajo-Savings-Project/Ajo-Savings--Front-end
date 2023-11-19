import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/Ajó Savingslogo.png';
import { DASHBOARD_SIDEBAR_LINKS, OTHER_SIDEBAR_LINKS } from '.';

const linkClass = 
  'flex items-center gap-2 font-light px-3 py-2 hover:text-white hover:bg-cyan-700 hover:no-underline active:bg-cyan-600 rounded-md text-base';

interface SidebarLinkProps {
  link: {
    key: string;
    label: string;
    path: string;
    icon: React.ReactNode;
  };
}

function SidebarLink({ link }: SidebarLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path ? 'bg-cyan-700 text-white' : 'text-neutral-900',
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Initialize open state based on local storage or some other criteria if needed
    const isOpen = localStorage.getItem('sidebarOpen') === 'true';
    setOpen(isOpen);
  }, []);

  const toggleMenu = () => {
    const newOpen = !open;
    setOpen(newOpen);
    // Save the state in local storage for persistence
    localStorage.setItem('sidebarOpen', newOpen.toString());
  };

  
  return (
    <div
      className={classNames(
        'flex flex-col p-3 bg-white',
        open ? 'w-60' : 'w-20', // Set the width based on the open state
        { 'duration-500': open } // Add a transition duration when opening
      )}
    >
      <div
        className="flex items-center gap-2 px-1 py-3 cursor-pointer"
        onClick={toggleMenu}
      >
        <img src={logo} alt="" />
        {open ? (
          <span className="text-xl">&#9776;</span>
        ) : (
          <span className="text-xl">☰</span>
        )}
      </div>

      {open ? (
        <>
          <div className="py-8 flex flex-col gap-0.5">
            <span className="text-gray-300 text-md">Overview</span>
            {DASHBOARD_SIDEBAR_LINKS.map((link) => (
              <SidebarLink key={link.key} link={link} />
            ))}
          </div>
          <div className="flex flex-col gap-0.5 pt-2 border-neutral-700">
            <span className="text-gray-300 text-md">Others</span>

            {OTHER_SIDEBAR_LINKS.map((link) => (
              <SidebarLink key={link.key} link={link} />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Display only icons when the menu is closed */}
          <div className="py-8 flex flex-col gap-0.5">
            <span className="text-gray-300 text-md">Overview</span>
            {DASHBOARD_SIDEBAR_LINKS.map((link) => (
              <Link to={link.path} key={link.key} className={linkClass}>
                <span className="text-xl">{link.icon}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-0.5 pt-2 border-neutral-700">
            <span className="text-gray-300 text-md">Others</span>

            {OTHER_SIDEBAR_LINKS.map((link) => (
              <Link to={link.path} key={link.key} className={linkClass}>
                <span className="text-xl">{link.icon}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}








