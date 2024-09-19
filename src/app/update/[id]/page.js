"use client"
import {useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title,setTitle] = useState();
  const [body,setBody] = useState();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`)
    .then((res)=>{return res.json()})
    .then(result=>{
      setTitle(result.title);
      setBody(result.body)
    }
    );
  }, []);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+`topics/`+id, {
          method: "PATCH",
          body: JSON.stringify({ title: title, body: body }),
          headers: {
            "content-type": "application/json",
          },
        });
        const result = await resp.json();
        const lastId = result.id;
        console.log(result);
        router.push(`/read/${lastId}`);
        router.refresh();
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" value={title}
        onChange={e=>setTitle(e.target.value)} />
      </p>
      <p>
        <textarea name="body" placeholder="body" value={body}
        onChange={e=>setBody(e.target.value)} />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
