import {
  SecurityCard,
  People,
  Translate,
  Setting2,
  Home,
  Logout
} from 'iconsax-react';

// import React, {useState} from 'react';



export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard', 
    icon: <Home size="32" color="#D9E3F0" variant="Bulk" />,
  },
  {
    key: 'savings',
    label: 'Savings',
    path: '/dashboard/savings',
    icon: <SecurityCard size="32" color="#697689" variant="Bulk" />,
  },
  {
    key: 'groups',
    label: 'Groups',
    path: '/dashboard/groups',
    icon: <People size="32" color="#697689" variant="Bulk" />,
  },
  {
    key: 'transactions',
    label: 'Transactions',
    path: '/dashboard/transactions',
    icon: <Translate size="32" color="#697689" variant="Bulk" />,
  },
];

export const OTHER_SIDEBAR_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/dashboard/settings',
    icon: <Setting2 size="32" color="#697689" variant="Bulk" />,
  },
  {
	key: 'logout',
	label: "Logout", 
	path: "/dashboard/logout", 
	icon:<Logout size="32" color="#697689" variant="Bulk"/> },
];

// export const menus = [
//     { name: "Dashboard", link: "/dashboard", icon: <Home size="32" color="#D9E3F0" variant="Bulk" /> },
//     { name: "Savings", link: "/dashboard/savings", icon: <SecurityCard size="32" color="#697689" variant="Bulk" />},
//     { name: "Groups", link: "/dashboard/Groups", icon: <People size="32" color="#697689" variant="Bulk" />},

//     { name: "Transactions", link: "/dashboard/transactions", icon:<Translate size="32" color="#697689" variant="Bulk" /> },
//     {
//       name: "Settings",
//       link: "/dashboard/settings",
//       icon: <Setting2 size="32" color="#697689" variant="Bulk" />,
//       margin: true,
//     },
  
//   ];

