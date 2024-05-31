import Header from "./Header";
import RegisterForm from "./RegisterForm";

export default function Registration(){
    return(
        <div className="min-h-screen items-center justify-center flex py-4">
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full sm:w-[568px] px-6 mx-auto lg:py-0">
                <div className="py-12 w-full">
                    <Header/>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    )
}