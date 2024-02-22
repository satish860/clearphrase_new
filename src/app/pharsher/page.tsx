import { UserButton } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const Pharsher = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-between items-center pl-4 pr-4">
        <img
          src="/aj_logo_21_09_2023 2 (3).svg"
          className="w-20 md:h-20 h-14"
        ></img>
        <UserButton />
      </div>
      <div className="flex justify-center items-center w-full h-[80%]">
        <div className="w-[90%] h-full bg-gray-100">
          <div className="w-full h-[15%] pt-4 hidden md:block">
            <div className="flex justify-between items-center pl-4 pr-4">
              <div className="space-x-8">
                <span>Tones:</span>
                <button>Standard</button>
                <button>Fluency</button>
                <button>Formal</button>
                <button>Simple</button>
                <button>Creative</button>
                <button>Summarize</button>
              </div>
              <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-md">
                <Copy />
              </div>
            </div>
            <Separator className="w-full mt-4" />
          </div>

          <div className="block md:hidden">
            <div className="flex flex-row justify-center items-center p-2 gap-32">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Standard</DropdownMenuItem>
                    <DropdownMenuItem>Fluency</DropdownMenuItem>
                    <DropdownMenuItem>Formal</DropdownMenuItem>
                    <DropdownMenuItem>Simple</DropdownMenuItem>
                    <DropdownMenuItem>Creative</DropdownMenuItem>
                    <DropdownMenuItem>Summarize</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded-md">
                <Copy />
              </div>
            </div>
          </div>
          <div className="w-full md:h-[75%] h-full flex flex-col md:flex-row gap-1">
            <Textarea className="md:w-[50%] h-[50%] md:h-full w-full" />
            <Textarea className="md:w-[50%] h-[50%] md:h-full w-full" />
          </div>
          <div className="w-full flex items-center justify-center gap-10 pt-2">
            <Button className="bg-green-500">Parapharse</Button>
            <Button variant={"secondary"}>Clearall</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharsher;
