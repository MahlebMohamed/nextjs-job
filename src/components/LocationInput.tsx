import citiesList from "@/lib/cities-list";
import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (Location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFous, setHasFous] = useState(false);

    const cities = useMemo(
      function () {
        if (!locationSearchInput.trim()) return [];
        const searchWords = locationSearchInput.split(" ");

        return citiesList
          .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
          .filter(
            (city) =>
              city
                .toLowerCase()
                .startsWith(searchWords[0].toLocaleLowerCase()) &&
              searchWords.every((word) =>
                city.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
              ),
          )
          .slice(0, 5);
      },
      [locationSearchInput],
    );

    return (
      <div className="relative">
        <Input
          {...props}
          type="search"
          ref={ref}
          placeholder="Search for a city"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFous(true)}
          onBlur={() => setHasFous(false)}
        />
        {locationSearchInput.trim() && hasFous && (
          <div className="bg-background absolute z-20 divide-y rounded-b-lg border-x border-b shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                key={city}
                className="hover:bg-accent block w-full cursor-pointer p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
