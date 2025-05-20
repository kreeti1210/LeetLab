import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const usePlayListStore = create((set,get)=>({
    playlists:[],
    currentPlaylist:null,
    isLoading:false,
    error:null,

    createPlayList: async (playListData) => {
        try {
            set({isLoading:true})
            const response= await axiosInstance.post("/playlist/create-playlist",
            playListData);

            set((state)=>({
                playlists:[...state.playlists,response.data.playList],
            }));
            toast.success("Playlist created successfully")
            return response.data.playList;
        } catch (error) {
            console.error("Error creating playlist:", error);
            toast.error(
              error.response?.data?.error || "Failed to create playlist"
            );
            throw error; 
        }
        finally{
            set({isLoading:false})
        }
        
    }

}))