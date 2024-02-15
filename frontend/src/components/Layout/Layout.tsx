import Navbar from '../Navbar/Navbar'


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout