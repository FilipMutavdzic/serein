export const metadata = { title: "Rooms | Serein" };

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-sage capitalize">
        {category.replace(/-/g, " ")}
      </h1>
      <p className="text-slate-600 mt-1">Category page placeholder.</p>
    </main>
  );
}
