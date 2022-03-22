const Post = (name, message, email, postImaga, image, timestamp) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xl">
        <div className="flex items-center space-x-2">
          <img className="rounded-full" />
          <div>
            <p className="font-medium">amps</p>
            <p className="text-xs text-gray-400">
              jam xx xx
              {/* {new Date(timestamp?.toDate()).toLocaleString()} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
