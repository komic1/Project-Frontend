import Link from "next/link";

function LogOut(){
    
    return <div>
    <h1> You have been logged out</h1>
    <Link href="/dashboard">Log in again</Link>
    </div>
    
}
export default LogOut;