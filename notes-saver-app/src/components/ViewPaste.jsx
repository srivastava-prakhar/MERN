
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { useSelector } from "react-redux";


const ViewPaste = () => {
  const {id}= useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);
  const paste = allPastes.filter((p)=>p._id === id)[0];
  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
      <input
        disabled
        className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
        type="text"
        placeholder="Enter Title Here"
        value={paste.title}
        onChange={(e) => setTitle(e.target.value)}
      />

    </div>
    <div className="mt-8">
      <textarea
        disabled
        className="rounded-2xl mt-4, min-w-[500px] p-4"
        value={paste.content}
        placeholder="Enter Content Here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div>
  )
}

export default ViewPaste
