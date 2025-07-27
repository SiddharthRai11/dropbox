"use client";

import { RefreshCw, Trash } from "lucide-react";
import { Button } from "@heroui/button";

interface FileActionButtonsProps {
  activeTab: string;
  trashCount: number;
  folderPath: Array<{ id: string; name: string }>;
  onRefresh: () => void;
  onEmptyTrash: () => void;
}

export default function FileActionButtons({
  activeTab,
  trashCount,
  folderPath,
  onRefresh,
  onEmptyTrash,
}: FileActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <h2 className="text-2xl font-extrabold text-gray-900 truncate max-w-full">
        {activeTab === "all" &&
          (folderPath.length > 0
            ? folderPath[folderPath.length - 1].name
            : "All Files")}
        {activeTab === "starred" && "Starred Files"}
        {activeTab === "trash" && "Trash"}
      </h2>
      <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
        <Button
          variant="flat"
          size="sm"
          className="rounded-full text-blue-600 border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
          onClick={onRefresh}
          startContent={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
        {activeTab === "trash" && trashCount > 0 && (
          <Button
            color="danger"
            variant="flat"
            size="sm"
            className="rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            onClick={onEmptyTrash}
            startContent={<Trash className="h-4 w-4" />}
          >
            Empty Trash
          </Button>
        )}
      </div>
    </div>
  );
}