'use client'
'use client'
import Holder from "../../holder"
import Hero from "../../preferences/hero"
import Section from "../../section"
import Link from "next/link";
import { useDeleteParcels, useViewStaff } from "../../services/swr-functions/customer-swr";
import MiniText from "../../minitext"
import useDateHandler from "../../date"
import EditHeading from "../../editHeading"
import {useState } from "react";
import Popup from "../../services/eventhandlers/popup"
import { useEffect } from "react";
import ConstantNav from "../../constantNav";

export default function EditParcel({ params }: { params: {id: number}}){
  const [openUIBoxes, setOpenUIBoxes] = useState(false);
  const handleCloseFill = () => {
    setOpenUIBoxes(false)
  }
  useEffect(() => {
    viewStaffMutate();
  }, []);
  const {viewStaffData,
    viewStaffError,
    viewStaffIsLoading,
    viewStaffIsValidating,
    viewStaffMutate} = useViewStaff(params.id)
  const [id, setId] = useState<number>(0);
  let date  = new Date(viewStaffData?.data?.createdAt?.slice(0, 10))
  const {deleteParcelData} = useDeleteParcels(id);
    return(
      <Holder>
        <ConstantNav />
        <Section>
          <Link href="/dashboard/administrators" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
          </Link>
          <Hero comingsoon="Administrator" 
          description={viewStaffData?.data?.email + " | " + viewStaffData?.data?.phone} 
          icon="icon ion-md-person" 
          heading={viewStaffData?.data?.fullName}>
            <div className="flex justify-center items-center w-full gap-2">
              <Link href={`/dashboard/administrators/${viewStaffData?.data?.id}/edit`} className="bg-blue-500 border-4 hover:bg-blue-600 tablet:py-2 phone:py-1 text-gray-50 phone:text-base phone:px-2 tablet:px-3 tablet:text-lg rounded-lg">Edit</Link>
              <button className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 phone:py-1 phone:px-2 phone:text-base tablet:py-2 tablet:px-3 tablet:text-lg rounded-lg"
                  onClick={() => {
                    setOpenUIBoxes(true);
                    setId(viewStaffData?.data?.id)
                }}>
                Delete
              </button>
            </div>
            {openUIBoxes && <Popup closeFill={handleCloseFill} popupShow={openUIBoxes} id={id} />}
            <EditHeading subheading="Email Address" />
            <MiniText minitext={viewStaffData?.data?.email || 'N/A'} />

            <EditHeading subheading="Phone Number"/>
            <MiniText minitext={viewStaffData?.data?.phone || 'N/A'} />

            <EditHeading subheading="Address"/>
            <MiniText minitext={
                viewStaffData?.data?.address?.street 
                + " " + viewStaffData?.data?.address?.state 
                + ", " + viewStaffData?.data?.address.country
                || 'No'} />

            <EditHeading subheading="Created"/>
            <MiniText minitext={useDateHandler(date)} />
          </Hero>
        </Section>
      </Holder>
    )
}