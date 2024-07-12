import { SiHashnode, SiOpenai } from "react-icons/si"

export function SidebarFooter() {
    return (
        <div className="flex flex-col items-center gap-2 mt-6 mb-4 sm:mb-0">
            <span className="text-xs opacity-70">Made possible by</span>
            <div className="bg-black/5 flex items-center justify-center text-2xl gap-4 p-2 rounded-full">
                <a href="https://hashnode.com/" target="_blank">
                    <SiHashnode className="text-primary" />
                </a>
                <a href="https://openai.com/" target="_blank">
                    <SiOpenai />
                </a>
            </div>
        </div>
    )
}
