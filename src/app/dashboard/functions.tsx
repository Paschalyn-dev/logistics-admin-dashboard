'use client'
import { useRouter } from "next/navigation"

export const handleViewParcel = (id: any) => {
    const router = useRouter();
    console.log('dfghjk')
    router.replace(`/dashboard/shipments/${id}`);
}

export const handleEditParcel = (id: any) => {
    const router = useRouter();
    console.log('dfghjk')
    router.replace(`/dashboard/shipments/${id}/edit`);
}