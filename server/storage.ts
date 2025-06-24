import { users, products, type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(search?: string, sortBy?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  getProductStats(): Promise<{ totalProducts: number; lowStockCount: number; totalValue: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProducts(search?: string, sortBy?: string): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (search) {
      query = query.where(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.description, `%${search}%`)
        )
      ) as typeof query;
    }

    if (sortBy === 'name') {
      query = query.orderBy(products.name) as typeof query;
    } else if (sortBy === 'quantity') {
      query = query.orderBy(desc(products.quantity)) as typeof query;
    } else {
      query = query.orderBy(desc(products.created_at)) as typeof query;
    }

    return await query;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getProductStats(): Promise<{ totalProducts: number; lowStockCount: number; totalValue: number }> {
    const allProducts = await db.select().from(products);
    const totalProducts = allProducts.length;
    const lowStockCount = allProducts.filter(p => p.quantity <= 10).length;
    const totalValue = allProducts.reduce((sum, p) => sum + (p.quantity * 100), 0); // Assuming $100 per unit
    
    return { totalProducts, lowStockCount, totalValue };
  }
}

export const storage = new DatabaseStorage();
