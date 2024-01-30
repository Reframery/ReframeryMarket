import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

import { useLoginMutation } from "app/services/auth"
import { useDispatch } from "app/store"
import { setCredentials } from "features/auth/authSlice"
import { handleRTKError } from "lib/utils"

import { Button } from "components/ui/Button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/Form"
import { Input } from "components/ui/Input"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading, error }] = useLoginMutation()

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const user = await login(values).unwrap()
      dispatch(setCredentials({ user, token: user.accessToken }))
      localStorage.setItem("userInfo", JSON.stringify(user))
      localStorage.setItem("token", user.accessToken)
      navigate("/")
    } catch (err) {
      error && toast(handleRTKError(error), { type: "error" })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-2xl font-semibold">Sign In</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="someone@example.com" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          <span className="icon">
            <i className="fas fa-sign-in-alt"></i>
          </span>
          <span>Submit</span>
        </Button>
        <div className="text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline">
            &nbsp;Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}
