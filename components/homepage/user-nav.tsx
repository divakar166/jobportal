import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { logout } from "@/lib/features/authFeature";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useLoader } from "@/providers/LoaderContext";

function getInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/);
  const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
  return initials;
}

const UserNav = () => {
  const dispatch = useAppDispatch();
  const userType = useAppSelector((state) => state.auth.userType)
  const userName = useAppSelector((state) => state.auth.name)
  const router = useRouter();
  const { setLoading } = useLoader();
  const handleLogout = () => {
    setLoading(true);
    dispatch(logout());
    setTimeout(() => {
      router.push('/auth/developer/login');
      setLoading(false);
    }, 1000);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="outline outline-1 outline-slate-400">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="dark:text-white">{getInitials(userName || "Anonymous")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a href={`/dashboard/${userType}`}><DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem></a>
          {userType == 'developer' ? (
            <>
              <a href="/dashboard/developer/profile"><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></a>
              <a href="/dashboard/developer/applications"><DropdownMenuItem className="cursor-pointer">Applications</DropdownMenuItem></a>
              <a href="/dashboard/developer/bookmarks"><DropdownMenuItem className="cursor-pointer">Bookmarks</DropdownMenuItem></a>
            </>
          ) : (
            <>
              <a href="/dashboard/recruiter/profile"><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></a>
              <a href="/dashboard/recruiter/applications"><DropdownMenuItem className="cursor-pointer">Applications</DropdownMenuItem></a>
              <a href="/dashboard/recruiter/joblisting"><DropdownMenuItem className="cursor-pointer">Job Listings</DropdownMenuItem></a>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UserNav