import { ActionType, ProfilesContextType, UserProfile } from "../common/types";


export default function profilesReducer(state:ProfilesContextType ,action:ActionType){
    const [type,payload] = action;
    switch(type){
        case "add":{
            const newProfile:UserProfile = {
                id: crypto.randomUUID(),
                name: payload.name as string,
                imageUrl: payload.imageUrl as string
            }
            const updatedProfiles = [...(state?.profiles??[]),newProfile];
        }
    }

    return state;
}
