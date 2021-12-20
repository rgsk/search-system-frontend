import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
export const HomePage = () => {
  const [input, setInput] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SERVER);
  }, [input]);
  return (
    <div className={styles.container}>
      <h1>Welcome to search suggestion system</h1>
      <div>
        <input value={input} onChange={handleChange} />
      </div>
    </div>
  );
};
