"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Entity } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface EntitySwitcherProps extends PopoverTriggerProps {
  items: Entity[];
}

export default function EntitySwitcher({
  className,
  items = [],
}: EntitySwitcherProps) {
  const storeModalOpen = useStoreModal((state) => state.onOpen);
  const params = useParams();
  const router = useRouter();
  const [value, setValue] = useState("");

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentEntity = formattedItems.find(
    (item) => item.value === params.entityId,
  );

  const [open, setOpen] = useState(false);
  const onEntitySelect = (entity: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${entity.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select Entity"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentEntity?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/*  content*/}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Entity..." />
            <CommandEmpty>No Entity Found</CommandEmpty>
            <CommandGroup heading="Entity">
              {formattedItems.map((entity) => (
                <CommandItem
                  key={entity.value}
                  onSelect={() => onEntitySelect(entity)}
                >
                  <Store className="mr-2 h-4 w-4" />
                  {entity.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentEntity?.value === entity.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModalOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Entity
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
