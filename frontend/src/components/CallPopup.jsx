import { Phone, PhoneOff } from "lucide-react";

const CallPopup = ({ caller, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-80 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 animate-scaleIn">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {caller.name?.[0]?.toUpperCase()}
        </div>

        {/* Caller Info */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">{caller.name}</h2>
          <p className="text-gray-500 text-sm">Incoming Video Call...</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-4">
          <button
            onClick={onReject}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition"
          >
            <PhoneOff size={22} />
          </button>

          <button
            onClick={onAccept}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition"
          >
            <Phone size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallPopup;
