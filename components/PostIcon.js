const PostIcon = ({ Icon, active }) => {
  return (
    <div
      className="flex item-center cursor-pointer rounded-full  
    md:border-8 md:border-transparent md:hover:border-8 md:hover:border-rose-100 md:active:border-pink-200 group md:hover:bg-rose-100"
    >
      <Icon
        className={`text-gray-500 text-center  group-hover:text-rose-400 ${
          active && "text-rose-400"
        }`}
      />
    </div>
  );
};

export default PostIcon;
