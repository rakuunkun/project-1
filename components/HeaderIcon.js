const HeaderIcon = ({ Icon, active }) => {
  return (
    <div className="md:px-10  flex item-center cursor-pointer hover rounded-xl hover:bg-gray-100 active:border-b-2 active:border-emerald-500 group">
      <Icon
        className={`h-5 text-gray-500 text-center mx-auto sm=h-7 group-hover:text-emerald-500 ${
          active && "text-emerald-500"
        }`}
      />
    </div>
  );
};

export default HeaderIcon;
