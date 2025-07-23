import * as z from "zod";

export const signInSchema=z.object({
    identifier:z
       .string()
       .min(1,{message:"email is required"})
       .email({message:"Please enter correct email"}),
    password:z
       .string()
       .min(1,{message:"Password is required"})
       .min(8,{message:"Password must be of atleast 8 charcters"})
})