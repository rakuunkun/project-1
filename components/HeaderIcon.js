const HeaderIcon = ({ Icon, active }) => {
  return (
    <div className=" flex item-center cursor-pointer rounded-xl md:px-10 py-3 sm:h-14 md:hover:bg-gray-100 active:border-b-2  active:border-rose-400 group">
      <Icon
        className={`h-5 text-gray-500 text-center  sm:h-7 mx-auto group-hover:text-rose-400 ${
          active && "text-rose-400"
        }`}
      />
    </div>
  );
};

export default HeaderIcon;
