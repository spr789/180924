const Footer = () => {
    return (
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-white">
          <p>&copy; {new Date().getFullYear()} MyApp. All Rights Reserved.</p>
          <p>
            Built with <a href="https://nextjs.org" className="underline">Next.js</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  