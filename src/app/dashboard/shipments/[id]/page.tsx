'use client'
'use client'
import Holder from "../../holder"
import OrdersNav from "../../orders"
import Hero from "../../preferences/hero"
import Section from "../../section"
import Link from "next/link";
import { useDeleteParcels, useViewParcels } from "../../services/swr-functions/customer-swr";
import MiniText from "../../minitext"
import useDateHandler from "../../date"
import { NumberComma } from "../../numberComma"
import EditHeading from "../../editHeading"
import {useState, useContext } from "react";
import Popup from "../../services/eventhandlers/popup"
import { State_data } from "../../context/context"

export default function EditParcel({ params }: { params: {id: number}}){
  const [openUIBoxes, setOpenUIBoxes] = useState(false);
  const handleCloseFill = () => {
    setOpenUIBoxes(false)
} 
 const {viewParcelData} = useViewParcels(params.id)
 const {setDeleteWithId, deleteWithId} = useContext(State_data);
  const date = new Date (viewParcelData?.data?.createdAt.slice(0, 10));
    return(
      <Holder>
        <OrdersNav />
        <Section>
          <Link href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
          </Link>
          <Hero comingsoon="Not Picked" description={viewParcelData?.data?.trackId.toUpperCase()} icon="icon ion-md-cube" heading={viewParcelData?.data?.name}>
            <div className="flex justify-center items-center w-full gap-2">
              <Link href="" className="bg-green-500 border-4 hover:bg-green-600 phone:py-1 phone:px-2 tablet:py-2 phone:text-base text-gray-50 tablet:px-3 tablet:text-lg rounded-lg">Track</Link>
              <Link href={`/dashboard/shipments/${viewParcelData?.data?.id}/edit`} className="bg-blue-500 border-4 hover:bg-blue-600 tablet:py-2 phone:py-1 text-gray-50 phone:text-base phone:px-2 tablet:px-3 tablet:text-lg rounded-lg">Edit</Link>
              <button className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 phone:py-1 phone:px-2 phone:text-base tablet:py-2 tablet:px-3 tablet:text-lg rounded-lg"
                  onClick={() => {
                    setOpenUIBoxes(true);
                    setDeleteWithId((prev: any) => ({...prev, parcels: viewParcelData?.data?.id}));
                }}>
                Delete
              </button>
            </div>
            {openUIBoxes && <Popup text="Shipment" closeFill={handleCloseFill} popupShow={openUIBoxes} name="parcels" id={deleteWithId.parcels} />}
            <EditHeading subheading="Description" />
            <MiniText minitext={viewParcelData?.data?.description || 'N/A'} />

            <EditHeading subheading="Shipped"/>
            <MiniText minitext={useDateHandler(date)} />

            <EditHeading subheading="Fragile"/>
            <MiniText minitext={viewParcelData?.data?.fragile ? 'Yes' : 'No'} />

            <EditHeading subheading="Paid"/>
            <MiniText minitext={viewParcelData?.data?.paid ? 'Yes' : 'No'} />

            <EditHeading subheading="Estimated Distance"/>
            <MiniText minitext={viewParcelData?.data?.distance || 'N/A'} />

            <EditHeading subheading="Estimated Time"/>
            <MiniText minitext={viewParcelData?.data?.time || 'N/A'} />

            <EditHeading subheading="Cost ofSHipping"/>
            <MiniText minitext={viewParcelData?.data ? NumberComma(viewParcelData?.data?.amount) : '0'} />

            <EditHeading subheading="Payment Method"/>
            <MiniText minitext={viewParcelData?.data?.paymentType.replace(viewParcelData?.data?.paymentType[0], (letter: any) => letter.toUpperCase()).replace(/_/g, " ")} />

            <EditHeading subheading="Dispatcher"/>
            <MiniText minitext={viewParcelData?.data?.rider || 'N/A'} />

            <EditHeading subheading="Pickup"/>
            <MiniText minitext={viewParcelData?.data?.pickUp?.name || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.pickUp?.email || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.pickUp?.phone || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.pickUp?.address || 'N/A'} />

            <EditHeading subheading="Destination"/>
            <MiniText minitext={viewParcelData?.data?.destination.name || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.destination.email || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.destination.phone || 'N/A'} />
            <MiniText minitext={viewParcelData?.data?.destination.address || 'N/A'} />

          </Hero>
        </Section>
      </Holder>
    )
}