import * as type from 'src/admin/vuex/mutation-types'
import * as postAPI from 'api/post'

const state = {
  postDetails: null
}

const mutations = {
  [type.BLOG_RECEIVE_POST] (state, { postDetails }) {
    state.postDetails = postDetails
  },
  [type.BLOG_CHANGE_POST_TITLE] (state, { title }) {
    state.postDetails.title = title
  },
  [type.BLOG_CHANGE_POST_CONTENT] (state, { content }) {
    state.postDetails.content = content
  },
  [type.BLOG_CHANGE_POST_STATUS] (state, { status }) {
    state.postDetails.status = status
  },
  [type.BLOG_CHANGE_POST_COVER] (state, { coverImage }) {
    state.postDetails.coverImage = coverImage
  },
  [type.BLOG_CHANGE_POST_TAGS] (state, { tags }) {
    state.postDetails.tags = tags
  },
  [type.BLOG_SAVE_POST] (state, { postDetails }) {
    state.postDetails = postDetails
  }
}

const actions = {
  getPostDetails ({ commit }, postId) {
    commit(type.BLOG_RECEIVE_POST, { postDetails: null })
    postAPI.getPostDetails(postId).then(response => {
      commit(type.BLOG_RECEIVE_POST, { postDetails: response.data })
    })
  },
  changePostTitle ({ commit }, title) {
    commit(type.BLOG_CHANGE_POST_TITLE, { title })
  },
  changePostContent ({ commit }, content) {
    commit(type.BLOG_CHANGE_POST_CONTENT, { content })
  },
  changePostStatus ({ commit }, status) {
    commit(type.BLOG_CHANGE_POST_STATUS, { status })
  },
  changePostCover ({ commit }, coverImage) {
    commit(type.BLOG_CHANGE_POST_COVER, { coverImage })
  },
  changePostTags ({ commit }, tags) {
    commit(type.BLOG_CHANGE_POST_TAGS, { tags })
  },
  savePostDetails ({ commit }, postDetails) {
    postAPI.savePost(postDetails).then(response => {
      commit(type.BLOG_SAVE_POST, { postDetails: response.data })
    }).catch(error => {
      alert(error.errorMessage)
    })
  }
}

export default {
  state,
  mutations,
  actions
};
