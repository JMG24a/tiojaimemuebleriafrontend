import { JSX } from "react/jsx-runtime";
import styles from "./prestige.module.css";

interface PrestigeItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function Prestige({ items }: { items: PrestigeItem[] }) {
  return (
    <section className={styles.prestige}>
      {items.map((item, index) => (
        <div key={index} className={styles.card}>
         {item.icon}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}
