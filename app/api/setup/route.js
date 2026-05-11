import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// Yolu senin mongo.js dosyana göre ayarladım
import { connectToDatabase } from "../../../lib/mongo"; 
import User from "../../../models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const userExists = await User.findOne({ email: "meryem@kamerflowers.com" });
    if (userExists) {
      return NextResponse.json({ message: "Kral, admin zaten mevcut!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash("meryem123", 10);

    await User.create({
      name: "Meryem Gazi",
      email: "meryem@kamerflowers.com",
      password: hashedPassword,
      role: "admin"
    });

    return NextResponse.json({ message: "Admin hesabı başarıyla oluşturuldu! Artık giriş yapabilirsin." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Hata oluştu", error }, { status: 500 });
  }
}