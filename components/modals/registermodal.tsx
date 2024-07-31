'use client'
import registermodal from "@/hooks/register.modal"
import Modals from "./modals"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
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
import useLoginModal from "@/hooks/login.modal"
import axios from 'axios'

function RegisterStep1(
  {
    setdata,
    setStep,
  }
    : {
      setdata: Dispatch<SetStateAction<{ name: string; email: string }>>
      setStep: Dispatch<SetStateAction<number>>

    }) {
  const form = useForm<z.infer<typeof registerstep1schema>>({
    resolver: zodResolver(registerstep1schema),
    defaultValues: {
      email: "",
      name: '',
    }
  })
   async function onSubmit(values: z.infer<typeof registerstep1schema>) {
    try {
     
      const { data } = await axios.post("/api/auth/register?step=1", values)
      if(data.success) {
      setdata(values)
      setStep(2)
      }
    } catch (error) {
     console.log(error)
    }

  }
  const { isSubmitting } = form.formState;
  return <Form {...form}>
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
        <Button type="submit" variant={'destructive'} className="gap-2" >
          <ArrowLeft />Back
        </Button>
        <Button type="submit" className="gap-2">
          Next
          <ArrowRight />
        </Button>
      </div>
    </form>
  </Form>
}
function RegisterStep2() {
  const form = useForm<z.infer<typeof registerstep2schema>>({
    resolver: zodResolver(registerstep2schema),
    defaultValues: {
      password: '',
      username: '',
    }
  })
  function onSubmit(values: z.infer<typeof registerstep2schema>) {
    console.log('')
  }
  const { isSubmitting } = form.formState;
  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
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
      <Button disabled={isSubmitting} className="w-full bg-green-700 text-white hover:text-neutral-900">
        Register
      </Button>
    </form>
  </Form>
}


/// Register Modal /// 
const Registermodal = () => {
  const register = registermodal()
  const [step, setStep] = useState(1)
  const [data, setdata] = useState({ name: "", email: "" })
  const loginModal = useLoginModal()
  const registerModal = registermodal()

  const onToogle = useCallback(() => {
    loginModal.onOpen(),
      registerModal.onClose()
  }, [loginModal, registerModal])



  const bodyContent = step === 1 ? <RegisterStep1 setdata={setdata} setStep={setStep} /> : <RegisterStep2 />

  const footer = <div className=" text-neutral-500 text-center mb-4">
    <p onClick={onToogle}
      className="gap-1">Alerdy have in accout
      <span
        className="text-white cursor-pointer border-b">Sign In?
      </span>
    </p>
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
