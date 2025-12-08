import { useEffect, useState } from "react"
import { getUserData } from "../src/https"
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../src/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


const useLoadData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            try {
                
                const { data } = await getUserData();
                console.log(data);
                const { _id , name , email , phone , role } = data.userData;
                dispatch(setUser({ _id , name , email , phone , role}));

            } 
            catch (error) {
                dispatch(removeUser());
                navigate("/auth");
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchUser();

    } , [dispatch , navigate]);

    return isLoading;
}


// const useLoadData = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [isLoading , setIsLoading] = useState(true);

//     useEffect(() => {
//         const token = localStorage.getItem('authToken'); // 👈 NEW: Get token from storage

//         // Set the Axios default header here to cover initial app load
//         // NOTE: This requires you to have access to your Axios instance in a separate file (e.g., `../src/https`)
//         // Assuming there is a function like `setAuthHeader` in your https file
//         if (token) {
//             // A function in your https.js that sets the Authorization header on your Axios instance
//             setAuthHeader(token); 
//         }

//         // If no token exists, skip the fetch attempt
//         if (!token) {
//             setIsLoading(false); // Finish loading state
//             return; // Exit the effect early
//         }

//         const fetchUser = async () => {
//             // ... rest of your try/catch logic remains the same ...
//             try {
//                 // If token exists, attempt to fetch user data
//                 const { data } = await getUserData(); 
//                 console.log(data);
//                 const { _id , name , email , phone , role } = data.userData;
//                 dispatch(setUser({ _id , name , email , phone , role}));

//             } 
//             catch (error) {
//                 // If token is expired/invalid, the catch block handles it
//                 dispatch(removeUser());
//                 navigate("/auth");
//                 console.log(error);
//             }
//             finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchUser();

//     } , [dispatch , navigate]);

//     return isLoading;
// }

export default useLoadData