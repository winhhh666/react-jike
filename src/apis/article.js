import { request } from "@/utils";

export function getChannelAPI() {
    return request({
        url:"/channels",
        method: "GET",

    })
}

export function createArticleAPI(params) {

    return request({
        url:"/mp/articles?draft=false",
        method: "POST",
        data: params
    })
}


export function getArticlesAPI(params) {
    const searchParams = new URLSearchParams(params);
    
    // 拼接到 URL 中
    const url = `/mp/articles${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return request({
        url,
        method: "GET",
    })
}