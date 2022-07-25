import React from 'react'
import Profile from '../../img/defaultProfile.png'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { EllipsisOutlined ,HeartFilled,HeartOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useState } from 'react'
import { likePost } from '../../Actions/PostAction'
import { useEffect } from 'react'
import FollowButton from '../FollowButon/FollowButton'
import { useLocation } from 'react-router-dom'
import { getUser } from '../../Api/UserApi'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
const Post = ({post}) => {
  const {user} =useSelector((state)=>state.authReducer.authData)
  const {posts} =useSelector((state)=>state.postReducer)
  const [liked, setliked] = useState(post.likes?.includes(user._id))
  const [likes, setlikes] = useState(post.likes?.length)
  const [postOwner, setpostOwner] = useState(null)
  const [deleteModalOpened, setdeleteModalOpened] = useState(false)
  const [editModalOpend, seteditModalOpend] = useState(false)
  const location =useLocation()
  const dispatch =useDispatch()
  
  const menu = (
    <Menu
      items={[
        {
          label: <button className='border-none px-4 bg-none' onClick={()=>seteditModalOpend(true)}>Edit</button>,
          key: '0',
        },
        {
          label: <button className='border-none px-4 bg-none' onClick={()=>setdeleteModalOpened(true)}>Delete</button>,
          key: '1',
        }
      ]}
    />
  );

  const like=(id)=>{
    setliked((prev)=>!prev)
    liked ? setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
    dispatch (likePost(id,user._id))
  }
  const setLikekedEffect=()=>{
    setliked(post.likes?.includes(user._id))
    setlikes(post.likes?.length)
  }
  const getPostOwnerEffect=async()=>{
    const {data}=await getUser(post.userId)
    setpostOwner(data)
  }

  useEffect(() => {
    getPostOwnerEffect()
  
  }, [user,posts])
  

  return (
    <div className='Post'>

      {  postOwner && location.pathname=="/home" && 
        <div className={postOwner?._id !== user._id ? "w-100  flex items-center gap-[70%]":"w-100  flex items-center gap-[82%]"}> 
        <div className='flex items-center'>
            <img className='w-9 h-9 mr-2 object-cover rounded-full' src={postOwner?.profilePicture ? process.env.REACT_APP_STORAGE_URL + postOwner?.profilePicture: Profile} alt="" />
            <span className='font-medium text-sm'>
            {postOwner?.username}
            </span> 

        </div>
       
        {
        
          postOwner?._id !== user._id ?
          <div className='float-right ml-4'>
            <FollowButton profile={postOwner} />
          </div>
          :
          <div className="float-right w-3 ">
            <Dropdown overlay={menu} trigger={['click']} placement="bottom" arrow={{ pointAtCenter: true }}>
                <a onClick={e => e.preventDefault()} >
                  <Space>
                    <EllipsisOutlined style={{ fontSize: '16px', color: 'black' }} />
                  </Space>
                </a>
              </Dropdown>
          </div>
         
             
        }
       
        
      </div>
      }
        <img src={post.image && process.env.REACT_APP_STORAGE_URL+ post.image} alt="" className='object-cover'  />
            <div className="postReact items-center">
                
                {liked ?<HeartFilled onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#8e5aff"}}/> :<HeartOutlined onClick={()=>like(post._id)} style={{fontSize:"30px",color:"#404040"}} />}
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
                <span className='float-right text-xs'>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </div>
            <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
            
            <div className="detail">
                <span><b>{post.name}</b></span>
                <span> {post.desc}</span>
            </div>
            <DeleteModal modalOpened={deleteModalOpened} setModalOpened={setdeleteModalOpened} postOwnerId={post.userId} postId={post._id}/>
            <EditModal modalOpened={editModalOpend} setModalOpened={seteditModalOpend} post={post} />
    </div>
  )
}

export default Post