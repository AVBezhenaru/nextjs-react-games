import { useRouter } from 'next/router';
import { useEffect } from 'react';

function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 3000);
  }, [router]);

  return (
    <div
      style={{
        color: '#D65B88',
        fontSize: '20px',
        fontWeight: '400',
        marginTop: '30%',
        textAlign: 'center',
      }}
    >
      <span>404 </span>
      <span> Page not found</span>
    </div>
  );
}

export default NotFoundPage;
