import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | SimpleShopping',
}

export default function Home() {
  return (
    <>
    <h1 className='font-bold text-3xl'>All Products</h1>

    <div className='grid grid-cols-4 gap-6 mt-4'>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
    </>
    
    );
}
