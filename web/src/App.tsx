import { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import logo from "./assets/ChristmasLights-House-Logo.png";
import tree from "./assets/Tree.png";
import gingerbread from "./assets/Gingerbread.png";
import { Link } from "react-router-dom";
import { CaretRight, List } from "@phosphor-icons/react";

function App() {
  const getCoords = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "latitude",
          JSON.stringify(position.coords.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(position.coords.longitude)
        );
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <>
      <div className="bg-white">
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="ghost">
                <List className="h-8 w-8" color="#000000" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link to="#">
                <img src={logo} className="h-10 w-10" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <div className="grid gap-2 py-6">
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  to="#"
                >
                  About
                </Link>
                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                    Features
                    <CaretRight className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Analytics
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Upgrade your reporting with advanced analytics.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Developer Tools
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Extend your application with our developer tools.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Security & Compliance
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Keep your data secure with our security features.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Scalability
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Scale your application with our infrastructure.
                        </div>
                      </Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  to="#"
                >
                  Pricing
                </Link>
                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                    Resources
                    <CaretRight className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Blog Posts
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Read our latest blog posts.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Case Studies
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Read our customer case studies.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Documentation
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Learn how to use our product.
                        </div>
                      </Link>
                      <Link
                        className="group grid h-auto w-full justify-start gap-1"
                        to="#"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Help Center
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          Get help with our product.
                        </div>
                      </Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  to="#"
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-[150px]">
            <Link className="mr-6 hidden lg:flex" to="#">
              <img src={logo} className="h-12 w-12" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white text-ch-indigo px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-ch-indigo focus:bg-gray-100 focus:text-ch-indigo focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    to="#"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white text-ch-indigo px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-ch-indigo focus:bg-gray-100 focus:text-ch-indigo focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    to="#"
                  >
                    Features
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white text-ch-indigo px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-ch-indigo focus:bg-gray-100 focus:text-ch-indigo focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    to="#"
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white text-ch-indigo px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-ch-indigo focus:bg-gray-100 focus:text-ch-indigo focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                    to="#"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="ml-auto w-[150px]">
            <Button variant="secondary" className="font-semibold">
              Get Started
            </Button>
          </div>
        </header>
        <div className="bg-white py-12 lg:py-44">
          <div className="container grid gap-4 px-4 text-center md:gap-10 lg:gap-14 xl:grid-cols-2 xl:px-6">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-ch-red">
                Discover Amazing Christmas Decorations
              </h1>
              <p className="text-ch-indigo text-lg font-semibold mx-auto max-w-[600px]">
                Create, view and visit stunning Christmas Decorations in your
                community and across Australia and New Zealand.
              </p>
            </div>

            <div className="flex justify-center relative lg:m-auto lg:w-1/3 xl:w-2/3 xl:ml-32">
              <div className="absolute inset-0 bg-ch-teal rounded-full z-0" />
              <img
                alt="Christmas Cheer"
                className="aspect-[1/1] overflow-hidden rounded-full object-contain object-center z-10"
                height="400"
                src={tree}
                width="400"
              />
            </div>
          </div>
        </div>
        <div className="container py-12 grid gap-6 px-4 text-center md:gap-8 lg:gap-12 xl:gap-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-ch-red">
              Decorations Galore
            </h2>
            <p className="mx-auto max-w-[800px] font-semibold text-ch-indigo md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-ch-indigo">
              Explore a variety of wonderful Christmas decorations, from
              something small to something very cool
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-stretch justify-center gap-4 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative group rounded-lg overflow-hidden aspect-square">
                <img
                  alt="Ornaments"
                  className="object-cover object-center w-full transition-transform group-hover:scale-105"
                  height="600"
                  src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative group rounded-lg overflow-hidden aspect-square">
                  <img
                    alt="Wreaths"
                    className="object-cover object-center w-full transition-transform group-hover:scale-105"
                    height="600"
                    src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                    style={{
                      aspectRatio: "600/600",
                      objectFit: "cover",
                    }}
                    width="600"
                  />
                </div>
                <div className="relative group rounded-lg overflow-hidden aspect-square">
                  <img
                    alt="Wreaths"
                    className="object-cover object-center w-full transition-transform group-hover:scale-105"
                    height="600"
                    src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                    style={{
                      aspectRatio: "600/600",
                      objectFit: "cover",
                    }}
                    width="600"
                  />
                </div>
                <div className="relative group rounded-lg overflow-hidden aspect-square">
                  <img
                    alt="Wreaths"
                    className="object-cover object-center w-full transition-transform group-hover:scale-105"
                    height="600"
                    src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                    style={{
                      aspectRatio: "600/600",
                      objectFit: "cover",
                    }}
                    width="600"
                  />
                </div>
                <div className="relative group rounded-lg overflow-hidden aspect-square">
                  <img
                    alt="Wreaths"
                    className="object-cover object-center w-full transition-transform group-hover:scale-105"
                    height="600"
                    src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                    style={{
                      aspectRatio: "600/600",
                      objectFit: "cover",
                    }}
                    width="600"
                  />
                </div>
              </div>
              <div className="relative group rounded-lg overflow-hidden aspect-square">
                <img
                  alt="Ornaments"
                  className="object-cover object-center w-full transition-transform group-hover:scale-105"
                  height="600"
                  src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
              <div className="relative group rounded-lg overflow-hidden aspect-square">
                <img
                  alt="Ornaments"
                  className="object-cover object-center w-full transition-transform group-hover:scale-105"
                  height="600"
                  src="https://images.unsplash.com/photo-1602628902352-73639e174673?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
