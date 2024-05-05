import type { MenuProps } from "antd";
import Dropdown from "antd/es/dropdown/dropdown";
import Button from "antd/es/button";
import UsernameAvatar from "components/UsernameAvatar";
import { useUser } from "hooks/useUser";
import React, { FC } from "react";
import { ChevronDown, LogOut, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { mutate } from 'swr'
import httpService from "services/http";

const UserController: FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (!user) {
    if (isLoading) return null;

    return <Button onClick={() => navigate('/login')} >Login</Button>;
  }

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <User size={20} />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Log out",
      key: "logout",
      icon: <LogOut size={20} />,
      onClick: async () => {
        await httpService.post('/auth/logout');
        mutate(() => true)
        navigate('/login')
      },
    },
  ];

  const fullname = [user.first_name, user.last_name].join(" ").trim();

  return (
    <Dropdown
      menu={{
        items: items,
        selectable: true,
        className: "w-40",
      }}
    >
      <div className="flex items-center space-x-2 max-w-40">
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} />
          ) : (
            <UsernameAvatar className="font-black font-sans" userId={user.id} username={fullname} />
          )}
        </div>
        <div className="truncate">{user.first_name}</div>
        <ChevronDown size={16} />
      </div>
    </Dropdown>
  );
};

export default UserController;
