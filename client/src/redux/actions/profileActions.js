export const DELETE_FANFICS = 'DELETE_FANFICS';
export const CREATE_FANFIC = 'CREATE_FANFIC';
export const EDIT_FANFIC = 'EDIT_FANFIC';

export const deleteFanfic = () => ({ type: DELETE_FANFICS });
export const editFanfic = () => ({ type: EDIT_FANFIC });
export const createFanfic = () => ({ type: CREATE_FANFIC });
