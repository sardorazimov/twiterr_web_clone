
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

const LoginModal = () => {
    const loginModal = useLoginModal()
    const form = useForm<z.infer<typeof registerstep2schema>>({
        resolver: zodResolver(registerstep2schema),
        defaultValues:{
          password:'',
          username: '',
         }
      })
      function onSubmit(values: z.infer<typeof registerstep2schema>) {
        console.log('')
       }
    const bodyContent = <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
      {/* {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Username" {...field} />
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
      <Button></Button>
    </form>
  </Form>
    const footer =  <div></div>

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
