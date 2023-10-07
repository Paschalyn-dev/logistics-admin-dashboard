'use client'
import { boolean } from "yup";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Section from "../section";
import { useAllFetchReviews, useReviewsSearchRange } from "../services/swr-functions/customer-swr";
import { useState, useEffect, useContext } from "react";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import SubHeading from "../preferences/website/subheading";
import { useDateHandler } from "../date";
import { State_data } from "../context/context";
import SearchFilter from "./search";
import Popup from "../services/eventhandlers/popup";
import Input from "../input";

export default function Reviews(){
    const {successMessage, inputData, openUIBoxes, searchData, setOpenUIBoxes} = useContext<any | string>(State_data);
    const {fetchAllReviewsData, fetchAllReviewsError, fetchAllReviewsIsLoading, fetchAllReviewsIsValiddating, fetchAllReviewsMutate} = useAllFetchReviews();
    const excellentRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "EXCELLENT").length;
    const goodRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "GOOD").length;
    const poorRatings = fetchAllReviewsData?.data?.filter((data: any) => data.rating === "POOR").length;
    const excellentRatings2 = searchData?.reviewResult?.data?.filter((data: any) => data.rating === "EXCELLENT").length;
    const goodRatings2 = searchData?.reviewResult?.data?.filter((data: any) => data.rating === "GOOD").length;
    const poorRatings2 = searchData?.reviewResult?.data?.filter((data: any) => data.rating === "POOR").length;
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, reviewSearch: true, reviewClearData: true}))
    }
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, reviewClearData: false}))
    }

    useEffect(() => {
        fetchAllReviewsMutate(fetchAllReviewsData);
    }, [openUIBoxes.reviewClearData !== true]);

    return(
        <Holder>
               {
               (fetchAllReviewsIsLoading || fetchAllReviewsIsValiddating && !openUIBoxes.reviewSearch) &&
               <SkeletonLoading title="all reviews" />
               }
               {
                ((searchData?.reviewResult === "" && searchData?.reviewCode !== "") && openUIBoxes.reviewSearch) &&
                <SkeletonLoading loadingSearching="Searching" title="reviews" />                
               }
            <ConstantNav />
            <Section>
                <Heading heading="Customer Reviews" />
               {fetchAllReviewsData?.data?.length >= 0 && !openUIBoxes.reviewClearData && <p>You have <span className="font-bold">{fetchAllReviewsData?.data?.length || 0}</span> review{fetchAllReviewsData?.data?.length > 1 && "s"}.</p>}
               {searchData?.reviewResult !== '' && openUIBoxes.reviewClearData && <p><span className="font-bold">{searchData?.reviewResult?.data?.length || 0}</span> review(s) match(es) found.</p>}                
               <Input
                name="review"
                handleClick={handleOpenSearch}
                placeholder="Search Reviews"
                searchInput={inputData.review}
                />
                { openUIBoxes.reviewClearData &&
                <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
               {openUIBoxes.reviewSearch && <SearchFilter inputData={inputData.review} closeFill={setOpenUIBoxes} />}
               {
                   fetchAllReviewsError && successMessage.reviews &&
                    <SuccessMessage
                    successMessageShow={successMessage.reviews}
                    name="reviews"
                    id="failed"
                    messageTitle="Reviews cannot be fetched. Check network connection!"
                    />
                }
                <div className="flex gap-3 mt-5 justify-start items-center">
                    <p className="bg-green-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-6 laptop:py-6 phone:px-3 phone:py-4">
                        <span className="phone:text-lg laptop:text-xl font-bold">{!openUIBoxes.reviewClearData ? excellentRatings : excellentRatings2 || 0}</span> 
                        Excellent
                    </p>

                    <p className="bg-yellow-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-8 laptop:py-6 phone:px-5 phone:py-3">
                        <span className="phone:text-lg laptop:text-xl font-bold">{!openUIBoxes.reviewClearData ? goodRatings : goodRatings2 || 0}</span> 
                        Good
                    </p>

                    <p className="bg-red-100/50 phone:text-xs tablet:text-sm laptop:text-base desktop:text-lg flex flex-col justify-center items-center rounded-full laptop:px-8 laptop:py-6 phone:px-5 phone:py-3">
                        <span className="phone:text-lg laptop:text-xl font-bold">{!openUIBoxes.reviewClearData ? poorRatings : poorRatings2 || 0}</span> 
                        Poor
                    </p>
                </div>
                <div className="h-full flex flex-wrap tablet:justify-start phone:justify-center m-auto items-start tablet:gap-5 phone:gap-3 mt-5 w-full p-1">
                    {  fetchAllReviewsData?.data && !openUIBoxes.reviewClearData &&
                        fetchAllReviewsData.data.map((reviews: any) => {
                            return(
                                <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 flex justify-center items-center flex-col tablet:w-4/12 px-5 py-10">
                                    <div className="shadow-sm border px-1 py-2 text-4xl rounded-full">
                                        {reviews?.rating === "EXCELLENT" &&  '😁'}
                                        {reviews?.rating === "GOOD" &&  '🙂'}
                                        {reviews?.rating === "POOR" &&  '😩'}
                                    </div>
                                    <h1 className="font-bold capitalize phone:text-lg tablet:text-xl laptop:text-2xl mt-5">{reviews.rating}</h1>
                                    <p className="mb-5 text-gray-600 text-sm">{reviews?.user?.name || 'Anonymous'}</p>
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm">{reviews?.review || 'No rating'}</p>
                                        <p className="text-gray-400">{useDateHandler(reviews?.createdAt)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                    { !fetchAllReviewsIsLoading && fetchAllReviewsData?.data?.length === 0 && !openUIBoxes.reviewClearData && (
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-star"></i>
                            </span>
                            <br/>
                            <SubHeading subheading=" You don't have any review yet."/>
                        </div>
                    )}

                    {  searchData?.reviewResult?.data && openUIBoxes.reviewClearData &&
                        searchData?.reviewResult.data.map((reviews: any) => {
                            return(
                                <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 flex justify-center items-center flex-col tablet:w-4/12 px-5 py-10">
                                    <div className="shadow-sm border px-1 py-2 text-4xl rounded-full">
                                        {reviews?.rating === "EXCELLENT" &&  '😁'}
                                        {reviews?.rating === "GOOD" &&  '🙂'}
                                        {reviews?.rating === "POOR" &&  '😩'}
                                    </div>
                                    <h1 className="font-bold capitalize phone:text-lg tablet:text-xl laptop:text-2xl mt-5">{reviews.rating}</h1>
                                    <p className="mb-5 text-gray-600 text-sm">{reviews?.user?.name || 'Anonymous'}</p>
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm">{reviews?.review || 'No rating'}</p>
                                        <p className="text-gray-400">{useDateHandler(reviews?.createdAt)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                    { (searchData?.reviewResult?.data?.length === 0 || searchData?.reviewResult?.data === '' || searchData?.reviewResult?.code !== 200 && openUIBoxes.reviewClearData) && (
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-star"></i>
                            </span>
                            <br/>
                            <SubHeading subheading=" You don't have any review yet."/>
                        </div>
                    )}                 
                </div>
            </Section>
        </Holder>
    )
}