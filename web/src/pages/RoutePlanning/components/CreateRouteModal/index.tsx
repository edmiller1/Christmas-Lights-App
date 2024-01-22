import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, X } from "@phosphor-icons/react";
import { Fragment } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CancelModal } from "@/components";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";

interface Props {
  isCreateRouteOpen: boolean;
  isCancelOpen: boolean;
  setIsCancelOpen: (isCancelOpen: boolean) => void;
  discardRoute: () => void;
  createNewRoute: (name: string, decorationId: string | undefined) => void;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  createRouteLoading: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Route name is required" }),
});

export const CreateRouteModal = ({
  isCreateRouteOpen,
  isCancelOpen,
  setIsCancelOpen,
  discardRoute,
  createNewRoute,
  activeDecoration,
  createRouteLoading,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createNewRoute(values.name, activeDecoration?.id);
  };

  return (
    <Transition appear show={isCreateRouteOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsCancelOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    New Route
                  </Dialog.Title>
                  {createRouteLoading ? null : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsCancelOpen(true)}
                    >
                      <X
                        size={16}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                    </Button>
                  )}
                </div>
                {createRouteLoading ? (
                  <div className="flex flex-col justify-center items-center space-y-4 dark:text-white">
                    <CircleNotch
                      size={24}
                      weight="bold"
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                    <span>Creating new route...</span>
                  </div>
                ) : (
                  <div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-white">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input {...field} className="dark:text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        <div className="flex items-center justify-between mt-10">
                          <Button
                            variant="secondary"
                            onClick={() => setIsCancelOpen(true)}
                          >
                            Back
                          </Button>
                          <Button type="submit">Create</Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}

                <CancelModal
                  title="Discard Route?"
                  body="If you leave, your edits won't be saved."
                  cancelText="Cancel"
                  confirmText="Discard"
                  discardFunction={discardRoute}
                  isCancelOpen={isCancelOpen}
                  setIsCancelOpen={setIsCancelOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
// use headless ui for modal
