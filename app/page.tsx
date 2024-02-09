import CategoriesList from "@/components/CategoriesList";

export default function Home() {
  return (
    <div className="mx-72 grid grid-cols-7 gap-16">
      <p className="col-span-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        recusandae.
      </p>
      <CategoriesList />
    </div>
  );
}
