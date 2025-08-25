import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { DownloadIcon, Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function RegulationModal({ open, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!open) return null;

  const handleFileDelete = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-white rounded-2xl shadow-xl px-9 py-7 h-[483px]  w-[720px]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#777777] hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="text-2xl font-bold text-center mb-6">
          レギュレーションチェック
        </div>
        <div className="border-t border-[#DDDDDD]  h-6 w-[720px] ml-[-36px]"></div>
        <div className="mb-8 px-5">
          <div className="font-medium mb-2 text-[13px]">
            ① レギュレーションチェック専用のExcelをダウンロードし必要事項を記載
          </div>
          <div className="text-sm text-gray-500 mb-4 ml-4">
            ※
            単語の校正と、法政が必要な文言に対して注意テキストを挿入することができます
          </div>
          <div className="flex justify-center">
            <Button
              className="flex h-10 min-w-[192px] mt-2 mb-2 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#212121] pr-[5px] pl-[24px] text-[12px] font-semibold text-white shadow-none hover:bg-[#212121E5]"
              onClick={() => {
                // Download regulation Excel logic
              }}>
              ダウンロード
              <DownloadIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="px-5">
          <div className="font-medium mb-2">
            ② 記載が終わったExcelをアップロードし、チェックを実行
          </div>
          {uploadedFile ? (
            <div className="flex items-center w-[608px] h-[60px] border border-[#DDDDDD] rounded bg-[#FAFAFA] px-6">
              <span className="flex-1 text-[#888]">{uploadedFile.name}</span>
              <button
                className="ml-2 text-gray-400 hover:text-red-500"
                type="button"
                onClick={handleFileDelete}
                tabIndex={0}>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="regulation-upload"
              className=" w-[608px] h-[160px] border border-[#DDDDDD] rounded-sm px-4 py-8 flex flex-col items-center justify-center cursor-pointer bg-[#FAFAFA] text-gray-500">
              ここにファイルをドロップ または{" "}
              <span className="mt-2 text-black border rounded-full bg-[#FFFFFF] border-[#DDDDDD] w-[192px] h-[40px] flex justify-center items-center ml-1">
                ファイルを選択
              </span>
              <input
                ref={fileInputRef}
                id="regulation-upload"
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUploadedFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          )}

          {uploadedFile && (
            <div className="flex justify-center mt-8">
              <Button
                type="button"
                className={`h-[48px] w-[240px] rounded-full px-16 py-6 text-base font-medium text-white transition ${
                  !uploadedFile
                    ? "cursor-not-allowed bg-[#CCCCCC] shadow-none"
                    : "cursor-pointer bg-gradient-to-r from-[#0186C9] to-[#056BE9] shadow-[6px_6px_18px_0_rgba(1,134,201,0.4)] hover:brightness-110"
                } `}>
                実行する
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
