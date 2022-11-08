import React from "react";

//ENUM
export const AvailableRoles = {
    GUEST : "guest",
    PATIENT : "patient",
    ADMIN : "admin",
    DOCTOR : "doctor"
};

export const RoleContext = React.createContext({
    role: AvailableRoles.GUEST
})




