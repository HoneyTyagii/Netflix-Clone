import { ActionType, ProfilesContextType, UserProfile } from "../common/types";

export default function profilesReducer(state: ProfilesContextType, action: ActionType) {
  const { type, payload } = action; // Use object destructuring to access type and payload properties

  switch (type) {
    case "add": {
      const newProfile: UserProfile = {
        id: crypto.randomUUID(),
        name: payload.name as string,
        imageUrl: payload.imageUrl as string,
      };
      const updatedProfiles = [...(state?.profiles ?? []), newProfile];
      const updatedState: ProfilesContextType = {
        profiles: updatedProfiles,
        selectedProfileId: state?.selectedProfileId,
      };
      return updatedState;
    }
    case "edit": {
      const index = state.profiles?.findIndex((profile) => profile.id === payload.id) ?? -1;
      if (index > -1 && state) {
        const updatedState = { ...state };
        updatedState.profiles?.splice(index, 1, {
          ...updatedState.profiles[index],
          name: payload.name as string,
        });
        return updatedState;
      }
      break; // Add a break statement here to exit the case block
    }
    case "delete": {
      if (state) {
        let updatedState = { ...state };
        updatedState.profiles = updatedState.profiles.filter((profile) => profile.id !== payload.id);
        return updatedState;
      }
      break; // Add a break statement here to exit the case block
    }
    case "current": {
      if (state) {
        const updatedState: ProfilesContextType = {
          ...state,
          selectedProfileId: payload.id as string,
        };
        return updatedState;
      }
      break; // Add a break statement here to exit the case block
    }
    case "load": {
      return payload;
    }
  }

  return state;
}
