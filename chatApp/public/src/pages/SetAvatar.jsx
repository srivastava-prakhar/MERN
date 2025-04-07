// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import styled from "styled-components";
// // import loader from "../assets/loader.gif";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import axios from "axios";
// // import { setAvatarRoute } from "../utils/ApiRoutes";
// // import { Buffer } from "buffer";
// // const SetAvatar = () => {
// //   const api = "https://api.dicebear.com/8.x/adventurer/svg?seed=JohnDoe";
// //   const navigate = useNavigate();
// //   const [avatars, setAvatars] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedAvatar, setselectedAvatar] = useState(undefined);
// //   const toastOptions = {
// //     position: "bottom-right",
// //     autoClose: 5000,
// //     pauseOnHover: false,
// //     draggable: false,
// //     theme: "dark",
// //   };
// //   useEffect(() => {
// //     if (!localStorage.getItem("chat-app-user")) {
// //       navigate("/login");
// //     }
// //   }, []);

// //   const setProfilePicture = async () => {
// //     try {
// //       const user = JSON.parse(localStorage.getItem("chat-app-user"));
// //       if (!user) {
// //         alert("User data not found!");
// //         return;
// //       }

// //       if (selectedAvatar === undefined) {
// //         alert("Please select an avatar.");
// //         return;
// //       }

// //       const { data } = await axios.post(
// //         `${api}/auth/setAvatar/${user._id}`,
// //         { avatar: avatars[selectedAvatar] }
// //       );

// //       console.log("API Response:", data); // Debugging response

// //       if (data.status) {
// //         localStorage.setItem("chat-app-user", JSON.stringify(data.user));
// //         navigate("/");
// //       } else {
// //         alert(data.msg || "Failed to set avatar");
// //       }
// //     } catch (error) {
// //       console.error("Error setting avatar:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchAvatar = async () => {
// //       const data = [];
// //       for (let i = 0; i < 4; i++) {
// //         const image = await axios.get(
// //           `${api}/${Math.round(Math.random() * 1000)}`
// //         );
// //         // const buffer = Buffer.from(image.data, "utf-8");
// //         const buffer = new Buffer(image.data);
// //         data.push(buffer.toString("base64"));
// //       }
// //       setAvatars(data);
// //       setIsLoading(false);
// //     };
// //     fetchAvatar();
// //   }, []);

// //   return (
// //     <>
// //       {isLoading ? (
// //         <Container>
// //           <img src={loader} alt="loader" className="loader" />
// //         </Container>
// //       ) : (
// //         <Container>
// //           <div className="title-container">
// //             <h1>Pick an Avatar as your Profile picture</h1>
// //           </div>
// //           <div className="avatars">
// //             {avatars.map((avatar, index) => {
// //               return (
// //                 <div
// //                   key={index}
// //                   className={`avatar ${
// //                     selectedAvatar === index ? "selected" : ""
// //                   }`}
// //                 >
// //                   <img
// //                     src={`data:image/svg+xml;base64,${avatar}`}
// //                     alt="avatar"
// //                     onClick={() => setselectedAvatar(index)}
// //                   />
// //                 </div>
// //               );
// //             })}
// //           </div>
// //           <button className="submitBtn" onClick={setProfilePicture}>
// //             Set as Profile Picture
// //           </button>
// //         </Container>
// //       )}
// //       <ToastContainer />
// //     </>
// //   );
// // };
// // const Container = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   flex-direction: column;
// //   gap: 3rem;
// //   background-color: #131324;
// //   height: 100vh;
// //   width: 100vw;
// //   .loader {
// //     max-inline-size: 100%;
// //   }
// //   .title-container {
// //     h1 {
// //       color: white;
// //     }
// //   }
// //   .avatars {
// //     display: flex;
// //     gap: 2rem;
// //     .avatar {
// //       border: 0.4rem solid transparent;
// //       padding: 0.4rem;
// //       border-radius: 5rem;
// //       display: flex;
// //       justify-content: center;
// //       align-items: center;
// //       transition: 0.5s ease-in-out;
// //       img {
// //         height: 6rem;
// //       }
// //     }
// //     .selected {
// //       border: 0.4rem solid #4e0eff;
// //     }
// //   }
// //   .submitBtn {
// //     background-color: #997af0;
// //     color: white;
// //     padding: 1rem 2rem;
// //     border: none;
// //     font-weight: bold;
// //     cursor: pointer;
// //     border-radius: 0.4rem;
// //     font-size: 1rem;
// //     text-transform: uppercase;
// //     transition: 0.5s ease-in-out;
// //     &:hover {
// //       background-color: #4e0eff;
// //     }
// //   }
// // `;
// // export default SetAvatar;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/ApiRoutes';

const SetAvatar = () => {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
    };

    // useEffect(() => {
    //     if (!localStorage.getItem("chat-app-user")) {
    //         navigate("/login");
    //     }
    // }, [navigate]);
    useEffect(() => {
        const userData = localStorage.getItem("chat-app-user");
    
        if (!userData) {
            navigate("/login");
            return;
        }
    
        const user = JSON.parse(userData);
    
        if (user.isAvatarImageSet) {
            navigate("/chat");  // Redirect to chat if avatar is already set
        }
    }, [navigate]);
    
   
    

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const randomSeed = Math.random().toString(36).substring(7);
                const imageUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${randomSeed}`;
                data.push(imageUrl);
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an Avatar", toastOptions);
            return;
        }

        const userData = localStorage.getItem("chat-app-user");
        if (!userData) {
            toast.error("User data not found. Please log in again.", toastOptions);
            navigate("/login");
            return;
        }

        let user;
        try {
            user = JSON.parse(userData);
            console.log("User ID:", user._id);  // Debugging log
        } catch (error) {
            console.error("Error parsing user data:", error);
            toast.error("Invalid user data. Please log in again.", toastOptions);
            navigate("/login");
            return;
        }

        try {
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                avatarImage: avatars[selectedAvatar],  // Changed `image` to `avatarImage`
            });

            if (data.status) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.user.avatarImage;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/chat');
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        } catch (error) {
            console.error("Error setting avatar:", error);
            toast.error("Something went wrong. Try again.", toastOptions);
        }
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className='loader' />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your Profile Picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img src={avatar} alt="avatar" />
                            </div>
                        ))}
                    </div>
                    <button className='submitBtn' onClick={setProfilePicture}>
                        Set as Profile Picture
                    </button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
};

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader {
    max-inline-size: 100%;
}
.title-container {
    h1 {
        color: white;
    }
}
.avatars {
    display: flex;
    gap: 2rem;
    .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            height: 6rem;
        }
    }
    .selected {
        border: 0.4rem solid #4e0eff;
    }
}
button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
        background-color: #4e0eff;
    }
}
`;

export default SetAvatar;
