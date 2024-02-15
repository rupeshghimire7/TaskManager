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
import { useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import * as z from "zod"
// import useSWR from "swr"
// import { postFetcher } from "@/lib/utils/axiosFetchers"
import axiosInstance from "@/lib/utils/api"
import { AuthContext } from "@/lib/context/authContext"

const loginFormSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
})

const Login = () => {
  // const [passwordView, setPasswordView] = useState<Boolean>(false)
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { saveUser, isLoggedIn, saveLoginStatus } = useContext(AuthContext)
  async function onSubmitLoginForm(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await axiosInstance.post('/users/login/', values)
      console.log(response.data)
      localStorage.setItem("token", response.data.token);
      // Fetch user data based on the token
      axiosInstance
        .get("/users/profile/", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
        .then((response) => {
          saveUser(response.data);
          saveLoginStatus(true);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
    catch (error) {
      console.log(error)
    }
  }

  // function togglePasswordView() {
  //   setPasswordView(!passwordView)
  // }


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your Username"
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
