


import axiosInstance from "./axiosPrivate";

export const createProperty = async (propertyData: any) => {
    try {
      const response = await axiosInstance.post(`/properties`, propertyData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error creating property");
    }
  };

  export const getProperties = async()=>{
    try{
      const response = await axiosInstance.get(`/properties`);
      return response.data;
    }catch(error){
      throw new Error("Error Get Property");

    }
  }