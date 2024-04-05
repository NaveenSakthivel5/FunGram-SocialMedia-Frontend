import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { HeartFilled, CommentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { likeOrUnlikePost, getAllPosts, addComment, editPost,deletePost } from '../redux/actions/postActions';
import { getAllUsers } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Row, Col, Input } from 'antd';
import axios from 'axios'
import './Post.css'
const { TextArea } = Input;

function Post({ post, postInProfilePage }) {

    const dispatch = useDispatch();
    const currentuser = JSON.parse(localStorage.getItem('user'))
    const alreadyLiked = post.likes.find(obj => obj.user.toString() == currentuser._id)

    const { likeOrUnlikeLoading, addCommentLoading, editPostLoading, deletePostLoading } = useSelector(
        (state) => state.alertsReducer
    );

    const [commentModalVisibility, setCommentModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);

    const [comment, setComment] = useState("");
    const [description , setdescription] = useState(post.description)

    const { users = [] } = useSelector((state) => state.usersReducer);

    const handleEditPost = async () => {
        try {
            await dispatch(editPost({ _id: post._id, description: description }));
            setEditModalVisibility(false);
        } catch (error) {
            console.error('Error updating post description:', error);
        }
    };

    useEffect(() => {
        dispatch(getAllPosts());
    }, [likeOrUnlikeLoading, addCommentLoading, editPostLoading, deletePostLoading]);

    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            setUsernames(post.comments);
        };

        fetchUsernames();
    }, [post.comments]);

    return (
        <div className="bs1 p-2 mt-3">

            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    {post.user.profilePicUrl == "" ? (
                        <span className="profilepic1 d-flex align-items-center">
                            {post.user.username[0]}
                        </span>
                    ) : (
                        <img src={post.user.profilePicUrl} height='35' width='35' style={{ borderRadius: '50%' }} />
                    )}
                    <Link className="ml-2">{post.user.username}</Link>
                </div>

                <div>
                    <p>{moment(post.createdAt).format("MMM DD yyyy")}</p>
                </div>
            </div>

            <img src={post.image} style={{height: postInProfilePage==true && '200px'}}   className="postimage w-100" />
            <br />

            <p className="mt1 mb-1 align-items-center">{post.description}</p>

            <div className={postInProfilePage ? 'd-flex align-items-center justify-content-between' : 'd-flex align-items-center'}>
                <div className="d-flex align-items-center mr-3">
                    <HeartFilled
                        style={{ color: alreadyLiked ? "red" : "grey" }}
                        onClick={() => { dispatch(likeOrUnlikePost({ postid: post._id })); }} />
                    <p>{post.likes.length}</p>
                </div>

                <div className="d-flex align-items-center">
                    <CommentOutlined
                        onClick={() => {
                            setCommentModalVisibility(true);
                        }}
                    />
                    <p>{post.comments.length}</p>
                </div>

                {(post.user._id == currentuser._id && postInProfilePage==true) && (<> 
                <div>
                    <DeleteOutlined onClick={() => {
                        dispatch(deletePost({ _id: post._id }))
                    }} />
                </div>

                <div>
                    <EditOutlined onClick={() => { setEditModalVisibility(true) }} />
                </div>
                </>)}

            </div>

            <Modal
                open={commentModalVisibility}
                title="Comments"
                closable={false}
                width={900}
                okText="Add comment"
                onOk={() => {
                    dispatch(addComment({ postid: post._id, comment: comment }));
                    setComment('');
                    setCommentModalVisibility(false);
                }}
                onCancel={() => {
                    setComment('');
                    setCommentModalVisibility(false);
                }}
            >
                <Row>
                    <Col lg={13} xs={0}>
                        <img src={post.image} height="400" className="w-100" />
                    </Col>
                    <Col lg={11} xs={24}>
                        <TextArea
                            placeholder="add your comment here"
                            className="ml-2"
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        />
                        {usernames.map((username, index) => (
                            <div key={index} className="comment-container">
                                <p className="comment-username">{username.username}</p>
                                <p className="comment-text">{username.comment}</p>
                                <p className="comment-date">{moment(username.createdAt).format('MMM DD, YYYY hh:mm A')}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Modal>

            <Modal title="Edit description" 
                closable={false}
                onOk={handleEditPost}
                okText='edit' 
                open={editModalVisibility} 
                onCancel={() => { setEditModalVisibility(false) }}>

                <Input value={description} onChange={(e) => { setdescription(e.target.value) }} />

            </Modal>

        </div>
    )
}

export default Post