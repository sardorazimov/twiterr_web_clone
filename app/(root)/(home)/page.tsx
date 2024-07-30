import Login from "@/components/auth/Login";


const Home = () => {
    const user = false;
    if(!user) return  <div className="container h-screen mx-auto max-w-7xl"><Login /></div>
  return (
    <div>
      Lo
    </div>
  )
}

export default Home
