import AdminCarousel from "@/components/AdminCarousel";
import MetodosAdmin from "@/components/MetodosAdmin";
import ProductHero from "@/components/ProductHero";

export default function HomePage() {
  return (
    <>
      <ProductHero category={"admin"} />
      <MetodosAdmin/>
      <AdminCarousel/>
    </>
  );
}
