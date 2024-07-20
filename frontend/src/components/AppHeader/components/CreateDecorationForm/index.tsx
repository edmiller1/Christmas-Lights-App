import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getBase64Value } from "@/lib/helpers";
import { Brain, CircleNotch, Trash } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  setCurrentStep: (currentStep: number) => void;
  files: File[];
  createNewDecoration: (
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    country: string,
    region: string,
    city: string,
    images: string[]
  ) => void;
  countryAbbrev: string;
  setNameSuggestions: (nameSuggestions: string | undefined) => void;
  selectedName: string | undefined;
  setSelectedName: (selectedName: string | undefined) => void;
}

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const CreateDecorationForm = ({
  setCurrentStep,
  files,
  createNewDecoration,
  countryAbbrev,
  setNameSuggestions,
  selectedName,
  setSelectedName,
}: Props) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const { toast } = useToast();

  const [images, setImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: !selectedName
      ? z.string().min(1, { message: "Decoration name is required" })
      : z.string(),
    address: z.string().min(1, { message: "Decoration address is required" }),
  });

  useEffect(() => {
    const arr: string[] = [];
    files.forEach((file) => {
      getBase64Value(file, (imageBase64Value) => {
        arr.push(imageBase64Value);
      });
    });
    setImages(arr);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0 && searchQuery.length < 25) {
      const getAddressData = setTimeout(async () => {
        let response = null;
        if (countryAbbrev !== "") {
          response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchQuery}&access_token=${mbApiKey}&session_token=0f6c0283-69eb-41d1-88af-83b6da40a6a0&language=en&limit=10&country=${countryAbbrev}&types=region%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory%2Ccountry&proximity=-98%2C%2040`
          );
        } else {
          response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchQuery}&access_token=${mbApiKey}&session_token=0f6c0283-69eb-41d1-88af-83b6da40a6a0&language=en&limit=10&country=nz,au&types=region%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory%2Ccountry&proximity=-98%2C%2040`
          );
        }
        const jsonData = await response.json();
        setSuggestions(jsonData.suggestions);
      }, 500);

      return () => clearTimeout(getAddressData);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const handleAddressSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAddress = async (suggestion: any) => {
    console.log("selected suggestion");
    setSearchQuery(suggestion.full_address);
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?session_token=0f6c0283-69eb-41d1-88af-83b6da40a6a0&access_token=${mbApiKey}`
    );
    const jsonData = await response.json();
    const data = jsonData.features[0];
    setLatitude(data.properties.coordinates.latitude as number);
    setLongitude(data.properties.coordinates.longitude as number);
    setCountry(data.properties.context.country.name as string);
    setRegion(data.properties.context.region.name as string);
    setCity(data.properties.context.place.name as string);
    setSuggestions([]);
  };

  const getNameSuggestions = async (images: string[]) => {
    setSuggestionsLoading(true);
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const prompt =
        "Create decoration name suggestions for the image provided, can you provide the suggestions in a list format?";
      const promptImage = {
        inlineData: {
          data: images[0].split(",")[1],
          mimeType: images[0].split(",")[0].split(":")[1].split(";")[0],
        },
      };
      const result = await model.generateContent([prompt, promptImage]);
      const response = await result.response;

      setSuggestionsLoading(false);
      setNameSuggestions(
        response.candidates && response.candidates[0].content.parts[0].text
      );
    } catch (error) {
      setSuggestionsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `Failed to generate suggestions. Please try again or contact us if the problem persists.`,
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.name = selectedName ? selectedName : values.name;
    values.address = searchQuery;

    createNewDecoration(
      values.name,
      values.address,
      latitude,
      longitude,
      country,
      region,
      city,
      images
    );
  };

  return (
    <>
      <div className="flex flex-col items-start mb-5 space-y-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="mt-5"
                onClick={() => getNameSuggestions(images)}
              >
                {suggestionsLoading ? (
                  <>
                    <CircleNotch
                      size={16}
                      weight="bold"
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                    <span className="ml-2">Generating names...</span>
                  </>
                ) : (
                  <>
                    <Brain
                      size={16}
                      weight="bold"
                      className="mr-2 text-ch-dark dark:text-ch-light"
                    />
                    Generate a name for your decoration
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-50 mb-2 ml-20">
              <p>AI will generate suggestions for your decoration</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="ml-3 text-xs text-ch-dark dark:text-ch-light">
          Only the first image will be used to generate name suggestions
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Name</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      {...field}
                      value={selectedName ? selectedName : field.value}
                      disabled={selectedName !== undefined}
                      className="dark:text-white"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => setSelectedName(undefined)}
                      disabled={!selectedName}
                    >
                      <Trash size={16} weight="bold" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Address</FormLabel>
                <FormControl>
                  <Input
                    className="dark:text-white"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleAddressSearch(e);
                    }}
                    value={searchQuery}
                    placeholder="Start typing the address..."
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <>
            {suggestions.length > 0 ? (
              <div className="z-50 overflow-y-auto border rounded-lg h-72 dark:border-zinc-800">
                <ul>
                  {suggestions.map((suggestion: any) => (
                    <li
                      key={suggestion.mapbox_id}
                      className="flex flex-col px-3 py-2 border-b cursor-pointer dark:text-white dark:border-zinc-800 dark:hover:bg-zinc-700"
                      onClick={() => handleSelectAddress(suggestion)}
                    >
                      <strong className="text-sm">{suggestion.name}</strong>
                      <span className="text-xs">{suggestion.full_address}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
          <div className="flex items-center justify-between">
            <Button variant="secondary" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
