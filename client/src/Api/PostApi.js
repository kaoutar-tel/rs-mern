import axios from 'axios'
const API =axios.create({baseURL:"http://localhost:5000"})
export const getTimelinePosts= (id)=> API.get(`post/timelineposts/${id}`);
export const likePost=(id,userId)=>API.put(`post/like/${id}`,{userId:userId});
export const deletePost=(postId,userId)=>API.delete(`post/delete/${postId}`,{data:{userId:userId}})
export const updatePost=(postId,updatedPost)=>API.put(`post/update/${postId}`,updatedPost)
export const getPostComments=(postId)=>API.get(`comment/postComments/${postId}`)
