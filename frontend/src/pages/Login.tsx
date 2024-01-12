import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import * as z from "zod"
import { useEffect } from "react"
import axiosInstance from "@/lib/utils/api"

const loginFormSchema = z.object({
  email: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
})

const Login = () => {
  // const [passwordView, setPasswordView] = useState<Boolean>(false)

  useEffect(() => {
    const data = {
      username: "tester",
      password: "Test@1234",
    }
    axiosInstance.post("/users/login", data).then((res) => {
      console.log(res.data)
    })
  }, [])

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmitLoginForm(values: z.infer<typeof loginFormSchema>) {
    console.log(values)
  }

  // function togglePasswordView() {
  //   setPasswordView(!passwordView)
  // }

  return (
    <>
      <Helmet>
        <title>Login - Task Manager</title>
      </Helmet>
      <Card className="w-[350px] m-auto mt-36">
        <CardHeader>
          <CardTitle className="mx-auto">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitLoginForm)}
              className="flex flex-col items-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        // type={passwordView ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    {/* <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={togglePasswordView}
                  >
                    {passwordView ? "Hide" : "Show"}
                  </p> */}
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
            </form>
          </Form>

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-500 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
