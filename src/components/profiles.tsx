import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon";
import Modal from "./modal";
import {
  useProfilesContext,
  useProfilesDispatchContext,
} from "../common/profiles-context";
import { ActionType, UserProfile } from "../common/types";

export default function Profiles({ edit }: { edit: boolean }) {
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const navigate = useNavigate();
  const userProfiles = useProfilesContext()?.profiles?.slice(0, 3) || [];
  const dispatch = useProfilesDispatchContext() as React.Dispatch<ActionType>;
  const [profile, setProfile] = useState<UserProfile | undefined>();

  function manageProfiles() {
    navigate("/ManageProfiles");
  }

  function closeEditor() {
    setIsProfileEditorOpen(false);
  }

  function openEditor() {
    setIsProfileEditorOpen(true);
  }

  function onProfileClick(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    navigate("/browse");
  }

  function onEditProfile(profile: UserProfile) {
    setProfile(profile);
    openEditor();
  }

  function onAddProfile() {
    const newProfile: UserProfile = {
      id: "",
      name: "",
      imageUrl: `/profile-${(userProfiles.length ?? 0) + 1}.png`,
    };
    setProfile(newProfile);
    openEditor();
  }

  function onSaveProfile(profile: UserProfile) {
    const action: ActionType = {
      type: profile.id ? "edit" : "add",
      payload: profile,
    };
    dispatch(action);
    setIsProfileEditorOpen(false);
  }

  function onDeleteProfile(profile: UserProfile) {
    dispatch({ type: "delete", payload: profile });
    setIsProfileEditorOpen(false);
  }

  const heading = !edit ? "Who's watching?" : "Manage profiles:";

  return (
    <>
      <h1 className="mb-8 text-5xl">{heading}</h1>
      <section className="flex gap-4">
        {userProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            onProfileClick={onProfileClick}
            profile={profile as UserProfile}
            onEditClick={onEditProfile}
            edit={edit}
          />
        ))}
        {userProfiles.length < 3 ? <AddProfile onAddProfile={onAddProfile} /> : null}
      </section>
      {profile ? (
        <EditProfile
          edit={edit}
          isOpen={isProfileEditorOpen}
          title=""
          onClose={closeEditor}
          profile={profile}
          onSave={onSaveProfile}
          onDelete={onDeleteProfile}
        />
      ) : null}
      {edit ? (
        <>
          <ProfileButton className="mt-8" onClick={() => navigate("/")}>
            Done
          </ProfileButton>
        </>
      ) : (
        <ProfileButton
          onClick={manageProfiles}
          className="mt-8"
          buttonType="secondary"
        >
          Manage Profiles
        </ProfileButton>
      )}
    </>
  );
}

function ProfileButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${buttonType === "primary"
        ? "bg-gray-100 text-dark hover:bg-netflixRed hover:text-white"
        : "border border-white text-gray-400 hover:text-white"} 
        py-2 px-4 text-xl ${props.className}`}
    >
      {props.children}
    </button>
  );
}

function ProfileCard({
  edit,
  onEditClick,
  profile,
  onProfileClick,
}: {
  edit: boolean;
  onEditClick: (profile: UserProfile) => void;
  onProfileClick: (profile: UserProfile) => void;
  profile: UserProfile;
}) {
  function editClick(event: React.SyntheticEvent) {
    event.stopPropagation();
    onEditClick(profile);
  }

  return (
    <section
      onClick={() => onProfileClick(profile)}
      id={profile.id}
      className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400 hover:text-white"
    >
      <section className="relative h-[10vw] max-h-[200px] max-w-[200px] min-h-[84px] w-[10vw]  min-w-[84px] overflow-hidden rounded-md border-gray-100 hover:border-4">
        <img src={profile.imageUrl} alt={profile.name} />
        {edit ? (
          <button
            className="absolute inset-0 grid place-items-center bg-black/50"
            onClick={editClick}
          >
            <PencilIcon className="w-[25%] text-white" />
          </button>
        ) : null}
      </section>
      <h1 className="text-xl">{profile.name}</h1>
    </section>
  );
}

function AddProfile({ onAddProfile }: { onAddProfile: () => void }) {
  return (
    <section className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400">
      <button
        onClick={onAddProfile}
        className="grid place-items-center h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] overflow-hidden rounded-md hover:border-gray-100 hover:bg-gray-400 hover:text-white"
      >
        <PlusCircleIcon className="w-[75%]" />
      </button>
    </section>
  );
}

function EditProfile(props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
  profile: UserProfile;
  onSave?: (profile: UserProfile) => void;
  onDelete: (profile: UserProfile) => void;
}) {
  const heading = props.profile.id ? "Edit Profile" : "Add Profile";

  function cancelEdit() {
    props.onClose(false);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { profileName } = event.target as typeof event.target & {
      profileName: HTMLInputElement;
    };
    if (props.onSave) {
      const profile: UserProfile = {
        name: profileName.value,
        id: props?.profile.id,
        imageUrl: props?.profile.imageUrl,
      };
      props.onSave(profile);
    }
  }

  return (
    <Modal {...props}>
      <section className="h-screen w-screen">
        <form onSubmit={onSubmit} className="mx-auto my-16 max-w-4xl">
          <h1 className="mb-4 text-6xl">{heading}</h1>
          <section className="grid grid-cols-[200px_auto] gap-4 border-t border-b p-4 text-gray-100">
            <section className="aspect-square overflow-hidden rounded-md">
              <img src={props.profile.imageUrl} alt="profile image" />
            </section>
            <section className="flex flex-col gap-4">
              <label htmlFor="profileName" className="text-xl">
                Name
              </label>
              <input
                type="text"
                id="profileName"
                defaultValue={props.profile.name}
                required
                className="bg-transparent border-b border-gray-100 p-2 text-white text-lg"
              />
            </section>
          </section>
          <section className="flex gap-4 mt-8">
            <ProfileButton
              onClick={cancelEdit}
              className="flex-1"
              buttonType="secondary"
            >
              Cancel
            </ProfileButton>
            <ProfileButton type="submit" className="flex-1">
              Save
            </ProfileButton>
            {props.edit && props.profile.id ? (
              <ProfileButton
                onClick={() => props.onDelete(props.profile)}
                className="flex-1"
                buttonType="secondary"
              >
                Delete
              </ProfileButton>
            ) : null}
          </section>
        </form>
      </section>
    </Modal>
  );
}
