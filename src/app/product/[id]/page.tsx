import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProductById | SimpleShopping', // Modify with the name of the product
}

export default function ProductById({ params }: { params: { id: string } }) {
  return <h1>ProductById with id: { params.id } works!</h1>;
}
