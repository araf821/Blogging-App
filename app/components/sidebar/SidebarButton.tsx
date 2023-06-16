import { FC } from "react";

interface SidebarButtonProps {
  title: string;
  onClick: () => void;
}

const SidebarButton: FC<SidebarButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-lg border-2 border-zinc-900 bg-orange-50 px-5  py-3 font-medium text-gray-600 shadow-inner outline-none outline-offset-4 hover:outline-2 hover:outline-zinc-900"
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-zinc-800 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-zinc-800 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute left-0 top-0 h-0 w-full bg-zinc-800 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-full bg-zinc-800 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease relative transition-colors delay-150 duration-500 group-hover:text-white">
        <p className="text-xl font-bold md:text-2xl">{title}</p>
      </span>
    </button>
  );
};

export default SidebarButton;