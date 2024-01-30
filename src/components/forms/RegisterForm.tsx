import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "app/store"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"
import { createUser } from "../../redux/actions/userActions"

import { Button } from "components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form"
import { Input } from "components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select"

const registerSchema = z
  .object({
    username: z.string().min(1, "Required"),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    communityName: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function RegisterForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      communityName: "canada",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const confirm = window.confirm("Do you wish to create the account?")
      if (confirm) {
        dispatch(
          createUser(
            values.username,
            values.email,
            values.password,
            values.communityName
          )
        )
        navigate("/login")
      }
    } catch (err) {
      toast("Invalid Credentials", { type: "error" })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-2xl font-semibold">Create New Account</h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription>
                At least 6 characters and contains at least one uppercase, one
                lowercase and a number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="communityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a community" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="canada"> Canada</SelectItem>
                  <SelectItem value="usa">U.S.A</SelectItem>
                  <SelectItem value="brazil"> Brazil</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-muted-foreground text-sm">
          By continuing, you agree to Reframery's{" "}
          <Link
            to="/terms-and-conditions"
            className="text-blue-500 hover:underline"
          >
            Term and Condition
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          <span className="icon">
            <i className="fas fa-sign-in-alt"></i>
          </span>
          <span>Submit</span>
        </Button>
        <div className="text-sm">
          Already have account?
          <Link to="/login" className="text-blue-500 hover:underline">
            &nbsp;Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
}
