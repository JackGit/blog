'use strict'

const adminRouter = require('koa-router')()
const tokenService = require('../services/token')
const postService = require('../services/post')
const userService = require('../services/user')

// user
adminRouter.post('/admin/user/login', userService.login)

// blog
adminRouter.post('/admin/blog/posts', tokenService.verifyToken, postService.create)  // new post
adminRouter.get('/admin/blog/posts', tokenService.verifyToken, postService.postListNotDeleted) // get post list, need handle pagination page=10&pageSize=10
adminRouter.get('/admin/blog/posts/:postId', tokenService.verifyToken, postService.postDetails) // get a post
adminRouter.put('/admin/blog/posts/:postId', tokenService.verifyToken, postService.update) // update post by a complete post object
adminRouter.patch('/admin/blog/posts/:postId', tokenService.verifyToken, postService.partialUpdate) // update field(s) of post
adminRouter.delete('/admin/blog/posts/:postId', tokenService.verifyToken, postService.delete)

module.exports = adminRouter
