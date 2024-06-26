import React, { useState, useEffect } from 'react';
import api from '../shared/api'
import ErrorMessage from '../shared/ErrorMessage';
import Loading from '../shared/Loading';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';

export default function UsersChat() {
  let loggedInUser = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null;
  const [searchText, setSearchText] = useState("")
  const [selectFile,] = useState("")
  const [text, setText] = useState("")
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const fetchUsers = () => {
    setLoading(true);
    api("http://localhost:4000/users", "GET")
      .then(response => {
        setUsers(response);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
  }
  //const handleDelete = (id) => {
  //  if (window.confirm("Are you sure want to delete?")) {
  //    setLoading(true);
  //    api("http://localhost:4000/users/" + id, "DELETE")
  //      .then(response => {
  //        let updatedData = [...users];
  //        let index = updatedData.findIndex(item => item.id === id);
  //        updatedData.splice(index, 1);
  //        setUsers(updatedData);
  //        setLoading(false);
  //      }).catch(err => {
  //        setError(err);
  //        setLoading(false);
  //      })
  //  }
  //}
  const fetchMessages = (user) => {
    setLoading(true);
    if (user.id === 5) {
      api("http://localhost:4000/messages?receiverId=" + user.id, "GET")
        .then(response => {
          setMessages(response);
          setLoading(false);
        }).catch(err => {
          setError(err);
          setLoading(false);
        })
    } else {
      api("http://localhost:4000/messages?userId=" + loggedInUser.id + "&receiverId=" + user.id + "&userId=" + user.id + "&receiverId=" + loggedInUser.id, "GET")
        .then(response => {
          setMessages(response);
          setLoading(false);
        }).catch(err => {
          setError(err);
          setLoading(false);
        })
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [])
  const selectUser = (user) => {
    setUser(user);
    fetchMessages(user);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0 && text.trim().length > 0) {
      setLoading2(true);
      let headers = { "content-type": "application/json" };
      let body = { text, userId: loggedInUser.id, receiverId: user.id, createdAt: new Date() }
      api("http://localhost:4000/messages", "POST", headers, body)
        .then(response => {
          let updatedMessages = [...messages];
          updatedMessages.push(body);
          setMessages(updatedMessages);
          setLoading2(false);
          setText("");
        }).catch(err => {
          setError(err);
          setLoading2(false);
        })
    } else {
      alert("Please enter your message!");
    }
  }
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "product");
    data.append("cloud_name", "dw0ywhvqe");
    fetch("https://api.cloudinary.com/v1_1/dw0ywhvqe/image/upload", {
      method: "post",
      body: data
    })
      .then(responce => responce.json())
      .then(data => {
        setLoading2(true);
        let headers = { "content-type": "application/json" };
        let body = { text, userId: loggedInUser.id, receiverId: user.id, createdAt: new Date(), multimedia: data.secure_url }
        api("http://localhost:4000/messages", "POST", headers, body)
          .then(response => {
            let updatedMessages = [...messages];
            updatedMessages.push(body);
            setMessages(updatedMessages);
            setLoading2(false);
            setText("");
          }).catch(err => {
            setError(err);
            setLoading2(false);
          })
        console.log(data);
      })
  }
  const deleteMessage = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      setLoading(true);
      api("http://localhost:4000/messages/" + id, "DELETE")
        .then(response => {
          let updatedData = [...messages];
          let index = updatedData.findIndex(item => item.id === id);
          updatedData.splice(index, 1);
          setMessages(updatedData);
          setLoading(false);
        }).catch(err => {
          setError(err);
          setLoading(false);
        })
    }
  }
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Chats </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">Chats</li>
          </ol>
        </nav>
      </div>
      {error && <ErrorMessage error={error} />}
      {loading ? <Loading /> : <div className="row">
        <div className="col-lg-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <input type="text" placeholder='Search messages or users' className='form-control mb-2' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                {users.length > 0 && users.filter(item => item.email !== "admin@gmail.com").filter(item => item.fullname.toLowerCase().indexOf(searchText.toLowerCase()) > -1).map((user, index) => (
                  <div>
                    <p onClick={() => selectUser(user)} className="cursor-pointer"><i className='mdi mdi-account' /> {user.fullname}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {user && Object.keys(user).length > 0 && <div className="col-lg-9 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <div className='shadow d-flex'>
                  <i className='mdi mdi-account m-2' />
                  <div className='m-2'>
                    <p className='mb-0'> {user.fullname} </p>
                    <small>{user.status}</small>
                    {/*<small>Typing...</small>*/}
                  </div>
                </div>
                {/* sender */}
                <div className='chat-box'>
                  {messages.length > 0 && messages.map((message, index) => (
                    <>
                      {loggedInUser !== null && loggedInUser.id === message.userId ?
                        <div className='d-flex mt-2 justify-content-end'>
                          <Dropdown>
                            <Dropdown.Toggle variant="bg-transparent" id="dropdownMenuButton1">
                              <i className='mdi mdi-dots-vertical m-1' />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => deleteMessage(message.id)}>Delete</Dropdown.Item>
                              <Dropdown.Item>Edit</Dropdown.Item>
                              <Dropdown.Item>Reply</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <div className=' m-1'>
                            {message.multimedia && message.multimedia.includes(".jpg") && <img src={message.multimedia} alt="chat" className="image-style" />}
                            {message.multimedia && !message.multimedia.includes(".jpg") && <a href={message.multimedia} rel="noopener noreferrer" target='_blank' className="image-style">View Attachment</a>}
                            {message.text && <p className='mb-0 bg-primary p-2 rounded'>{message.text}</p>}
                            <small>{moment(message.createdAt).format("DD-MM-YY hh:mm A")}</small>
                          </div>
                          <i className='mdi mdi-account m-1' />
                        </div> : <div className='d-flex mt-2'>
                          <i className='mdi mdi-account m-1' />
                          <div className=' m-1'>
                            {message.multimedia && message.multimedia.includes(".jpg") && <img src={message.multimedia} alt="chat" className="image-style" />}
                            {message.multimedia && !message.multimedia.includes(".jpg") && <a href={message.multimedia} rel="noopener noreferrer" target='_blank' className="image-style">View Attachment</a>}
                            {message.text && <p className='mb-0 bg-dark p-2 rounded'>{message.text}</p>}
                            <small>{moment(message.createdAt).format("DD-MM-YY hh:mm A")}</small>
                          </div>
                          <Dropdown>
                            <Dropdown.Toggle variant="bg-transparent" id="dropdownMenuButton1">
                              <i className='mdi mdi-dots-vertical m-1' />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => deleteMessage(message.id)}>Delete</Dropdown.Item>
                              <Dropdown.Item>Edit</Dropdown.Item>
                              <Dropdown.Item>Reply</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>}
                    </>
                  ))}
                </div>
                {/* input box */}
                <div className='bg-dark p-2 circle'>
                  <form className='d-flex align-items-center' onSubmit={handleSubmit}>
                    <input type="file" id="selectFile" value={selectFile} onChange={(e) => handleFile(e)} className="d-none" />
                    <label htmlFor='selectFile'><i className='mdi mdi-attachment m-1' /></label>
                    <input type="text" placeholder='Type your message....' className='form-control' value={text} onChange={(e) => setText(e.target.value)} />
                    {loading2 ? <i className='mdi mdi-refresh m-1 bg-primary p-1 circle w-10' /> : <button type="submit" className='m-1 bg-primary p-1 circle w-10'><i className='mdi mdi-send text-white' /></button>}
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>}
      </div>}
    </div>
  )
}
