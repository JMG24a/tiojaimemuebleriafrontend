import Image from "next/image";
import styles from "./categories.module.css";

interface CategoryItem {
  title: string;
  image: string;
  category: string;
}

export default function Categories({ items }: { items: CategoryItem[] }) {
  return (
    <section className={styles.categories}>
      {items.map((item, index) => (
        <div key={index} className={styles.category}>
          <a href={`/products/${item.category}`}>
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={400}
            />

            <div className={styles.overlay}>
              <h2>{item.title}</h2>
            </div>
          </a>
        </div>
      ))}
    </section>
  );
}
