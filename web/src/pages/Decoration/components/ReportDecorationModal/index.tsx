import { Fragment, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, WarningCircle, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  isReportDecorationOpen: boolean;
  setIsReportDecorationOpen: (isReportDecorationOpen: boolean) => void;
  reportDecorationLoading: boolean;
  reportCurrentDecoration: (
    reportOptions: string[],
    additionaldetails: string | undefined
  ) => void;
}

const FormSchema = z.object({
  inappropriateName: z.boolean().default(false).optional(),
  inappropriateImages: z.boolean().default(false).optional(),
  moreDetails: z.string().optional(),
});

export const ReportDecorationModal = ({
  isReportDecorationOpen,
  setIsReportDecorationOpen,
  reportDecorationLoading,
  reportCurrentDecoration,
}: Props) => {
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [moreDetails, setMoreDetails] = useState<string | undefined>("");
  const [inappropriateName, setInappropriateName] = useState<boolean>(false);
  const [inappropriateImages, setInappropriateImages] =
    useState<boolean>(false);

  useEffect(() => {
    setSubmitError(false);
    setMoreDetails("");
  }, [isReportDecorationOpen]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inappropriateImages: false,
      inappropriateName: false,
      moreDetails: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const options: string[] = [];
    const name = inappropriateName;
    const images = inappropriateImages;

    if (!name && !images) {
      setSubmitError(true);
    } else if (name) {
      options.push("Inappropriate Name");
    } else if (images) {
      options.push("Inappropriate Images");
    } else {
      setSubmitError(false);
    }

    if (submitError) {
      reportCurrentDecoration(options, data.moreDetails);
    } else {
      return;
    }
  };

  return (
    <Transition appear show={isReportDecorationOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsReportDecorationOpen(false)}
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
                    Report Decoration
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsReportDecorationOpen(false)}
                  >
                    <X
                      size={16}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                  </Button>
                </div>
                {reportDecorationLoading ? (
                  <div className="flex flex-col justify-start items-center mt-3 p-4 text-ch-dark dark:text-ch-light">
                    <CircleNotch
                      size={54}
                      weight="bold"
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="inappropriateName"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                            <FormControl>
                              <Checkbox
                                checked={inappropriateName}
                                onCheckedChange={(checked) => {
                                  setInappropriateName(checked as boolean);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none text-ch-dark dark:text-ch-light">
                              <FormLabel>Inappropriate Name</FormLabel>
                              <FormDescription>
                                Decoration name that includes hateful,
                                threatening content.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inappropriateImages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                            <FormControl>
                              <Checkbox
                                checked={inappropriateImages}
                                onCheckedChange={(checked) => {
                                  setInappropriateImages(checked as boolean);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none text-ch-dark dark:text-ch-light">
                              <FormLabel>Inappropriate Images</FormLabel>
                              <FormDescription>
                                Decoration images that are not related to
                                Christmas decorations or display hateful,
                                threatening, sexual or other inappropriate
                                content.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      {submitError ? (
                        <div className="mb-3">
                          <Alert variant="destructive">
                            <WarningCircle
                              weight="bold"
                              className="w-4 h-4 text-red-900"
                            />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                              Please select at least one option above.
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : null}

                      <FormField
                        control={form.control}
                        name="moreDetails"
                        render={({ field }) => (
                          <FormItem className="text-ch-dark dark:text-ch-light">
                            <FormLabel>Additional Details (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide more details..."
                                className="resize-none"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  setMoreDetails(e.target.value);
                                }}
                                value={moreDetails}
                              />
                            </FormControl>
                            <FormDescription>
                              Provide additional details that you think might be
                              relevant to the report.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="mt-5 float-right" type="submit">
                        Report
                      </Button>
                    </form>
                  </Form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
