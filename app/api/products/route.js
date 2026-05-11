import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo"; // Kendi mongo.js yoluna göre düzelt kanka (gerekirse ../../../lib/mongo yap)
import Product from "@/models/Product"; // Aynı şekilde ../../../models/Product yapabilirsin

// Ürünleri Listeleme (GET)
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }); // En yeniler en üstte
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Ürünler çekilemedi", error }, { status: 500 });
  }
}

// Yeni Ürün Ekleme (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    
    // Stok 0 ise durumu otomatik "Tükendi" yap
    const status = body.stock > 0 ? "Aktif" : "Tükendi";

    const newProduct = await Product.create({ ...body, status });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Ürün eklenemedi", error }, { status: 500 });
  }
}