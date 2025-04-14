import { Link } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

// function Navbar({ user, onLogout }) {
//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/books" className="flex items-center">
//               <BookOpenIcon className="h-6 w-6 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-800">
//                 BookExchange
//               </span>
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Link to="/books" className="text-gray-600 hover:text-gray-900">
//               <HomeIcon className="h-5 w-5" />
//             </Link>

//             {user ? (
//               <>
//                 {user.role === "owner" && (
//                   <Link
//                     to="/add-book"
//                     className="text-gray-600 hover:text-gray-900"
//                   >
//                     <PlusIcon className="h-5 w-5" />
//                   </Link>
//                 )}
//                 <Link
//                   to="/dashboard"
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   <UserIcon className="h-5 w-5" />
//                 </Link>
//                 <button
//                   onClick={onLogout}
//                   className="ml-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/books" className="flex items-center">
              <BookOpenIcon className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                BookExchange
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              user.role === "seeker" ? (
                <>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/add-book"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <UserIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
