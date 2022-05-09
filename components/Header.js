import {
  Avatar,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { BellIcon, ChevronDownIcon, ChatIcon } from "@chakra-ui/icons";
import { SearchIcon, FlagIcon, PlayIcon } from "@heroicons/react/outline";
import Image from "next/image";
import HeaderIcon from "./HeaderIcon";
import { BsChatDots } from "react-icons/bs";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { logoutAction } from "../redux/actions";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";

const Header = ({ logoutAction }) => {
  const router = useRouter();
  // memanggil user yang ad di redux
  const { username, profilePic } = useSelector((state) => state.user);
  return (
    <div className="flex sticky top-0 z-100 bg-white items-center p-0 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <Image src="/mainlogo.png" width={40} height={40} layout="fixed" />
        <div className="flex items-center rounded-full ml-3 bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search BeanBean"
          />
        </div>
      </div>
      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <Wrap>
          <WrapItem>
            <Avatar
              className="mr-2"
              size="sm"
              name=""
              src={`http://localhost:5000/${profilePic}`}
            />
          </WrapItem>
        </Wrap>
        <p className="whtitespace-nowrap font-semibold pr-3">{username}</p>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsChatDots />}
            variant="none"
            size="md"
            fontSize={24}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Setting & Privacy</MenuItem>
            <MenuItem>Help & Support</MenuItem>
            <MenuDivider />
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BellIcon />}
            variant="none"
            size="md"
            fontSize={24}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Notification</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiChevronDown />}
            variant="none"
            size="md"
            fontSize={24}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Setting & Privacy</MenuItem>
            <MenuItem>Help & Support</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => logoutAction(router)}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default connect(null, { logoutAction })(Header);
