import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'antd'
import Post from '../components/Post'
import { getAllPosts } from '../redux/actions/postActions';
import { useEffect } from "react"


function Home() {

  const dispatch = useDispatch();
  const { users } = useSelector(state => state.usersReducer)
  const { posts } = useSelector(state => state.postsReducer)

  useEffect(() => {
    dispatch(getAllPosts()); 
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Row justify='center'>
        <Col lg={12} xs={24}>
          {posts.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default Home