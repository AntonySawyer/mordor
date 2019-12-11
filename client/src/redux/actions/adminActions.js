export const DELETE_USERS = 'DELETE_USERS';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const ADMIN_TO_USER = 'ADMIN_TO_USER';
export const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';


export const deleteUsers = () => ({ type: DELETE_USERS });
export const userToAdmin = () => ({ type: USER_TO_ADMIN });
export const adminToUser = () => ({ type: ADMIN_TO_USER });
export const changeUserStatus = () => ({ type: CHANGE_USER_STATUS });
