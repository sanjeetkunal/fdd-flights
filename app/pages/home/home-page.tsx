import { HomeHero } from "./home-components/home-hero";
import { InventoryBoard } from "./home-components/inventory-board";

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef4ff]">
      <HomeHero />
      <InventoryBoard />
    </main>
  );
}
