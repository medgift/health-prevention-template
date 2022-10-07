import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import Algorithm from "./Algorithm";

export default function Info() {
 

  return <h1><Algorithm></Algorithm></h1>;
}
