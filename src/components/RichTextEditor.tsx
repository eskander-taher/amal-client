"use client";
import React, { useRef, useState } from "react";

const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");

  // Save current content as HTML
  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Execute formatting commands
  const format = (command: string) => {
    document.execCommand(command, false);
    handleInput(); // update state
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-2xl shadow-md bg-white">
      {/* Toolbar */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => format("bold")}
          className="px-3 py-1 rounded-lg border shadow-sm hover:bg-gray-100"
        >
          B
        </button>
        <button
          onClick={() => format("italic")}
          className="px-3 py-1 rounded-lg border shadow-sm hover:bg-gray-100"
        >
          I
        </button>
        <button
          onClick={() => format("underline")}
          className="px-3 py-1 rounded-lg border shadow-sm hover:bg-gray-100"
        >
          U
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[150px] border p-3 rounded-xl focus:outline-none"
        suppressContentEditableWarning={true}
      />

      {/* Output (for debugging / saving) */}
      <div className="mt-4 p-3 bg-gray-50 border rounded-xl text-sm">
        <strong>Saved Content (HTML):</strong>
        <div dangerouslySetInnerHTML={{__html: content}} className="mt-2 text-gray-700 break-words"/>
      </div>
    </div>
  );
};

export default RichTextEditor;
