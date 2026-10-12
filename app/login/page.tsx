 "use client"  ; 
    
    import { useState} from "react";
    
    export default function Login() {
   const [email, setEmail] =useState("");
   const [password, setPassword] =useState("");
   const [error, setError] =useState("");

async function handleLogin(e: React.FormEvent <HTMLFormElement>) {
e.preventDefault()
setError("");

try{
    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}) ,
        }
    );

  const data = await  response.json() ;

if(!response.ok) {
    throw new Error (data.error || "Login failed");
}
sessionStorage.setItem("token", data.token);
window.location.href = "/admin";
} catch(err) {
    setError(
        err instanceof  Error ? err.message: "Something went wrong"
    );
}

}
    

    return(
<main className = "min-h-screen flex item-center justify-center p-6"    >
    <form onSubmit={handleLogin}
    className ="w-full max-w-md space-y-4 border rounded-lg p-6">

        <h1 className= "text-2xl front-bold">Admin Login</h1>
<div>
    <label htmlFor= "email"   className="block mb-1" >Email</label>
    <input 
    id="email"
    type="email"
    value={email}
    onChange = {(e) => setEmail (e.target.value)}
required 
className="w-full boder rounded  p-2"
    />
</div>

<div>
    <label htmlFor="password"  className="block mb-1"  >Password</label>
    <input
    id="password"
    type="password"
    value={password}
    onChange={(e)   => setPassword  (e.target.value)  } 
    required
    className="w-full border rounded p-2"
    
    />
    

</div>

{error &&  <p className = "text-red-600"> {error}</p>}
<button
 type="submit"
 className="w-full rounded bg-bllue-600 p-2 text-white"
 >Login</button>

</form>
</main>


    )
}