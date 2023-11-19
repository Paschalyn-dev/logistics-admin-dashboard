"use client"
import Link from "next/link";

type Nav = {
    link: string;
    icon: string;
    title: string;
    clicked: string;
    tooltip: string;
    handleClick: any;
};

export default function InsideNav({link, icon, tooltip, title, clicked, handleClick}: Nav){
    return(
        <div>
                <Link href={link}>
                    <button
                    onClick={() => handleClick(clicked)}
                    className={clicked === link ? "flex justify-center gap-2 items-center bg-amber-500/10 text-amber-500 py-3 px-6 w-fit rounded-full text-sm" : "flex justify-center w-fit text-sm p-5 gap-2 items-center"}>
                        <i id={clicked === link ? "yellow-color-innerdiv" : "white-color-innerdiv"} title={tooltip} className={icon}></i>
                        <p className={clicked === link ? "" : "mb-1 text-gray-500"}>{title}</p>
                    </button>
                </Link>
        </div>
    )
}