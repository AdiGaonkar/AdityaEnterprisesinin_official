import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure this path is correct
import Navbar from '@/components/Navbar';

// Types for your Supabase data
type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
};

// Reusable Section Header
const SectionHeader = ({
    eyebrow,
    title,
    subtitle,
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
}) => (
    <div className="mb-16 text-center md:text-left flex flex-col items-center md:items-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-4 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7834c8] animate-pulse"></span>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
                {eyebrow}
            </p>
        </div>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/60 md:mx-0 mx-auto leading-relaxed">
            {subtitle}
        </p>
    </div>
);

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from Supabase
    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-[#7834c8] selection:text-white">

            {/* ====================================================== */}
            {/* HERO SECTION                                           */}
            {/* ====================================================== */}
            <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#7834c8]/90 via-[#4a1d82]/80 to-black">
                {/* Optional Ambient Glow */}
                <div className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[#7834c8] blur-[120px] opacity-30 pointer-events-none rounded-full" />
                
                <Navbar />

                <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl -mt-28 flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-28">
                    <h1 className="text-center text-7xl text-white md:text-8xl lg:text-[10rem] font-bold tracking-tighter drop-shadow-2xl">
                        Products<span className="text-[#7834c8]">.</span>
                    </h1>

                    <div className="mx-auto mt-12 w-full max-w-xl text-center flex flex-col items-center">
                        {/* Premium Faded Divider */}
                        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
                            AE Techno Services
                        </p>

                        <p className="mt-3 text-base text-white/90 font-light tracking-wide">
                            Premium Gear <span className="opacity-40 mx-2">|</span> Industrial Solutions <span className="opacity-40 mx-2">|</span> Pro Tech
                        </p>
                    </div>
                </div>

                {/* Smooth Gradient fade into the next section */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-black/80 to-black" />
            </section>

            {/* ====================================================== */}
            {/* MAIN CONTENT GRID                                      */}
            {/* ====================================================== */}
            <section className="bg-black relative z-10">
                <div className="mx-auto max-w-7xl px-6 py-24">

                    <SectionHeader
                        eyebrow="Available Now"
                        title="Explore Our Collection"
                        subtitle="Discover the latest gear, built for performance and crafted with precision for your industry needs. Uncompromising quality meets modern design."
                    />

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="relative flex h-12 w-12 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7834c8] opacity-20"></span>
                                <span className="relative inline-flex h-8 w-8 rounded-full bg-[#7834c8]"></span>
                            </div>
                        </div>
                    ) : (
                        /* Product Grid */
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <article
                                    key={product.id}
                                    className="group relative flex flex-col rounded-[28px] bg-white p-2 shadow-2xl ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(120,52,200,0.15)]"
                                >
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden rounded-[22px] bg-gray-100">
                                        
                                        {/* Premium Glassmorphism Price Badge */}
                                        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-sm font-medium tracking-wide text-white backdrop-blur-md shadow-lg">
                                            ${product.price.toLocaleString()}
                                        </span>

                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        
                                        {/* Subtle overlay gradient on hover for richness */}
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                                    </div>

                                    {/* Text & CTA */}
                                    <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                                        <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                                            {product.name}
                                        </h3>

                                        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="mt-8 pt-2 mt-auto">
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="block w-full rounded-full bg-black py-3.5 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#7834c8] focus:ring-offset-2 focus:ring-offset-white"
                                            >
                                                View Product
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <div className="text-center py-32 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                            <h3 className="text-2xl font-medium text-white">No products found</h3>
                            <p className="mt-2 text-white/50">Check back later for new arrivals.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* ======================================================== */}
            {/* BOTTOM CTA                                               */}
            {/* ======================================================== */}
            <section className="bg-black px-6 pb-24 pt-12 relative overflow-hidden">
                <div className="mx-auto max-w-7xl relative z-10">
                    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a] p-10 md:p-16 shadow-2xl">
                        
                        {/* Subtle background glow inside the CTA card */}
                        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#7834c8] blur-[100px] opacity-20 pointer-events-none" />

                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                Need a Custom Setup?
                            </h3>
                            <p className="mt-4 text-lg text-white/60 leading-relaxed">
                                Can't find exactly what you're looking for? Reach out to our team for custom orders, bulk pricing, and specialized hardware setups tailored for your business.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    to="/Contact"
                                    className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all hover:bg-gray-100 hover:scale-105 active:scale-95"
                                >
                                    Contact Sales
                                </Link>
                                <a
                                    href="https://wa.me/919321826572"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                                >
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}