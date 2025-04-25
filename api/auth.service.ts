import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, {
            fullname: name,
            email,
            password: password,
            confirm_password: password
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const loginUser = async({email,password}:{email:string,password:string})=>{
    try {
        const response = await axios.post(`${apiUrl}/login`, {
            email,
            password: password,
        });

        console.log(response.data.data.access_token,'a')
        return response.data.data.access_token;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
}