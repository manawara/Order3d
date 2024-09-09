import React, { useEffect, useState } from "react";

const useTimeOut = (text: string, duration = 2000): [string, () => void] => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timeId = setTimeout(() => {
        setShowMessage(false);
      }, duration);

      return () => clearTimeout(timeId);
    }
  }, [showMessage, duration]);
  const displayMessage = () => {
    setShowMessage(true);
  };

  return [showMessage ? text : "", displayMessage];
};

export default useTimeOut;
