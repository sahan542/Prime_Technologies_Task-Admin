// "use server";

// import { FieldValues } from "react-hook-form";

// export const loginUser = async (userData: FieldValues) => {
//   const res = await fetch("http://localhost:8000/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // credentials: "include",
//     body: JSON.stringify(userData),
//     cache: "no-store",
//   });
//   const userInfo = await res.json();

//   return userInfo;
// };


type LoginPayload = {
  email: string;
  password: string;
};

export const loginUser = async (userData: LoginPayload): Promise<any> => {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to login. Check credentials.");
  }

  const userInfo = await res.json();
  return userInfo;
};
