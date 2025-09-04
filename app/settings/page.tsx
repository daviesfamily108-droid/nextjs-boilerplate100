
"use client";
import { useEffect, useState } from "react";

export default function SettingsPage(){
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [avatar, setAvatar] = useState<string|null>(null);

  useEffect(()=>{
    setBold(localStorage.getItem("font_bold")==="1");
    setItalic(localStorage.getItem("font_italic")==="1");
    setAvatar(localStorage.getItem("avatar") || null);
  },[]);

  useEffect(()=>{
    document.body.style.fontWeight = bold ? "700" : "400";
    document.body.style.fontStyle = italic ? "italic" : "normal";
  }, [bold, italic]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const b64 = String(reader.result);
      setAvatar(b64);
      localStorage.setItem("avatar", b64);
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="max-w-3xl mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-700">
          {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover"/> : null}
        </div>
        <label className="btn-outline cursor-pointer">
          Change Profile Logo
          <input className="hidden" type="file" accept="image/*" onChange={onFile}/>
        </label>
      </div>

      <div className="flex gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={bold} onChange={e=>{ setBold(e.target.checked); localStorage.setItem("font_bold", e.target.checked? "1":"0"); }} />
          Bold
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={italic} onChange={e=>{ setItalic(e.target.checked); localStorage.setItem("font_italic", e.target.checked? "1":"0"); }} />
          Italic
        </label>
      </div>

      <button
        className="btn bg-rose-600 hover:bg-rose-500"
        onClick={()=>{ localStorage.clear(); location.reload(); }}
      >
        Remove All Local Data
      </button>
    </div>
  );
}
