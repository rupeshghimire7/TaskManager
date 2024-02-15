import { useContext, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/lib/context/authContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="w-full h-16 flex items-center justify-center bg-gray-700 text-white">
      <div className="flex items-center justify-between w-full px-8">
        <div className="flex items-center justify-start font-semibold text-2xl">
          TaskManager
        </div>
        <div className="flex items-center justify-end">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger className="outline-none ">
              <div className="flex items-center justify-center ">
                {user && (
                  <span className="ml-2 px-3 font-semibold">{user.name}</span>
                )}
                <Avatar onClick={handleMenuToggle}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>RG</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar
