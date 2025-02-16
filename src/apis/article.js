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


export function getArticlesAPI() {
    return request({
        url:"/mp/articles",
        method: "GET",
    })
}