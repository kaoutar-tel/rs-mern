import * as UploadApi from '../Api/UplaodApi'
import {toast } from 'react-toastify';
export const uploadAction=(data)=>async (dispatch)=>{
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
   
}
export const uploadPost=(data)=>async (dispatch)=>{
    dispatch({type:"UPLAOD_START"})
    try {
        const res=await UploadApi.uploadPost(data)
        dispatch({type:"UPLAOD_SUCCESS",data:res.data.post})
        toast.success('Post added succesfully ', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
       
    } catch (error) {
        var errMsg
        if (error.response.data.message) 
            errMsg=error.response.data.message
        else
            errMsg=error.response.data
        toast.error(errMsg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch({type:"UPLAOD_ERROR"})
    }
}