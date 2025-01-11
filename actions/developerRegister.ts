"use server"

import * as z from 'zod';
import { DeveloperRegisterSchema } from '@/lib/schemas';
import axios from 'axios';


export const developerRegister = async (values: z.infer<typeof DeveloperRegisterSchema>) => {
  const validatedFields = DeveloperRegisterSchema.safeParse(values);
  
  if(!validatedFields.success){
    return { error:"Invalid fields!" }
  }

  const { name, email, password} = validatedFields.data;

  try{
    const response = await axios.post('http://localhost:8000/api/developer/register/', {
      name,
      email,
      password
    })
  
    if (response.status === 201){
      const { message } = response.data;
      return { success: message };
    } else {
      return { error: response.data.error || "Unknown error occurred."}
    }
  }  catch (error: any) {
    if (error.response) {
      const { data, status } = error.response;

      if (status === 400) {
        return { error: "Invalid data. Please check your input." };
      }
      if (status === 409) {
        return { error: "Email is already in use." };
      }
      return { error: data.error || "Registration failed. Please try again." };
    }

    console.error(error);
    return { error: "Network error. Please check your connection and try again." };
  }

}