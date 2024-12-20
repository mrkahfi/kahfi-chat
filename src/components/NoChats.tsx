interface NoChatProps {
  onClick: () => void;
}

const NoChats = ({ onClick }: NoChatProps) => {
  return (
    <div className="text-center py-36 m-5">
      <p className="text-gray-500 mb-4">You have no chats. Start a new chat!</p>
      <button
        className="w-8/12 inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
      >
        Start
      </button>
    </div>
  );
};

export default NoChats;
