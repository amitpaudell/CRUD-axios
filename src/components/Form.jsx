import { useEffect, useState } from 'react';
import { postData, updateDataActual } from '../api/PostApi';

const Form = ({ data, setData, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    title: '',
    body: '',
  });

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const addPostData = async () => {
    try {
      const res = await postData(addData);

      if (res.status == 201) {
        setData([...data, res.data]);
        setAddData({ title: '', body: '' });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    updateData &&
      setAddData({
        title: updateData.title || '',
        body: updateData.body || '',
      });
  }, [updateData]);

  let isEmpty = Object.keys(updateData).length === 0;

  const updatePostData = async () => {
    try {
      const res = await updateDataActual(updateData.id, addData);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currentEl) => {
            return currentEl.id === res.data.id ? res.data : currentEl;
          });
        });

        setAddData({ title: '', body: '' });
        setUpdateData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === 'Add') {
      addPostData();
    } else if (action === 'Edit') {
      updatePostData();
    }
  };
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center gap-4 p-4 rounded-md shadow-md max-w-4xl mx-auto mt-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
          className="px-4 py-5 rounded-md outline-none w-1/3 text-white mr-6  bg-[#1e293b]"
        />

        <input
          type="text"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
          className="px-4 py-5 rounded-md outline-none w-1/2 text-white  bg-[#1e293b]"
        />

        <button
          value={isEmpty ? 'Add' : 'Edit'}
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-5 py-2 rounded-md transition-all"
        >
          {isEmpty ? 'Add' : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default Form;
