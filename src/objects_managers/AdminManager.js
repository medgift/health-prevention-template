import { async } from "@firebase/util";
import { Docteur } from "../objects/Docteur";
import { CreateDocDocteur } from "./DocteurManager";
import { getUserById } from "./UserManager";

//Transform the User Doc Existant to a Docteur User
export async function AddNewDoctor(id_user){

    //Get back the current user document
    let user = getUserById(id_user);
    let doc = new Docteur(user.nom);
    doc.setId(user.id_user);

    //Create the document in doctor with the id_user
    CreateDocDocteur(doc);

    //Delete the user document related
    DeleteUserDoc(user.id_user);

}