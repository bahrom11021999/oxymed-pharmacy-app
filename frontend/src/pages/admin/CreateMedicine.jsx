import Header from "../../components/Header";
import { useCreateMedicine } from "../../hooks/admin/useCreateMedicine";

const categories = [
  "Headache",
  "Back-Pain",
  "Heart",
  "Leg-pain",
  "Stomach",
  "Mouth",
];

const CreateMedicine = () => {
  const { createMedicine, isCreating, error } = useCreateMedicine();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const category = e.target[1].value;
    const description = e.target[2].value;
    const image = e.target[3].value;
    const price = e.target[4].value;
    const quantity = e.target[5].value;

    createMedicine({ name, category, description, image, price, quantity });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header />

      <div className="flex items-start justify-center">
        <form
          className="flex w-full flex-col place-items-center items-center justify-center space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Paracetamol"
              defaultValue="Paracetamol"
              className="rounded border border-slate-400 p-2"
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="name">Category</label>
            <select
              className="rounded border border-slate-400 p-2"
              defaultValue="back-pain"
            >
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Description"
              defaultValue="This is a medicine for fever"
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              defaultValue="https://apteka.uz/upload/iblock/baf/l672siyt1dtdjoe8hrd23gpfvddnsd04.png"
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="100"
              defaultValue={100}
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <div className="flex w-full flex-col">
            <label htmlFor="quantity">Pills Count</label>
            <input
              type="number"
              placeholder="10"
              defaultValue={10}
              className="rounded border border-slate-400 p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-slate-800 p-2 text-white"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMedicine;
