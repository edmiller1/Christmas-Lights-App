import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getBase64Value } from "@/lib/helpers";

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
}

const mbApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

const formSchema = z.object({
  name: z.string().min(1, { message: "Decoration name is required" }),
  address: z.string().min(1, { message: "Decoration address is required" }),
});

export const CreateDecorationForm = ({
  setCurrentStep,
  files,
  createNewDecoration,
  countryAbbrev,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    const arr: string[] = [];
    files.forEach((file) => {
      getBase64Value(file, (imageBase64Value) => {
        arr.push(imageBase64Value);
      });
    });
    setImages(arr);
  }, []);

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
      }, 1000);

      return () => clearTimeout(getAddressData);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">Name</FormLabel>
              <FormControl>
                <Input {...field} className="dark:text-white" />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <>
          {suggestions.length > 0 ? (
            <div className="z-50 h-72 overflow-y-auto rounded-lg border dark:border-zinc-800">
              <ul>
                {suggestions.map((suggestion: any) => (
                  <li
                    key={suggestion.mapbox_id}
                    className="flex cursor-pointer flex-col border-b px-3 py-2 dark:text-white dark:border-zinc-800 dark:hover:bg-zinc-700"
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
  );
};
