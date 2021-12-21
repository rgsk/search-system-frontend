import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { Debounce } from "./utils";
import axios from "axios";
import { CountryRow } from "./CountryRow";
export const HomePage = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const debouncedSearch = useMemo(
    () =>
      new Debounce(async (input: string) => {
        // {{server}}/countries/search?name=R
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/countries/search?name=${input}`
        );
        console.log(result.data);
        setCountries(result.data.countries);
      }),
    []
  );
  useEffect(() => {
    debouncedSearch.call(input);
  }, [debouncedSearch, input]);
  return (
    <div className={styles.container}>
      <h1>Welcome to search suggestion system</h1>
      <div>
        <input value={input} onChange={handleChange} />
      </div>
      <div
        style={{
          margin: "2rem 0",
        }}
      >
        {countries.map((c: any, i) => (
          <CountryRow key={i} country={c} />
        ))}
      </div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {Array(10)
          .fill(0)
          .map((v, i) => (
            <div
              key={i}
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                padding: "5px",
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              {i + 1}
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      ></div> */}
    </div>
  );
};
