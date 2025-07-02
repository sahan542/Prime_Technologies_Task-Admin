// "use client";

// // import GoogleAuthWrapper from "@/components/common/Login/GoogleAuthWrapper";
// import MTForm from "@/components/shared/Forms/MTForm";
// import MTInput from "@/components/shared/Forms/MTInput";
// import Container from "@/components/shared/Ui/Container";
// import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "@/redux/hooks";
// import { setUser } from "@/redux/reducers/authSlice";
// import { loginUser } from "@/services/actions/loginUser";
// import { storeUserInfo } from "@/services/auth.services";
// import { decodedToken } from "@/utils/jwt";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FieldValues } from "react-hook-form";
// import { IoMdLock } from "react-icons/io";
// import { MdMail } from "react-icons/md";
// import { toast } from "react-toastify";
// import { z } from "zod";

// type LoginPayload = z.infer<typeof userLoginSchema>;

// const userLoginSchema = z.object({
//   email: z.string().email("Enter email"),
//   password: z.string().min(1, "Enter password"),
// });

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch = useAppDispatch();

//   const router = useRouter();

//   const handleLogin = async (values: LoginPayload) => {
//     console.log(values);
//     setIsLoading(true);
//     try {
//       const res = await loginUser(values);
//       console.log("const res before if : ",res );

//       if (res.access_token) {
//         const user = decodedToken(res.access_token);
//         console.log("const user inside if : ",user);

//         dispatch(setUser({ user, token: res.access_token }));

//         storeUserInfo({ accessToken: res.access_token });
//         // 🎯 Set HttpOnly cookie from client via API
//         await axios.post("/api/auth/set-cookies", {
//           accessToken: res.access_token,
//         });

//         toast.success("Login Succesful!");

//         setIsLoading(false);
//         router.push("/");
//       } else {
//         toast.error("Something went wrong!");

//         setIsLoading(false);
//       }
//     } catch (error: any) {
//       console.log(error.message);
//       toast.error(
//         error?.data?.errorSources[0].message || "Something went wrong!"
//       );

//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex justify-center items-center bg-yellow-500">
//       <Container className="max-w-md">
//         <div className="flex flex-col justify-center space-y-6 shadow-cardLightShadow rounded-md p-6 py-8 md:p-8 lg:p-10">
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center justify-center">
//               <span className="text-xl md:text-2xl font-bold">User Login</span>
//             </div>

//             <p className="text-center text-sm text-muted-foreground">
//               Enter your email and password to login
//             </p>
//           </div>

//           <MTForm
//             onSubmit={handleLogin}
//             schema={userLoginSchema}
//             defaultValues={{
//               email: "",
//               password: "",
//             }}
//           >
//             <div className="flex flex-col gap-4">
//               <div className="flex flex-col gap-4">
//                 <div className="grid gap-1 relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4">
//                     <MdMail />
//                   </span>

//                   <MTInput
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     className="pl-11 rounded-full bg-gray-100 border-none"
//                   />
//                 </div>

//                 <div className="grid gap-1 relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4">
//                     <IoMdLock />
//                   </span>
//                   <MTInput
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     className="pl-11 rounded-full bg-gray-100 border-none"
//                   />
//                 </div>
//               </div>

//               <div className="mt-2 w-full">
//                 <Button
//                   className="h-11 cursor-pointer w-full rounded-full"
//                   type="submit"
//                 >
//                   {isLoading ? (
//                     <span className="flex gap-2">
//                       <LoaderSpinner /> <span>Signing...</span>
//                     </span>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </MTForm>

//           <div className="flex items-center justify-between gap-2 mt-0">
//             <hr className="w-full border-gray-300" />
//             <h4>OR</h4>
//             <hr className="w-full border-gray-300" />
//           </div>


//           <p className="text-center text-sm text-muted-foreground">
//             Don&apos;t have an account?{" "}
//             <Link href="/signup" className="text-primary hover:text-primary/90">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </Container>
//     </div>
//   );
// }
