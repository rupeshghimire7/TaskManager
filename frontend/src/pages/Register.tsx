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
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import { Helmet } from "react-helmet"

const registerFormSchema = z.object({
  email: z.string().min(3).max(50),
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
  confirm_password: z.string().min(8).max(50),
})

const Register = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  })

  function onSubmitRegisterForm(values: z.infer<typeof registerFormSchema>) {
    console.log("form Submitted", values)
  }

  return (
    <>
      <Helmet>
        <title>Register - Task Manager</title>
      </Helmet>
      <Card className="w-[350px] m-auto mt-36">
        <CardHeader>
          <CardTitle className="mx-auto">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitRegisterForm)}
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter a strong password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter password to confirm"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Register</Button>
            </form>
          </Form>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to={"/"} className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default Register