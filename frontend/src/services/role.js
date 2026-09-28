import api from "./api";

export const getRole = async (roleId) => {

    const response = await api.get(
        `/roles/${roleId}`
    );

    return response.data.data;
};