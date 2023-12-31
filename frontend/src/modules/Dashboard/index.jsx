import { useState, React,useEffect ,useRef} from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import {io} from 'socket.io-client';
import axios from "axios";  
const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState({});
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])

  console.log("messages:", messages);
	const messageRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])

  useEffect(() => {
    socket?.emit('addUser', user?.id)
    socket?.on('getUsers', users => {
      console.log("active users",users);
    })
    socket?.on('getMessage', (data) => {
      console.log("data:", data);
      setMessages((prev) => ({
        ...prev,
        messages: [...prev.messages, { user: data.user, message: data.message }],
        receiver: data.user
      }));
    });
    
    
    
  }, [socket])

  useEffect(() => {
		const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
    console.log("loggedInUser:", loggedInUser);

		const fetchConversations = async () => {
      try {
        console.log("loggedInUser?.id:", loggedInUser?.id);
        if(loggedInUser?.id){
        const res = await axios.get(`http://localhost:8000/api/conversations/${loggedInUser?.id}`)
         setConversation(res.data);
      }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    
    fetchConversations();
    
	}, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${user?.id}`);
        const resData = res.data;
        console.log("resp data list of users:", res);
        setUsers(resData);
      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
      }
    };
  
    fetchUsers();
  }, []);
  console.log("conversation:",conversation);
  
 //console.log("conversation:",conversation);
 const fetchMessages = async (conversationId,userId) => {
  try {
    if (conversationId === 'new') {
      console.log("Clicked on 'new', handle accordingly");
      const otherUser = conversation.find(conv => conv.conversationId === conversationId)?.user;
      //setMessages({ messages: [], receiver: {name:otherUser.name,email:otherUser.email} });
      setMessages({ messages: [], receiver: { name: 'New User', email: 'newuser@example.com' } });
      return;
    }
    const res = await axios.get(`http://localhost:8000/api/messages/${conversationId}`);
    const resData = res.data;
    
    // Assuming conversation has information about the other user
    const otherUser = conversation.find(conv => conv.conversationId === conversationId)?.user;
    console.log("otherUser:", otherUser);
    
    setMessages({ messages: resData, receiver: otherUser });
    console.log("messages:", messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
const sendMessage = async (e) => {
  setMessage('')
  socket?.emit('sendMessage', {
    senderId: user?.id,
    receiverId: messages?.receiver?.user?.receiverId,  // Update this line
    message,
    conversationId: messages?.conversationId
  });
  
  try {
    const res = await axios.post('http://localhost:8000/api/messages', {
      conversationId: messages?.conversationId,
      senderId: user?.id,
      message,
      receiverId: messages?.receiver?.receiverId
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data);
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
}


  return (
    <div className="w-[100%] flex gap-4 m-5">
      {/*
        isOpen ? (
            <div className='border shadow-md h-screen  flex flex-col justify-start p-2 items-center bg-blue-300 rounded-lg'>
            <IoIosArrowBack className="font-bold text-white text-xl text-center"
            onClick={handleOpen}/>
            <CgProfile className="font-bold text-gray-600 text-xl w-[20%]"/>
            <h1>Hello Anusmita</h1>
            </div>
        ):(
            <div className='bg-blue-500 w-[3%] rounded-lg p-2'>
            <IoIosArrowForward className="font-bold text-white text-xl text-center"
            onClick={handleOpen}/>

            </div>
        )
        
        */}

      <div className="border shadow-md h-full  flex flex-col justify-start p-5 items-center bg-blue-100 rounded-lg">
        <div className="border-b-2 border-gray-400">
          <CgProfile className="font-bold text-gray-600 text-xl " />
          <h1>Hello {user.name}</h1>
        </div>

        <div className="mt-10">
          <h1 className="font-semibold text-gray-700 text-lg">Messages</h1>
          <div className="flex flex-col gap-4 ">
            {
              conversation?.length>0?(
              conversation?.map((conversation) => (
              <div className=" flex flex-row gap-1 border-b-2 justify-start items-center  border-gray-300 p-3"
              onClick={()=>{fetchMessages(conversation?.conversationId,'')}}>
                <div className="flex items-center">
                  <img
                    src="https://res.cloudinary.com/dcugof3zo/image/upload/v1703953608/xuan-nguyen-zr0beNrnvgQ-unsplash_uvbuxw.jpg"
                    className="w-16 h-16 rounded-[100%] border-gray-300 border-2"
                    alt="img"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-semibold text-lg">{conversation?.user.name}</p>
                  <p className="text-md text-gray-700">{conversation.user.email}</p>
                </div>
              </div>)
            )):(
              <div className="font-bold mt-12">No conversations </div>
            )}
          </div>
        </div>
      </div>
      <div className="border shadow-md h-screen rounded-lg w-[65%] p-5 flex flex-col gap-4">
      {
          messages?.receiver?.name && (
            <div className="shadow-lg flex justify-start items-center gap-3 rounded-lg p-3">
            <img
            src="https://res.cloudinary.com/dcugof3zo/image/upload/v1703953608/xuan-nguyen-zr0beNrnvgQ-unsplash_uvbuxw.jpg"
            className="w-20 h-20 rounded-full border-gray-400 border-2"
              alt="img"
            />
            <div className="flex flex-col gap-3  items-center">
              <p className="font-bold text-start">{messages?.receiver?.name}</p>
              <p className="text-gray-700 text-md">{messages?.receiver?.email}</p>
            </div>
          </div>
          )
      }
        
        <div className="h-[80%] border overflow-y-scroll  custom-scrollbar sm:custom-scrollbar-md md:custom-scrollbar-lg lg:custom-scrollbar-xl">
          <div className="h-full px-10 py-14">
            {
              messages?.messages?.length > 0 ? (
                messages.messages.map(({ message, user }) => {
                  const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
                  const id = loggedInUser?.id;
                  const isCurrentUser = id === user?.senderId;
              
                  return (
                    <div
                      key={user.id}
                      className={`h-20 max-w-[60%] mb-10 text-sm rounded-b-xl ${
                        isCurrentUser ? 'rounded-tl-xl bg-purple-100 ml-auto text-black' : 'rounded-tr-xl bg-blue-500 text-white'
                      } p-4`}
                    >
                      {message}
                    </div>
                  );
                })
              ) : (
                <div className="font-bold text-lg m-20">No messages or conversation selected</div>
              )
              
            }
            
            
          </div>
        </div>
        {
          messages?.receiver?.name && (
            <div className="flex justify-between items-center">
              <input
                type="text"
                className="rounded-lg p-2 w-[92%] bg-gray-100"
                placeholder="Type a message here"
                value={message} onChange={(e) => setMessage(e.target.value)} 
              />
              <div className="flex items center gap-2 flex-row">
                <IoSend className="font-semibold text-xl text-gray-600 " onClick={() => sendMessage()} />
                <CiCirclePlus className="text-2xl text-gray-600 font-bold" />
              </div>
            </div>
          )
        }
        
       
          
      </div>
      <div className="border shadow-md h-screen rounded-lg w-[25%]">
      <h1 className="font-semibold text-lg m-5">People</h1>
      <div className="p-4">
      {
        users?.length>0?(
        users?.map((user) => (
        <div className=" flex flex-row gap-1 border-b-2 justify-start items-center  border-gray-300 p-3"
        onClick={()=>{fetchMessages('new',user.id)}}>
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dcugof3zo/image/upload/v1703953608/xuan-nguyen-zr0beNrnvgQ-unsplash_uvbuxw.jpg"
              className="w-16 h-16 rounded-[100%] border-gray-300 border-2"
              alt="img"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <p className="font-semibold text-lg">{user?.user.name}</p>
            <p className="text-md text-gray-700">{user?.user.email}</p>
          </div>
        </div>)
      )):(
        <div className="font-bold mt-12">No conversations </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Index;
