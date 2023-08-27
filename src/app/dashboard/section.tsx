export default function Section({children}: any){
    return(
        <section className="animate__animated animate__fadeIn w-full relative h-full m-auto tablet:px-10 phone:px-3 pb-20 z-0 top-24">
            {children}
        </section>
    )
}