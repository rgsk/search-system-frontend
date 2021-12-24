import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { Debounce } from "./utils";
import axios, { Axios, CancelTokenSource } from "axios";
import { CountryRow } from "./CountryRow";
import PageCell from "./PageCell";
export const HomePage = () => {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState<any>(5);
  const [total, setTotal] = useState(0);
  const [countries, setCountries] = useState([]);
  const [useCppMap, setUseCppMap] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  // const debouncedSearch = useMemo(
  //   () =>
  //     new Debounce(async (input: string, ourRequest: CancelTokenSource) => {
  //       // {{server}}/countries/search?name=R
  //       const result = await axios.get(
  //         `${process.env.NEXT_PUBLIC_SERVER}/countries/search?name=${input}`,
  //         {
  //           cancelToken: ourRequest.token,
  //         }
  //       );
  //       console.log(result.data);
  //       setCountries(result.data.countries);
  //     }, 100),
  //   []
  // );
  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    (async () => {
      let url = `${process.env.NEXT_PUBLIC_SERVER}/countries/search${
        useCppMap ? "/cppMap" : ""
      }?name=${input}&all=false&limit=${itemsPerPage}&page=${currentPage}`;
      if (!paginate && useCppMap) {
        url += `&turbo=true`;
      }

      const result = await axios.get(url, {
        cancelToken: ourRequest.token,
      });
      console.log(result.data);
      setTotal(result.data.total);
      setCountries(result.data.countries);
    })();

    return () => {
      try {
        ourRequest.cancel(); // <-- 3rd step
      } catch (e) {}
    };
  }, [currentPage, input, itemsPerPage, paginate, useCppMap]);
  useEffect(() => {
    setCurrentPage(1);
  }, [input, itemsPerPage, paginate, useCppMap]);
  const totalPages = Math.ceil(total / itemsPerPage);
  return (
    <div className={styles.container}>
      <h1>Welcome to search suggestion system</h1>
      <p>
        Enter Search Term: <input value={input} onChange={handleChange} />
      </p>
      <p>Total Matching Items: {total}</p>
      <p>
        Items Per Page:{" "}
        <input
          type="number"
          value={itemsPerPage}
          onChange={(e) => {
            if (e.target.value) {
              setItemsPerPage(+e.target.value);
            } else {
              setItemsPerPage("");
            }
          }}
        ></input>
      </p>
      <div>
        <p>
          <input
            type="radio"
            checked={useCppMap}
            onChange={() => setUseCppMap((prev) => !prev)}
          />{" "}
          Use C++ Tree Map (Binary Search)
        </p>
        <p>
          <input
            type="radio"
            checked={!useCppMap}
            onChange={() => setUseCppMap((prev) => !prev)}
          />{" "}
          Use Postgres Pattern Matching
        </p>
      </div>
      {useCppMap && (
        <div>
          <div>
            <input
              type="checkbox"
              value={paginate ? "true" : "false"}
              checked={paginate}
              onChange={(e) => {
                // console.log(e.target.checked);
                setPaginate(e.target.checked);
              }}
            />{" "}
            Use Pagination
            <div style={{ fontSize: 14 }}>
              (Not using pagination in case of c++ map makes the query faster)
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          margin: "2rem 0",
        }}
      >
        <h2>Matching Searches: </h2>
        <div>
          {countries.length
            ? countries.map((c: any, i) => <CountryRow key={i} country={c} />)
            : "No Matches"}
        </div>
      </div>
      {paginate && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {totalPages <= 10
              ? Array(totalPages)
                  .fill(0)
                  .map((v, i) => (
                    <PageCell
                      key={i}
                      v={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      active={currentPage === i + 1}
                    />
                  ))
              : [1, 2, 3, 4, 5, 6, totalPages - 1, totalPages].map((v, i) => {
                  if (v >= 4 && v <= 6) {
                    return ".";
                  }
                  return (
                    <PageCell
                      key={i}
                      v={v}
                      onClick={() => setCurrentPage(v)}
                      active={currentPage === v}
                    />
                  );
                })}
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "row",
            }}
          >
            <button
              style={{ marginRight: "1rem" }}
              onClick={() => {
                setCurrentPage((prev) => {
                  if (prev >= 2) return prev - 1;
                  return prev;
                });
              }}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setCurrentPage((prev) => {
                  if (prev < totalPages) return prev + 1;
                  return prev;
                });
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
