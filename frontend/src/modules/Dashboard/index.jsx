import { useState, React } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const item = [
    {
      id: 1,
      name: "John Doe",
      img: "https://example.com/john-doe.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      img: "https://example.com/jane-smith.jpg",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      img: "https://example.com/bob-johnson.jpg",
      status: "Pending",
    },
    {
      id: 4,
      name: "Alice Williams",
      img: "https://example.com/alice-williams.jpg",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Brown",
      img: "https://example.com/charlie-brown.jpg",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Eva Martinez",
      img: "https://example.com/eva-martinez.jpg",
      status: "Pending",
    },
  ];

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
          <h1>Hello Anusmita</h1>
        </div>

        <div className="mt-10">
          <h1 className="font-semibold text-gray-700 text-lg">Messages</h1>
          <div className="flex flex-col gap-4 ">
            {item.map((item) => (
              <div className=" flex flex-row gap-1 border-b-2 justify-start items-center  border-gray-300 p-3">
                <div className="flex items-center">
                  <img
                    src={item.img}
                    className="w-16 h-16 rounded-full border-gray-300 border-2"
                    alt="img"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-md text-gray-700">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border shadow-md h-screen rounded-lg w-[55%] p-5 flex flex-col gap-4">
        <div className="shadow-lg flex justify-start items-center gap-3 rounded-lg p-3">
          <img
            src=""
            className="w-20 h-20 rounded-full border-gray-400 border-2"
            alt="img"
          />
          <div className="flex flex-col gap-3  items-center">
            <p className="font-bold ">Alex</p>
            <p className="text-gray-700 text-md">Active</p>
          </div>
        </div>
        <div className="h-[80%] border  overflow-scroll">
          <div className="h-[1000px] px-10 py-14">
            <div className="h-20 max-w-[60%] mb-10 text-sm rounded-b-xl rounded-tl-xl bg-blue-500 text-white p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              neque.
            </div>
            <div className="h-20 max-w-[60%] text-sm mb-10 rounded-b-xl rounded-tl-xl bg-purple-300 ml-auto p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, rerum.
            </div>
            <div className="h-20 max-w-[60%] mb-10 text-sm rounded-b-xl rounded-tl-xl bg-blue-500 text-white p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              neque.
            </div>
            <div className="h-20 max-w-[60%] text-sm mb-10 rounded-b-xl rounded-tl-xl bg-purple-300 ml-auto p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, rerum.
            </div>
            <div className="h-20 max-w-[60%] mb-10 text-sm rounded-b-xl rounded-tl-xl bg-blue-500 text-white p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              neque.
            </div>
            <div className="h-20 max-w-[60%] text-sm mb-10 rounded-b-xl rounded-tl-xl bg-purple-300 ml-auto p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, rerum.
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <input type="text" className=" rounded-lg p-2 w-[92%] bg-gray-100" 
          placeholder="Type a message here"/>
          <div className="flex items center gap-2 flex-row">
          <IoSend className="font-semibold text-xl text-gray-600 "/>
          <CiCirclePlus className=" text-2xl text-gray-600 font-bold"/>

          </div>
          </div>
          
      </div>
      <div className="border shadow-md h-screen rounded-lg w-[25%]"></div>
    </div>
  );
};

export default Index;
