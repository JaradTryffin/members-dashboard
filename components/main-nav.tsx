"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  const params = useParams();

  const routes = [
    {
      href: `/${params.entityId}`,
      label: "Overview",
      active: pathName === `/${params.entityId}`,
    },
    {
      href: `/${params.entityId}/members`,
      label: "Members",
      active: pathName === `/${params.entityId}/members`,
    },
    {
      href: `/${params.entityId}/attendance`,
      label: "Attendance",
      active: pathName === `/${params.entityId}/attendance`,
    },
    {
      href: `/${params.entityId}/settings`,
      label: "Settings",
      active: pathName === `/${params.entityId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
