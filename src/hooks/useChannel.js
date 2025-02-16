import { useState, useEffect } from "react"
import { getChannelAPI } from "@/apis/article"
export const useChannel = () => {
    const [channels, setChannels] = useState([])
    useEffect(() => {
        const fetchChannels= async() => {
        const res = await getChannelAPI();
        setChannels(res.data.channels);
        }
        fetchChannels();
    }, [])
    return {
        channels
    }
}