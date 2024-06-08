import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface Props {
  nameSuggestions: string | undefined;
  setNameSuggestions: (nameSuggestions: string | undefined) => void;
  selectedName: string | undefined;
  setSelectedName: (selectedName: string | undefined) => void;
}

export const NameSuggestionsModal = ({
  nameSuggestions,
  setNameSuggestions,
  selectedName,
  setSelectedName,
}: Props) => {
  const removeNonAlphaNumericCharacters = (text: string) => {
    const regex = /[^a-zA-Z0-9\s]/g;
    return text.replace(regex, "");
  };

  const formatNameSuggestions = (nameSuggestions: string | undefined) => {
    if (!nameSuggestions) return [];

    const lines = nameSuggestions.split(":")[1].split("\n");

    const suggestions = lines
      .map((line) => removeNonAlphaNumericCharacters(line))
      .filter((line) => line !== "")
      .slice(0, -1);

    return suggestions;
  };

  return (
    <Transition appear show={nameSuggestions !== undefined} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99]"
        onClose={() => setNameSuggestions(undefined)}
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
                    Decoration Name Suggestions
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setNameSuggestions(undefined)}
                  >
                    <X size={16} color="#ffffff" weight="bold" />
                  </Button>
                </div>
                <div className="mt-2">
                  {formatNameSuggestions(nameSuggestions).length > 0 ? (
                    formatNameSuggestions(nameSuggestions).map(
                      (suggestion, index) => (
                        <div
                          key={index}
                          className={`${
                            selectedName === suggestion
                              ? "flex items-center pl-2 py-1.5 cursor-pointer rounded-sm bg-ch-green"
                              : "flex items-center pl-2 py-1.5 cursor-pointer rounded-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                          }`}
                          onClick={() => setSelectedName(suggestion)}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                            {suggestion}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <div className="h-72 flex flex-col justify-center items-center">
                      <p className="text-6xl">😱</p>
                      <p className="text-xl mt-2">Uh Oh!</p>
                      <p className="mt-5 text-center text-gray-500 dark:text-zinc-400">
                        An error occurred when retrieving name suggestions.
                        Close this modal and try again.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-5">
                  <Button
                    type="submit"
                    disabled={!selectedName}
                    onClick={() => setNameSuggestions(undefined)}
                  >
                    Save
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
