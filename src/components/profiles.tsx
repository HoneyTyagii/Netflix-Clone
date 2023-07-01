import React from 'react'
import { useNavigate } from 'react-router-dom';
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import PlusCircle from "@heroicons/react/24/solid/PlusCircleIcon";
export default function Profiles({edit}:{edit:boolean}) {
    const navigate = useNavigate();
    function manageProfiles(){
        navigate("/ManageProfiles");
    }
    const heading = !edit? "Who's watching?":"Manage profiles";
  return (
  <>
  <h1 className="mb-8 text-5xl">{heading}</h1>
  <section className="flex gap-4">
  <ProfileCard edit={edit} />
  <ProfileCard edit={edit} />
  <AddProfile />
  </section>
  {edit ? (
  <></>
  ) : (
  <ProfileButton onClick={manageProfiles} className="mt-8" buttonType="secondary">Manage Profiles</ProfileButton>
  )}
    </>
    );
}

function ProfileButton({
    buttonType ="primary",
    ...props
}: {
    buttonType?: "primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>){
    return (
    <button {...props} className={`${buttonType ==="primary" ?  
    "bg-gray-100 text-dark hover:bg-netflixRed hover:text-white":
    "border border-white text-gray-400 hover:text-white"} 
    py-2 px-4 text-xl ${props.className}`} >
        {props.children}
    </button>
    );
}

function ProfileCard({edit}:{edit:boolean}){
    return (
    <section className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400 hover:text-white">
        <section className="relative h-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] w-[10vw]  min-w-[84px] overflow-hidden rounded-md border-gray-100 hover:border-4">
            <img src="/netflix-profile.png" alt="User profile image" />
            {edit ? (
            <button className="absolute inset-0 grid place-items-center bg-black/50">
                <PencilIcon className="w-[25%] text-white" />
            </button> 
            ): null}
        </section>
        <h1 className="text-xl">Profile name</h1>
    </section>
    );
}

function AddProfile(){
    return (
    <section className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400">
        <button className="h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] overflow-hidden rounded-md hover:border-gray-100 hover:bg-gray-400 hover:text-white">
            <PlusCircle className="w-[75%]" />
        </button>
    </section>
    );
}