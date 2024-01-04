"use client";

import useCountries from "@/hooks/useCountries";

import { FC } from "react";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string | undefined;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  const countries = getAll();

  const styles = {
    menuList: (base: any) => ({
      ...base,
      fontSize: 14,
      zIndex: 99,
      "::-webkit-scrollbar": {
        width: "6px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: 5,
        height: "60px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: 14,
      };
    },
  };

  return (
    <div>
      <Select
        styles={styles}
        isClearable
        onChange={(value) => {
          onChange(value as CountrySelectValue);
        }}
        defaultValue={value}
        placeholder="Select your place.."
        options={countries}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <div>{option.flag}</div>
              <div>
                {option.label},{" "}
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#f1f5f9",
            primary: "hsl(142.1 76.2% 36.3%)",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
