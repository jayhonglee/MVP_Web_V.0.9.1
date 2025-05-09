import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function DescriptionEditorPage({
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
  setShowPostBtn,
}: {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  setShowPostBtn: (showPostBtn: boolean) => void;
}) {
  return (
    <>
      <SimpleEditor />

      <div className="w-full h-[30px] bg-transparent" />

      <div className="w-full">
        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setProgress(progress - 10);
            setShowPostBtn(false);
          }}
          className="w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-transparent border-[1px] border-[#989696]"
        >
          Back
        </button>

        <div className="w-full h-[24px] bg-transparent" />
      </div>

      <div className="w-full h-[60px] bg-transparent" />
    </>
  );
}
