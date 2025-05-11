import React from 'react';
import { NavLink } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import { Img } from '../../../components/Img';
import { useConnectedUser } from '../../../hooks/useAuth';
import { MenuItem, useSidebarMenu } from '../../../hooks/useMenu';

function ItemLink({ item }: { item: MenuItem }) {
  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) =>
        `d-flex align-items-center ${isActive ? 'active' : ''}`
      }
      end
    >
      <i className={`${item.icon} me-2`} />
      {item.label}
    </NavLink>
  );
}

export function Sidebar() {
  const { data: user } = useConnectedUser();
  const menu = useSidebarMenu();

  if (!user) {
    return null;
  }

  return (
    <StickyBox>
      <div className="card user-sidebar mb-4 mb-lg-0 mt-4">
        <div className="card-header user-sidebar-header mb-4">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <span className="user rounded-circle avatar avatar-xxl mb-2">
              <Img
                mediaId={user.avatarId}
                className="img-fluid rounded-circle"
                alt="avatar"
              />
            </span>
            <h6 className="mb-2">{user.name}</h6>
          </div>
        </div>
        <div className="card-body user-sidebar-body p-0">
          <ul>
            {menu.map((item, i) => (
              <li key={i} className="mb-3 submenu">
                <ItemLink item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StickyBox>
  );
}
