// import React from "react";
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import Logo from "../assets/logo.svg";
// const Contacts = ({ contacts, currentUser }) => {
//   const [currentUsername, setCurrentUsername] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);
//   useEffect(() => {
//     if (currentUser) {
//       setCurrentUserImage(currentUser.avatarImage);
//       setCurrentUsername(currentUser.username);
//     }
//   }, [currentUser]);
//   const changeCurrentChat = (index, contact) => {};
//   return (
//     <>
//       currentUserImage && currentUsername &&(
//       <Container>
//         <div className="brand">
//           <img src={Logo} alt="Logo" />
//           <h3>Snappy</h3>
//         </div>
//         <div className="contacts">
//           {contacts.map((contact, index) => {
//             return (
//               <div
//                 className={`contact ${
//                   index === currentSelected ? "selected" : ""
//                 }`}
//                 key={index}
//               >
//                 <div className="avatar">
//                   <img
//                     src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
//                     alt="avatar"
//                   />
//                 </div>
//                 <div className="username">
//                   <h3>{contact.username}</h3>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="current-user">
//         <div className="avatar">
//                   <img
//                     src={`data:image/svg+xml;base64,${currentUserImage}`}
//                     alt="avatar"
//                   />
//                 </div>
//                 <div className="username">
//                   <h2>{currentUsername}</h2>
//                 </div>
//         </div>
//       </Container>
//       )
//     </>
//   );
// };
// const Container = styled.div`
// display:grid;
// grid-template-columns: 10% 75% 15%;
// background-color : #080420;
// .brand{
// display:flex;
// align-items : center;
// justify-content : center;
// gap : 1rem;
// img{
// height:2rem;
// }
// h3{
// color:white;
// text-transform:uppercase;
// }
// }
// .contacts{
// display:flex;
// flex-direction:column;
// align-items:center;
// overflow:auto;
// gap:0.8rem;
// .contact{
// background-color : #ffffff39
// }
// }
// `;

// export default Contacts;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const Contacts = ({ contacts, currentUser , changeChat }) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Snappy</h3>
          </div>

          {/* Contacts List */}
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={()=>changeCurrentChat(index,contact)}
              >
                <div className="avatar">
                  <img
                    src={
                      contact?.avatarImage?.startsWith("http")
                        ? contact.avatarImage
                        : `data:image/svg+xml;base64,${contact.avatarImage}`
                    }
                    alt="avatar"
                    onError={() =>
                      console.error(
                        "Invalid contact avatar:",
                        contact.avatarImage
                      )
                    }
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}

            {/* {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="avatar">
                  <img
                    src={
                      contact?.avatarImage?.startsWith("http")
                        ? contact.avatarImage
                        : `data:image/svg+xml;base64,${contact.avatarImage}`
                    }
                    alt="avatar"
                    onError={() =>
                      console.error(
                        "Invalid contact avatar:",
                        contact.avatarImage
                      )
                    }
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))} */}
          </div>

          {/* Current User */}
          <div className="current-user">
            <div className="avatar">
              <img
                src={
                  currentUserImage?.startsWith("http")
                    ? currentUserImage
                    : `data:image/svg+xml;base64,${currentUserImage}`
                }
                alt="avatar"
                onError={() =>
                  console.error(
                    "Invalid current user avatar:",
                    currentUserImage
                  )
                }
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
    background-color: #ffffff39;
    width:0.1rem;
    border-radius:1rem;
    }

    }

    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.2s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color:rgb(71, 48, 200);
   
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
