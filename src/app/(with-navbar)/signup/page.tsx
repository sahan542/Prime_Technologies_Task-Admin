"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import Container from "@/components/shared/Ui/Container";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

const userSignUpSchema = z.object({
  // name: z.string().min(1, "Enter name"),
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

type RegisterPayload = z.infer<typeof userSignUpSchema>;


const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignUp = async (values: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);
      console.log("const res : ",res);


      if (res.success) {
        // auto login after user register
        const userRes = await loginUser({
          email: values.email,
          password: values.password,
        });
        console.log("User res : ",userRes);

        if (userRes.access_token) {
          const user = decodedToken(userRes.access_token);

          dispatch(setUser({ user, token: userRes.access_token }));
          storeUserInfo({ accessToken: userRes.access_token });
          // 🎯 Set HttpOnly cookie from client via API
          await axios.post("/api/auth/set-cookies", {
            accessToken: userRes.access_token,
          });

          toast.success("Login Successful!");

          setIsLoading(false);
          router.push("/");
        }
      } else {
        toast.error("Something went wrong!");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Container className="max-w-md">
        <div className="flex flex-col justify-center space-y-6 shadow-cardLightShadow rounded-md p-6 py-8 md:p-8 lg:p-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold">Sign Up</span>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Enter your name, email and password to sign up
            </p>
          </div>

          <MTForm
            onSubmit={handleSignUp}
            schema={userSignUpSchema}
            defaultValues={{
              // name: "",
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">

                <div className="grid gap-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <MdMail />
                  </span>

                  <MTInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="pl-11 rounded-full bg-gray-100 border-none"
                  />
                </div>

                <div className="grid gap-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <IoMdLock />
                  </span>
                  <MTInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="pl-11 rounded-full bg-gray-100 border-none"
                  />
                </div>
              </div>

              <div className="mt-2 w-full">
                <Button
                  className="h-11 cursor-pointer w-full rounded-full"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex gap-2">
                      <LoaderSpinner /> <span>Signing...</span>
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </div>
          </MTForm>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
