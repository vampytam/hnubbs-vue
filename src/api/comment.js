import request from '@/utils/request'

/**
 * 评论管理
 */

/**
 * 查询帖子下的所有评论
 * 
 */
export function fetchCommentsByPostId(postId) {
    return request({
        url: '/comment/get-comments',
        method: 'get',
        params: {
            postId: postId
        }
    })
}

/**
 * 
 * 添加评论
 */
export function addComment(commentDTO) {
    return request({
        url: '/comment/add-comment',
        method: 'post',
        data: commentDTO
    })
}

