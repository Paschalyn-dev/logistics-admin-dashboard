import { useDateHandler } from "@/app/dashboard/date";
import { useAllFetchReviews } from "@/app/dashboard/services/swr-functions/customer-swr"
import { useEffect, useState } from "react";
import Message from "./message";
import Footer from "./footer";

export default function CustomerReviews(){
    const {fetchAllReviewsData} = useAllFetchReviews();
    const excellentRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "EXCELLENT").length;
    const goodRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "GOOD").length;
    const poorRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "POOR").length;
    const [mywindow, setWindow] = useState<any>(0)
    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindow(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
      });
    
      useEffect(() => {
        setWindow(window.innerWidth);
      }, []);
    return(
        <div className="text-center w-full flex flex-col items-start bg-gray-50 justify-center">
            <div className="w-screen p-10 relative">
                <h1 className="phone:text-2xl font-semibold" id={ mywindow > 760 ? "reviews" : ""}>Customer Reviews.</h1>
                <div className="flex gap-3 mt-5 justify-center items-center">
                    <p className="bg-green-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-6 laptop:py-6 phone:px-3 phone:py-4">
                        <span className="phone:text-lg laptop:text-xl font-bold">{excellentRatings || 0}</span> 
                        Excellent
                    </p>

                    <p className="bg-yellow-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-8 laptop:py-6 phone:px-5 phone:py-3">
                        <span className="phone:text-lg laptop:text-xl font-bold">{goodRatings || 0}</span> 
                        Good
                    </p>

                    <p className="bg-red-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-8 laptop:py-6 phone:px-5 phone:py-3">
                        <span className="phone:text-lg laptop:text-xl font-bold">{poorRatings || 0}</span> 
                        Poor
                    </p>
                </div>
                <div className="h-fit flex flex-wrap justify-center items-start gap-5 mt-5 w-full p-1">
                    {  fetchAllReviewsData?.data &&
                        fetchAllReviewsData.data.map((reviews: any) => {
                            return(
                                <div key={reviews.id} className="bg-gray-50 hover:shadow-lg rounded-xl h-60 phone:w-11/12 flex justify-center items-center flex-col tablet:w-4/12 shadow px-5 py-10">
                                    <div className="shadow-sm border px-1 py-2 text-4xl rounded-full">
                                        {reviews?.rating === "EXCELLENT" &&  '😁'}
                                        {reviews?.rating === "GOOD" &&  '🙂'}
                                        {reviews?.rating === "POOR" &&  '😩'}
                                    </div>
                                    <h1 className="font-bold capitalize phone:text-lg tablet:text-xl laptop:text-2xl mt-5">{reviews.rating}</h1>
                                    <p className="mb-5 text-gray-600 text-sm">{reviews?.user?.name || 'Anonymous'}</p>
                                    <div className="text-center">
                                        <p className="text-gray-400">{useDateHandler(reviews?.createdAt)}</p>
                                        <p className="text-gray-600 text-sm">{reviews?.review || 'No rating'}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
            <button className="mt-16 rounded-lg text-lg shadow p-4">More Reviews <span><i className="icon ion-md-arrow-down" /></span></button>
        </div>
        <Message />
        </div>
    )
}