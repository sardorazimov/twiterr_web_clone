'use client'
import registermodal from "@/hooks/register.modal"
import Modals from "./modals"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerstep1schema, registerstep2schema } from "@/config"
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
import { ArrowLeft, ArrowRight } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

function RegisterStep1(
  {
    setdata,
    setStep,
  }
  :{
    setdata:Dispatch<SetStateAction<{name:string; email:string}>>
    setStep: Dispatch<SetStateAction<number>>

}){
  const form = useForm<z.infer<typeof registerstep1schema>>({
    resolver: zodResolver(registerstep1schema),
    defaultValues:{
      email:"",
      name:'',
     }
  })
  function onSubmit(values: z.infer<typeof registerstep1schema>) {
   setdata(values)
   setStep(2)
  }
  const {isSubmitting} = form.formState;
  return     <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Name" {...field} />
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
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="flex w-full justify-between">
    <Button   type="submit" variant={'destructive'} className="gap-2" >
      <ArrowLeft />Back
    </Button>
    <Button   type="submit"  className="gap-2">
      Next
      <ArrowRight />
    </Button>
    </div>
  </form>
</Form>
}
function RegisterStep2(){
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
   const { isSubmitting } = form.formState;
  return <Form {...form}>
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
}


/// Register Modal /// 
const Registermodal = () => {
    const register = registermodal()
    const [step, setStep] = useState(1)
    const [data, setdata] = useState({name: "", email:""})


    const bodyContent = step === 1 ? <RegisterStep1 setdata={setdata} setStep={setStep} /> : <RegisterStep2 />

    const footer = <div className="tehave text-neutral-500 text-center mt-4">
      <p className="gap-1">Alerdy have in accout <span className="text-white cursor-pointer border-b">Sign In?</span> </p>
    </div>
  return (
     <Modals 
      body={bodyContent}
      title="Create Account"
      footer={footer}
      isOpen={register.isOpen}
      onClose={register.onClose}
      step={step}
      totalSteps={2}
     
     />
  )
}

export default Registermodal
