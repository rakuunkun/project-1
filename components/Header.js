import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  ChevronDownIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { SearchIcon, FlagIcon, PlayIcon } from "@heroicons/react/outline";
import Image from "next/image";
import HeaderIcon from "./HeaderIcon";

const Header = () => {
  return (
    <div className="flex sticky top-0 z-100 bg-white items-center p-2 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <Image src="/mainlogo.png" width={40} height={40} layout="fixed" />
        <div className="flex items-center rounded-full ml-3 bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Kaktus"
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
        <p className="whtitespace-nowrap font-semibold pr-3">akspkdasp</p>
        <BellIcon className="icon" />
        <ChatIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
