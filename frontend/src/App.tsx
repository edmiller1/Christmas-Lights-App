import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ClockCounterClockwise,
  Heart,
  List,
  Path,
  Star,
  X,
} from "@phosphor-icons/react";
import { decorations, navigation } from "./lib/helpers";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import aboutImage from "./assets/sunnyandme.jpeg";
import { Button } from "./components/ui/button";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Christmas Lights App</span>
              <img
                className="h-12 w-auto"
                src={logo}
                alt="Christmas Lights App logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <List size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:underline"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Get Started <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="Christmas Lights App"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    Sign in
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <section className="relative bg-[url(https://images.unsplash.com/photo-1664289342468-fa99588e60b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-70"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-left">
            <h2 className="text-3xl font-extrabold text-primary sm:text-5xl">
              Create and view amazing
              <strong className="block font-extrabold text-ch-green">
                {" "}
                Christmas Decorations{" "}
              </strong>
            </h2>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/signup"
                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              >
                Get Started
              </Link>

              <a
                href="#"
                className="block w-full rounded bg-ch-green px-12 py-3 text-sm font-medium text-white shadow hover:bg-ch-green-alt focus:outline-none focus:ring sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-ch-green">
                    Hi there! 👋
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    I'm Edward
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    I am the sole creator of Christmas lights App. I started
                    this project as I have always enjoyed driving around my
                    community looking at all the amazing Christmas Decorations
                    people had created.
                    <br />
                    <br />
                    It's been something my family has done since I can remember,
                    and I wanted to make an easier way for people to find these
                    Christmas decorations even if you don't live close by.
                  </p>
                </div>
              </div>
            </div>
            <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                className="w-[48rem] h-[48rem] object-cover max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={aboutImage}
                alt=""
              />
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p>
                    If you have any questions, comments, or suggestions, feel
                    free to reach out to me at{" "}
                    <a
                      href="mailto:support@christmaslightsapp.com"
                      className="underline"
                    >
                      support@christmaslightsapp.com
                    </a>
                    . I'd love to hear from you!
                  </p>
                  <p className="mt-8">
                    If you would like to provide feedback or request a feature
                    please use this form and I'll see what I can do.
                  </p>
                  <a href="https://forms.gle/PiVwU8agfDNAh6WP6" target="_blank">
                    <Button className="mt-5 px-8">Feedback</Button>
                  </a>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                    Keeping the Christmas Cheer Free
                  </h2>
                  <p className="mt-6">
                    This website is completely free to use. There are no hidden
                    fees or subscriptions. However, if you find it helpful and
                    would like to show your appreciation, donations are always
                    welcome! They help keep the website running smoothly and
                    allow me to add even more features in the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="mx-10 bg-white">
        <h2 className="py-5 text-black text-3xl font-bold">Explore</h2>
        <div className="py-5">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {decorations.map((decoration) => (
              <li key={decoration.source} className="relative">
                <div className="group h-64 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-ch-green focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <img
                    src={decoration.source}
                    alt=""
                    className="pointer-events-none decoration-card-image object-cover h-80 w-full group-hover:opacity-90"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {decoration.title}
                  </p>
                  <div className="mt-2 flex items-center space-x-1 text-black">
                    <Star size={16} color="#000" weight="fill" />
                    <p className="text-sm">{decoration.rating}</p>
                  </div>
                </div>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {decoration.address}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="create"
        className="bg-white relative rounded-lg m-10 bg-[url(https://images.unsplash.com/photo-1609542101758-cf2bf6d3e6eb?q=80&w=3289&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat"
      >
        <div className="relative max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[50vh] lg:items-center lg:px-8">
          <div className="max-w-xl text-left">
            <h1 className="text-3xl font-bold text-white sm:text-5xl">
              Create your very own decoration
            </h1>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/signup"
                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-10 bg-white">
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Features
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Plan routes around your community so you can visit, like and
                rate all the decorations you like.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-ch-green">
                      <Path size={20} color="#fff" />
                    </div>
                    Plan your route
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Add decorations to routes and get directions to visit them
                    all.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-ch-green">
                      <Star size={20} color="#fff" />
                    </div>
                    Rate Decorations
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Give decorationsa rating based on how amazing you think they
                    are
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-ch-green">
                      <Heart size={20} color="#fff" />
                    </div>
                    Save Decoration
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Save the decorations you really like to your favourites
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-ch-green">
                      <ClockCounterClockwise size={20} color="#fff" />
                    </div>
                    Never miss a decoration
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    decorations automatically save to your history, so you can
                    go back and view them at any time
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f7f7f7] border-t border-gray-200">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <Link to="/home">
                <img src={logo} alt="logo" className="w-16 h-16" />
              </Link>

              <p className="mt-4 max-w-xs text-gray-500">
                Create, share and view amazing Christmas Decorations. 🎄
              </p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <Link to="https://ko-fi.com/Q5Q1WYOK1" target="_blank">
                    <img
                      height="36"
                      style={{ border: "0px", height: "36px" }}
                      src="https://storage.ko-fi.com/cdn/kofi4.png?v=3"
                      alt="Buy Me a Coffee at ko-fi.com"
                    />
                  </Link>
                </li>
                {/* <li>
                <Link
                  to="/instagram"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-zinc-300"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  to="/github"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-zinc-300"
                >
                  <span className="sr-only">GitHub</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li> */}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div>
                <p className="font-medium text-gray-900 ">Company</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#about"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:support@christmaslightsapp.com"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Contact{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 ">Legal</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/terms"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Terms &amp; Conditions{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}. Christmas Lights App. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
