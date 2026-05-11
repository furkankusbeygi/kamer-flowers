"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/admin"); // Giriş başarılıysa admin paneline şutla
    } else {
      alert("Giriş başarısız! Bilgileri kontrol et kanka.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F9]">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-rose-50 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif italic font-bold text-neutral-800">Kamer<span className="text-rose-500">Flowers</span></h1>
          <p className="text-neutral-400 text-sm mt-2 uppercase tracking-widest">Yönetim Girişi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="E-posta" 
            className="w-full border-2 border-neutral-50 rounded-2xl p-4 outline-none focus:border-rose-300 transition-all bg-neutral-50"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            className="w-full border-2 border-neutral-50 rounded-2xl p-4 outline-none focus:border-rose-300 transition-all bg-neutral-50"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-neutral-900 text-white font-bold py-4 rounded-2xl hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-100 uppercase tracking-widest text-xs">
            Sisteme Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}