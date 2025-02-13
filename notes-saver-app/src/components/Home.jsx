import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=> state.paste.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p)=>p._id=== pasteId);
      setTitle(paste.title);
      setValue(paste.content)
    }
  }, [pasteId])
  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    
    
    if(pasteId){
      dispatch(updateToPaste(paste));
    }
    else{
      dispatch(addToPaste(paste))
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>{pasteId ? "Update Paste" : "Create My Paste"}</button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4, min-w-[500px] p-4"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
