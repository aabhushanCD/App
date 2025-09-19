import * as React from "react";

export function ResizablePanelGroup({ children, className }) {
  return (
    <div className={`flex w-full h-full ${className || ""}`}>{children}</div>
  );
}

export function ResizablePanel({ children, className }) {
  return <div className={`flex-1 ${className || ""}`}>{children}</div>;
}

export function ResizableHandle({ className }) {
  return (
    <div
      className={`w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 ${
        className || ""
      }`}
    />
  );
}

export function Resizable({ children, className }) {
  return <div className={`flex ${className || ""}`}>{children}</div>;
}
