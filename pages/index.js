import Head from 'next/head'
import Image from 'next/image'

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal.js"

export default function Home({ posts }) {

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("Title");
  const [body, setBody] = useState("Body");
  const [name, setName] = useState("Name");
  const [catchphrase, setCatchphrase] = useState("catchphrase");

  var data3 = JSON.parse(JSON.stringify(posts));

  async function loadUser(userId){
    const res = await fetch('https://jsonplaceholder.typicode.com/users/'+userId);
    const user = await res.json();
    var userdata = await JSON.parse(JSON.stringify(user));
    setName(userdata.name);
    setCatchphrase(userdata.company.catchPhrase);
  }

  return (
    <div>
       <div>
        <SOverlay><BackgroundSquareWrapper><BackgroundSquare></BackgroundSquare></BackgroundSquareWrapper></SOverlay>
       </div>
        {/*render a button for each post*/}
        {data3.map((post) => (
          <div>

            {/*change data and show the modal on button click*/}
            <PostContainer onClick={() => {
                setShowModal(true);
                setTitle(post.title);
                setBody(post.body);
                //setName("testname");
                loadUser(post.userId);
            }}>
                {post.title}
            </PostContainer>
          </div>
        ))}

        {/*one modal with dynamic data*/}
        <Modal catchphrase={catchphrase} name={name} title={title} children={body} onClose={() => setShowModal(false)} show={showModal}>{body}</Modal>
    </div>
  )

}
const SOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  z-index:-1;

`;
const BackgroundSquare = styled.div`
    background-color:black;
    position:fixed;
    width:795px;
    height:100%;
    border-radius:15px;
    z-index:-1;
    display:grid;
`;
const BackgroundSquareWrapper = styled.div`
    background: linear-gradient(45deg, red, purple);
    padding:1px;
    position:fixed;
    border-radius:15px;
    z-index:-1;
    display:flex;
    justify-content: center;
      align-items: center;
    width:800px;
        height:100%;

`;

const PostContainer = styled.div`
  height:60px;
  padding-left: 10px;
  padding-top: 5px;
  text-align: left;
  width:700px;
  color:white;
  border:grey;
  border-style:solid;
  border-width:1px;
  &:hover {
    background-color:grey;
    cursor:pointer;
  }
`;
const spacing = styled.div`
  padding-top: 10px;
  height:10px;
  text-align: left;
  width:700px;
`;


export async function getServerSideProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json();

  return {
    props: { posts, },
  }
}



