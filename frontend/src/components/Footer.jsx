const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        
        <div className="text-sm flex justify-center mb-4">
          <a href="/contact-us" className="px-2">Contact</a>
          <a href="/about" className="px-2">About</a>
        </div>

        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} My Website
        </p>
      </div>
    </footer>
  )
}

export default Footer
