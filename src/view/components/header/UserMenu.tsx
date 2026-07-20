import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../../app/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

export function UserMenu() {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border-teal-600 border cursor-pointer outline-none">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium select-none">
            MA
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onSelect={signOut} className="gap-2">
          <ExitIcon className="w-4 h-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
