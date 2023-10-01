'use client'
import Holder from "../../holder"
import Hero from "../../preferences/hero"
import Section from "../../section"
import Link from "next/link";
import { useViewDispatcher } from "../../services/swr-functions/customer-swr";
import MiniText from "../../minitext"
import useDateHandler from "../../date"
import EditHeading from "../../editHeading"
import Popup from "../../services/eventhandlers/popup"
import { useEffect, useState, useContext } from "react";
import ConstantNav from "../../constantNav"
import SubHeading from "../../preferences/website/subheading"
import { State_data } from "../../context/context"

export default function EditParcel({ params }: { params: {id: number}}){
  const {setDeleteWithId, deleteWithId, openUIBoxes, setOpenUIBoxes} = useContext(State_data);
  const handleCloseFill = () => {
    setOpenUIBoxes((prev: any) => ({...prev, dispatcherPopup: false}))
  }
  const {viewDispatcherData,
    viewDispatcherError,
    viewDispatcherIsLoading,
    viewDispatcherIsValidating,
    viewDispatcherMutate} = useViewDispatcher(params.id);
    useEffect(() => {
      viewDispatcherMutate();
    }, []);
    const date = new Date (viewDispatcherData?.data?.createdAt.slice(0, 10));
    return(
      <Holder>
        <ConstantNav />
        <Section>
          <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
          </Link>
          <Hero comingsoon="Rider" 
          description={viewDispatcherData?.data?.email + " | " + viewDispatcherData?.data?.phone} 
          icon="icon ion-md-person" 
          heading={viewDispatcherData?.data?.fullName}>
            <div className="flex justify-center items-center w-full gap-2">
              <Link href={`/dashboard/dispatchers/${viewDispatcherData?.data?.id}/edit`} className="bg-blue-500 border-4 hover:bg-blue-600 tablet:py-2 phone:py-1 text-gray-50 phone:text-base phone:px-2 tablet:px-3 tablet:text-lg rounded-lg">Edit</Link>
              <button className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 phone:py-1 phone:px-2 phone:text-base tablet:py-2 tablet:px-3 tablet:text-lg rounded-lg"
                  onClick={() => {
                    setOpenUIBoxes((prev: any) => ({...prev, dispatcherPopup: true}));
                    setDeleteWithId((prev: any) => ({...prev, dispatchers: viewDispatcherData?.data?.id}));
                  }}>
                Delete
              </button>
            </div>
            {openUIBoxes.dispatcherPopup && <Popup text="Dispatcher" viewDelete={true} closeFill={handleCloseFill} name="dispatchers" popupShow={openUIBoxes.dispatcherPopup} id={deleteWithId.dispatchers} />}

            <EditHeading subheading="Email Address" />
            <MiniText minitext={viewDispatcherData?.data?.email || 'N/A'} />

            <EditHeading subheading="Phone Number" />
            <MiniText minitext={viewDispatcherData?.data?.phone || 'N/A'} />

            <EditHeading subheading="Address" />
            <MiniText minitext={viewDispatcherData?.data?.address?.country + " "
                + viewDispatcherData?.data?.address?.state + " "
                + viewDispatcherData?.data?.address?.street || 'N/A'} />

            <EditHeading subheading="Created" />
            <MiniText minitext={useDateHandler(date)} />

            <SubHeading subheading="Documents" />

            <EditHeading subheading="Licence" />
            <MiniText minitext={viewDispatcherData?.data?.licence || 'No Lincence'} />

            <EditHeading subheading="Vehicle Particulars" />
            <MiniText minitext={viewDispatcherData?.data?.vehicle || 'No Vehicle Particulars'} />

            <EditHeading subheading="Insurance" />
            <MiniText minitext={viewDispatcherData?.data?.insurance || 'No Insurance Document'} />

            <EditHeading subheading="Road Worthiness" />
            <MiniText minitext={viewDispatcherData?.data?.roadWorthiness || 'No Document Provided'} />
          </Hero>
        </Section>
      </Holder>
    )
}