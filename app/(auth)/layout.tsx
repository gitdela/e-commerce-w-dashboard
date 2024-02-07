import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Dynamic administrator dashboard for various e-commerce stores',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  );
}
