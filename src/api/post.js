import request from '@/utils/request'

/**
 * 帖子管理
 */

// 发帖列表
/**
 * 
 * @param {number} pageNo 页号
 * @param {number} pageSize 页面大小
 * @param {string} tab 分栏，可选值 hot(热门)、latest(最新)
 * @returns 
 */
export function getPostList(pageNo, pageSize, tab) {
    return request(({
        url: '/post/list',
        method: 'get',
        params: { pageNo: pageNo, pageSize: pageSize, tab: tab }
    }))
}

// 帖子发布
export function createPost(createPostDTO) {
    return request({
        url: '/post/create',
        method: 'post',
        data: createPostDTO
    })
}

// 帖子详情
export function getPostDetail(id) {
    return request({
        url: `/post/detail`,
        method: 'get',
        params: {
            id: id
        }
    })
}

// 获取推荐帖子
export function getRecommendPosts(id) {
    return request({
        url: '/post/recommend',
        method: 'get',
        params: {
            id: id
        }
    })
}

// 更新帖子
export function updatePost(post) {
    return request({
        url: '/post/update',
        method: 'post',
        data: post
    })
}

// 删除帖子
export function detelePost(id) {
    return request({
        url: `/post/delete/${id}`,
        method: 'delete'
    })
}

// 关键词检索
export function searchByKeyword(query) {
    return request({
        url: `/post/search`,
        method: 'get',
        params: {
            keyword: query.keyword,
            pageNo: query.pageNo,
            pageSize: query.pageSize
        }
    })
}