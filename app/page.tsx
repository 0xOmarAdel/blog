import CategoriesList from "@/components/CategoriesList";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-16">
      <p className="col-span-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        recusandae.
      </p>
      <div className="col-span-1">
        <h2 className="text-xl text-violet-600 font-semibold">Categories</h2>
        <CategoriesList />
      </div>
    </div>
  );
}
