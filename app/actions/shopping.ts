"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function initDb() {
  try {
    // Verificar si la tabla existe, de lo contrario, crearla
    await sql`
      CREATE TABLE IF NOT EXISTS shopping_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Verificar si la tabla está vacía para cargar la data dummy (seed)
    const { rows } = await sql`SELECT COUNT(*) FROM shopping_items;`;
    if (parseInt(rows[0].count) === 0) {
      console.log("Database empty, seeding init data...");
      
      const { SHOPPING } = await import("@/data/shopping");
      
      for (const [category, items] of Object.entries(SHOPPING)) {
        for (const itemName of items as string[]) {
          await sql`
            INSERT INTO shopping_items (name, category, is_completed)
            VALUES (${itemName}, ${category}, false);
          `;
        }
      }
      console.log("Database seeded successfully.");
    }
  } catch (error) {
    console.error("Database implementation error:", error);
    throw error;
  }
}

export async function getShoppingItems() {
  try {
    const { rows } = await sql`SELECT * FROM shopping_items ORDER BY created_at ASC;`;
    return rows;
  } catch (error) {
    console.error("Error fetching shopping items:", error);
    throw error;
  }
}

export async function toggleItem(id: number, is_completed: boolean) {
  try {
    await sql`
      UPDATE shopping_items 
      SET is_completed = ${!is_completed}
      WHERE id = ${id};
    `;
    revalidatePath("/", "page");
  } catch (error) {
    console.error("Error toggling item:", error);
  }
}

export async function addItem(name: string, category: string) {
  try {
    await sql`
      INSERT INTO shopping_items (name, category)
      VALUES (${name}, ${category});
    `;
    revalidatePath("/", "page");
  } catch (error) {
    console.error("Error adding item:", error);
  }
}

export async function deleteItem(id: number) {
  try {
    await sql`DELETE FROM shopping_items WHERE id = ${id};`;
    revalidatePath("/", "page");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export async function uncheckAllItems() {
  try {
    await sql`UPDATE shopping_items SET is_completed = false;`;
    revalidatePath("/", "page");
  } catch (error) {
    console.error("Error clearing items:", error);
  }
}
