'use client'
'use client'
import Holder from "../../holder"
import Hero from "../../preferences/hero"
import Section from "../../section"
import Link from "next/link";
import { useViewCustomers } from "../../services/swr-functions/customer-swr";
import MiniText from "../../minitext"
import EditHeading from "../../editHeading"
import Popup from "../../services/eventhandlers/popup"
import { useEffect, useContext } from "react";
import ConstantNav from "../../constantNav"
import { State_data } from "../../context/context"
import { dateStringChanger } from "../../services/api-url/customer-api-url"
import { useDateHandler } from "../../date"
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading"
import SuccessMessage from "../../successmessage"
export default function EditParcel({ params }: { params: {id: number}}){
  const handleCloseFill = () => {
    setOpenUIBoxes((prev: any) => ({...prev, customerPopup: false}))
  }
  const {viewCustomerData,
    viewCustomerError,
 viewCustomerIsLoading,
 viewCustomerIsValidating,
 viewCustomerMutate} = useViewCustomers(params.id);
 useEffect(() => {
   viewCustomerMutate();
 }, []);
 const {setDeleteWithId, deleteWithId, openUIBoxes, setOpenUIBoxes, successMessage} = useContext(State_data);
 
 return(
   <Holder>
        {
           viewCustomerIsLoading || viewCustomerIsValidating &&
          <SkeletonLoading title="customer details." />
        }
        {
          viewCustomerError &&
          <SuccessMessage
          id="failed"
          name="error"
          successMessageShow={successMessage.error}
          messageTitle="Sorry, can't load customers details. Check network connection!"
          />
        }
        <ConstantNav />
        <Section>
          <Link href="/dashboard/customers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
          </Link>
          <Hero comingsoon="Customer" 
          description={viewCustomerData?.data?.email + " | " + viewCustomerData?.data?.phone} 
          icon="icon ion-md-person" 
          heading={viewCustomerData?.data?.name}>
            <div className="flex justify-center items-center w-full gap-2">
              <button className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 phone:py-1 phone:px-2 phone:text-base tablet:py-2 tablet:px-3 tablet:text-lg rounded-lg"
                  onClick={() => {
                    setOpenUIBoxes((prev: any) => ({...prev, customerPopup: true}));
                    setDeleteWithId((prev: any) => ({...prev, customers: viewCustomerData?.data?.id}));
                  }}>
                Delete
              </button>
            </div>
            {openUIBoxes.customerPopup && <Popup text="Customer" name="customers" viewDelete={true} closeFill={handleCloseFill} popupShow={openUIBoxes.customerPopup} id={deleteWithId.customers} />}
            <EditHeading subheading="Email Address" />
            <MiniText minitext={viewCustomerData?.data?.email || 'N/A'} />

            <EditHeading subheading="Phone Number"/>
            <MiniText minitext={viewCustomerData?.data?.phone || 'N/A'} />

            <EditHeading subheading="Address"/>
            <MiniText minitext={viewCustomerData?.data?.address || 'N/A'} />

            <EditHeading subheading="Parcels Shipped"/>
            <MiniText minitext={viewCustomerData?.data?.parcels || '0'} />

            <EditHeading subheading="Created on"/>
            <MiniText minitext={viewCustomerData?.data?.createdAt?.slice(0, 10) || 'N/A'} />
            <MiniText minitext={'(' + useDateHandler(viewCustomerData?.data?.createdAt?.slice(0, 10)) + ')'} />

            <EditHeading subheading="Last updated on"/>
            <MiniText minitext={viewCustomerData?.data?.updatedAt?.slice(0, 10) || 'N/A'} />
            <MiniText minitext={'(' + useDateHandler(viewCustomerData?.data?.updatedAt?.slice(0, 10)) + ')'} />
          </Hero>
        </Section>
      </Holder>
    )
}