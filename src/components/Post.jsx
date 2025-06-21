import { useEffect, useState } from 'react';
import { getPost, deletePost } from '../api/PostApi';
import Form from './Form';

const Post = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  const handledelete = async (id) => {
    try {
      const res = await deletePost(id);

      if (res.status === 200) {
        const newUpdatedPost = data.filter((item) => {
          return item.id !== id;
        });
        setData(newUpdatedPost);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = (element) => {
    setUpdateData(element);
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <Form
        data={data}
        setData={setData}
        updateData={updateData}
        setUpdateData={setUpdateData}
      ></Form>
      <div className="m-4 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data.map((item, index) => {
          return (
            <div
              key={item.id}
              className="bg-[#2a2f4a] text-white p-4 rounded-xl shadow-lg w-full max-w-xl mx-auto mt-5"
            >
              <p className="text-sm text-gray-400">{index + 1}</p>
              <p className="mt-2">
                <strong className="text-teal-300">Title: </strong>
                {item.title}
              </p>
              <p className="mt-3">
                <strong className="text-teal-300">Description: </strong>
                {item.body}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleUpdate(item)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded-md transition-all"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handledelete(item.id)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md transition-all 
              
              "
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
