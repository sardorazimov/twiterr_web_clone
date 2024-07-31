
import useLoginModal from "@/hooks/login.modal"
import Modals from "./modals"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { infer, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerstep2schema } from "@/config"
import { loginschema } from "@/config/login"
import registermodal from "@/hooks/register.modal"
import { useCallback } from "react"

const LoginModal = () => {
  const registerModal  = registermodal()
  const loginModal = useLoginModal()
  const onToogle = useCallback(() => {
     loginModal.onClose(),
     registerModal.onOpen()
  }, [loginModal, registerModal])


  const form = useForm<z.infer<typeof loginschema>>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      password: '',
      email: '',
    }
  })
  function onSubmit(values: z.infer<typeof loginschema>) {
    console.log('')
  }
  const { isSubmitting } = form.formState;
  const bodyContent = <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Email" {...field} />
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
            <FormControl>
              <Input placeholder="Password" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="w-full" disabled={isSubmitting}>
        Register
      </Button>
    </form>
  </Form>
  const footer = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using X?
        <span  onClick={onToogle}
        className="text-white cursor-pointer hover:underline">
          {" "}
          Create Account
        </span>
      </p>

    </div>
  )

  return (
    <div>
      <Modals
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        body={bodyContent}
        footer={footer}
      />
    </div>
  )
}

export default LoginModal
