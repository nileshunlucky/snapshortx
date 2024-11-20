import SnapEdit from "@/components/SnapEdit";
import Image from "next/image";

export default function SnapLayout({ children }) {
    return (
        <>
            <Image src="/logo.png" className="cursor-pointer mx-auto my-5" alt="Snapshortx" width={300} height={300} />
            <div className="flex">
                <div className="md:w-1/4 w-[12%]">
                    <SnapEdit />
                </div>
                <div className="md:w-3/4 w-[88%] border-t border-black">
                    {children}
                </div>
            </div>
        </>
    )
}