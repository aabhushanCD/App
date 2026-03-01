import React from "react";
import { Button } from "@/components/ui/button";

const CallPopup = ({
  caller,
  onAccept,
  onReject,
  isCalling = false,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-lg">
        {isCalling ? (
          <>
            <h2 className="font-bold text-lg">Calling {caller.name}...</h2>
            <Button className="bg-red-500 mt-4" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <h2 className="font-bold text-lg">{caller.name} is calling</h2>
            <div className="mt-4 flex justify-around">
              <Button className="bg-green-500" onClick={onAccept}>
                Accept
              </Button>
              <Button className="bg-red-500" onClick={onReject}>
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CallPopup;
