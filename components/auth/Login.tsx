'use client'
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { BsGithub } from "react-icons/bs"
import registermodal from "@/hooks/register.modal"
import { useCallback } from "react"
import Registermodal from "../modals/registermodal"
import useLoginModal from "@/hooks/login.modal"
import LoginModal from "../modals/loginmodal"



const Login = () => {
  const  register = registermodal();
  const loginModal = useLoginModal()

  const onOpenRegisterModal = useCallback(() => {
   register.onOpen()
  }, [register])

  const onOpenLoginModal = useCallback(() => {
   loginModal.onOpen()
  }, [loginModal])


  return (
    <div>
   <Registermodal />
   <LoginModal />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
      <Image src={'/svg/logo.svg'} alt="Login" width={450} height={450}
        className="justify-self-center hidden md:block" />
      <div className="flex flex-col md:justify-between justify-center gap-6 h-full md:h-[70vh]">
        <div className="block md:hidden">
          <Image src={'/svg/logo.svg'} alt="Login" width={450} height={450}
            className="justify-self-center hidden md:block" />
        </div>
        <h1 className="text-6xl font-bold ">Happy Now ! With Twitter</h1>
        <div className="w-full md:w-[60%]">
          <h2 className="font-bold text-3xl mb-4 ">
            Join
          </h2>
          <div className="flex flex-col space-y-2">
            <Button>
              <div className="flex gap-2">
                <FcGoogle size={22} />
                Signup with Google
              </div>
            </Button>
            <Button>
              <div className="flex gap-2">
                <BsGithub size={22} />
                Signup with GitHub
              </div>
            </Button>
            <div className="flex items-center justify-center">
              <div className="h-px bg-neutral-500 w-1/2" />
              <p className="mx-4">or?</p>
              <div className="h-px bg-neutral-500 w-1/2" />
            </div>
            <Button onClick={onOpenRegisterModal}>
              <div>Create Account</div>
            </Button>
            <div className="text-[10px] text-gray-400">
              By signing up, you agree to the{" "}
              <span className="text-sky-500">Terms of Service</span> and
              <span className="text-sky-500"> Privacy Policy</span>, including
              <span className="text-sky-500"> Cookie Use</span>.
            </div>
          </div>
        </div>
        <div className="md:w-[60%] w-full justify-center items-center">
          <h3 className="text-xl font-medium">Allerdy Account</h3>
          <Button className="w-full" onClick={onOpenLoginModal}>
             Sign In
          </Button>
          {/* <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="bg-neutral-800">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
    </div>

  )
}

export default Login
