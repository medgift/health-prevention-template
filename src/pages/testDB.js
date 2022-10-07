import {database} from "../initFirebase";

export default  function  test(){
    let users = database.getAll()

    return <h1>{users.toString()}</h1>

}