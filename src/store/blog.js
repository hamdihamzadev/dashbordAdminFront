import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL

const state = {
    blogs: []
}

const mutations = {
    m_addBlog(state, newBlog) {
        state.blogs.push(newBlog)
    },

    m_getBlogs(state,blogs){
        state.blogs=blogs
    }
}



const actions = {
    async ac_addBlog({
        commit
    }, formBlog) {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(`${apiUrl}/api/blog/createBlog`, formBlog, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            const newBlog = response.data.newBlog
            commit('m_addBlog', newBlog)
        } catch (error) {
            console.log(error)
        }
    },

    async ac_getBlogs({commit}){
        try{
            const token = localStorage.getItem('token')
            const response= await axios.get(`${apiUrl}/api/blog/allBlogs`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const blogs= response.data.blogs
            commit('m_getBlogs', blogs)
        }
        catch(error){
            console.log(error)
        }
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}