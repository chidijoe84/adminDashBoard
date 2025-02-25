import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// const _nav = [
//   {
//     component: CNavItem,
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//     // badge: {
//     //   color: 'info',
//     //   text: 'NEW',
//     // },
//   },
//   // {
//   //   component: CNavTitle,
//   //   name: 'Theme',
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: 'Colors',
//   //   to: '/theme/colors',
//   //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: 'Typography',
//   //   to: '/theme/typography',
//   //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
//   // },
//   {
//     component: CNavTitle,
//     name: 'Components',
//   },
//   {
//     component: CNavItem,
//     name: 'Post Content',
//     to: '/base/content-list',
//     icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
//     // items: [
//     //   {
//     //     component: CNavItem,
//     //     name: 'Post Content',
//     //     to: '/base/content-list',
//     //   },
//     // ],
//   },
//   {
//     component: CNavItem,
//     name: 'Subscribers List',
//     to: '/Subscribers/subscriber-list',
//     icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//     // items: [
//     //   {
//     //     component: CNavItem,
//     //     name: 'Subscribers List',
//     //     to: '/Subscribers/subscriber-list',
//     //   },
//     // ],
//   },
//   {
//     component: CNavItem,
//     name: 'Applications Control',
//     to: '/forms/application-list',
//     icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//     // items: [
//     //   {
//     //     component: CNavItem,
//     //     name: 'Applications List',
//     //     to: '/forms/application-list',
//     //   },
//     // ],
//   },

//   {
//     component: CNavItem,
//     name: 'User-Data',
//     to: '/post-user-data',
//     icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//     // badge: {
//     //   color: 'info',
//     //   text: 'NEW',
//     // },
//   },

//   {
//     component: CNavGroup,
//     name: 'Admin',
//     icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'User/Roles',
//         to: '/notifications/alerts',
//       },
//     ],
//   },

//   // {
//   //   component: CNavTitle,
//   //   name: 'Extras',
//   // },
//   // {
//   //   component: CNavGroup,
//   //   name: 'Pages',
//   //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavItem,
//   //       name: 'Login',
//   //       to: '/login',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Register',
//   //       to: '/register',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Error 404',
//   //       to: '/404',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Error 500',
//   //       to: '/500',
//   //     },
//   //   ],
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: 'Docs',
//   //   href: 'https://coreui.io/react/docs/templates/installation/',
//   //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
//   // },
// ]

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavItem,
    name: 'Post Content',
    to: '/post-content/content-list',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Subscribers List',
    to: '/Subscribers/subscriber-list',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Applications Control',
    to: '/application-control/application-list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'User-Data',
    to: '/post-user-data',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Admin',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User/Roles',
        to: '/user-access/access',
      },
    ],
  },
]

export default _nav
