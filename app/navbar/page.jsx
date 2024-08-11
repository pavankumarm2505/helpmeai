import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";



  function Navbar() {
    const handleLogout = () => {
      // Add logout functionality here
      console.log('User logged out');
    };
    const [user] = useAuthState(auth)
    const router = useRouter();
  
    return (
      <nav className="bg-gray-800 p-4 w-full rounded">
        <div className="container flex justify-between items-center mx-auto max-w-full px-4">
          <div className="text-white text-2xl font-bold" >
            HelpAI
          </div>
          <button
            onClick={() => signOut(auth)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;