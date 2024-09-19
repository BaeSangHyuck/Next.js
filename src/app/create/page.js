"use client"
import { useRouter } from "next/navigation";

export default function Create(){
    const router = useRouter();
    return (
       <form onSubmit={async(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+"topics", {
            method: "POST",
            body: JSON.stringify({ title: title, body:body }),
            headers: {
              "content-type": "application/json",
            },
          });
          const result = await resp.json();
          const lastId = result.id;
          console.log(result);
          router.refresh();
          router.push(`/read/${lastId}`)
       }}>
        <p>
            <input type="text" name ="title" placeholder="title"/>
        </p>
        <p>
            <textarea name="body" placeholder="body"/>
        </p>
        <p>
            <input type="submit" value="create"/>
        </p>
       </form>
    )
}