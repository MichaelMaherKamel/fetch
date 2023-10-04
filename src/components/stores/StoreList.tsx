"use client";
import { CompleteStore } from "@/lib/db/schema/stores";
import { trpc } from "@/lib/trpc/client";
import StoreModal from "./StoreModal";


export default function StoreList({ stores }: { stores: CompleteStore[] }) {
  const { data: s } = trpc.stores.getStores.useQuery(undefined, {
    initialData: { stores },
    refetchOnMount: false,
  });

  if (s.stores.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.stores.map((store) => (
        <Store store={store} key={store.id} />
      ))}
    </ul>
  );
}

const Store = ({ store }: { store: CompleteStore }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{store.name}</div>
      </div>
      <StoreModal store={store} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No stores</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new store.
      </p>
      <div className="mt-6">
        <StoreModal emptyState={true} />
      </div>
    </div>
  );
};

