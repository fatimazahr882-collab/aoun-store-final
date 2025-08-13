'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductControls({ categories }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`);
    setIsFilterVisible(false); // Hide filters after selection
  };
  
  return (
    <div style={{ marginBottom: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
        style={{ padding: '10px', width: '300px' }}
      />
      
      <div style={{ position: 'relative' }}>
        <button onClick={() => setIsFilterVisible(!isFilterVisible)} style={{ padding: '10px' }}>
          Filter
        </button>
        {isFilterVisible && (
          <div style={{ position: 'absolute', top: '45px', left: '0', background: 'white', border: '1px solid #ccc', zIndex: '10' }}>
            <div onClick={() => handleFilterChange('')} style={{ padding: '10px', cursor: 'pointer' }}>All Categories</div>
            {categories.map(cat => (
              <div key={cat} onClick={() => handleFilterChange(cat)} style={{ padding: '10px', cursor: 'pointer' }}>
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}