import { Button, Col, Row, Modal } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Post from "../components/Post";
import { getAllUsers } from "../redux/actions/userActions";
import { getAllPosts } from '../redux/actions/postActions';

function Profile() {
  const dispatch = useDispatch();
  const { users} = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  const { userid } = useParams();
  const usersposts = posts.filter((obj) => obj.user._id == userid);
  const currentuser = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, [dispatch]);
  
  const user = users.find((obj) => obj._id === userid);
  
  const [followersModalDisplay, setfollowersModalDisplay] = useState(false);
  const [followingModalDisplay, setfollowingModalDisplay] = useState(false);

  return (
    <DefaultLayout>

        {users.length > 0 && (
        <>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
            
            <div className="bs1 m-2 p-2 text-left">
                <div className="d-flex align-items-center">
                  {user.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                    {user.username[0]}
                </span>
                  ) : (
                    <img src={user.profilePicUrl} height="60" width="60" />
                  )}

                  <div className="text-left ml-3">
                    <p style={{ color: "black" }} >{user.username}</p>
                    <p style={{ fontSize: 15 }}>{moment(user.createdAt).format('MM DD YYYY')}</p>

                    {currentuser._id == userid && (
                      <Button>
                        <Link to="/editprofile">Edit profile</Link>
                      </Button>
                    )}
                  </div>
                </div>

                <p style={{ color: "black", fontSize: 16 }}>
                  {user.bio == "" ? "Frontend Developer" : user.bio}
                </p>
                <div className="text-left">
                  <Button
                 
                  className="mr-2" onClick={()=>{setfollowersModalDisplay(true)}} >
                    Followers : {user.followers.length}
                  </Button>
                  <Button onClick={()=>{setfollowingModalDisplay(true)}}>Following : {user.following.length}</Button>
                </div>        
                <p style={{ color: "black", fontSize: 16 }}>
                  Total posts : {usersposts.length}
                </p>
            </div>      
            </Col>
          </Row>
                      
          <Row gutter={16} justify="center">
              {usersposts.map((post) => {
                return (
                  <Col key={post._id} lg={5} sm={24} xs={24}>
                    <Post post={post} postInProfilePage={true} />
                  </Col>
                );
              })}
          </Row>     

          <Modal
            title="Followers"
            open={followersModalDisplay}
            closable={false}
            onCancel={() => {
              setfollowersModalDisplay(false);
            }}
            onOk={()=>{
              setfollowersModalDisplay(false);
            }}
          >
            {user.followers.map((obj, index) => {
              const followeruser = users.find((o) => o._id == obj);

              return (
                <div key={index} className="d-flex align-items-center bs1 p-1 mt-2">
                  {followeruser.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followeruser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followeruser.profilePicUrl}
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <div className='ml-2'>
                      <div style={{ margin : 2}}><Link>{followeruser.username}</Link></div>
                      <div style={{ margin : 2}}>Created on {moment(followeruser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
                </div>
              );
            })}
          </Modal>    

          <Modal
            title="Following"
            open={followingModalDisplay}
            closable={false}
            onCancel={() => {
              setfollowingModalDisplay(false);
            }}
            onOk={()=>{
              setfollowingModalDisplay(false);
            }}
          >
            {user.following.map((obj, index) => {
              const followinguser = users.find((o) => o._id == obj);

              return (
                <div key={index} className="d-flex align-items-center bs1 p-1 m-2">
                  {followinguser.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followinguser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followinguser.profilePicUrl}
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <div className='ml-2'>
                      <div style={{ margin : 2}}><Link>{followinguser.username}</Link></div>
                      <div style={{ margin : 2}}>Created on {moment(followinguser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
                </div>
              );
            })}
          </Modal>

        
        </>)}

    </DefaultLayout>
  )
}

export default Profile