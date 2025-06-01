



const Navbar = () => {
  return (
 <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3"> {/* Changed positioning and added z-index */}
  <div className="bg-neutral-900/30 backdrop-blur-md shadow-purple-600/10 shadow shadow shadow-2xs p-4 rounded-lg w-1/2 shadow-md flex items-center justify-between"> {/* Removed absolute positioning here */}
    <div><p className="text-2xl font-bold font-mono text-white">API TESTER.</p></div>
    <div className="flex items-center">
        <a href="/" className="text-white font-semibold font-mono text-sm hover:text-gray-300 hover:scale-110 hover:-translate-y-1 transition delay-50 duration-200 ease-in-out px-2 py-2">Home</a>
        <a href="/" className="text-white font-semibold font-mono text-sm hover:scale-110 hover:-translate-y-1 transition delay-50 duration-200 ease-in-out hover:text-gray-300 px-2 py-2">Test</a>
        <a href="https://www.linkedin.com/in/manaskumar3003/" className="text-white font-semibold font-mono text-sm hover:scale-110 hover:-translate-y-1 transition delay-50 duration-200 ease-in-out  hover:text-gray-300 px-2 py-2">LinkedIn</a>
    </div>
  </div>
</nav>
  )
}
export default Navbar;