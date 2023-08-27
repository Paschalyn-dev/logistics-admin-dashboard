'use client'
import { useRouter } from "next/navigation";
export default function NotFound(){
    const router = useRouter();
    const handleReloadDashboard = () => {
        router.replace('/dashboard/welcome')
    }
    return(
        <div className="flex h-screen w-full overflow-hidden justify-evenly bg-gray-100 rounded-3xl my-5 items-center flex-col">
            <div className="mx-20 text-center">
                <h1 className="font-bold mb-5 text-3xl">Uh...Oh...😥</h1>
                <span>
                    <p className="mb-2">The page you are looking for does not exist. Click here to return to the dashboard.</p>
                    <button onClick={handleReloadDashboard} className="underline font-bold text-amber-600">Go to Dashboard!</button>
                </span>
            </div>
            <h1 className="text-9xl drop-shadow-xl font-extrabold text-amber-600">404</h1>
        </div>
    )
}