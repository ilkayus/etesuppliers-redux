import { useSelector } from "react-redux";
import { selectAuth } from "features/authorization/authSlice";

export const useAuth = () => useSelector(selectAuth);
